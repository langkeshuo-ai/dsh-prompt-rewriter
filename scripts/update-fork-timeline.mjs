// 生成分叉仓库的真实提交时间线；仅写 TIMELINE.md，不修改 Git 历史。
// 运行：git fetch origin && node scripts/update-fork-timeline.mjs
// 依赖：Node.js >= 22、Git；可用 TIMELINE_CUSTOM_REF 指定定制分支。
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
const OUTPUT = fileURLToPath(new URL('../TIMELINE.md', import.meta.url));
const REPO = 'langkeshuo-ai/dsh-prompt-rewriter';
const CUSTOM_REF = process.env.TIMELINE_CUSTOM_REF || 'origin/remove-upstream-links';
// 固定归并前主线，保留本次整理所依据的历史分叉证据。
const MAIN_REF = process.env.TIMELINE_MAIN_REF || 'fbecffae4865d83986e33b970d53cd19633b9cce';
const ICON_REF = 'origin/local/anthropic-icon-1.9.0';
const BASE_REF = 'v1.9.0';
const TIME_ZONE = 'Asia/Shanghai';
// GitHub 仓库 API 核验的创建时间；这不是 Git 中任一提交的时间。
const FORK_CREATED_AT = '2026-11-24T07:57:21Z';
const REPO_URL = `https://github.com/${REPO}`;

function git(...args) {
	return execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 }).trim();
}
function localTime(value) {
	const fields = Object.fromEntries(new Intl.DateTimeFormat('en-CA', {
		timeZone: TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
		hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23',
	}).formatToParts(new Date(value)).map(({ type, value }) => [type, value]));
	return `${fields.year}-${fields.month}-${fields.day} ${fields.hour}:${fields.minute}:${fields.second}`;
}
function cell(value) {
	return String(value).replace(/\|/g, '\\|').replace(/[\r\n]/g, ' ');
}
function commitLink(sha) {
	return '[`' + sha.slice(0, 7) + '`](' + REPO_URL + '/commit/' + sha + ')';
}
function readCommit(ref) {
	const [sha, authorDate, committerDate, ...subject] = git('show', '-s', '--format=%H%x09%aI%x09%cI%x09%s', `${ref}^{commit}`).split('\t');
	return { sha, authorDate, committerDate, subject: subject.join('\t') };
}
function branchRow(ref, label = ref) {
	const commit = readCommit(ref);
	const manifest = JSON.parse(git('show', `${ref}:package.json`));
	return `| \`${label}\` | ${commitLink(commit.sha)} | ${localTime(commit.committerDate)} | \`${manifest.version}\` |`;
}

const base = readCommit(BASE_REF);
const custom = readCommit(CUSTOM_REF);
const [mainOnly, customOnly] = git('rev-list', '--left-right', '--count', `${MAIN_REF}...${CUSTOM_REF}`).split(/\s+/);
const oldest = readCommit(git('rev-list', '--max-parents=0', CUSTOM_REF).split('\n')[0]);
const localCommits = git('rev-list', '--reverse', `${base.sha}..${CUSTOM_REF}`).split('\n').filter(Boolean).map(readCommit);
const tags = git('tag', '--sort=version:refname').split('\n').filter(Boolean);
const tagRows = tags.map((tag) => {
	const commit = readCommit(`${tag}^{commit}`);
	const taggerDate = git('for-each-ref', '--format=%(taggerdate:iso-strict)', `refs/tags/${tag}`);
	return `| \`${tag}\` | ${taggerDate ? localTime(taggerDate) : '轻量标签，未记录创建时间'} | ${localTime(commit.committerDate)} | ${commitLink(commit.sha)} |`;
});

const text = [
	'# 仓库时间线',
	'',
	'> 本文由 [update-fork-timeline.mjs](scripts/update-fork-timeline.mjs) 根据本地 Git 引用生成。所有时间统一为北京时间（Asia/Shanghai，UTC+8）。',
	'',
	'## 本次主线整理',
	'',
	'2026-11-26：将完整定制线和仓库说明统一归入默认 `main`；保留原始提交日期与历史分支。下面记录此次归并所依据的历史快照，主线后续状态以远端 `main` 为准。',
	'',
	'## 先分清三种日期',
	'',
	`- **上游代码历史**：本分支继承的最早提交为 ${commitLink(oldest.sha)}，提交者日期为 **${localTime(oldest.committerDate)}**。因此 Git 和旧版本日志中出现 10 月记录属于上游历史。`,
	`- **本仓库创建**：GitHub 仓库 API 的 \`created_at\` 为 **${localTime(FORK_CREATED_AT)}**。复制或 fork 仓库会保留更早的提交，不会把原提交日期改成创建当天。`,
	`- **定制功能线快照**：\`${CUSTOM_REF}\` 指向 ${commitLink(custom.sha)}，提交者日期为 **${localTime(custom.committerDate)}**。提交时间与实际 push 时间是两类记录，本文不把它们互相替代。`,
	'',
	'Git 作者日期记录原作者提交的时间，提交者日期记录该提交对象最近形成的时间；两者都由提交记录提供。时间线按父子关系展开，日期照实显示，不重写历史时间。',
	'',
	'## 归并前分支与版本快照',
	'',
	'| 引用 | 提交 | 提交者时间 | 包版本 |',
	'|---|---|---|---|',
	branchRow(MAIN_REF, 'main（归并前）'),
	branchRow(ICON_REF, 'local/anthropic-icon-1.9.0（图标基线）'),
	branchRow(CUSTOM_REF, 'remove-upstream-links（定制功能线）'),
	'',
	`定制开发起点是上游 \`${BASE_REF}\`，对应 ${commitLink(base.sha)}（${localTime(base.committerDate)}）。归并前 \`${MAIN_REF}\` 独有 ${mainOnly} 个提交，\`${CUSTOM_REF}\` 独有 ${customOnly} 个提交。分支有分叉，查看版本号大小不足以判断是否包含本仓库的定制功能。`,
	'',
	'## 定制开发时间线',
	'',
	`以下从上游 \`${BASE_REF}\` 之后开始，按 Git 提交父子关系列出定制分支上的全部 ${localCommits.length} 个提交。作者日期与提交者日期分别列出。`,
	'',
	'| 作者时间 | 提交者时间 | 提交 | 变化 |',
	'|---|---|---|---|',
	...localCommits.map((entry) => `| ${localTime(entry.authorDate)} | ${localTime(entry.committerDate)} | ${commitLink(entry.sha)} | ${cell(entry.subject)} |`),
	'',
	'## 继承的上游版本标签',
	'',
	'这些标签继承自上游，不代表本 fork 在相同日期发布过对应版本。标签日期、标签所指提交的日期、GitHub Release 的发布日期分别属于不同记录；轻量标签本身没有创建时间。',
	'',
	'| 标签 | 标签创建时间（若有记录） | 所指提交的提交者时间 | 提交 |',
	'|---|---|---|---|',
	...tagRows,
	'',
	'原版本功能说明保留在 [CHANGELOG.md](CHANGELOG.md)。当前定制沿用上游包名与版本号，识别具体构建时同时记录来源仓库、分支和完整提交哈希。版本与安装规则见 [VERSIONING.md](VERSIONING.md)。',
	'',
	'## 如何刷新本文',
	'',
	'```sh',
	'git fetch origin',
	'node scripts/update-fork-timeline.mjs',
	'# 更换定制分支时：',
	'TIMELINE_CUSTOM_REF=origin/remove-upstream-links node scripts/update-fork-timeline.mjs',
	'```',
	'',
	`证据入口：[仓库元数据 API](https://api.github.com/repos/${REPO})、[main](${REPO_URL}/tree/main)、[图标基线](${REPO_URL}/tree/local/anthropic-icon-1.9.0)、[定制分支](${REPO_URL}/tree/remove-upstream-links)。生成器不执行 fetch、不修改 refs、不创建标签、不推送。`,
	'',
].join('\n');
writeFileSync(OUTPUT, text);
console.log(`Updated TIMELINE.md from ${CUSTOM_REF} at ${custom.sha}`);
