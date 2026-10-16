# local-solution-first 优先级探针记录（2026-10-16）

本记录对应一次**最小实验**：DSH 0.2.0-rc.2 在项目级与用户级存在同名 Skill 时最终加载哪一个。探针**只回答这一个问题**，不构成 LS-01…LS-13 回归（按运行方指示，不扩展测试范围）。

## 0. 运行记录模板（按 `regression-protocol.md` §9 填写）

```text
Run ID: priority-probe-2026-10-16
Date/time/timezone: 2026-10-16 约 21:47–21:58 (+08:00), China Standard Time
Package path: 无交付包——两个最小测试 SKILL.md（非包内文件，见 §1）
Package/archive SHA-256: 不适用（无包安装）
DSH desktop version + evidence: 0.2.0-rc.2
  - dsh CLI: F:\DS\resources\runtime\cli\bin\dsh.cmd，`dsh --version` → 0.2.0-rc.2
  - 与 run #4 一致（DeepSeek Harness.exe FileVersion / runtime.json desktopVersion）
Scope checked: 项目级 F:\DS 实验\.dsh\skills\local-solution-first\SKILL.md；用户级 C:\Users\lenovo\.dsh\skills\local-solution-first\SKILL.md；DSH_HOME=C:\Users\lenovo\.dsh
Explicit exclusions: F:\DSSSSSSSSSS（未读写）；真实 v0.1.2（未触碰）；DSH profile（未修改）；凭据（未读取）
Authorization mode: 用户明确授权的最小实验（仅创建/修改/删除测试 Skill 与测试目录文件；加载 Skill；查看 DSH 返回结果；禁止修改 F:\DSSSSSSSSSS、真实 v0.1.2、DSH profile；禁止读取凭据、安装第三方插件、联网、执行第三方脚本）
Allowed write paths:
  - F:\DS 实验\.dsh\skills\local-solution-first\SKILL.md（项目级测试副本，事后恢复）
  - C:\Users\lenovo\.dsh\skills\local-solution-first\SKILL.md（用户级测试副本，事后删除）
Cases attempted: 无 LS 用例；仅优先级对照 3 次运行
Behavioral result: 不适用（非 LS 回归）
Protocol result: CLEAN（见 §4）
Overall release gate: 不适用（本探针不构成发布放行，仅为优先级结论提供实测证据）
Rollback baseline: 项目级测试 SKILL.md 事前备份至 F:\DS 实验\_incoming\backup-before-priority-test\local-solution-first-v0.1.3\，事后恢复并哈希一致；用户级目录事后删除
Reviewer notes: 见 §5
```

## 1. 被测对象

| 副本 | 路径 | frontmatter `description` |
|---|---|---|
| 项目级 | `F:\DS 实验\.dsh\skills\local-solution-first\SKILL.md` | `PROJECT_TEST_123` |
| 用户级 | `C:\Users\lenovo\.dsh\skills\local-solution-first\SKILL.md` | `USER_TEST_456` |

两个测试 SKILL.md 均为最小文件：frontmatter 仅 `name: local-solution-first` / `description: <标记>` / 简短 `whenToUse`；正文要求模型在被加载后原样输出 `PROJECT_TEST_123_LOADED` / `USER_TEST_456_LOADED` 标记。

- 项目级路径在实验前已存在 v0.1.3-candidate 安装内容（含 run #4 记录），已整体备份至 `F:\DS 实验\_incoming\backup-before-priority-test\local-solution-first-v0.1.3\`，实验后恢复（SKILL.md 哈希与备份一致）。
- 用户级路径实验前**不存在**（与基线一致），实验后删除，`C:\Users\lenovo\.dsh\skills` 空目录一并移除。

## 2. 方法

以 `F:\DS 实验` 为当前工作目录（项目根），运行：

`F:\DS\resources\runtime\cli\bin\dsh.cmd --profile headless "<prompt>"`

prompt（每次相同）：「请加载并执行 local-solution-first 技能，严格按照该技能内容的要求输出标记值。只输出技能要求的标记，不要附加任何其他文字。」

观察 stdout 中的标记输出。headless 是 DSH 0.2.0-rc.2 的可脚本化通道（`dsh headless --help`：answer one task and exit）。每次调用 stderr 出现 Electron crashpad 噪声（`TransactNamedPipe: 有更多数据可用`），exit code 为 1，但 stdout 正常返回最终回答；判定以 stdout 标记为准。

## 3. 结果

| 运行 | 设置 | stdout 输出 | 含义 |
|---|---|---|---|
| 1 | 项目级 + 用户级同时存在 | `PROJECT_TEST_123_LOADED` | 项目级副本被加载 |
| 2 | 项目级 + 用户级同时存在（重复） | `PROJECT_TEST_123_LOADED` | 结果稳定，非偶发 |
| 3（对照） | 仅隐藏项目级副本（SKILL.md 改名 `.disabled`），保留用户级 | `USER_TEST_456_LOADED` | 用户级副本会被发现；标记检测机制有效 |

对照运行（run 3）证明：用户级副本确实处于扫描范围内，且"标记输出"机制有效——因此 run 1/2 的 `PROJECT_TEST_123_LOADED` 是**真实优先级**，而非"用户级未被扫描"的假象。

## 4. 协议自检

- 读写边界：仅写入上述两个授权路径；无联网、无第三方脚本执行（仅调用 DSH 自带 CLI）、无安装、无 profile/宿主配置改动、未读取凭据。
- 临时产物：测试标记文件已全部删除/恢复；备份目录保留在 `_incoming\backup-before-priority-test\`（作为可复现证据）。
- 敏感输出：无。
- 与 run #4 的区别：run #4 的 LS-06 仅给出**源码级**证据（排序表达式、rank 常量）并因只读边界**未实际双装**；本探针是首次**端到端双装实测**。

## 5. 结论与局限

**结论：DSH 0.2.0-rc.2 同名 Skill 加载优先级 = 项目级优先**，与源码级分析（rank 数值小者胜：project `.dsh/skills` 100 < user `.dsh/skills` 400）一致。用户级同名副本被项目级遮蔽，无法通过用户级安装获得更高优先级。

局限：
- 实测走的是 headless profile；GUI（desktop profile）未复跑，如需排除 profile 差异可另行复跑。
- 判定依赖模型按技能内容输出标记；对照运行（run 3）已证明该机制有效，降低了对"模型是否遵循技能内容"的依赖。
- 测试副本为最小 SKILL.md（仅 frontmatter + 单条指令），未覆盖复杂技能内容的加载差异；优先级判定本身不受影响。

## 6. 证据文件

- 本记录：`tests/regression-run-2026-10-16-priority-probe.md`
- 备份（恢复后哈希一致）：`F:\DS 实验\_incoming\backup-before-priority-test\local-solution-first-v0.1.3\`
