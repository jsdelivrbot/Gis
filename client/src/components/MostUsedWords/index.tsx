import * as React from "react";
import {connect} from "react-redux";
import {RootState} from "../../reducers";
import {AppState} from "../../reducers/app";
import {Panel} from "react-bootstrap";
import Miner from "../../utils/miner";
import {PieChart, Pie} from "recharts";
import "./styles.scss";

export namespace MostUsedWords {
  export interface Props {
    commits?: Array<AppState.Commit>,
    config?: AppState.Config
  }
  export interface State {}
}

@connect(mapStateToProps)
class MostUsedWords extends React.Component<MostUsedWords.Props, MostUsedWords.State> {
  render() {
    const words = this.props.commits && this.props.config 
      ? Miner.getWordsUsedAlot(this.props.commits, this.props.config, 5)
      : [];
    return(
      <Panel className="most-used-words-container">
        <PieChart width={150} height={150}>
          <Pie 
            data={words} dataKey="count" cx="50%" cy="50%" 
            outerRadius={30} fill="#8884d8"
            nameKey="word" label/>
        </PieChart>
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

export default MostUsedWords;