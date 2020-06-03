import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { StateType } from 'typesafe-actions';
import { transactionsReducer } from './transactions';
import { notificationReducer } from './notification';

const rootReducer = {
  transactions: transactionsReducer,
  notification: notificationReducer,
  form: formReducer,
};

export type IRootState = StateType<typeof rootReducer>;

const combinedReducer = combineReducers<IRootState>(rootReducer);

export default combinedReducer;
