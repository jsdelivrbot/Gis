import {AppState} from "../reducers/app";

export namespace Miner {
  export interface WordsCount {
    word: string,
    count: number
  }
}

class Miner {
  static getWordsUsedAlot(
    commits: Array<AppState.Commit>, 
    config: AppState.Config,
    limit: number
  ): Array<Miner.WordsCount> {
    const selfCommits = commits.filter(commit => commit.author.email === config.email);
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
}

export default Miner;