# local-solution-first

一个给 **DeepSeek Harness (DSH)** 用的 Skill：在动手实现、移植、选依赖、排查工具之前，
**先在本机检索有没有现成的、可复用的东西**，并且用证据说话 —— 证据不足就不强行复用，
而是明确写出"为什么这次不该复用"。

> 技能本身是**行为规程**，不是工具：不新增任何权限、不注册任何 MCP 工具，
> 只约束 Agent 的分析顺序和报告结构。仓库另外带一层很薄的插件包装，
> 唯一作用是把这个技能注册进 DSH（见下方「安装」）。

---

## 它解决什么问题

Agent 最常见的浪费是"重新发明已经有轮子的车"：本机已经装着同类插件、Skill、脚本、
依赖或源码，Agent 却直接开始写新实现。这个 Skill 要求把顺序倒过来：

1. **先定检索范围**，按分层从"最可能被复用"的位置往外搜；
2. **再逐个候选取证**，用可核对的事实（路径、版本、能力、代价）而不是印象；
3. **给出建议**，包括"复用 / 部分复用 / 不复用 / 需要更多信息"四种明确结论；
4. **写清安全与验证**，以及这次结论的**证据边界**（哪些地方没查、为什么没查）。

触发场景：评估一个仓库能不能直接用、把外部项目移植进来、实现新功能前选方案、
挑选依赖、排查本机已有工具、以及"复用它还是自己写"的这类抉择。

## 安装

### 方式 A：作为 DSH 插件安装

本仓库同时是一个 DSH 组合包（bundle）。三种装法任选：

```powershell
dsh plugin add github:shenhe3939-debug/local-solution-first
```

- 或在桌面端 Web 侧边栏的**插件**页安装并启用它；
- 或让 Agent 用 `plugin_manager` 工具安装（该操作需要 `danger-full-access` 或逐次批准）。
组合包在 profile 依赖里的名字就是 `@shenhe3939-debug/local-solution-first`：所有 bundle 都按
**包名**记录在 `dsh.profile.bundles` 里，`cordis.patch.yml` 中 `insert` 的 `name` 必须与它一致
才会被装载（该字段是宿主 import 的模块指示符，不能写成相对路径）；
改配置后启用 HMR 的 profile 立即生效，否则等重启。

启用后，`cordis.patch.yml` 会把 `lib/index.mjs` 挂进组合，由它在 `ctx.skills.register`
上注册本技能（`source: bundled`，资源基目录指向包根，所以 `references/`、`tests/`
照常可被引用）。技能正文由 `scripts/build-skill-content.mjs` 从 `SKILL.md` 生成到
`lib/skill-content.mjs`，与从目录发现的同名技能**逐字节相同**（都是去掉 frontmatter
再 trim 的正文）——改了 `SKILL.md` 记得重跑一次生成脚本。包版本号跟随它包装的技能版本。

### 方式 B：作为普通 skill 目录

DSH 的 Skill 发现规则（源码与实测确认，DSH 0.2.0-rc.2）：

- 只发现**一层**：`<root>/<skill-name>/SKILL.md`，`**/SKILL.md` 这种嵌套路径**不会**被发现；
- 多个根目录**优先级数字小的赢**：
  `项目 .dsh/skills` 100 < `项目 .agents/skills` 200 < `运行时 provider` 250 <
  `自定义目录` 300 < `用户 .dsh/skills` 400 < `用户 .agents/skills` 500 < `内置` 600。

所以**同名副本只有优先级高的那个生效**，用户级副本会被项目级副本遮蔽。

克隆到任一 skill 根目录下、目录名保持 `local-solution-first` 即可：

```powershell
git clone https://github.com/shenhe3939-debug/local-solution-first.git `
  "$env:USERPROFILE\.dsh\skills\local-solution-first"
```

也可以直接用随仓库附带的冻结发行包 `dist/local-solution-first-dsh-v0.1.6.zip`
（解压后是 `local-solution-first/` 目录，放进任一 skill 根目录即可）：

- 发行页：https://github.com/shenhe3939-debug/local-solution-first/releases/tag/v0.1.6
- 直链（钉在 tag 上，内容不随 `main` 变动）：
  https://raw.githubusercontent.com/shenhe3939-debug/local-solution-first/v0.1.6/dist/local-solution-first-dsh-v0.1.6.zip

## 仓库内容

| 路径 | 作用 |
| --- | --- |
| `SKILL.md` | Skill 本体：触发条件、10 条硬规则、工作流、报告结构、DSH 环境事实 |
| `package.json` | DSH 组合包清单：`dsh.bundle.patch` 指向 `cordis.patch.yml` |
| `cordis.patch.yml` | 组合包补丁：把插件挂进组合（`insert` 一行） |
| `lib/index.mjs` | 插件入口：在 `ctx.skills.register` 上注册本技能 |
| `lib/skill-content.mjs` | 由 `SKILL.md` 生成的技能正文（构建产物，勿手改） |
| `scripts/build-skill-content.mjs` | 生成上一行：拆 frontmatter、trim 正文、写入 SHA-256 |
| `scripts/verify-package.mjs` | 打包自检：在 clone 里核对冻结指纹、bundle 清单、补丁形状、注册载荷与资源可解析性（无外部依赖） |
| `references/compatibility-checklist.md` | 复用前的能力/兼容性核对清单（含 provider/plugin skill 根 250 档） |
| `references/decision-matrix.md` | "复用 / 部分复用 / 不复用"的判定矩阵 |
| `references/validator-design.md` | 验证器设计：怎样算查到了、怎样算没查 |
| `tests/regression-protocol.md` | 回归协议：探针格式、输出卫生、硬性阳性对照的要求 |
| `tests/regression-cases.md` | 13 个用例 LS-01 … LS-13 |
| `tests/regression-run-*.md` | 历次回归记录（run #1 … run #9，另有一次 priority-probe，均 2026-10-16） |
| `CHANGELOG.md` | 版本沿革与冻结策略 |
| `LICENSE` | MIT 许可证 |
| `dist/local-solution-first-dsh-v0.1.6.zip` | v0.1.6 冻结发行包 |

## 版本与验证状态（as-of 记录）

- **当前冻结版本：v0.1.6（2026-10-17）**，`SKILL.md` 自 v0.1.4 起逐字节未变
  （SHA-256 `F6E1E40495998A07DF0F32A6EDC0B81AB07CABEB6148D974A8A456380D1A915D`）。
- **发行包指纹**：`dist/local-solution-first-dsh-v0.1.6.zip`，159,602 字节，
  SHA-256 `1360F7DFC5C014B46D170CDDD4D922D543CB0A90D64101423E4CFE272CC140E6`。
  本仓库根目录下的包文件就是该 zip 解压出来的逐字节内容。
- **最终回归 run #10（2026-10-17）**：behavioral **13/13 PASS**（mandatory subset 7/7）；
  run protocol **COMPLIANT**（1 处 deviation，D-T1 未复现）；run-level release gate **PASSED**。
  该记录产生于安装期、留在本地安装目录，**不在本冻结包内**（包内保留到 run #9）。
- **冻结策略**：只有三种情形开 v0.1.7 —— DSH 升级、实际观察到 Skill 行为错误、
  或明确新增功能。

> 本项目的记录纪律：状态一律写成**带日期的 as-of 证据**，不用现在时断言，
> 也不回改历史条目；新条目覆盖旧条目。`tests/` 里的历史记录保持原样。

### 仓库侧的字节一致性与打包自检

- **`.gitattributes` 固定 LF**：Git for Windows 默认 `core.autocrlf=true`。没有这条规则时，
  clone 出来的 `SKILL.md` 会被改写成 CRLF（12,971 B，SHA-256 `85add11f…`），与冻结指纹不符；
  现在 `* text=auto eol=lf`（`*.zip` 视作二进制），任何平台的 checkout 都与冻结包逐字节相同。
- **打包自检**：在本仓库内执行 `node scripts/verify-package.mjs`（除 Node 本身无任何依赖），
  逐项核对 —— `SKILL.md` 与 `dist/*.zip` 命中冻结指纹；`package.json` 声明 `dsh.bundle.patch`，
  补丁文件是约定形状（`insert.name` 等于包名、不是相对路径）；`files[]` 里每个路径都存在；
  `lib/index.mjs` 注册且只注册一个技能（名字合法、`source: bundled`、正文与 `SKILL.md` 去掉
  frontmatter 后逐字节相同、资源基目录就是包根），且没有技能注册表时只是空操作、不抛错。
- **宿主侧实测（2026-10-17）**：把 DSH 自带实现中的 `@deepseek-ai/dsh-skill` 真实 `SkillRegistry`
  挂到真实 cordis 组合上，再按 bundle 的装载方式挂本插件 —— **14/14 通过**：技能出现在宿主目录、
  按名可加载、正文与 `SKILL.md` 正文一致、`provider: runtime`、渲染出
  `<skill_content name="local-solution-first">`，同名重复注册只是空操作、不会顶掉已生效的那个。
- **构建可复现**：在 clone 里重跑 `node scripts/build-skill-content.mjs`，`git status` 干净。

## 许可证

MIT，全文见仓库根目录的 [`LICENSE`](LICENSE)。

Copyright (c) 2026 shenhe3939-debug
