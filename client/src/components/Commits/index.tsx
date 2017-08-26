import * as React from "react";
import {connect} from "react-redux";
import {Panel, ListGroup, ListGroupItem} from "react-bootstrap";
import {RootState} from "../../reducers";
import {AppState} from "../../reducers/app";
import "./styles.scss";

export namespace Commits {
  export interface Props {
    commits?: Array<AppState.Commit>,
    config?: AppState.Config
  }

  export interface State {
    limit: number
  }
}

@connect(mapStateToProps)
class Commits extends React.Component<Commits.Props, Commits.State> {
  constructor() {
    super();
    this.state = {
      limit: 5
    };
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }

  handleLoadMore() {
    this.setState({limit: this.state.limit * 2});
  }

  getCommitGitLink(id) {
    const origin = this.props.config.origin;
    if(origin) {
      const tail = origin.substr(-4);
      let host = origin;
      if (tail === ".git") host = origin.substr(0, origin.length - 4);
      return `${host}/commit/${id}`;
    }
    return "#";
  }

  render() {
    const {limit} = this.state;
    return (
      <Panel className="commits-container">
        {
          this.props.commits && this.props.commits.length ?
            <ListGroup>
              {
                this.props.commits.slice(0, limit).map((commit, index) => (
                  <ListGroupItem className="commit-item" key={index}>
                    <div className="commit-id">
                      <a href={this.getCommitGitLink(commit.id)} target="_blank">{commit.id}</a>
                    </div>
                    <div>
                      {commit.author.name}&nbsp;
                      <span className="author-mail">({commit.author.email})</span>
                    </div>
                    <div className="commit-summary">{commit.summary}</div>
                    <div className="commit-date">{(new Date(commit.date).toLocaleString())}</div>
                  </ListGroupItem>
                )) 
              }
              {this.props.commits.length > limit && 
                <ListGroupItem>
                  <div className="text-center">
                    +{this.props.commits.length - limit},&nbsp;
                    <a href="#" onClick={this.handleLoadMore}>more</a>
                  </div>
                </ListGroupItem>
              }
            </ListGroup> : 
            "No commits on the branch!"
        }
      </Panel>
    )
  }
}

function mapStateToProps(state: RootState) {
  return {
    commits: state.app.commits,
    config: state.app.config
  };
}

export default Commits;