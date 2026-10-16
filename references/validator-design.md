# Generic skill validator — design (pending decision #3)

Status: **design only, not implemented.** This document answers the open question from the 2026-10-16 regression run (LS-09 probe): the current validation landscape is two heterogeneous halves — `goutoujunshi\scripts\validate_skill.py` is hard-coded to that one package, while `local-solution-first` relies on a manual checklist — and nothing integrates them.

## 1. Problem statement

- `validate_skill.py` hard-codes `ROOT`, the package name, reference filenames, behavior boundaries, and `agents/openai.yaml` requirements. It cannot validate any other package and produces false FAILs for them.
- The manual checklist (`compatibility-checklist.md` + `regression-cases.md`) is generic but requires a human (or an isolated probe agent) to judge each case. It does not scale and is expensive to rerun.
- Result: skill validation is either package-specific or labor-intensive, never both generic and cheap.

## 2. Goals

A generic validator for DSH skills that:
- validates any skill package against (a) generic structural rules and (b) per-package declarative invariants;
- reproduces the 13 LS regression cases (LS-01 … LS-13) with the same judgments as the 2026-10-16 runs;
- marks every check PASS / FAIL / BLOCKED / NOT TESTED with attached evidence, never PASS on expectation alone;
- is read-only and never executes skill code or untrusted scripts;
- detects the class of bug found in LS-05 (unverifiable identifiers reported as real).

## 3. Proposed architecture

Three parts, each independently testable:

**A. Core validator (generic, read-only)**
- Frontmatter parse against the verified field set (`name`, `description`, `whenToUse` + strict boolean switches); report unknown/dropped keys (catches the v0.1.1 `when_to_use` regression, in which the host-read key was silently dropped).
- Layout check: `<root>/<skill-name>/SKILL.md` at exactly one level (verified discovery rule).
- Required-file presence: `references/`, `tests/`, README where declared.
- Markdown/link integrity and evidence-level markers.
- Binary-archive note: when a target file is a large binary (e.g., `app.asar`), perform byte-level scanning, not string-search tools — and read by entry (`dataOffset = 16 + headerJsonLength`) rather than scanning the whole file.

**B. Declarative per-package config (YAML)**
- Package name, allowed paths, required references, behavior boundaries, expected tool names, mandatory regression cases.
- The `goutoujunshi` invariants currently hard-coded in `validate_skill.py` become data in this config, so the script itself stays generic.

**C. Host-level test harness**
- Case registry: declarative scenarios (the LS-01 … LS-13 set) with expected behaviors.
- Judgment: deterministic assertions where possible; LLM judgment with attached evidence where behavior must be interpreted; every judgment carries the evidence string.
- Output: one standardized report (same status vocabulary as `compatibility-checklist.md`).

## 4. Acceptance criteria

- Runs against the installed packages and reproduces the recorded judgments for LS-01 … LS-13, including the documented gaps and the LS-05 identifier defect.
- Catches a deliberately injected unknown-frontmatter-key package.
- Never executes skill scripts; never writes outside an explicitly allowed report path.
- Completes within a bounded time/budget, with clear stop conditions.

## 5. Risks

- **Parser drift:** DSH frontmatter parsing may change across versions; the validator must re-verify the field set rather than assume it.
- **False negatives:** string-search on binary archives must be byte-level (learned on `app.asar`).
- **Judgment quality:** deterministic rules cover structure; behavioral cases still need a judge (human or LLM with evidence). Do not label INFERRED as PASS.
- **Maintenance cost:** every new package adds config; keep config declarative and small.

## 6. Phasing (recommended)

1. Freeze the case specs (LS-01 … LS-13) as declarative data.
2. Build the core validator (read-only, generic) and dry-run it against the current packages.
3. Add the declarative config layer, migrate the `goutoujunshi` invariants into it.
4. Wire the harness and compare its output against `tests/regression-run-2026-10-16.md` (run #1), `tests/regression-run-2026-10-16-v0.1.1.md` (run #2), `tests/regression-run-2026-10-16-v0.1.2.md` (run #3) and `tests/regression-run-2026-10-16-v0.1.3.md` (run #4). Run #4 is the first record whose verdict is three-part (behavioral / protocol / release gate), so it is the harness's true comparison target.
5. Only after 1–4 pass, decide whether to integrate into the skill workflow.

Do not start implementation while the base skill workflow is still being validated in real use. Automation is only worth it once the manual process is stable.
