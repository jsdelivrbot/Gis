import * as React from "react";
import {connect} from "react-redux";
import {Panel} from "react-bootstrap";
import {RootState} from "../../reducers";
import {AppState} from "../../reducers/app";
import "./styles.scss";

export namespace Statistics {
  export interface Props {
    commits?: Array<AppState.Commit>,
    todos?: Array<AppState.Todo>,
    diff?: Array<AppState.Diff>,
    config?: AppState.Config
  }

  export interface State {
    linesAdded: number,
    linesRemoved: number,
    commits: number,
    todos: number
  }
}

@connect(mapStateToProps)
class Statistics extends React.Component<Statistics.Props, Statistics.State> {
  constructor() {
    super();
    this.state = {
      linesAdded: 0,
      linesRemoved: 0,
      commits: 0,
      todos: 0
    }
  }

  calculateCommitLines(commits): {added: number, removed: number} {
    let added = 0, removed = 0;
    for(let i=0;i<commits.length;i++) {
      const commit = commits[i];
      added += commit.lineCount.added;
      removed += commit.lineCount.removed;
    }
    return {added, removed};
  }

  calculateDiffLines(diffs): {added: number, removed: number} {
    let added = 0, removed = 0;
    for(let i=0;i<diffs.length;i++) {
      const diff = diffs[i];
      for(let j=0;j<diff.hunks.length;j++) {
        const hunk = diff.hunks[j];
        added += hunk.lineCount.added;
        removed += hunk.lineCount.removed;
      }
    }
    return {added, removed};
  }

  calculateFinishedTodos(todos: Array<AppState.Todo>): number {
    return todos ? todos.filter(todo => todo.status === AppState.TodoStatus.COMPLETED).length : 0;
  }

  calculateCommits(commits: Array<AppState.Commit>): number {
    return commits.filter(commit => commit.author.email === this.props.config.email).length;
  }

  componentWillReceiveProps(props: Statistics.Props) {
    const commitLines = this.calculateCommitLines(props.commits);
    const diffLines = this.calculateDiffLines(props.diff);
    const linesAdded = commitLines.added + diffLines.added;
    const linesRemoved = commitLines.removed + diffLines.removed;
    const todos = this.calculateFinishedTodos(props.todos);
    const commits = this.calculateCommits(this.props.commits);
    this.setState({linesAdded, linesRemoved, commits, todos});
  }

  render() {
    return (
      <Panel className="statistics-container">
        <div className="statistics-item">
          <h6>Lines Added</h6>
          <h3>{this.state.linesAdded.toLocaleString()}</h3>
        </div>
        <div className="statistics-item">
          <h6>Lines Removed</h6>
          <h3>{this.state.linesRemoved.toLocaleString()}</h3>
        </div>
        <div className="statistics-item">
          <h6>Commits</h6>
          <h3>{this.state.commits.toLocaleString()}</h3>
        </div>
        <div className="statistics-item">
          <h6>Finished Todos</h6>
          <h3>{this.state.todos.toLocaleString()}</h3>
        </div>
      </Panel>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    commits: state.app.commits,
    todos: state.app.todos,
    diff: state.app.diff,
    config: state.app.config
  };
}

export default Statistics;