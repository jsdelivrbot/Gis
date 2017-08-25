import {createAction} from "redux-actions";
import {AppState} from "../reducers/app";

export enum Actions {
	SET_STORAGE = "SET_STORAGE",
	ADD_TODO = "ADD_TODO"
}

type Storage = any;

export interface Action {
	storage: Storage,
	todo: AppState.Todo
}

export const setStorage = createAction<Storage>(Actions[Actions.SET_STORAGE]);
export const addTodo = createAction<{todo: AppState.Todo}>(Actions[Actions.ADD_TODO]);
