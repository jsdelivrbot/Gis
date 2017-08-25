import { combineReducers, Reducer } from 'redux';
import app, {State} from './app';

export interface RootState {
  app: State;
}

export default combineReducers<RootState>({
  app
});
