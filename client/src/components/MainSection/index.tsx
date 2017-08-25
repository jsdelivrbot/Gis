import * as React from "react";
import * as TodoActions from "../../actions";
import * as style from "./style.css";
import { connect } from "react-redux";

export namespace MainSection {
  export interface Props {
    actions: typeof TodoActions;
  }

  export interface State {}
}

export class MainSection extends React.Component<MainSection.Props, MainSection.State> {

  constructor(props?: MainSection.Props, context?: any) {
    super(props, context);
    this.state = {};
  }

  render() {
    return (
      <section className={style.main}>
        Hello Gis!
      </section>
    );
  }
}
