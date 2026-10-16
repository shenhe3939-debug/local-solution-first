/**
 * DSH bundle entry: publish the local-solution-first skill from memory.
 *
 * The repository stays a plain directory bundle (`SKILL.md` + `references/`), so
 * it still works when copied into any skill root; this plugin additionally
 * registers the same body through `ctx.skills.register`, which is what makes the
 * package installable as a DSH plugin. Registration is a pure in-memory read —
 * apply performs no filesystem access — and the body is generated from SKILL.md
 * by scripts/build-skill-content.mjs.
 */
import { fileURLToPath } from "node:url";

import { SKILL_NAME, SKILL_DESCRIPTION, SKILL_WHEN_TO_USE, SKILL_BODY } from "./skill-content.mjs";

export const name = "local-solution-first";
export const inject = ["skills"];

/**
 * Register the skill on the skill registry, or do nothing when this composition
 * mounts no registry.
 * @param ctx - the plugin context.
 */
export function apply(ctx) {
  const skills = ctx.get("skills");
  if (skills === undefined || typeof skills.register !== "function") return;

  skills.register({
    name: SKILL_NAME,
    description: SKILL_DESCRIPTION,
    whenToUse: SKILL_WHEN_TO_USE,
    content: SKILL_BODY,
    source: "bundled",
    // The skill's referenced files live at the package root, next to SKILL.md.
    resourceBase: { kind: "directory", path: fileURLToPath(new URL("../", import.meta.url)) }
  });
}
