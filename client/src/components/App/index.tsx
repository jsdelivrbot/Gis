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
    this.socket = new Socket("http://localhost:8493", this.props.actions.setStorage);
    this.socket.setRoutes(["branches", "currentBranch", "diff", "commits"]);
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
    currentBranch: state.app.storage.currentBranch
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions as any, dispatch)
  };
}
