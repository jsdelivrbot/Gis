import {createAction} from "redux-actions";
import {AppState} from "../reducers/app";
import Socket from "../utils/socket";

export enum Actions {
  INIT = "INIT",
  SAVE_TODO = "SAVE_TODO",
  SET_BRANCHES = "SET_BRANCHES",
  SET_CURRENT_BRANCH = "SET_CURRENT_BRANCH",
  SET_DIFF = "SET_DIFF",
  SET_COMMITS = "SET_COMMITS",
  SET_TODOS = "SET_TODOS"
}

type Storage = any;

export interface Action {
  init: AppState.State,
  todo: AppState.Todo,
  branches: Array<AppState.Branch>,
  diff: Array<AppState.Diff>,
  commits: Array<AppState.Commit>,
  currentBranch: string,
  todos: Array<AppState.Todo>
}

export const init = createAction<{init: AppState.State}>(Actions[Actions.INIT]);
export const setBranches = createAction<{branches: Array<AppState.Branch>}>(Actions[Actions.SET_BRANCHES]);
export const setCurrentBranch = createAction<{currentBranch: string}>(Actions[Actions.SET_CURRENT_BRANCH]);
export const setDiff = createAction<{diff: Array<AppState.Diff>}>(Actions[Actions.SET_DIFF]);
export const setCommits = createAction<{commits: Array<AppState.Commit>}>(Actions[Actions.SET_COMMITS]);
export const setTodos = createAction<{todos: Array<AppState.Todo>}>(Actions[Actions.SET_TODOS]);
export const saveTodo = createAction<{todo: AppState.Todo}>(Actions[Actions.SAVE_TODO]);

export function addTodo(todo: AppState.Todo) {
  return dispatch => {
    Socket.getSocket().emit("post/todo", todo);
  }
}
