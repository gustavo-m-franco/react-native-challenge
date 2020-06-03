import React from 'react';
import { reduxForm, InjectedFormProps } from 'redux-form';

import AddTransactionForm from './AddTransactionForm';

const AddTransactionFormContainer: React.FunctionComponent<InjectedFormProps<
  IAddTransaction
>> = ({ handleSubmit, valid, error, submitting }) => {
  const onSubmit = () => {
    // @ts-ignore
    handleSubmit();
  };
  return (
    <AddTransactionForm
      canSubmit={valid}
      isLoading={submitting}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export interface IAddTransaction {
  amount: string;
  counterparty: string;
  category: string;
}

export default reduxForm<IAddTransaction>({
  form: 'addTransaction',
})(AddTransactionFormContainer);
