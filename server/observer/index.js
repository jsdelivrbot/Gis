const chokidar = require("chokidar");
const git = require("../git");
const utils = require("./utils");

const watch = () => {
	console.log("Watching files..");
	chokidar.watch(".", {ignored: /(^|[\/\\])\../}).on("change", async (event, path) => {
	  if(path) {
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

			// Diff
			const commits = await git.getCommits(repo);
			utils.postRequest("commits", {commits});
		}
	});
}

module.exports = {
	watch
};