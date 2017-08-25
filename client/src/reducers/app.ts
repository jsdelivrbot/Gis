import { handleActions } from 'redux-actions';
import {Actions, Action} from '../actions';

export namespace AppState {
	export type Branch = string;

	export interface Diff {
		path: string,
		textHunks: Array<string>
	}

	export interface Author {
		email: string,
		name: string
	}

	export interface Commit {
		author: Author,
		date: string,
		id: string,
		message: string,
		time: number,
		summary: string
	}

	export interface State {
	  storage: {
	  	branches: Array<AppState.Branch>,
	  	currentBranch: string,
	  	diff: Array<Diff>,
	  	commits: Array<Commit>
	  },
	  todos: Array<Todo>
	}

	export enum TodoType {
		COMMIT = "COMMIT",
		BRANCH = "BRANCH"
	}

	export enum TodoStatus {
		COMPLETED = "COMPLETED",
		PENDING = "PENDING"
	}

	export interface Todo {
		type: TodoType,
		message: string,
		status: TodoStatus
	}
}

const initialState: AppState.State = {
  storage: {
  	branches: [],
  	currentBranch: "",
  	diff: [],
  	commits: []
  },
  todos: [
  	{
  		message: "Add todos ui",
  		type: AppState.TodoType.BRANCH,
  		status: AppState.TodoStatus.PENDING
  	},
  	{
  		message: "test",
  		type: AppState.TodoType.BRANCH,
  		status: AppState.TodoStatus.PENDING
  	},
  	{
  		message: "Add db",
  		type: AppState.TodoType.COMMIT,
  		status: AppState.TodoStatus.COMPLETED
  	}
  ]
};

export default handleActions<AppState.State, Action>({
  [Actions.SET_STORAGE]: (state, action) => {
    return {
    	...state,
      storage: action.payload.storage
    };
  }
}, initialState);
