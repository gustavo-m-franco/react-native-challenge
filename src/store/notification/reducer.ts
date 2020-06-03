import { Reducer } from 'redux';
import notificationTypes, {
  INotificationAction,
  INotificationState,
  NotificationTypes,
} from './types';

export const initialNotificationState: INotificationState = {
  message: '',
  type: NotificationTypes.NONE,
  show: false,
};

const reducer: Reducer<INotificationState, INotificationAction> = (
  state: INotificationState = initialNotificationState,
  action: INotificationAction,
): INotificationState => {
  switch (action.type) {
    case notificationTypes.Notify:
      const { title, message, type, meta } = action.payload;
      return {
        ...state,
        title,
        message,
        type,
        meta,
        show: true,
      };
    case notificationTypes.Dismiss:
      return {
        ...state,
        show: false,
        message: '',
      };
    default:
      return state;
  }
};

export default reducer;
