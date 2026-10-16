// Package self-check for local-solution-first.
//
// Runs inside any clone of this repository, with no dependencies beyond Node
// itself, and asserts the properties this repository claims in README.md:
// the frozen fingerprints, the DSH bundle manifest, the shape of the overlay
// patch, the plugin's registration payload, and resource reachability.
//
//   node scripts/verify-package.mjs [repo-dir]
//
// The patch is checked structurally here (comment/blank lines stripped, then an
// exact three-line shape) so the script stays dependency-free. The DSH-side
// check that the patch parses with the host's own YAML schema lives in the
// development notes, not in this published script.
import { existsSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repo = resolve(process.argv[2] ?? join(here, ".."));

const FROZEN_SKILL_SHA256 = "f6e1e40495998a07df0f32a6edc0b81ab07cabeb6148d974a8a456380d1a915d";
const FROZEN_ZIP_SHA256 = "1360f7dfc5c014b46d170cddd4d922d543cb0a90d64101423e4cfe272cc140e6";
const FROZEN_ZIP_BYTES = 159602;
const SKILL_NAME = "local-solution-first";

let failures = 0;
const check = (label, ok, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? "  — " + detail : ""}`);
  if (!ok) failures++;
};
const sha256 = (file) => createHash("sha256").update(readFileSync(file)).digest("hex");
const find = (name, max = 4) => {
  const out = [];
  const walk = (dir) => {
    for (const entry of readFileSync(dir, { withFileTypes: true })) {
      if (out.length >= max) return;
      const p = join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name === name) out.push(p);
    }
  };
  walk(repo);
  return out;
};

console.log(`repository: ${repo}\n`);

// --- 1. the frozen skill body ------------------------------------------------
const skillFile = join(repo, "SKILL.md");
check("SKILL.md exists", existsSync(skillFile));
if (existsSync(skillFile)) {
  const sha = sha256(skillFile);
  check("SKILL.md is the frozen v0.1.6 file", sha === FROZEN_SKILL_SHA256, sha);
}

// --- 2. the frozen release archive ------------------------------------------
const zip = find(`local-solution-first-dsh-v0.1.6.zip`, 1)[0];
check("the frozen release archive is present", zip !== undefined, zip ?? "not found");
if (zip !== undefined) {
  const size = readFileSync(zip).length;
  const sha = sha256(zip);
  check("release archive size", size === FROZEN_ZIP_BYTES, `${size} bytes`);
  check("release archive is the frozen v0.1.6 build", sha === FROZEN_ZIP_SHA256, sha);
}

// --- 3. the DSH bundle manifest ---------------------------------------------
const pkg = JSON.parse(readFileSync(join(repo, "package.json"), "utf8"));
const patch = pkg.dsh?.bundle?.patch;
check("package.json declares dsh.bundle.patch (the loader's decisive field)", patch === "./cordis.patch.yml", String(patch));
check("package name is the scoped name the patch inserts", typeof pkg.name === "string" && pkg.name.endsWith(`/${SKILL_NAME}`), String(pkg.name));

// --- 4. the overlay patch ----------------------------------------------------
const patchFile = join(repo, "cordis.patch.yml");
check("patch file sits where bundlePatchPaths looks for it", existsSync(patchFile));
if (existsSync(patchFile)) {
  const lines = readFileSync(patchFile, "utf8").split(/\r?\n/).filter((l) => l.trim() !== "" && !l.trim().startsWith("#"));
  const shapeOk =
    lines.length === 3 &&
    lines[0].trim() === "- insert:" &&
    /^\s*-\s*id:\s*\S+$/.test(lines[1]) &&
    lines[2].trim() === `name: "${pkg.name}"`;
  check("patch is the expected three-line insert shape (comments stripped)", shapeOk, JSON.stringify(lines));
  check("patch inserts the package by its own module name (not a relative path)", lines[2]?.includes(`"${pkg.name}"`) === true, lines[2] ?? "");
}

// --- 5. every declared file ships -------------------------------------------
check("files[] is declared", Array.isArray(pkg.files) && pkg.files.length > 0, JSON.stringify(pkg.files ?? []));
const missing = (pkg.files ?? []).filter((f) => !existsSync(join(repo, f)));
check("every path in files[] exists", missing.length === 0, missing.length === 0 ? `${pkg.files.length} paths` : missing.join(", "));

// --- 6. what the plugin actually registers ----------------------------------
const entry = join(repo, "lib/index.mjs");
check("plugin entry lib/index.mjs exists", existsSync(entry));
if (existsSync(entry)) {
  const mod = await import(pathToFileURL(entry).href);
  check("entry exports name / inject / apply", typeof mod.name === "string" && Array.isArray(mod.inject) && typeof mod.apply === "function", `name=${mod.name} inject=${JSON.stringify(mod.inject)}`);
  check("inject declares the skills service", mod.inject.includes("skills"), JSON.stringify(mod.inject));

  const registered = [];
  const registry = { register: (skill) => { registered.push(skill); return () => {}; } };
  await mod.apply({ get: (name) => (name === "skills" ? registry : undefined) }, {});
  check("registers exactly one skill", registered.length === 1, String(registered.length));
  const skill = registered[0] ?? {};
  check("skill name is valid kebab-case", /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(skill.name ?? ""), String(skill.name));
  check("skill description is non-empty", typeof skill.description === "string" && skill.description.length > 0, `${skill.description?.length ?? 0} chars`);
  check("skill source is bundled", skill.source === "bundled", String(skill.source));
  check("resourceBase is the package directory", skill.resourceBase?.kind === "directory" && resolve(skill.resourceBase.path) === repo, JSON.stringify(skill.resourceBase));

  if (existsSync(skillFile)) {
    const expected = readFileSync(skillFile, "utf8").replace(/^---[\s\S]*?---/, "").trim();
    check("registered content === SKILL.md body (frontmatter stripped, trimmed)", skill.content === expected, `${skill.content?.length ?? 0} vs ${expected.length} chars`);
  }
  for (const rel of ["references/compatibility-checklist.md", "references/decision-matrix.md", "references/validator-design.md", "tests/regression-cases.md", "tests/regression-protocol.md"]) {
    check(`resource reachable: ${rel}`, existsSync(join(repo, rel)));
  }

  let threw = "";
  try {
    await mod.apply({ get: () => undefined }, {});
  } catch (error) {
    threw = String(error?.message ?? error);
  }
  check("apply without a skill registry is a no-op, not a throw", threw === "", threw);
}

console.log(`\n${failures === 0 ? "all checks passed" : failures + " check(s) FAILED"}`);
process.exit(failures === 0 ? 0 : 1);
