# 定制版的版本、分支与发布约定

本文件说明 `langkeshuo-ai/dsh-prompt-rewriter` 的当前维护方式。上游发布记录保留在 [CHANGELOG.md](CHANGELOG.md)，完整提交时间线见 [TIMELINE.md](TIMELINE.md)。

## 如何识别当前版本

本次整理不发布 npm 包、不创建版本标签。归并后的默认 `main` 沿用原主线的 `1.9.1-dev.1`；历史定制分支的版本为 `1.9.0`。最新功能基线是 `b8d10e2d06d80cc26ab2d2a63c3931b238a2dab5`，后续 `59624db7f44ce0798bb4d8b4fcf340231dad345f` 同步文档和测试。本轮再整理主线、来源与时间线。实际包版本见 [package.json](package.json)。

每次交接记录四项：来源仓库、分支、完整提交哈希、包版本。只比较 `1.9.0` 和 `1.9.1-dev.1` 会误判：整理前 `main` 的版本数字较大，却缺少定制提交；本次已归并定制线，仍按来源与提交哈希定位具体构建。

```sh
git remote get-url origin
git branch --show-current
git log -1 --format='%H %aI %cI %s'
node -p "require('./package.json').version"
```

## 分支职责与整理范围

- `main`：默认分支、完整定制主线与新安装入口。
- `local/anthropic-icon-1.9.0`：最初的图标定制基线，已包含在后续定制分支中。
- `remove-upstream-links`：本轮归并前的定制功能线，包含图标、附件保护、超时恢复、错误记录和设置入口清理，保留作历史参照。

主线归并保留上游与定制提交历史、真实日期和现有分支，不移动旧标签、不强制推送、不发布 npm 包。归并前的分支证据快照见 [TIMELINE.md](TIMELINE.md)，实际主线提交以 `git log` 与远端为准。

## 日期怎么记

仓库文档统一使用北京时间（Asia/Shanghai，UTC+8）。作者日期、提交者日期、标签日期、仓库创建日期、push 时间和本机安装时间分别标注。继承的 10 月提交保留原日期；11 月创建的 fork 不需要把它们改到 11 月。

## 安装与更新

本机 DSH 的 desktop profile 将插件声明为指向独立源码目录的 `link:` 依赖，bundle 名称保持 `dsh-prompt-rewriter`。链接目录需要安装自己的运行时依赖；更新时检查 profile 声明与 node_modules 实际落点一致。

```sh
npm install --ignore-scripts --omit=dev --legacy-peer-deps --package-lock=false
node --check index.js
node --check client.js
npm test
```

上述四组现有测试不需要发起真实模型调用。新机器还须根据实际 DSH 版本核验宿主兼容性。CLI 如果提示 desktop profile 由 Electron 应用专管，使用桌面应用的管理路径；已安装的源码链接可按对应分支快进更新。宿主或规则改动之后重启 DSH。

## 与输入栏主题组合使用

同时启用 `dsh-claude-style` 和独立的右侧输入栏控件时，使用主题 `0.22.2` 或更新版本。`0.22.1` 的最小宽度计算未递归 `composer-controls` 与部分宿主模型容器，开启右侧控件后可能按整个容器当前宽度提前换行；A2UI 的左侧控件会进一步占用同行空间。

已核对正式包 `0.22.2` 包含容器递归与对应 flex 规则的修复，参见 [上游修复 041e5607](https://github.com/Nwflower/dsh-claude-style/commit/041e5607ba5e862f3ebbe96442a8e1c4e4335f93)。此类组合问题先核对主题版本与实际加载的前端资源，不以提示词插件包版本推断是否回退，也不直接给整条工具栏强制禁止换行。窄屏确实放不下时仍应允许正常换行。

主题升级后刷新窗口或完整重启 DSH，再在原会话核验。离线 DOM fixture 和源码比对属于独立验证，应与用户正在运行的窗口实测分别记录。

## 以后发布时

- 版本号使用合法 SemVer，避免四段式数字。
- 开发改动先记入 [CHANGELOG.md](CHANGELOG.md) 的 `[Unreleased]`，同时列出中文与英文。
- 正式发版时再确定属于本 fork 的版本号、日期、标签和安装包，并核对包的来源与哈希。继承的上游标签不当作本 fork 新发的版本。
- 代码提交、推送、合并、打标签、创建 GitHub Release 和 npm 发布分别执行；不因整理文档自动触发后续步骤。
- 核验时本 fork 的 GitHub Releases 列表为空，README 不应引导读者去上游 Release 下载本定制版本。

保留上游作者署名、[LICENSE](LICENSE) 与 [NOTICE.md](NOTICE.md)。包名与插件标识沿用原值，以兼容已有 profile。
