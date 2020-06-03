import { put, takeEvery } from 'redux-saga/effects';
import api from 'apisauce';

import { ActionType } from 'typesafe-actions';
import notificationTypes, { NotificationTypes } from './types';
import notificationActions, { IError, INotifyPayload } from './actions';

const ERROR_TIMEOUT = 'Operation timed out. Please check your connection.';
const ERROR_UNKNOWN = 'There has been an error. Please try again.';
const ERROR_CONNECTION = 'Network error. Please check your connection.';

function* notifyNetworkProblem(
  action: ActionType<typeof notificationActions.notifyNetworkProblem>,
) {
  const { problem, statusCode, url, data } = action.payload;
  const payload: INotifyPayload = {
    type: NotificationTypes.ERROR,
    message: '',
    meta: `Status Code: ${statusCode} ${problem} URL: ${url}`,
  };
  let errors = '';
  if (!!data && !!data.errors && !!data.errors.length) {
    data.errors.forEach((error: IError) => {
      errors = `${errors}\nError field: ${error.field}\nError code: ${error.code}\nError message: ${error.message}`;
    });
  }
  // eslint-disable-next-line no-console
  console.log(`Status Code: ${statusCode} ${problem} URL: ${url}\n${errors}`);
  switch (problem) {
    case api.TIMEOUT_ERROR:
      payload.message = ERROR_TIMEOUT;
      break;
    case api.SERVER_ERROR:
    case api.CLIENT_ERROR:
      payload.message = ERROR_UNKNOWN;
      break;
    case api.NETWORK_ERROR:
    case api.CONNECTION_ERROR:
      payload.message = ERROR_CONNECTION;
      break;
    default:
      payload.message = ERROR_UNKNOWN;
      break;
  }
  yield put(notificationActions.notify(payload));
}

export default function* root() {
  yield takeEvery(notificationTypes.NotifyNetworkProblem, notifyNetworkProblem);
}
