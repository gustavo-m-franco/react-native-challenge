import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

import { colors } from '../assets';
import { format } from '../services';

export const Balance: React.FunctionComponent<IBalanceProps> = ({
  balance,
  style,
}) => {
  return (
    <Text style={[styles.balance, style]} testID="balance-display">
      {format.toPrice(balance)}
    </Text>
  );
};

export interface IBalanceProps {
  balance: number;
  style?: TextStyle;
}

const styles = StyleSheet.create({
  balance: {
    color: colors.textColor,
    fontSize: 32,
    textAlign: 'center',
  },
});

export default Balance;
