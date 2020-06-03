import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export const TransactionListItem: React.FunctionComponent<ITransactionListItemProps> = ({
  counterparty,
  amount,
}) => {
  return (
    <View style={styles.container}>
      <Text testID="counterparty" style={styles.counterparty}>
        {counterparty}
      </Text>
      <Text testID="amount" style={styles.amount}>
        {amount}
      </Text>
    </View>
  );
};

export interface ITransactionListItemProps {
  amount: string;
  counterparty: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  counterparty: {
    fontSize: 18,
  },
  amount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default TransactionListItem;
