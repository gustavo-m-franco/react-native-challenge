import { takeLatest, call, put, takeEvery } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { ActionType } from 'typesafe-actions';
import TransactionsTypes, { ITransactionsMap } from './types';
import {
  getTransactions,
  addTransaction,
  ITransaction,
} from '../../services/api/index';
import transactionsActions, { IAddTransactionPayload } from './actions';
import { notificationActions } from '../notification';
import { CURRENCY_SYMBOL } from '../../services/format';

function* requestTransactions() {
  try {
    const response = yield call(getTransactions);
    if (response.ok) {
      const transactions: ITransactionsMap = {};
      let balance = 0;
      response.data.data.forEach((transaction: ITransaction) => {
        transactions[transaction.id] = transaction;
        balance += Number(transaction.amount);
      });
      balance *= 100;
      yield put(
        transactionsActions.requestTransactionsSuccess({
          transactions,
          balance,
        }),
      );
    } else {
      yield put(transactionsActions.requestTransactionsError());
      yield put(
        notificationActions.notifyNetworkProblem({
          problem: response.problem,
          statusCode: response.status,
          url: response.config.url,
          data: response.data,
        }),
      );
    }
  } catch (error) {
    yield put(transactionsActions.requestTransactionsError());
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}

function* addTransactionRequest(
  action: ActionType<typeof transactionsActions.addTransaction>,
) {
  const {
    counterparty,
    category,
    successCallback,
    errorCallback,
  }: IAddTransactionPayload = action.payload;
  try {
    const amount = action.payload.amount
      .replace(/,/gi, '')
      .replace(CURRENCY_SYMBOL, '');
    const response = yield call(addTransaction, {
      amount,
      counterparty,
      category,
    });
    if (response.ok) {
      if (response.data.errors) {
        let errors = '';
        const errorsArray = response.data.errors;
        errorsArray.forEach((error: { message: string }) => {
          errors += `${error.message}\n`;
        });
        !!errorCallback &&
          errorCallback(new SubmissionError({ _error: errors }));
      } else {
        successCallback();
        yield put(
          transactionsActions.addTransactionSuccess({
            transaction: response.data.data,
          }),
        );
      }
    } else {
      errorCallback(new SubmissionError({}));
      yield put(
        notificationActions.notifyNetworkProblem({
          problem: response.problem,
          statusCode: response.status,
          url: response.config.url,
          data: response.data,
        }),
      );
    }
  } catch (error) {
    !!errorCallback &&
      errorCallback(new SubmissionError({ _error: error.message }));
    // eslint-disable-next-line no-console
    console.error(error.message);
  }
}

export default function* root() {
  yield takeEvery(TransactionsTypes.RequestTransactions, requestTransactions);
  yield takeLatest(TransactionsTypes.AddTransaction, addTransactionRequest);
}
