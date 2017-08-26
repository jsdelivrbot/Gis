import * as React from "react";
import {connect} from "react-redux";
import {RootState} from "../../reducers";
import {AppState} from "../../reducers/app";
import {Panel} from "react-bootstrap";
import Miner from "../../utils/miner";

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
    return(
      <Panel>
        {this.props.commits && this.props.config && 
          Miner.getWordsUsedAlot(this.props.commits, this.props.config, 5).map((wordDic, index) => (
            <div key={index}>
              <strong>{wordDic.word}:&nbsp;</strong>{wordDic.count}
            </div>
          ))
        }
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