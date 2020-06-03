import { ActionType } from 'typesafe-actions';
import { notificationActions } from './notification';
import { transactionsActions } from './transactions';

export type IActions = ActionType<typeof actions>;

export interface BaseAction<Type, Payload> {
  type: Type;
  payload: Payload;
  error?: boolean;
}

const actions = {
  ...notificationActions,
  transactionsActions,
};
