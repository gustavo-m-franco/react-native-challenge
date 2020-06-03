import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Field } from 'redux-form';

import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../assets';
import Title from '../Title';
import { required } from '../../services/validation';
import MoneyInput from '../inputs/MoneyInput';
import { CURRENCY_SYMBOL } from '../../services/format';
import { Category } from '../inputs/DropdownOptions';
import Input from '../inputs/Input';
import DropdownInputComponent from '../inputs/DropdownInput';
import PrimaryButton from '../PrimaryButton';
import Error from '../inputs/Error';

interface IField {
  name: string;
  validate: Array<(value: string) => void | string>;
  component: React.ReactNode;
  label: string;
  placeholder: string;
  options?: typeof Category;
}

export const AddTransactionForm: React.FC<IAddTransactionFormProps> = ({
  error,
  isLoading,
  onSubmit,
  canSubmit,
}) => {
  const fields: IField[] = [
    {
      name: 'amount',
      validate: [required],
      component: MoneyInput,
      label: 'Amount',
      placeholder: `${CURRENCY_SYMBOL}0.00`,
    },
    {
      name: 'counterparty',
      validate: [required],
      component: Input,
      label: 'Counterparty',
      placeholder: `(eg.Sainsbury's)`,
    },
    {
      name: 'category',
      validate: [required],
      component: DropdownInputComponent,
      label: 'Category',
      placeholder: 'Select a category',
      options: Category,
    },
  ];
  return (
    <ScrollView contentContainerStyle={styles.formConatiner}>
      <Title marginBottom={16} marginTop={0} text="Add a transaction" />
      <Text style={styles.description}>
        Enter the details of your transaction
      </Text>
      {error && <Error errorMessage={error} />}
      {fields.map(field => (
        <Field key={field.name} {...field} />
      ))}
      {isLoading && (
        <ActivityIndicator style={{ marginTop: 40 }} size="large" />
      )}
      <View style={styles.buttonsContainer}>
        <PrimaryButton
          disabled={!canSubmit}
          onPress={onSubmit}
          style={styles.button}
          text="Add transaction"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  formConatiner: {
    flex: 1,
    marginTop: 0,
    paddingHorizontal: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Arial',
    color: colors.textColor,
    marginBottom: 24,
  },
  buttonsContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  button: {
    marginBottom: 24,
  },
});

export interface IAddTransactionFormProps {
  error: string;
  isLoading: boolean;
  canSubmit: boolean;
  onSubmit: () => void;
}

export default AddTransactionForm;
