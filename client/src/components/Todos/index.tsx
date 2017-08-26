import * as React from "react";
import {connect} from "react-redux";
import * as classnames from "classnames";
import {bindActionCreators} from "redux";
import {
  Panel, ListGroup, ListGroupItem, Label, FormControl
} from "react-bootstrap";
import {RootState} from "../../reducers";
import {AppState} from "../../reducers/app";
import * as Actions from "../../actions";
import "./styles.scss";

export namespace Todos {
  export interface Props {
    todos?: Array<AppState.Todo>,
    actions?: typeof Actions
  }

  export interface State {
    title: string,
    type: AppState.TodoType
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class Todos extends React.Component<Todos.Props, Todos.State> {
  constructor() {
    super();
    this.state = {
      title: "",
      type: AppState.TodoType.BRANCH
    };
    this.handleTodoTitleChange = this.handleTodoTitleChange.bind(this);
    this.handleTodoTypeChange = this.handleTodoTypeChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  addTodo(event) {
    if(event.charCode === 13 && this.state.title) {
      this.props.actions.addTodo({
        message: this.state.title,
        type: this.state.type,
        status: AppState.TodoStatus.PENDING
      });
      this.setState({title: "", type: AppState.TodoType.BRANCH});
    }
  }

  handleTodoTitleChange(event) {
    this.setState({title: event.target.value});
  }

  handleTodoTypeChange(event) {
    this.setState({type: event.target.value});
  }

  handleRemove(id) {
    return () => {
      this.props.actions.removeTodo(id);
    }
  }

  render() {
    return (
      <Panel className="todos-container">
        <ListGroup>
          {
            this.props.todos && this.props.todos.length ?
              this.props.todos.map((todo, index) => (
                <ListGroupItem key={index} className="todo-item">
                  <div>
                    <Label bsStyle={todo.type === AppState.TodoType.BRANCH ? "primary" : "info"}>{todo.type}</Label>
                    &nbsp;
                    <span 
                      className={classnames("message", {completed: todo.status === AppState.TodoStatus.COMPLETED})}>
                    {todo.message}
                  </span>
                  </div>
                  <span className="remove-container">
                    <a href="#" onClick={this.handleRemove(todo.id)}>remove</a>
                  </span>
                </ListGroupItem>
              )) :
              null
          }
          <ListGroupItem className="todo-new">
            <FormControl 
              componentClass="select" 
              value={this.state.type}
              onChange={this.handleTodoTypeChange}
              >
              <option value={AppState.TodoType.BRANCH}>Branch</option>
              <option value={AppState.TodoType.COMMIT}>Commit</option>
            </FormControl>
            <FormControl 
              type="text" 
              placeholder="Title" 
              onChange={this.handleTodoTitleChange}
              value={this.state.title}
              onKeyPress={this.addTodo}
              />
          </ListGroupItem>
        </ListGroup>
      </Panel>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    todos: state.app.todos
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions as any, dispatch)
  }
}

export default Todos;