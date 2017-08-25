import { handleActions } from 'redux-actions';
import {Actions, Action} from '../actions';

export interface State {
  storage: any
}

const initialState: State = {
  storage: {}
};

export default handleActions<State, Action>({
  [Actions.SET_STORAGE]: (state, action) => {
    return {
    	...state,
      storage: action.payload.storage
    };
  }
}, initialState);
