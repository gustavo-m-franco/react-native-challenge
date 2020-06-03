import { ActionType } from 'typesafe-actions';
import { ITransaction } from '../../services/api';
import transactionsActions from './actions';

export enum TransactionsTypes {
  RequestTransactions = 'Transactions/REQUEST_TRANSACTIONS',
  RequestTransactionsSuccess = 'Transactions/REQUEST_TRANSACTIONS_SUCCESS',
  RequestTransactionsError = 'Transactions/REQUEST_TRANSACTIONS_ERROR',
  AddTransaction = 'Transactions/ADD_TRANSACTION',
  AddTransactionSuccess = 'Transactions/ADD_TRANSACTION_SUCCESS',
}

export interface ITransactionsMap {
  [key: number]: ITransaction;
}

export interface ITransationsState {
  loading: boolean;
  transactions: ITransactionsMap;
  balance: number;
}

export type ITransactionsActions = ActionType<typeof transactionsActions>;

export default TransactionsTypes;
