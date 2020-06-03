import notificationReducer, { initialNotificationState } from '../reducer';
import notificationActions from '../actions';
import { NotificationTypes } from '../types';

describe('Notification Reducer', () => {
  it('+++ Should return new state with message and type.', () => {
    const type = NotificationTypes.ERROR;
    const message = 'Test message';
    const newNotificationState = notificationReducer(
      initialNotificationState,
      notificationActions.notify({ type, message }),
    );
    expect(newNotificationState.type).toBe(type);
    expect(newNotificationState.message).toBe(message);
  });
  it('+++ Should return new state with no message and "show" flag as false.', () => {
    const type = NotificationTypes.ERROR;
    const message = 'Test message';
    let newNotificationState = notificationReducer(
      initialNotificationState,
      notificationActions.notify({ type, message }),
    );
    newNotificationState = notificationReducer(
      newNotificationState,
      notificationActions.dismiss(),
    );
    expect(newNotificationState.type).toBe(NotificationTypes.ERROR);
    expect(newNotificationState.message).toBe('');
    expect(newNotificationState.show).toBeFalsy();
  });
});
