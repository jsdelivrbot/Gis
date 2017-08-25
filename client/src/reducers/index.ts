import { combineReducers, Reducer } from 'redux';
import app, {AppState} from './app';

export interface RootState {
  app: AppState.State;
}

export default combineReducers<RootState>({
  app
});
