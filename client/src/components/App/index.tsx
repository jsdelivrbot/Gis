import * as React from "react";
import * as Actions from "../../actions";
import * as style from "./style.css";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { RootState } from "../../reducers";
import { MainSection } from "../../components";
import Socket from "../../utils/socket";

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    actions: typeof Actions;
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {
  private socket: Socket;

  componentDidMount() {
    this.socket = new Socket("http://localhost:8493", this.props.actions.setStorage);
    this.socket.setRoutes(["branches", "currentBranch", "diff", "commits"]);
    this.socket.listen();
  }

  render() {
    return (
      <div className={style.normal}>
        Giss
        {this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    todos: state.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions as any, dispatch)
  };
}
