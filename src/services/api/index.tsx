import { create } from 'apisauce';

import config from '../../config';
import { IAddTransaction } from '../../components/addTransaction/AddTransactionFormContainer';

const api = create({
  baseURL: config.API_URL,
  timeout: config.HTTP_REQUESTS_TIMEOUT,
  headers: {
    Accept: 'application/json',
  },
});

export interface ITransaction {
  id: number;
  currency: string;
  amount: string;
  counterparty: string;
  category: string;
}
interface ITransactionsResponseData {
  data: ITransaction[];
}

export const getTransactions = () =>
  api.get<ITransactionsResponseData>(`/transactions`);

interface IAddTransactionResponseData {
  data: ITransaction;
}

export interface IAddTransactionError {
  code: string;
  message: string;
}
interface IAddTransactionResponseError {
  errors: IAddTransactionError[];
}
export const addTransaction = (payload: IAddTransaction) =>
  api.post<IAddTransactionResponseData | IAddTransactionResponseError>(
    `/transactions`,
    payload,
  );

export default api;
