const chokidar = require("chokidar");
const git = require("../git");
const utils = require("./utils");
const config = require("../config");

const onChange = async () => {
	const repo = await git.openRepo(git.Git);

	// All branches
	const branches = (await git.getAllBranches(repo)).map(l => l.name());
	utils.postRequest("branches", {branches});

	// Current branch
	const currentBranch = (await git.getCurrentBranch(repo)).name();
	utils.postRequest("currentBranch", {currentBranch});

	// Diff
	const diff = await git.getDiff(repo);
	utils.postRequest("diff", {diff});

	// Commits
	const commits = await git.getCommits(repo);
	utils.postRequest("commits", {commits});
}

const watch = () => {
	onChange();
	console.log("Watching files at", config.repoPath);
	chokidar.watch(config.repoPath, {ignored: /(node_modules|.*db\.json)/}).on("change", async (event, path) => {
	  if(path) {
	  	onChange();
		}
	});
}

module.exports = {
	watch
};