import * as React from "react";
import * as Actions from "../../actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { RootState } from "../../reducers";
import { MainSection } from "../../components";
import Socket from "../../utils/socket";
import Workdir from "../Workdir";
import Commits from "../Commits";
import Todos from "../Todos";
import {Row, Col} from "react-bootstrap";
import "./style.css";

export namespace App {
  export interface Props extends RouteComponentProps<void> {
    actions: typeof Actions,
    currentBranch: string
  }

  export interface State {
    /* empty */
  }
}

@connect(mapStateToProps, mapDispatchToProps)
export class App extends React.Component<App.Props, App.State> {
  private socket: Socket;

  componentDidMount() {
    this.socket = new Socket();
    this.socket.setRoutes([
      {
        path: "init",
        onReceive: this.props.actions.init
      },
      {
        path: "branches",
        onReceive: this.props.actions.setBranches
      },
      {
        path: "currentBranch",
        onReceive: this.props.actions.setCurrentBranch
      },
      {
        path: "diff",
        onReceive: this.props.actions.setDiff
      },
      {
        path: "commits",
        onReceive: this.props.actions.setCommits
      }
    ]);
    this.socket.listen();
  }

  render() {
    return (
      <div className="app">
        <Col md={12}>
          <h3>Gis - {this.props.currentBranch}</h3>
          <Row>
            <Col md={3}>
              <Commits/>
            </Col>
            <Col md={3}>
              <Todos/>
              <Workdir/>
            </Col>
          </Row>
          {this.props.children}
        </Col>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    currentBranch: state.app.currentBranch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions as any, dispatch)
  };
}
