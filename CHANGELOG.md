# Changelog

## v0.1.6 — 2026-10-17 (final release)

Built from the run-#9-validated v0.1.6-candidate content (see the entry below) plus the run #9 record, which is added to the package for provenance. **No file the host loads changed in this build** (`SKILL.md` byte-identical, SHA `F6E1E404…`).

- Run #9 (2026-10-16, `tests/regression-run-2026-10-16-v0.1.6-run9.md`) exercised this content end-to-end: **behavioral 13/13 PASS (mandatory subset 7/7); run protocol DEVIATION (D-T1 — runner-side prompt-transport truncation of the first LS-01 dispatch, corrected in place to single-line dispatch with marker-echo self-check; one non-leak output-hygiene finding); run-level release gate PASSED.** It also verified the v0.1.6 protocol changes in action (unified output hygiene, hard positive controls, per-case format accounting, provider-root search).
- Release flow per the freeze policy: install at `F:\DSSSSSSSSSS` (after verified backup) → final regression (run #10) → freeze with the package SHA-256 fixed and the pre-install backup kept as the rollback baseline. As of this entry's date (2026-10-17, package-build time), that install and run #10 had not yet happened; the installed-tree notes record them when they occur.
- Freeze policy: only three conditions open a next version (v0.1.7) — a DSH upgrade, an actually observed Skill behavior error, or an explicitly added new feature.

## v0.1.6-candidate — 2026-10-16 (protocol/checklist revision; **no behavioral change**)

Prepared after regression run #8 (`tests/regression-run-2026-10-16-v0.1.5-run8.md`). Run #8's verdict for the run-#7-updated v0.1.5-candidate content was: **behavioral 13/13 PASS (mandatory subset 7/7); run protocol DEVIATION (D9–D12); run-level release gate PASSED.**

This revision implements run #8 §7.2's four recommendations. It changes **no file the host loads** (`SKILL.md` byte-identical, SHA `F6E1E404…`):

- **Output hygiene is now a unified rule (`tests/regression-protocol.md` §4), not a per-case append.** D9 showed the hygiene constraint reached only LS-03, so LS-13 listed `.credentials.yaml`. The rule now applies to every probe, covers credential/config **file names** (not only contents), and records non-credential directory-name listings as hygiene findings.
- **A “not found” conclusion now requires a hard, checkable positive control (`tests/regression-protocol.md` §3).** The zero-hit and a same-method control that hits a known-present target must both be recorded; the independent reviewer verifies the control (§7). A zero-hit without one is an incomplete search (`BLOCKED`/`NOT TESTED`), never “no match” (closes D10's failure mode).
- **Format deviations are a counted, per-case protocol finding (`tests/regression-protocol.md` §2).** The exact probe-prompt text (including format constraints) must be recorded verbatim; every case exceeding the fixed four-line format is listed as a deviation, and the single optional `未能覆盖：` line is the only permitted extension (closes D12 / D7).
- **Provider/plugin skill roots (rank 250) added to `references/compatibility-checklist.md`.** Filesystem roots are no longer treated as the only discovery roots: packages under `<dshHome>/profiles/<profile>/node_modules` ship their own `SKILL.md` (run #8 measured 16 such files) and appear in the session catalog; “not installed” conclusions must search provider roots too (D10's archify case).

Scope note: `SKILL.md`, `references/decision-matrix.md`, `references/validator-design.md`, `tests/regression-cases.md` and all prior run records are unchanged from v0.1.5; the run #8 record is added to the package for provenance. The package as a whole has **not** been re-tested since run #8, so do not describe v0.1.6-candidate as a tested or released version.

**Status update (2026-10-16, appended at the time of writing):** as of this entry's date, v0.1.6-candidate has not been installed or regression-tested (stated as an as-of fact, per the rule above).

## v0.1.5-candidate — 2026-10-16 (status/documentation revision; **no behavioral change**)

Prepared after regression run #6 (`tests/regression-run-2026-10-16-v0.1.4-run6.md`). Run #6's verdict for the v0.1.4-candidate-revised content was: **behavioral 13/13 PASS (mandatory subset 7/7); run protocol DEVIATION (D6, D7); run-level release gate PASSED.**

This revision closes three documentation defects that run #6's review recorded (its `§7.2`). It changes **no file the host loads**:

- **`README-DSH.md` — status list completed.** Runs #5 and #6 were missing: the status stopped at run #4, so a reader of the README would conclude that the release gate was still NOT PASSED, when run #5 had already reached PASSED. Both entries are now present, each with all three parts of its verdict.
- **`README-DSH.md` — records list matched to reality.** The README named six run records while the package shipped four of them. The run #5 and run #6 records are now part of the package, so every record the README names actually ships.
- **`README-DSH.md` — rollback route corrected.** It still described the `F:\DS 实验` install as a first install whose complete rollback was deleting the directory. That stopped being true when v0.1.4-candidate-revised overwrote it; the real route is restoring the verified backup at `F:\DS 实验\_incoming\backup-before-priority-test\local-solution-first-v0.1.3\`.
- **Stale-status rule made package-wide (third recurrence).** The v0.1.4 entry below states that the package "has not yet been installed or regression-tested" in the present tense; that became false on install — exactly as the v0.1.3 entry did before it, and as the pre-v0.1.1 README status line did before that. The recurring part is the *wording*, not the fact, so the fix is a rule rather than another one-off edit: **a status statement carries its as-of date and is superseded by an appended update; present-tense "not installed / not tested" claims are not used.** `README-DSH.md` states this at the head of its status section, and this file follows it.

Scope note: this revision touches only `README-DSH.md`, `CHANGELOG.md` and the two added run records. `SKILL.md`, `references/*`, `tests/regression-cases.md` and `tests/regression-protocol.md` are byte-identical to the v0.1.4-candidate-revised files that run #6 exercised — no instruction the host loads changed and no case definition changed, so run #6's behavioral result carries over to that content. The package as a whole has **not** been re-tested since run #6, so do not describe v0.1.5-candidate as a tested or released version.

**Status update (2026-10-16, appended at the time of writing):** as of this entry's date, v0.1.5-candidate has not been installed or regression-tested (stated as an as-of fact, per the rule above).

**Status update (2026-10-16, appended after run #7):** v0.1.5-candidate *was* subsequently installed at `F:\DS 实验\.dsh\skills\local-solution-first\` (15/15 package files byte-identical after install, verified per file; all pre-existing run records left intact) and run as regression run #7 (`tests/regression-run-2026-10-16-v0.1.5-run7.md`): **behavioral 13/13 PASS (mandatory subset 7/7); run protocol DEVIATION (D8 — probe citation accuracy, found by independent review, verdict unaffected); run-level release gate PASSED.** The statement above is deliberately left as written, because it was accurate on the date it was written. This is the first version whose **own content** has passed the release gate end-to-end; it is ready to be frozen and installed at `F:\DSSSSSSSSSS\.dsh\skills\local-solution-first\` (with the v0.1.2 copy preserved as the rollback baseline).

## v0.1.4-candidate — 2026-10-16 (documentation + baseline revision; **not** a tested release)

Prepared from regression run #4 (`tests/regression-run-2026-10-16-v0.1.3.md`). Run #4's verdict for the v0.1.3-candidate content was: **behavioral 13/13 PASS; run protocol DEVIATION (D1–D4); run-level release gate NOT PASSED.** The gate failed on protocol deviations, not on behavior; do not quote the "13/13 PASS" half on its own (see `tests/regression-protocol.md` §1).

Every change below traces to a run #4 finding:

- **`SKILL.md` baseline — project root.** Added the source-verified project-root rule (nearest `.git` ancestor, else the current directory) and the full root-precedence order. The project-level skill root is no longer assumed to equal the current directory, and the "install user-level to get top priority" mistake (run #4 LS-06) is now documented as impossible rather than merely unadvisable.
- **`SKILL.md` baseline — archive reading.** The binary-archive caution now names the read-by-entry method (`dataOffset = 16 + headerJsonLength`) and warns that a whole-file scan can exhaust a task's budget.
- **`SKILL.md` baseline — dated facts.** The closing note now states that a dated baseline is evidence with an as-of date, not a standing claim: stale means re-verify, not discard (run #4 LS-07).
- **`SKILL.md` baseline — record list.** The provenance line now names all four run records instead of only runs #1–#2.
- **`references/compatibility-checklist.md`.** New section-B item: determine the project root before naming the skill root. New section-C item: do not accept a package's own documentation as evidence of a directory's contents — list the directory (run #4 recorded two probes that reported a version and a file inventory straight from a README the filesystem contradicted). The archive item now recommends reading by entry.
- **`README-DSH.md`.** Status section, records list, package-contents list, installation section, baseline table and pending decision #1 updated for the run #4 installation at `F:\DS 实验`.
- **Stale status wording.** Historical entries are quoted, not rewritten: the v0.1.3 line "not installed or tested" was accurate when written and is now superseded by a status update appended to that entry. New rule for this file — a status line carries its as-of date and is superseded by an appended update, never silently edited in place.

Scope note: this revision changes `SKILL.md` content, so unlike v0.1.3-candidate it is **not** documentation-only. It has not been installed or regression-tested.

**Status update (2026-10-16, appended after the priority probe):** after this package was prepared, a minimal priority probe empirically confirmed the root-precedence claim (lower rank wins). With same-named `local-solution-first` in both `F:\DS 实验\.dsh\skills` (project-level) and `C:\Users\lenovo\.dsh\skills` (user-level), DSH 0.2.0-rc.2 loaded the **project-level** copy — marker `PROJECT_TEST_123_LOADED` in two identical runs, and `USER_TEST_456_LOADED` in a control run with the project copy removed (proving the user-level copy is discovered and the detection mechanism works). This revision adds `tests/regression-run-2026-10-16-priority-probe.md` and marks the precedence as empirically confirmed in `SKILL.md`, `README-DSH.md` and `references/compatibility-checklist.md`. The behavioral LS-01 … LS-13 cases are unchanged; the revised package has not yet been installed or regression-tested.

**Status update (2026-10-16, appended after run #6):** this revised package *was* subsequently installed at `F:\DS 实验\.dsh\skills\local-solution-first\` — overwriting the run #4/#5 copy after a verified backup, with all 13 package files confirmed byte-identical immediately after the install, and with the pre-existing run #4 and run #5 records left intact — and run as regression run #6 (`tests/regression-run-2026-10-16-v0.1.4-run6.md`): **behavioral 13/13 PASS (mandatory subset 7/7); run protocol DEVIATION (D6, D7); run-level release gate PASSED.** The sentences above are deliberately left as written, because they were accurate on the date they were written.

## v0.1.3-candidate — 2026-10-16 (documentation-only candidate; not installed or tested)

Prepared after reviewing the uploaded v0.1.2 package. No behavioral instructions in `SKILL.md` were changed.

- Added `tests/regression-protocol.md` to separate behavioral case results from protocol compliance, define evidence/tool self-checks, set read/privacy/write boundaries, and require a run-level release gate.
- Updated `tests/regression-cases.md` to require the separate run-level protocol gate without changing the LS-01 … LS-13 case definitions.
- Updated `README-DSH.md` to list the protocol and require it during regression runs.
- This is a candidate package only. It has not been installed into DSH and no new regression run has been performed. Do not describe it as a tested or released version.
- **Status update (2026-10-16, appended after run #4):** this package *was* subsequently installed — first install at `F:\DS 实验\.dsh\skills\local-solution-first\`, 11/11 files byte-identical to the delivered archive — and run as regression run #4, recorded in `tests/regression-run-2026-10-16-v0.1.3.md`. The paragraph above is deliberately left as written, because it was accurate on the date it was written; the current status is recorded here rather than by editing it.

## 本地修订 — 2026-10-16（本地安装副本；非上游发行）

Documentation-consistency corrections applied to the installed copy after run #3 (`tests/regression-run-2026-10-16-v0.1.2.md`, 13/13 PASS). The behavioral content of v0.1.2 is unchanged; only stale or self-contradictory text was corrected.

- `references/validator-design.md` — the verified frontmatter field set now reads `whenToUse` (it still said `when_to_use`, contradicting the v0.1.2 fix); case count corrected to 13 (`LS-01 … LS-13`) in the goals, acceptance criteria and phasing sections; the harness comparison step now names all three records.
- `README-DSH.md` — status section lists run #3 (v0.1.2, 13/13 PASS) and all three records; package-contents list includes `tests/regression-run-2026-10-16-v0.1.2.md`; the installation section now says the installed copy is v0.1.2 (it said v0.1.1); the baseline table and pending decision #1 now carry the source-verified root precedence (`project .dsh/skills` 100 < `project .agents/skills` 200 < runtime 250 < custom 300 < `user .dsh/skills` 400 < `user .agents/skills` 500 < bundled 600; lower wins).
- Pre-change snapshot (verified byte-identical, 10 files): `F:\DSSSSSSSSSS\_installs\backup\local-solution-first-v0.1.2-20261016-011252\local-solution-first\`.

## v0.1.2 — 2026-10-16

Corrections based on run #2 (`tests/regression-run-2026-10-16-v0.1.1.md`, 13/13 PASS):

- **Frontmatter key reverted to `whenToUse` (regression fix).** Run #2 produced source-level evidence that the DSH parser reads `whenToUse` (yaml parse, `stringField(data, "whenToUse")`, no key normalization; byte-level `whenToUse` 52 hits vs `when_to_use` 0 hits in `app.asar`). The v0.1.1 change `whenToUse` → `when_to_use` was based on an incorrect claim in run #1 and silently dropped the field; v0.1.2 restores the host-correct key.
- **Corrected `runtime.json` path:** baseline and README now reference `F:\DS\resources\runtime\primary-runtime\runtime.json` (the file `F:\DS\runtime.json` does not exist).
- **Corrected the frontmatter description in the baseline** (parsed fields listed per source evidence) and added `tests/regression-run-2026-10-16-v0.1.1.md` to the package.

## v0.1.1 — 2026-10-16

Fixes and additions grounded in the v0.1.0 regression run (`tests/regression-run-2026-10-16.md`):

- **Frontmatter fix:** `whenToUse` → `when_to_use`. The 2026-10-16 run verified that DSH parses only `name` / `description` / `when_to_use` and silently drops unknown keys, so the v0.1.0 camelCase key was likely ignored.
- **Verified baseline written into SKILL.md:** replaces the purely historical caution with the facts verified on this machine on 2026-10-16 (version source of truth, one-level discovery, parsed frontmatter fields, real extension points, binary-archive scanning caveat).
- **Rollback baseline strengthened (LS-06 gap):** Section 5 now requires stating where the backup lives, how to restore it, and confirming the rollback route is real rather than equating "saved a copy" with rollback capability.
- **New regression case LS-13** added for the rollback-baseline requirement; added to the mandatory acceptance list.
- **Binary-archive note** added to `references/compatibility-checklist.md` (grep false negatives on `app.asar`).
- **README status corrected:** the "not installed / not end-to-end tested" claim (v0.1.0, line 55) is removed and replaced with the actual installed + 12/12 PASS status and the verified environment baseline.
- **`references/validator-design.md` added:** design for pending decision #3 (generic skill validator + automated case judging). Design only; implementation deliberately deferred.
- The evidence record `tests/regression-run-2026-10-16.md` is copied into the package for provenance.

## v0.1.0 — 2026-10-15/16

- Initial package from the design discussion: `SKILL.md`, `references/compatibility-checklist.md`, `references/decision-matrix.md`, `tests/regression-cases.md` (LS-01 … LS-12), `README-DSH.md`.
- Installed at `F:\DSSSSSSSSSS\.dsh\skills\local-solution-first\` and regression-tested on 2026-10-16 00:17 (12/12 PASS).
