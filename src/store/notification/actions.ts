import notificationTypes, { NotificationTypes } from './types';
import { createActionCreator } from '../actions';

export interface INotifyPayload {
  title?: string;
  message: string;
  type: NotificationTypes;
  meta?: string;
}
export const notify = createActionCreator<
  notificationTypes.Notify,
  INotifyPayload
>(notificationTypes.Notify);

export const dismiss = createActionCreator<notificationTypes.Dismiss>(
  notificationTypes.Dismiss,
);

export interface IError {
  code: string;
  field: string;
  message: string;
}
interface IData {
  errors: IError[];
}
export interface INotifyNetworkProblemPayload {
  problem: string;
  statusCode?: number;
  url: string;
  data?: IData;
}
export const notifyNetworkProblem = createActionCreator<
  notificationTypes.NotifyNetworkProblem,
  INotifyNetworkProblemPayload
>(notificationTypes.NotifyNetworkProblem);

export default {
  notify,
  dismiss,
  notifyNetworkProblem,
};
