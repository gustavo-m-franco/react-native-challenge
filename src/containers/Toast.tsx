import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ToastComponent from '../components/Toast';
import { IRootState } from '../store/reducers';
import notificationActions from '../store/notification/actions';
import { NotificationTypes } from '../store/notification/types';

export const ToastContainer: React.FunctionComponent<IToastProps> = ({
  title,
  message,
  type,
  show,
  hide,
}) => (
  <ToastComponent
    hide={hide}
    show={show}
    title={title}
    message={message}
    type={type}
  />
);

export interface IToastProps {
  title?: string;
  message: string;
  type: NotificationTypes;
  show: boolean;
  hide: () => void;
}

const mapStateToProps = (state: IRootState) => ({
  title: state.notification.title,
  message: state.notification.message,
  type: state.notification.type,
  show: state.notification.show,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  hide: () => {
    dispatch(notificationActions.dismiss());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastContainer);
