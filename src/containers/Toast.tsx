import React from 'react';
import { useDispatch } from 'react-redux';

import ToastComponent from '../components/Toast';
import notificationActions from '../store/notification/actions';
import { notificationSelecors } from '../store/notification';

export const ToastContainer: React.FunctionComponent = () => {
  const dispatch = useDispatch();
  const hide = () => {
    dispatch(notificationActions.dismiss());
  };
  const notification = notificationSelecors.withNotification();
  const { title, message, type, show } = notification;
  return (
    <ToastComponent
      hide={hide}
      show={show}
      title={title}
      message={message}
      type={type}
    />
  );
};

export default ToastContainer;
