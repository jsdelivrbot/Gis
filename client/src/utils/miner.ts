import {AppState} from "../reducers/app";

export namespace Miner {
  export interface WordsCount {
    word: string,
    count: number
  }

  export interface DailyLoc {
    date: number,
    added: number,
    removed: number,
    shortDate: string
  }
}

class Miner {
  static getSelfCommits(commits: Array<AppState.Commit>, email: string): Array<AppState.Commit> {
    return commits.filter(commit => commit.author.email === email);
  }

  static getNonMergeCommits(commits: Array<AppState.Commit>): Array<AppState.Commit> {
    return commits.filter(commit => commit.message.indexOf("Merge pull request") === -1);
  }

  static getWordsUsedAlot(
    commits: Array<AppState.Commit>, 
    config: AppState.Config,
    limit: number
  ): Array<Miner.WordsCount> {
    const selfCommits = Miner.getSelfCommits(commits, config.email);
    const wordsDict = {};
    selfCommits.forEach(commit => {
      const message = commit.message;
      const words = message.split(" ");
      words.forEach(word => {
        if(!wordsDict[word]) wordsDict[word] = 0;
        wordsDict[word]++;
      });
    });
    let words: Array<Miner.WordsCount> = [];
    for(const word in wordsDict) {
      words.push({word, count: wordsDict[word]});
    }
    words = words.sort((a, b) => b.count - a.count);
    words = words.splice(0, limit);
    return words;
  }

  static getDailyLocData(
    commits: Array<AppState.Commit>, 
    config: AppState.Config,
    limit: number
  ): Array<Miner.DailyLoc> {
    const selfCommits = Miner.getNonMergeCommits(Miner.getSelfCommits(commits, config.email));
    const locDict: {[key: number]: {added: number, removed: number}} = {};

    selfCommits.forEach(commit => {
      const date = new Date(commit.date);
      const startDate = (new Date(date)).setHours(0, 0, 0, 0);
      const endDate = (new Date(date)).setHours(23, 59, 59, 999);
      if (!locDict[startDate.valueOf()]) locDict[startDate.valueOf()] = {added: 0, removed: 0};
      locDict[startDate.valueOf()].added += commit.lineCount.added;
      locDict[startDate.valueOf()].removed += commit.lineCount.removed;
    });

    let dailyLoc: Array<Miner.DailyLoc> = [];
    for(const date in locDict) {
      const _date = new Date(Number(date));
      dailyLoc.push({
        date: Number(date),
        added: locDict[date].added,
        removed: locDict[date].removed,
        shortDate: `${_date.getDate()}/${_date.getMonth()+1}`
      });
    }
    dailyLoc = dailyLoc.sort((a , b) => b.date - a.date);
    dailyLoc = dailyLoc.splice(0, limit);
    dailyLoc = dailyLoc.sort((a , b) => a.date - b.date);
    return dailyLoc;
  }
}

export default Miner;