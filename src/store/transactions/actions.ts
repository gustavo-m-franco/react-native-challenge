import { SubmissionError } from 'redux-form';
import transactionsTypes, { ITransactionsMap } from './types';
import { createActionCreator } from '../actions';
import { ITransaction } from '../../services/api';
import { IAddTransaction } from '../../components/addTransaction/AddTransactionFormContainer';

export const requestTransactions = createActionCreator<
  transactionsTypes.RequestTransactions
>(transactionsTypes.RequestTransactions);

export interface IRequestTransactionsSuccessPayload {
  transactions: ITransactionsMap;
  balance: number;
}
export const requestTransactionsSuccess = createActionCreator<
  transactionsTypes.RequestTransactionsSuccess,
  IRequestTransactionsSuccessPayload
>(transactionsTypes.RequestTransactionsSuccess);

export const requestTransactionsError = createActionCreator<
  transactionsTypes.RequestTransactionsError
>(transactionsTypes.RequestTransactionsError);

export interface IAddTransactionPayload extends IAddTransaction {
  successCallback: () => void;
  errorCallback: (error?: SubmissionError) => void;
}
export const addTransaction = createActionCreator<
  transactionsTypes.AddTransaction,
  IAddTransactionPayload
>(transactionsTypes.AddTransaction);

export interface IAddTransactionSuccessPayload {
  transaction: ITransaction;
}
export const addTransactionSuccess = createActionCreator<
  transactionsTypes.AddTransactionSuccess,
  IAddTransactionSuccessPayload
>(transactionsTypes.AddTransactionSuccess);

export default {
  requestTransactions,
  requestTransactionsSuccess,
  requestTransactionsError,
  addTransaction,
  addTransactionSuccess,
};
