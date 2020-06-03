import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Balance, { IBalanceProps } from '../Balance';

describe('Balance', () => {
  let balance: ShallowWrapper;
  const balanceProps: IBalanceProps = {
    balance: 150,
  };
  beforeEach(() => {
    balance = shallow(<Balance {...balanceProps} />);
  });
  it('+++ Should not show a balance Bø1.50', () => {
    const value = balance.find('Text').prop('children');
    expect(value).toBe('Bø1.50');
  });
  it('+++ Should show a balance of Bø0.99', () => {
    const newProps = {
      balance: 99,
    };
    balance.setProps(newProps);
    const value = balance.find('Text').prop('children');
    expect(value).toBe('Bø0.99');
  });
});
