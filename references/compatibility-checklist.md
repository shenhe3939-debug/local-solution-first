# Host and version compatibility checklist

Use this checklist before claiming a Skill, plugin, or integration is compatible with a host version.

## A. Identify the environment

- [ ] Record the actual host application and version.
- [ ] Record operating system and relevant profile/workspace.
- [ ] Record the date of verification.
- [ ] Identify the source of each version claim (UI, executable output, package manifest, application bundle, or other direct evidence). Distinguish the host application version from the embedded runtime version (e.g., Electron version ≠ DSH desktop version).
- [ ] Treat old research notes as historical until rechecked.

## B. Verify Skill discovery

- [ ] Determine the project root **first**: it is the nearest ancestor directory that contains `.git`, falling back to the current working directory when no ancestor does. The project-level skill root is `<projectRoot>/.dsh/skills` — do not assume it equals the current directory.
- [ ] When a same-named Skill exists in more than one root, the lowest-rank root wins: project `.dsh/skills` 100 < project `.agents/skills` 200 < runtime providers 250 < custom dirs 300 < user `.dsh/skills` 400 < user `.agents/skills` 500 < bundled 600. Empirically confirmed 2026-10-16 (priority probe, `../tests/regression-run-2026-10-16-priority-probe.md`): the project-level copy was loaded when both were present. To determine which copy a host actually loads, install two distinguishable test copies and probe, then remove them.
- [ ] Identify provider/plugin-provided skill roots separately from filesystem skill roots: packages under `<dshHome>/profiles/<profile>/node_modules` can ship their own `SKILL.md` and appear in the session's skill catalog even though they are in neither `<dshHome>/skills` nor `<projectRoot>/.dsh/skills`; these are runtime-provider roots (rank 250). Run #8 (2026-10-16) measured 16 such files under `C:\Users\lenovo\.dsh\profiles\desktop\node_modules` (e.g. archify, browser-skill, hindsight-coding-agent, modlens, studymate ×12). When concluding “X is not installed”, search these provider roots too — run #8's LS-02 claimed archify absent while it existed there (deviation D10).
- [ ] Confirm the actual Skill discovery root(s) for this host/version.
- [ ] Confirm whether the host expects `<root>/<skill-name>/SKILL.md`, a flat markdown file, or another layout.
- [ ] Confirm required frontmatter fields and supported optional fields. Unknown or camelCase variant keys may be silently dropped.
- [ ] Confirm whether nested folders are discovered, and at what depth.
- [ ] Confirm whether changes require reload/restart or are watched dynamically.
- [ ] Test actual discovery/loading; file presence alone is insufficient.

## C. Verify tools and interfaces

For each required capability:
- [ ] Name the exact tool/API/interface.
- [ ] Find evidence in current-version source, declaration, shipped docs, or a reproducible test.
- [ ] Verify arguments, outputs, error behavior, and permissions.
- [ ] Verify the interface is callable from this Skill's actual execution context.
- [ ] Confirm whether the test was static inspection, simulation, or end-to-end.
- [ ] Do not assume a bundled package is enabled in the active profile.
- [ ] Do not assume a related host's API is supported.
- [ ] Do not accept a package's own documentation as evidence of what a directory contains — list the directory. Run #4 recorded two probes that reported a version and a file inventory straight from a README that the filesystem contradicted.
- [ ] For large binary archives (e.g., `app.asar`), string-search tools can return false negatives; verify with byte-level scanning. Prefer reading by entry (container header → JSON index → per-entry offsets; for asar, `dataOffset = 16 + headerJsonLength`) over scanning the whole file.

## D. Verify integration behavior

- [ ] Confirm event delivery, if the feature depends on events.
- [ ] Confirm required payload fields exist and are populated.
- [ ] Confirm the integration can act at the required point in the workflow.
- [ ] Confirm failure is visible and does not silently produce a false success.
- [ ] Confirm the integration can be disabled or rolled back.

## E. Safe update process

Before host upgrades:
- [ ] Preserve the current Skill package and relevant configuration.
- [ ] Record the last known-good host version and regression results.

After host upgrades:
- [ ] Recheck version, discovery, and metadata.
- [ ] Run `../tests/regression-cases.md`.
- [ ] Mark each test PASS / FAIL / BLOCKED / NOT TESTED.
- [ ] Do not call the Skill compatible if a required capability is BLOCKED or NOT TESTED.
- [ ] If a required interface changed, pause affected operations and update the Skill only after finding current evidence.

## Evidence status definitions

- **PASS** — directly verified in the current environment.
- **FAIL** — test ran and did not meet its expected result.
- **BLOCKED** — test could not run because a required capability/resource was unavailable.
- **NOT TESTED** — no test was attempted.
- **INFERRED** — conclusion is based on indirect evidence; it is not a PASS.
