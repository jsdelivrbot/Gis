import * as React from "react";
import { connect } from "react-redux";
import {Panel} from "react-bootstrap";
import {RootState} from "../../reducers";
import {AppState} from "../../reducers/app";

declare const PR: any;

export namespace Workdir {
  export interface Props {
    diff?: Array<AppState.Diff>
  }

  export interface State {}
}

@connect(mapStateToProps)
class Workdir extends React.Component<Workdir.Props, Workdir.State> {
  componentDidUpdate() {
    PR.prettyPrint()
  }

  render() {
    return (
      <div>
        <Panel>
        {
          this.props.diff && this.props.diff.length ? this.props.diff.map((diff, index) => (
              <div key={index}>
                <h4>{diff.path}</h4>
                {diff.hunks && diff.hunks.map((h, index) => (
                  <pre key={index} className="prettyprint">{h.content}</pre>
                ))}
              </div>
            )) :
            "Your workdir is clean!"
        }
        </Panel>
      </div>
    )
  }
}

function mapStateToProps(props: RootState) {
  return {
    diff: props.app.diff
  };
}

export default Workdir;