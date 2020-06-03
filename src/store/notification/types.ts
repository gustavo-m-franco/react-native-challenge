import { ActionType } from 'typesafe-actions';
import notificationActions from './actions';

export enum NotificationTypes {
  ERROR = 'ERROR',
  WARNING = 'WARNING',
  NOTIFICATION = 'NOTIFICATION',
  NONE = 'NONE',
}

export interface INotificationState {
  title?: string;
  message: string;
  type: NotificationTypes;
  show: boolean;
  meta?: string;
}

export enum NotificationTypesEnum {
  Notify = 'Notification/NOTIFY',
  Dismiss = 'Notification/DISMISS',
  NotifyNetworkProblem = 'Notification/NOTIFY_NETWORK_PROBLEM',
}

export type INotificationAction = ActionType<typeof notificationActions>;

export default NotificationTypesEnum;
