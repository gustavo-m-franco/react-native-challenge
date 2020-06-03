import TransactionsReducer, { initialTransactionsState } from '../reducer';
import TransactionsActions from '../actions';
import { ITransaction } from '../../../services/api/index';
import { ITransactionsMap } from '../types';

const transactionsMock = [
  {
    id: 1,
    currency: 'Bø',
    amount: '20.00',
    counterparty: 'Bó',
    category: 'Gifts',
  },
  {
    id: 2,
    currency: 'Bø',
    amount: '-6.00',
    counterparty: 'Github',
    category: 'Subscriptions',
  },
  {
    id: 3,
    currency: 'Bø',
    amount: '-0.63',
    counterparty: 'Cafe Nero',
    category: 'Eating Out',
  },
];

describe('Transactions Reducer', () => {
  it('+++ Should return new state with "balance" 1337', () => {
    let balance = 0;
    const transactions: ITransactionsMap = {};
    transactionsMock.forEach((transaction: ITransaction) => {
      transactions[transaction.id] = transaction;
      balance += Number(transaction.amount);
    });
    balance *= 100;
    const newTransactionsState = TransactionsReducer(
      initialTransactionsState,
      TransactionsActions.requestTransactionsSuccess({ transactions, balance }),
    );
    expect(newTransactionsState.loading).toBeFalsy();
  });
  it('+++ Should return new state with "loading" flag true', () => {
    const newTransactionsState = TransactionsReducer(
      initialTransactionsState,
      TransactionsActions.requestTransactions(),
    );
    expect(newTransactionsState.loading).toBeTruthy();
  });
  it('+++ Should return new state with "loading" flag false', () => {
    initialTransactionsState.loading = true;
    const newTransactionsState = TransactionsReducer(
      initialTransactionsState,
      TransactionsActions.requestTransactionsError(),
    );
    expect(newTransactionsState.loading).toBeFalsy();
  });
});
