# Local substitute decision matrix

Score candidates only after gathering evidence. A numeric score is a comparison aid, not a substitute for hard requirements.

## Hard gates

Reject or defer a candidate if any of these are true:
- It fails an essential acceptance criterion.
- Required host/API compatibility is unsupported or merely guessed.
- It introduces unacceptable security, privacy, licensing, or data-loss risk.
- Its required dependencies cannot be installed or maintained in the target environment.
- It cannot be safely tested or rolled back for a consequential change.

## Comparison table

| Criterion | Questions |
|---|---|
| Feature coverage | Which acceptance criteria does it satisfy? What is missing? |
| Evidence quality | Were files/source/declarations inspected? Was behavior tested? |
| Host compatibility | Is the exact host/version supported by direct evidence? |
| Dependencies | Which packages, tools, events, permissions, or services are required? |
| Failure impact | Is the component shared? What else could break if it fails? |
| Security/privacy | What files, credentials, network, and permissions can it access? |
| License | Are use, modification, and redistribution permitted? |
| Maintenance | Is it maintained? Are upgrades likely to break it? |
| Reversibility | Can the change be isolated and rolled back? |
| Total effort | Reuse/configuration/adaptation versus building and maintaining a new solution. |

## Decision order

1. Reuse as-is if it meets all hard requirements and risks are acceptable.
2. Configure if the capability exists but settings differ.
3. Adapt or extend if gaps are limited and the extension is maintainable.
4. Combine components if the integration contract is verified and complexity remains reasonable.
5. Build from scratch if existing candidates fail hard requirements or create greater risk/cost.

## Dependency blast radius

Before changing a shared component, record:
- Direct consumers and known dependents.
- Whether the dependency is global, profile-wide, or project-local.
- Whether versions can be isolated.
- What fails if the dependency is unavailable.
- How to test and roll back.

Do not call symlinks, junctions, or `link:` package mounting "isolation" unless the relevant dependency and runtime boundaries have been independently verified.
