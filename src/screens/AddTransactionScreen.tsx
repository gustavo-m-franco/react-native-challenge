import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IRootState } from '../store/reducers';
import AddTransactionFormContainer, {
  IAddTransaction,
} from '../components/addTransaction/AddTransactionFormContainer';
import { transactionsActions } from '../store/transactions';
import { Screen } from '../App';
import LeftChevron from '../assets/icons/LeftChevron';

const AddTransactionScreen: React.FC<IAddTransactionScreenProps> = ({
  addTransaction,
  changeScreen,
}) => {
  const handleSubmit = (values: IAddTransaction) => {
    return new Promise((resolve, reject) => {
      const successCallback = () => {
        resolve();
        onPressBack();
      };
      addTransaction({
        ...values,
        successCallback,
        errorCallback: reject,
      });
    });
  };
  const onPressBack = () => {
    changeScreen(Screen.TRANSACTIONS_SCREEN);
  };
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        onPress={onPressBack}
        style={{ marginTop: 48, marginLeft: 24 }}
      >
        <LeftChevron size={1.5} />
      </TouchableOpacity>
      <AddTransactionFormContainer onSubmit={handleSubmit} />
    </View>
  );
};

interface IAddTransactionsSubmission {
  amount: string;
  counterparty: string;
  category: string;
  successCallback: () => void;
  errorCallback: () => void;
}
interface IAddTransactionScreenProps {
  isLoading: boolean;
  addTransaction: (data: IAddTransactionsSubmission) => void;
  changeScreen: (screen: Screen) => void;
}

const mapStateToProps = (state: IRootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTransaction: (data: IAddTransactionsSubmission) => {
    dispatch(transactionsActions.addTransaction(data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddTransactionScreen);
