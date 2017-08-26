import {createStore, applyMiddleware, Store, compose} from 'redux';
import thunk from "redux-thunk";
import rootReducer, {RootState} from '../reducers';

export function configureStore(initialState?: RootState): Store<RootState> {
  const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer, 
    initialState,
    composeEnhancers(applyMiddleware(thunk))
  ) as Store<RootState>;

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
