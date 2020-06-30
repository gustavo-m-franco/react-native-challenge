import React from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AddTransactionFormContainer, {
  IAddTransaction,
} from '../components/addTransaction/AddTransactionFormContainer';
import { transactionsActions } from '../store/transactions';
import { Screen } from '../App';
import LeftChevron from '../assets/icons/LeftChevron';

const AddTransactionScreen: React.FC<IAddTransactionScreenProps> = ({
  changeScreen,
}) => {
  const dispatch = useDispatch();
  const handleSubmit = (values: IAddTransaction) => {
    return new Promise((resolve, reject) => {
      const successCallback = () => {
        resolve();
        onPressBack();
      };
      dispatch(
        transactionsActions.addTransaction({
          ...values,
          successCallback,
          errorCallback: reject,
        }),
      );
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

interface IAddTransactionScreenProps {
  changeScreen: (screen: Screen) => void;
}

export default AddTransactionScreen;
