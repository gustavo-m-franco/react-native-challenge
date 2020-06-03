import { createSelector } from 'reselect';
import { IRootState } from '../reducers';
import { ITransationsState } from './types';

const _selectTransactions = (state: IRootState) => state.transactions;

export const getTransactions = createSelector(
  _selectTransactions,
  (transactions: ITransationsState) => transactions.transactions,
);

export const getBalance = createSelector(
  _selectTransactions,
  (transactions: ITransationsState) => transactions.balance,
);

export const isLoading = createSelector(
  _selectTransactions,
  (transactions: ITransationsState) => transactions.loading,
);

export default {
  getTransactions,
  getBalance,
  isLoading,
};
