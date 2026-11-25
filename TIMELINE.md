# 仓库时间线

> 本文由 [update-fork-timeline.mjs](scripts/update-fork-timeline.mjs) 根据本地 Git 引用生成。所有时间统一为北京时间（Asia/Shanghai，UTC+8）。

## 本次主线整理

2026-11-26：将完整定制线和仓库说明统一归入默认 `main`；保留原始提交日期与历史分支。下面记录此次归并所依据的历史快照，主线后续状态以远端 `main` 为准。

## 先分清三种日期

- **上游代码历史**：本分支继承的最早提交为 [`d7e04c6`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/d7e04c64143477eeca8adc87cdd63333ca9e4bee)，提交者日期为 **2026-10-28 12:15:11**。因此 Git 和旧版本日志中出现 10 月记录属于上游历史。
- **本仓库创建**：GitHub 仓库 API 的 `created_at` 为 **2026-11-24 15:57:21**。复制或 fork 仓库会保留更早的提交，不会把原提交日期改成创建当天。
- **定制功能线快照**：`origin/remove-upstream-links` 指向 [`59624db`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/59624db7f44ce0798bb4d8b4fcf340231dad345f)，提交者日期为 **2026-11-25 23:45:00**。提交时间与实际 push 时间是两类记录，本文不把它们互相替代。

Git 作者日期记录原作者提交的时间，提交者日期记录该提交对象最近形成的时间；两者都由提交记录提供。时间线按父子关系展开，日期照实显示，不重写历史时间。

## 归并前分支与版本快照

| 引用 | 提交 | 提交者时间 | 包版本 |
|---|---|---|---|
| `main（归并前）` | [`fbecffa`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/fbecffae4865d83986e33b970d53cd19633b9cce) | 2026-11-23 14:50:20 | `1.9.1-dev.1` |
| `local/anthropic-icon-1.9.0（图标基线）` | [`c3b91f9`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/c3b91f90c9a90226b7ba129c3d39d337eb7605a3) | 2026-11-24 15:50:22 | `1.9.0` |
| `remove-upstream-links（定制功能线）` | [`59624db`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/59624db7f44ce0798bb4d8b4fcf340231dad345f) | 2026-11-25 23:45:00 | `1.9.0` |

定制开发起点是上游 `v1.9.0`，对应 [`754e121`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/754e121dfbd6ebddb0d514fe3105b6a6b1398c46)（2026-11-22 21:41:33）。归并前 `fbecffae4865d83986e33b970d53cd19633b9cce` 独有 2 个提交，`origin/remove-upstream-links` 独有 12 个提交。分支有分叉，查看版本号大小不足以判断是否包含本仓库的定制功能。

## 定制开发时间线

以下从上游 `v1.9.0` 之后开始，按 Git 提交父子关系列出定制分支上的全部 12 个提交。作者日期与提交者日期分别列出。

| 作者时间 | 提交者时间 | 提交 | 变化 |
|---|---|---|---|
| 2026-11-24 15:48:55 | 2026-11-24 15:50:22 | [`c3b91f9`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/c3b91f90c9a90226b7ba129c3d39d337eb7605a3) | feat(icon): swap the composer enhance mark to the Claude starburst |
| 2026-11-24 16:59:21 | 2026-11-24 16:59:21 | [`0ab9d03`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/0ab9d03c53930f0f2a394e43a54bdb6e9d3d42b1) | fix(client): never let the whole-draft write drop composer attachments |
| 2026-11-24 17:40:00 | 2026-11-24 17:40:00 | [`525c93c`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/525c93cbe94a0ea458997296b2af407336ed2321) | fix: 不写回「无需改动」的结果，并如实统计被跳过的图片 |
| 2026-11-24 17:58:40 | 2026-11-24 17:58:40 | [`2a54c06`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/2a54c0627e6b3294be4cb5e3cc0738699ab8ba59) | fix(client): 给增强请求加 120 秒看门狗，避免 busy 永久卡死 |
| 2026-11-24 18:30:13 | 2026-11-24 18:30:13 | [`9f885f3`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/9f885f314b3a2a9bb086831a6d6759f3ec3951d2) | feat(client): 失败时写客户端日志，并在设置页提供可查看的记录 |
| 2026-11-24 19:42:12 | 2026-11-24 19:42:12 | [`b65f069`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/b65f0696bfb8d393b69923343949f4e0dde5e75f) | fix(client): 去掉超时重复日志，重试图标提示说明可重新增强 |
| 2026-11-24 20:10:50 | 2026-11-24 20:10:50 | [`f92b9ed`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/f92b9ed3deca231d9c0a2d4cb9dd8be6df2cfca2) | fix(client): 收紧失败提示宽度，避免红字溢出到界面上方 |
| 2026-11-24 20:31:38 | 2026-11-24 20:31:38 | [`71e6c35`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/71e6c35716bb669a9a73c6896cf4d33d32b9af68) | fix(client): 去掉座位的 overflow:hidden，避免把上浮状态行整条裁掉 |
| 2026-11-24 20:43:23 | 2026-11-24 20:43:23 | [`aa83c80`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/aa83c80db992ccc92f12345cf495380a51bfc46d) | fix(client): 提示改为复用图标悬停逻辑，消除输入后的位置漂移 |
| 2026-11-25 18:00:22 | 2026-11-25 18:00:22 | [`b6fe608`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/b6fe608640cb932067ce08e0532c27135efa0400) | chore(local): 提交本地图标与提示改动（本次删除前基线） |
| 2026-11-25 23:20:00 | 2026-11-25 23:20:00 | [`b8d10e2`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/b8d10e2d06d80cc26ab2d2a63c3931b238a2dab5) | feat(settings)!: 移除指向原仓库的 Star、issue 与更新日志入口 |
| 2026-11-25 23:45:00 | 2026-11-25 23:45:00 | [`59624db`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/59624db7f44ce0798bb4d8b4fcf340231dad345f) | docs: 同步 fork 后的设置页说明并清理残留 |

## 继承的上游版本标签

这些标签继承自上游，不代表本 fork 在相同日期发布过对应版本。标签日期、标签所指提交的日期、GitHub Release 的发布日期分别属于不同记录；轻量标签本身没有创建时间。

| 标签 | 标签创建时间（若有记录） | 所指提交的提交者时间 | 提交 |
|---|---|---|---|
| `v1.0.0` | 2026-10-28 14:34:17 | 2026-10-28 14:31:16 | [`46f4e3b`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/46f4e3b9d27d63c7ccd3ef52622e86d181281d31) |
| `v1.0.2` | 2026-10-28 15:08:26 | 2026-10-28 15:07:57 | [`4272e08`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/4272e08f6be293c82ca60005e241d9d9d9df7a55) |
| `v1.0.3` | 2026-10-28 18:30:52 | 2026-10-28 18:30:52 | [`4cd0bdf`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/4cd0bdfcc83f0c596b6d41c0f566b2dee8fc1f0c) |
| `v1.1.0` | 2026-10-28 19:44:33 | 2026-10-28 19:44:33 | [`cc8efa0`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/cc8efa06599cb730190f4694f8e4a5a9b8f14449) |
| `v1.2.0` | 2026-10-28 20:42:44 | 2026-10-28 20:42:43 | [`249aea1`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/249aea16fd24e606c19583ae9370af39a9f02a78) |
| `v1.2.1` | 2026-10-28 21:14:40 | 2026-10-28 21:14:39 | [`dbec34d`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/dbec34d22678babae55b5ed098e3becae966027f) |
| `v1.4.1` | 2026-10-28 23:17:20 | 2026-10-28 23:17:20 | [`5f080c6`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/5f080c6b1ac5e5609894067e45c340c2484014a5) |
| `v1.5.1` | 2026-10-29 08:50:43 | 2026-10-29 08:50:43 | [`b3ab254`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/b3ab2544754739d7d59cb13ca9dce06f4d556deb) |
| `v1.6.0` | 轻量标签，未记录创建时间 | 2026-10-30 21:57:39 | [`930c5dc`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/930c5dcf06c3949bb628587a465ba63492b8daea) |
| `v1.6.1` | 轻量标签，未记录创建时间 | 2026-10-30 22:18:18 | [`99090b9`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/99090b92feb53743c3ca3becd58604a00e7e5b1d) |
| `v1.6.2` | 轻量标签，未记录创建时间 | 2026-10-31 17:08:16 | [`943820b`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/943820b4ffd4fb17c0d16cc5dd3a6d8e8d1cfcbd) |
| `v1.6.3` | 轻量标签，未记录创建时间 | 2026-11-02 17:10:12 | [`9abebf8`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/9abebf87fa4e91828f5fa16f803bbdc7cd936100) |
| `v1.7.0` | 轻量标签，未记录创建时间 | 2026-11-05 10:00:13 | [`4c5b9aa`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/4c5b9aa9043683207f7782c22e76744b8bd9e654) |
| `v1.7.1` | 轻量标签，未记录创建时间 | 2026-11-06 10:32:18 | [`c5459d9`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/c5459d99d08ea9de6e865be471e922131d308715) |
| `v1.8.3` | 轻量标签，未记录创建时间 | 2026-11-13 14:00:55 | [`bf1424b`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/bf1424b47df50a79f68984c5d131003ac75742ba) |
| `v1.8.4` | 2026-11-19 10:58:53 | 2026-11-19 10:58:40 | [`5486f0f`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/5486f0f7c8497eb8c240ed660f9dba76115de614) |
| `v1.9.0` | 2026-11-22 21:41:34 | 2026-11-22 21:41:33 | [`754e121`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/754e121dfbd6ebddb0d514fe3105b6a6b1398c46) |
| `v1.9.1-dev.1` | 2026-11-23 14:50:20 | 2026-11-23 14:50:20 | [`fbecffa`](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/commit/fbecffae4865d83986e33b970d53cd19633b9cce) |

原版本功能说明保留在 [CHANGELOG.md](CHANGELOG.md)。当前定制沿用上游包名与版本号，识别具体构建时同时记录来源仓库、分支和完整提交哈希。版本与安装规则见 [VERSIONING.md](VERSIONING.md)。

## 如何刷新本文

```sh
git fetch origin
node scripts/update-fork-timeline.mjs
# 更换定制分支时：
TIMELINE_CUSTOM_REF=origin/remove-upstream-links node scripts/update-fork-timeline.mjs
```

证据入口：[仓库元数据 API](https://api.github.com/repos/langkeshuo-ai/dsh-prompt-rewriter)、[main](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/tree/main)、[图标基线](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/tree/local/anthropic-icon-1.9.0)、[定制分支](https://github.com/langkeshuo-ai/dsh-prompt-rewriter/tree/remove-upstream-links)。生成器不执行 fetch、不修改 refs、不创建标签、不推送。
