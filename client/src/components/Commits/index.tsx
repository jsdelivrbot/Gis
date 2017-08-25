import * as React from "react";
import {connect} from "react-redux";
import {Panel, ListGroup, ListGroupItem} from "react-bootstrap";
import {RootState} from "../../reducers";
import {AppState} from "../../reducers/app";
import "./styles.scss";

export namespace Commits {
	export interface Props {
		commits?: Array<AppState.Commit>
	}
}

@connect(mapStateToProps)
class Commits extends React.Component<Commits.Props, {}> {
	render() {
		return (
			<Panel className="commits-container">
				{
					this.props.commits && this.props.commits.length ?
						<ListGroup>
							{
								this.props.commits.map((commit, index) => (
									<ListGroupItem className="commit-item" key={index}>
										<div className="commit-id">{commit.id}</div>
										<div>
											{commit.author.name}&nbsp;
											<span className="author-mail">({commit.author.email})</span>
										</div>
										<div className="commit-summary">{commit.summary}</div>
										<div className="commit-date">{(new Date(commit.date).toLocaleString())}</div>
									</ListGroupItem>
								)) 
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
		commits: state.app.storage.commits
	};
}

export default Commits;