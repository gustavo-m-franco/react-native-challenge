import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import TransactionListItem, {
  ITransactionListItemProps,
} from '../TransactionListItem';

describe('TransactionListItem', () => {
  let transactionListItem: ShallowWrapper;
  const transactionListItemProps: ITransactionListItemProps = {
    amount: '10.00',
    counterparty: 'Testing',
  };
  beforeEach(() => {
    transactionListItem = shallow(
      <TransactionListItem {...transactionListItemProps} />,
    );
  });
  it('+++ Should show counterparty as "Testing"', () => {
    const counterparty = transactionListItem.findWhere(
      node => node.prop('testID') === 'counterparty',
    );
    expect(counterparty.prop('children')).toBe('Testing');
  });
  it('+++ Should show an amount of 10.00 for counterparty "Testing"', () => {
    const amount = transactionListItem.findWhere(
      node => node.prop('testID') === 'amount',
    );
    expect(amount.prop('children')).toBe('10.00');
  });
});
