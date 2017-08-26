const Git = require("nodegit");
const config = require("../config");

const openRepo = git => git.Repository.open(config.repoPath);
const getCurrentBranch = repo => repo.getCurrentBranch();
const getAllBranches = repo => repo.getReferences(3);

const getDiff = async repo => {
	const headCommit = await repo.getHeadCommit();
	const tree = await headCommit.getTree();

	const diff = await Git.Diff.treeToWorkdir(repo, tree);
	const patches = await diff.patches();
	const patchesInfo = [];
	for(let j=0;j<patches.length;j++) {
		const patch = patches[j];
		const path = patch.newFile().path();
		const hunks = await patch.hunks();
		const textHunks = [];
		for(let i=0;i<hunks.length;i++) {
			const hunk = hunks[i];
			const lines = await hunk.lines();
			const texts = lines.map(line => {
				const isAdded = line.oldLineno() === -1 ? true : false;
				const isRemoved = line.newLineno() === -1 ? true : false;
				const content = line.content();
				return `${isAdded ? "+" : ""}${isRemoved ? "-" : ""} ${content}`;
			});
			textHunks.push(texts.join(""));
		};
		patchesInfo.push({
			path,
			textHunks
		});
	};
	return patchesInfo;
}

const getCommits = async repo => {
	const walk = Git.Revwalk.create(repo);
	walk.pushHead();
	const commits = await walk.getCommits();
	return commits.map(m => {
		const author = m.author();

		return {
			author: {
				email: author.email(),
				name: author.name()
			},
			date: m.date(),
			id: m.id().toString(),
			message: m.messageRaw(),
			time: m.time(),
			summary: m.summary()
		}
	});
}

(async () => {
	const path = require("path");
	const repo = await openRepo(Git);
	const diff = await getDiff(repo);
	const commits = await getCommits(repo);
})()

module.exports = {
	Git,
	openRepo,
	getCurrentBranch,
	getAllBranches,
	getDiff,
	getCommits
};