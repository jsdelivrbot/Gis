import { handleActions } from 'redux-actions';
import {Actions, Action} from '../actions';

export namespace AppState {
  export type Branch = string;

  export interface Hunk {
    content: string,
    lineCount: {
      added: number,
      removed: number
    }
  }

  export interface Diff {
    path: string,
    hunks: Array<Hunk>
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
    summary: string,
    lineCount: {
      added: number,
      removed: number
    }
  }

  export interface State {
    branches: Array<AppState.Branch>,
    currentBranch: string,
    diff: Array<Diff>,
    commits: Array<Commit>,
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
    id?: string,
    type: TodoType,
    message: string,
    status: TodoStatus,
    createdAt?: number,
    completedAt?: number
  }
}

const initialState: AppState.State = {
  branches: [],
  currentBranch: "",
  diff: [],
  commits: [],
  todos: []
};

export default handleActions<AppState.State, Action>({
  [Actions.INIT]: (state, action) => {
    return {
      ...state,
      ...action.payload.init
    };
  },
  [Actions.SAVE_TODO]: (state, action) => {
    return {
      ...state,
      todos: [
        ...state.todos,
        action.payload.todo
      ]
    };
  },
  [Actions.SET_BRANCHES]: (state, action) => {
    return {
      ...state,
      branches: action.payload.branches
    }
  },
  [Actions.SET_DIFF]: (state, action) => {
    return {
      ...state,
      diff: action.payload.diff
    }
  },
  [Actions.SET_COMMITS]: (state, action) => {
    return {
      ...state,
      commits: action.payload.commits
    }
  },
  [Actions.SET_CURRENT_BRANCH]: (state, action) => {
    return {
      ...state,
      currentBranch: action.payload.currentBranch
    }
  },
  [Actions.SET_TODOS]: (state, action) => {
    return {
      ...state,
      todos: action.payload.todos
    }
  }
}, initialState);
