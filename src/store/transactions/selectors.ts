import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { IRootState } from '../reducers';
import { ITransationsState } from './types';

const _selectTransactions = (state: IRootState) => state.transactions;

export const getTransactions = () =>
  useSelector(
    createSelector(
      _selectTransactions,
      (transactions: ITransationsState) => transactions.transactions,
    ),
  );

export const getBalance = () =>
  useSelector(
    createSelector(
      _selectTransactions,
      (transactions: ITransationsState) => transactions.balance,
    ),
  );

export const isLoading = () =>
  useSelector(
    createSelector(
      _selectTransactions,
      (transactions: ITransationsState) => transactions.loading,
    ),
  );

export default {
  getTransactions,
  getBalance,
  isLoading,
};
