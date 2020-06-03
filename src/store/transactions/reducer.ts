import { Reducer } from 'redux';
import transactionsTypes, {
  ITransactionsActions,
  ITransationsState,
} from './types';

export const initialTransactionsState: ITransationsState = {
  transactions: {},
  balance: 0,
  loading: false,
};

const reducer: Reducer<ITransationsState, ITransactionsActions> = (
  state: ITransationsState = initialTransactionsState,
  action: ITransactionsActions,
): ITransationsState => {
  switch (action.type) {
    case transactionsTypes.RequestTransactions:
      return {
        ...state,
        loading: true,
      };
    case transactionsTypes.RequestTransactionsSuccess:
      const { transactions, balance } = action.payload;
      return {
        ...state,
        transactions,
        balance,
        loading: false,
      };
    case transactionsTypes.RequestTransactionsError:
      return {
        ...state,
        loading: false,
      };
    case transactionsTypes.AddTransactionSuccess:
      const { transaction } = action.payload;
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [transaction.id]: transaction,
        },
      };
    default:
      return state;
  }
};

export default reducer;
