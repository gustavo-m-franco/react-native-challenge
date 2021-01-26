import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

import Balance, { IBalanceProps } from '../Balance';

describe('Balance', () => {
  let renderedBalance: RenderAPI;
  const balanceProps: IBalanceProps = {
    balance: 150,
  };
  beforeEach(() => {
    renderedBalance = render(<Balance {...balanceProps} />);
  });
  it('+++ Should not show a balance determined by the props', () => {
    const { getByTestId, rerender } = renderedBalance;

    expect(getByTestId('balance-display').children[0].valueOf()).toBe('Bø1.50');

    const newProps = {
      balance: 99,
    };
    rerender(<Balance {...newProps} />);

    expect(getByTestId('balance-display').children[0].valueOf()).toBe('Bø0.99');
  });
});
