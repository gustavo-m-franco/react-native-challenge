import React from 'react';
import {
  StyleSheet,
  Text,
  NativeSyntheticEvent,
  TextInputScrollEventData,
  FlatList,
  ListRenderItemInfo,
  Platform,
  UIManager,
  View,
  ActivityIndicator,
} from 'react-native';

import { colors } from '../assets';
import { ITransaction } from '../services/api/index';
import { ITransactionsMap } from '../store/transactions/types';

class TransactionsList extends React.PureComponent<ITransactionsListProps> {
  public componentDidMount() {
    const { getTransactions } = this.props;
    getTransactions();
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  private renderItem = ({ item }: ListRenderItemInfo<ITransaction>) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 24,
        }}
      >
        <Text style={{ fontSize: 18 }}>{item.counterparty}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.amount}</Text>
      </View>
    );
  };

  private keyExtractor = (item: ITransaction) => item.id.toString();
  private getTransactions = () => {
    const { transactions } = this.props;
    const transactionsList: ITransaction[] = [];
    Object.keys(transactions).forEach((key: string) => {
      transactionsList.push(transactions[Number(key)]);
    });
    transactionsList.sort((t1, t2) => t2.id - t1.id);
    return transactionsList;
  };

  public render() {
    const { onScroll, onScrollEnd, isLoading } = this.props;
    return (
      <View style={styles.container}>
        {isLoading && (
          <ActivityIndicator style={{ marginTop: 10 }} size="large" />
        )}
        <FlatList
          removeClippedSubviews={false}
          bounces={false}
          onScroll={onScroll}
          onScrollEndDrag={onScrollEnd}
          onMomentumScrollEnd={onScrollEnd}
          keyExtractor={this.keyExtractor}
          style={styles.listContainer}
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={this.renderItem}
          data={this.getTransactions()}
          refreshing={isLoading}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.white,
  },
});
interface ITransactionsListProps {
  onScroll?: (e: NativeSyntheticEvent<TextInputScrollEventData>) => void;
  onScrollEnd?: (e: NativeSyntheticEvent<TextInputScrollEventData>) => void;
  transactions: ITransactionsMap;
  isLoading: boolean;
  getTransactions: () => void;
}

export default TransactionsList;
