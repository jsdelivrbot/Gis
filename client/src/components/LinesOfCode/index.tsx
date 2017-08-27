import * as React from "react";
import {connect} from "react-redux";
import {RootState} from "../../reducers";
import {AppState} from "../../reducers/app";
import {Panel} from "react-bootstrap";
import Miner from "../../utils/miner";
import {LineChart, XAxis, YAxis, Tooltip, Line} from "recharts";
import "./styles.scss";

export namespace MostUsedWords {
  export interface Props {
    commits?: Array<AppState.Commit>,
    config?: AppState.Config
  }
  export interface State {}
}

@connect(mapStateToProps)
class LinesOfCode extends React.Component<MostUsedWords.Props, MostUsedWords.State> {
  render() {
    let dailyLoc = this.props.commits && this.props.config 
      ? Miner.getDailyLocData(this.props.commits, this.props.config, 30)
      : [];
    return(
      <Panel className="lines-of-code-container">
        <LineChart width={700} height={150} data={dailyLoc}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="shortDate" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="added" stroke="#8884d8" />
          <Line type="monotone" dataKey="removed" stroke="#82ca9d" />
        </LineChart>
      </Panel>
    )
  }
}

function mapStateToProps(state: RootState) {
  return {
    commits: state.app.commits,
    config: state.app.config
  }
}

export default LinesOfCode;