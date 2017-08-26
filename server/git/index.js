const Git = require("nodegit");
const config = require("../config");

const openRepo = git => git.Repository.open(config.repoPath);
const getCurrentBranch = repo => repo.getCurrentBranch();
const getAllBranches = repo => repo.getReferences(3);
const getDiffDetails = async diff => {
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
      const lineCount = {
        added: 0,
        removed: 0
      };
      const texts = lines.map(line => {
        const isAdded = line.oldLineno() === -1 ? true : false;
        const isRemoved = line.newLineno() === -1 ? true : false;
        isAdded && lineCount.added++;
        isRemoved && lineCount.removed++;
        const content = line.content();
        return `${isAdded ? "+" : ""}${isRemoved ? "-" : ""}${!isRemoved && !isAdded ? " " : ""}${content}`;
      });
      textHunks.push({
        content: texts.join(""),
        lineCount
      });
    };
    patchesInfo.push({
      path,
      hunks: textHunks
    });
  };
  return patchesInfo;
}

const getDiff = async repo => {
  const headCommit = await repo.getHeadCommit();
  const tree = await headCommit.getTree();
  const diff = await Git.Diff.treeToWorkdir(repo, tree);
  const patchesInfo = await getDiffDetails(diff);
  return patchesInfo;
}

const getCommits = async repo => {
  const walk = Git.Revwalk.create(repo);
  walk.pushHead();
  const commits = await walk.getCommits();
  const tCommits = [];

  for(let i=0;i<commits.length;i++) {
    const commit = commits[i];

    const diffs = await commit.getDiff();
    const lineCount = {
      added: 0,
      removed: 0
    };

    for(let j=0;j<diffs.length;j++) {
      const diff = diffs[j];
      const diffDetails = await getDiffDetails(diff);
      diffDetails.forEach(detail => {
        detail.hunks.forEach(hunk => {
          lineCount.added += hunk.lineCount.added;
          lineCount.removed += hunk.lineCount.removed;
        });
      });
    }

    const author = commit.author();
    tCommits.push({
      author: {
        email: author.email(),
        name: author.name()
      },
      date: commit.date(),
      id: commit.id().toString(),
      message: commit.messageRaw(),
      time: commit.time(),
      summary: commit.summary(),
      lineCount
    });
  }

  return tCommits;
}

(async () => {
  const path = require("path");
  const repo = await openRepo(Git);
  const branches = await getAllBranches(repo);
})()

module.exports = {
  Git,
  openRepo,
  getCurrentBranch,
  getAllBranches,
  getDiff,
  getCommits
};