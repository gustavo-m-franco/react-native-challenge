import { useSelector } from 'react-redux';
import { IRootState } from '../reducers';

const _selectNotification = (state: IRootState) => state.notification;

export const withNotification = () =>
  useSelector(_selectNotification);

export default {
  withNotification,
};
