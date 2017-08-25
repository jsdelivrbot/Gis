import * as React from "react";
import { connect } from "react-redux";
import {Panel} from "react-bootstrap";
import {RootState} from "../../reducers";
import {AppState} from "../../reducers/app";

export namespace Workdir {
	export interface Props {
		diff?: Array<AppState.Diff>
	}

	export interface State {}
}

@connect(mapStateToProps)
class Workdir extends React.Component<Workdir.Props, Workdir.State> {
	render() {
		return (
			<div>
				<Panel>
					{
						this.props.diff.map(diff => (
							<div>
								<h4>{diff.path}</h4>
								{diff.textHunks.map(h => <p>{h}</p>)}
							</div>
						))
					}
				</Panel>
			</div>
		)
	}
}

function mapStateToProps(props: RootState) {
	return {
		diff: props.app.storage.diff
	};
}

export default Workdir;