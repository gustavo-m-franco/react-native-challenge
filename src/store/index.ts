import { composeWithDevTools } from 'redux-devtools-extension';
import {
  Middleware,
  applyMiddleware,
  compose,
  Store,
  createStore,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootSagas from './sagas';
import rootReducer, { IRootState } from './reducers';
import { IActions } from './types';

const sagaMiddleware = createSagaMiddleware();
const middlewares: Middleware[] = [sagaMiddleware];

const composedMiddleware = __DEV__
  ? composeWithDevTools(applyMiddleware(...middlewares))
  : compose(applyMiddleware(...middlewares));

export const store: Store = createStore<IRootState, IActions, any, any>(
  rootReducer,
  composedMiddleware,
);
sagaMiddleware.run(rootSagas);
