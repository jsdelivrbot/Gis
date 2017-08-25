import * as React from "react";
import {connect} from "react-redux";
import * as classnames from "classnames";
import {
	Panel, ListGroup, ListGroupItem, Label, FormControl
} from "react-bootstrap";
import {RootState} from "../../reducers";
import {AppState} from "../../reducers/app";
import "./styles.scss";

export namespace Todos {
	export interface Props {
		todos?: Array<AppState.Todo>
	}
}

@connect(mapStateToProps)
class Todos extends React.Component<Todos.Props, {}> {
	render() {
		return (
			<Panel className="todos-container">
				<ListGroup>
					{
						this.props.todos && this.props.todos.length ?
							this.props.todos.map((todo, index) => (
								<ListGroupItem key={index}>
									<Label bsStyle={todo.type === AppState.TodoType.BRANCH ? "primary" : "info"}>{todo.type}</Label>
									&nbsp;
									<span 
										className={classnames("message", {completed: todo.status === AppState.TodoStatus.COMPLETED})}>
										{todo.message}
									</span>
								</ListGroupItem>
							)) :
							"No todos!"
					}
					<ListGroupItem className="todo-new">
						<FormControl componentClass="select">
							<option>One</option>
							<option>Two</option>
						</FormControl>
						<FormControl type="text" placeholder="Title"/>
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

export default Todos;