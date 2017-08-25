import { createAction } from "redux-actions";

export enum Actions {
	SET_STORAGE = "SET_STORAGE"
}

type Storage = any;

export interface Action {
	storage: Storage
}

export const setStorage = createAction<Storage>(Actions[Actions.SET_STORAGE]);
