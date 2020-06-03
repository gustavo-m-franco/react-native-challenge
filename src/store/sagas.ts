import { all } from 'redux-saga/effects';

import { transactionsSagas } from './transactions';
import { notificationSagas } from './notification';

export default function* root() {
  yield all([transactionsSagas(), notificationSagas()]);
}
