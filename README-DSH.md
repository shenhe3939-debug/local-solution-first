# Local Solution First — DSH package

## Purpose

This Skill instructs an agent to check for relevant local projects, tools, Skills, plugins, scripts, and dependencies before recommending a new implementation. It prioritizes evidence-based reuse without forcing reuse when a candidate is inadequate or risky.

## Current status (as of 2026-10-17)

This list is **as-of-dated evidence, not a standing claim**: each entry states what was true on its date and is superseded by later entries, never silently edited. Present-tense status wording ("this package is not installed / not tested") is deliberately not used anywhere in this package — see the rule in `CHANGELOG.md`. The newest entry below is authoritative.

- v0.1.0 installed at the project-level location; run #1 (LS-01 … LS-12, 2026-10-16 00:17) was **12/12 PASS**.
- v0.1.1 installed and run #2 (LS-01 … LS-13, 2026-10-16 00:43–00:51) was **13/13 PASS**; run #2 uncovered a frontmatter regression in v0.1.1, fixed in v0.1.2 (see `CHANGELOG.md`).
- v0.1.2 installed and run #3 (LS-01 … LS-13, 2026-10-16 01:00–01:12) was **13/13 PASS**; run #3 confirmed the `whenToUse` fix and found no behavioral regression (its remaining findings were documentation inconsistencies, corrected in the local revision recorded in `CHANGELOG.md`).
- v0.1.3-candidate installed into a second workspace (`F:\DS 实验\.dsh\skills\local-solution-first\`; first install, 11/11 files byte-identical to the delivered archive) and run as run #4 (LS-01 … LS-13). It produced the first three-part result under `tests/regression-protocol.md`: **behavioral 13/13 PASS, run protocol DEVIATION (D1–D4), run-level release gate NOT PASSED** — the gate failed on protocol deviations, not on behavior. Quote all three parts; never the "13/13 PASS" alone.
- Run #5 (2026-10-16): the **same v0.1.3-candidate package** re-run under the corrected protocol, after fixing run #4's four deviations (D1–D4). Result: **behavioral 13/13 PASS (mandatory subset 7/7), run protocol DEVIATION (D5 — a runner-side record/text mismatch, found by self-review and corrected in place), run-level release gate PASSED.** This was the first PASSED gate. Record: `tests/regression-run-2026-10-16-v0.1.3-run5.md`.
- Priority probe (2026-10-16, after run #4): with same-named `local-solution-first` installed in both `F:\DS 实验\.dsh\skills` (project-level) and `C:\Users\lenovo\.dsh\skills` (user-level), DSH loaded the **project-level** copy — marker `PROJECT_TEST_123_LOADED` in two identical runs, and `USER_TEST_456_LOADED` in the control run with the project copy removed. Record: `tests/regression-run-2026-10-16-priority-probe.md`. This empirically confirms the source-verified precedence (lower rank wins) and resolves pending decision #1.
- v0.1.4-candidate-revised installed over the run #4/#5 copy at `F:\DS 实验\.dsh\skills\local-solution-first\` (install verified per file: 13/13 package files byte-identical; the pre-existing run #4 and run #5 records survived the overwrite, so no history was rewritten) and run as run #6 (2026-10-16). Result: **behavioral 13/13 PASS (mandatory subset 7/7), run protocol DEVIATION (D6 — a runner install command that silently copied nothing, caught by the mandatory per-file hash verification — and D7 — several probes appended coverage notes beyond the required four-line answer), run-level release gate PASSED.** Record: `tests/regression-run-2026-10-16-v0.1.4-run6.md`. Run #6's evidence applies to the v0.1.4-candidate-revised *content*; v0.1.5 changes no file the host loads (see `CHANGELOG.md`).
- v0.1.5-candidate installed over the v0.1.4-candidate-revised copy at `F:\DS 实验\.dsh\skills\local-solution-first\` (per-file verification: 15/15 package files byte-identical; prior records preserved; verified backup at `F:\DS 实验\_incoming\backup-before-run7\`) and run as run #7 (2026-10-16). Result: **behavioral 13/13 PASS (mandatory subset 7/7), run protocol DEVIATION (D8 — probe citation accuracy, found by independent review, verdict unaffected), run-level release gate PASSED.** Record: `tests/regression-run-2026-10-16-v0.1.5-run7.md`. This is the first version whose **own content** passed the release gate end-to-end (run #7 exercised v0.1.5 itself; `SKILL.md` is byte-identical to the v0.1.4-candidate-revised file, SHA `F6E1E404…`, so run #6's behavioral evidence also applies to it).
- v0.1.5-candidate (the run-#7-updated 16-file revision) was re-run as run #8 on 2026-10-16 at `F:\DS 实验`. Result: **behavioral 13/13 PASS (mandatory subset 7/7), run protocol DEVIATION (D9 — output hygiene appended to LS-03 only; D10 — probe false-negative evidence; D11 — probe count deviations; D12 — format-constraint recurrence), run-level release gate PASSED.** Record: `tests/regression-run-2026-10-16-v0.1.5-run8.md`. Its §7.2 recommendations are implemented in v0.1.6-candidate (`tests/regression-protocol.md` §2/§3/§4/§7, `references/compatibility-checklist.md`); `SKILL.md` remains byte-identical (`F6E1E404…`).
- v0.1.6-candidate (built from the run-#8-updated content; 4 protocol/checklist changes per run #8 §7.2; `SKILL.md` byte-identical `F6E1E404…`) installed over the run-#8 copy at `F:\DS 实验\.dsh\skills\local-solution-first\` (per-file 17/17; verified backup at `F:\DS 实验\_incoming\backup-before-run9\`) and run as run #9 (2026-10-16). Result: **behavioral 13/13 PASS (mandatory subset 7/7), run protocol DEVIATION (D-T1 — runner-side prompt-transport truncation of the first LS-01 dispatch, corrected in place to single-line dispatch with marker-echo self-check; plus one non-leak output-hygiene finding), run-level release gate PASSED.** Record: `tests/regression-run-2026-10-16-v0.1.6-run9.md`. This run verified the v0.1.6 protocol changes in action: unified output hygiene (13/13), hard positive controls (archify located in the provider root; one probe discarded an uncontrolled zero-hit), per-case format accounting (0 deviations), provider-root search in the compatibility checklist.
- v0.1.6 (final release) — this 18-file package, built 2026-10-17 from the run-#9-validated content plus the run #9 record. `SKILL.md` remains byte-identical (`F6E1E404…`). As of 2026-10-17 (package-build time), v0.1.6 had not yet been installed at `F:\DSSSSSSSSSS` and the final regression (run #10) had not yet been run; the installed-tree notes record them when they occur.
- Records: `tests/regression-run-2026-10-16.md` (run #1), `tests/regression-run-2026-10-16-v0.1.1.md` (run #2), `tests/regression-run-2026-10-16-v0.1.2.md` (run #3), `tests/regression-run-2026-10-16-v0.1.3.md` (run #4), `tests/regression-run-2026-10-16-v0.1.3-run5.md` (run #5), `tests/regression-run-2026-10-16-v0.1.4-run6.md` (run #6), `tests/regression-run-2026-10-16-v0.1.5-run7.md` (run #7), `tests/regression-run-2026-10-16-v0.1.5-run8.md` (run #8), `tests/regression-run-2026-10-16-v0.1.6-run9.md` (run #9); priority probe: `tests/regression-run-2026-10-16-priority-probe.md`.

## Package contents

- `SKILL.md` — core workflow and safety rules.
- `references/compatibility-checklist.md` — version and integration verification checklist.
- `references/decision-matrix.md` — candidate comparison and decision guidance.
- `references/validator-design.md` — design for the optional generic skill validator (pending decision #3, not yet built).
- `tests/regression-cases.md` — manual regression cases for initial validation and after host updates.
- `tests/regression-protocol.md` — mandatory run procedure, privacy/write boundaries, evidence checks, and the separate release gate.
- `tests/regression-run-2026-10-16.md` — evidence record of run #1 (v0.1.0, with correction block).
- `tests/regression-run-2026-10-16-v0.1.1.md` — evidence record of run #2 (v0.1.1).
- `tests/regression-run-2026-10-16-v0.1.2.md` — evidence record of run #3 (v0.1.2).
- `tests/regression-run-2026-10-16-v0.1.3.md` — evidence record of run #4 (v0.1.3-candidate; includes protocol deviations D1–D4 and the release-gate verdict).
- `tests/regression-run-2026-10-16-priority-probe.md` — evidence record of the priority probe (2026-10-16; project-level vs user-level same-name loading).
- `tests/regression-run-2026-10-16-v0.1.3-run5.md` — evidence record of run #5 (the same v0.1.3-candidate package re-run under the corrected protocol; protocol deviation D5; release gate PASSED).
- `tests/regression-run-2026-10-16-v0.1.4-run6.md` — evidence record of run #6 (v0.1.4-candidate-revised; protocol deviations D6–D7; release gate PASSED; includes the per-file install verification that caught D6).
- `tests/regression-run-2026-10-16-v0.1.5-run7.md` — evidence record of run #7 (v0.1.5-candidate; protocol deviation D8; release gate PASSED; includes the deviation-review table D1–D8 and the per-file install verification).
- `tests/regression-run-2026-10-16-v0.1.5-run8.md` — evidence record of run #8 (the run-#7-updated v0.1.5-candidate revision; protocol deviations D9–D12; release gate PASSED; includes the D9 output-hygiene and D10 false-negative findings that v0.1.6 fixes).
- `tests/regression-run-2026-10-16-v0.1.6-run9.md` — evidence record of run #9 (v0.1.6-candidate; protocol deviation D-T1; release gate PASSED; the run that verified v0.1.6's four protocol changes in action).

No external runtime, Python installation, hook, plugin API, or network access is required by the Skill text itself. It can only use the capabilities the host actually exposes.

## Verified environment baseline (2026-10-16)

| Item | Verified value |
|---|---|
| Workspace | `F:\DSSSSSSSSSS` (runs #1–#3) and `F:\DS 实验` (runs #4–#9) |
| Project root resolution | Nearest ancestor directory containing `.git`, else the current working directory (source-verified in `dsh-skill-filesystem` `findProjectRoot`). The project-level skill root is `<projectRoot>/.dsh/skills`, **not necessarily the current directory** |
| Skill root (active) | `<projectRoot>/.dsh/skills` — one level deep, `<root>/<skill-name>/SKILL.md`. Active root since run #4: `F:\DS 实验\.dsh\skills` (currently holds v0.1.6-candidate, tested as runs #7–#9) |
| DSH home | `C:\Users\lenovo\.dsh` |
| User-level skills dir | `C:\Users\lenovo\.dsh\skills` — does not exist currently |
| DSH desktop version | `0.2.0-rc.2` (`F:\DS\DeepSeek Harness.exe` FileVersion == `F:\DS\resources\runtime\primary-runtime\runtime.json` `desktopVersion`; note `F:\DS\runtime.json` does not exist) |
| Frontmatter fields parsed | `name`, `description`, `whenToUse`, `metadata`, `disable-model-invocation`, `user-invocable` (source-verified; `when_to_use` is NOT read and is silently dropped) |
| Native extension points (verified) | `tools/pre-execute`, `tools/post-execute` |
| Skill root precedence (source-verified; empirically confirmed 2026-10-16) | `project .dsh/skills` 100 < `project .agents/skills` 200 < runtime providers 250 < custom dirs 300 < `user ~/.dsh/skills` 400 < `user ~/.agents/skills` 500 < bundled 600; **lower rank wins** — the 2026-10-16 priority probe confirmed that a project-level copy shadows a same-named user-level copy. Nested `**/SKILL.md` is deliberately not discovered |
| App bundle | `F:\DS\resources\app.asar` (~121 MB); string search inside it requires byte-level scanning |

## Installation path

Use the **project-level** location — `<projectRoot>/.dsh/skills/local-solution-first\`, where `<projectRoot>` is the nearest ancestor directory containing `.git` (the current directory if there is none):

- `F:\DSSSSSSSSSS\.dsh\skills\local-solution-first\` — installed copy is **v0.1.5-candidate** (installed 2026-10-16, verified 16/16 byte-identical, run #7-validated; pre-install v0.1.2 backed up and verified at `F:\DSSSSSSSSSS\_installs\backup\local-solution-first-v0.1.2-before-v0.1.5-20261016-224527\`); dated snapshots of v0.1.0, v0.1.1 and v0.1.2 also live under `F:\DSSSSSSSSSS\_installs\backup\`.
- `F:\DS 实验\.dsh\skills\local-solution-first\` — currently **v0.1.5-candidate**, installed and tested as run #7 on 2026-10-16. History: v0.1.3-candidate was a *first* install (nothing was overwritten, so deleting the directory was then the complete rollback); it was exercised by runs #4 and #5, then overwritten by v0.1.4-candidate-revised (run #6; verified backup at `F:\DS 实验\_incoming\backup-before-priority-test\local-solution-first-v0.1.3\`), then overwritten by v0.1.5-candidate (run #7; verified backup at `F:\DS 实验\_incoming\backup-before-run7\local-solution-first\`, 16 files). The rollback route is **restore the matching dated backup**; the original archives remain available for a from-scratch reinstall.

**Do not overwrite blindly** — back the current copy up to a dated folder first, then extract and re-run the regression cases.

### Manual installation

1. Close or avoid running consequential tasks in the target workspace.
2. Back up any existing `local-solution-first` directory in the destination to a dated location. Verify the backup before deleting anything.
3. Extract the package so the result is exactly:
   `.dsh/skills/local-solution-first/SKILL.md`
4. Keep the `references` and `tests` directories alongside `SKILL.md`.
5. Open DSH and confirm the Skill is discoverable using the host's actual UI/mechanism. Do not infer successful loading merely from the file being present.
6. Run the manual cases in `tests/regression-cases.md`. Start with read-only tasks.
7. Follow `tests/regression-protocol.md` for evidence, privacy, execution, write-boundary, cleanup, and run-level release-gate requirements.
8. If the Skill is not visible or behaves unexpectedly, stop and inspect the actual host discovery path and logs rather than editing application internals.

User-level alternative, if you later want it available across workspaces:
`C:\Users\lenovo\.dsh\skills\local-solution-first\`

Prefer project-level testing first so the initial scope is limited. Precedence is now verified (2026-10-16 priority probe): a same-named project-level copy shadows the user-level copy, so installing both is safe (no surprise duplicate loading) but the user-level copy would be shadowed and cannot take priority. Keep a single install at the project level unless cross-workspace availability is specifically needed.

## Update and rollback

After a DSH update:
1. Record the new version and date. Distinguish the DSH desktop version from the embedded Electron version.
2. Recheck the discovery path and Skill metadata (frontmatter fields may change).
3. Run the regression cases.
4. If a key check fails, stop relying on affected behavior; keep the prior package and report the failure.
5. Restore the prior directory from the dated backup if needed, and verify the restore by re-running the cases.

Rollback is only a real rollback if the old version can be reinstalled, configuration can be restored, and data formats remain compatible. Verify the restore, do not assume it.

## Pending decisions (from the 2026-10-16 run)

1. **User-level installation** — whether to also install to `C:\Users\lenovo\.dsh\skills\` (requires workspace-external write permission). **Resolved by the 2026-10-16 priority probe** (record: `tests/regression-run-2026-10-16-priority-probe.md`): the same-name precedence is now empirically verified and matches the source-verified root precedence (lower wins) — project `.dsh/skills` 100 < project `.agents/skills` 200 < runtime 250 < custom 300 < user `.dsh/skills` 400 < user `.agents/skills` 500 < bundled 600. A user-level copy is **shadowed** by a same-named project-level copy, so a user-level install cannot be given "top priority" — the request that motivated this decision is not achievable as stated. Decision: install at the project level only; do not install a user-level copy for priority purposes (cross-workspace availability remains the only reason to consider it, with the shadowing caveat).
2. **README status line** — resolved in v0.1.1 (the "not installed / not tested" claim is removed; the installed + 12/12 PASS status is now stated). **Extended in v0.1.5:** the rule is now package-wide — every status statement is as-of-dated and superseded by an appended update, never a present-tense claim, because a present-tense "not installed / not tested" line becomes false the moment the package is installed and cannot be prevented from going stale (third recurrence, closed in v0.1.5 — see `CHANGELOG.md`).
3. **Generic skill validator** — design is in `references/validator-design.md`; implementation is intentionally deferred.
