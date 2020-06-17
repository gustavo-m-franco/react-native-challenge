import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  NativeSyntheticEvent,
  TextInputScrollEventData,
  InteractionManager,
  Platform,
  UIManager,
  LayoutAnimation,
} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  FlingGestureHandlerStateChangeEvent,
  State,
} from 'react-native-gesture-handler';

import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { TopDisplay } from '../components';
import {
  transactionsSelectors,
  transactionsActions,
} from '../store/transactions';
import { IRootState } from '../store/reducers';
import { ITransactionsMap } from '../store/transactions/types';
import TransactionsList from '../components/TransactionsList';
import { Screen } from '../App';

const WalletScreen: React.FC<IWalletScreenProps> = ({
  balance,
  transactions,
  isLoading,
  getTransactions,
  changeScreen,
}) => {
  const [beginingReached, setBeginingReached] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [interacting, setInteracting] = useState(false);
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  });

  const onTouch = () => {
    animatedBarAction(!collapsed);
  };

  const handleSwipeUp = (event: FlingGestureHandlerStateChangeEvent) => {
    event.nativeEvent.state === State.ACTIVE &&
      !collapsed &&
      animatedBarAction(true);
  };

  const handleSwipeDown = (event: FlingGestureHandlerStateChangeEvent) => {
    event.nativeEvent.state === State.ACTIVE &&
      collapsed &&
      animatedBarAction(false);
  };

  const animatedBarAction = (isCollapseAction: boolean) => {
    setCollapse(isCollapseAction);
    if (!interacting) {
      InteractionManager.runAfterInteractions(() => {
        setInteracting(true);
      });
    }
  };
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(collapse);
  }, [interacting]);

  useEffect(() => {
    setTimeout(() => {
      setInteracting(false);
    }, 500);
  }, [collapse]);

  const onScroll = (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
    const { y } = e.nativeEvent.contentOffset;
    if (y > 0 && !collapsed) {
      animatedBarAction(true);
      setBeginingReached(false);
    }
  };

  const onScrollEnd = (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
    const { y } = e.nativeEvent.contentOffset;
    if (y === 0 && collapsed) {
      animatedBarAction(false);
      setBeginingReached(true);
    }
  };

  return (
    <FlingGestureHandler
      direction={Directions.UP}
      onHandlerStateChange={handleSwipeUp}
    >
      <FlingGestureHandler
        direction={Directions.DOWN}
        onHandlerStateChange={collapsed ? handleSwipeDown : undefined}
      >
        <View style={styles.container}>
          <TopDisplay
            balance={balance}
            onPress={onTouch}
            collapsed={collapsed}
            isAtTop={beginingReached}
            onPressRefresh={getTransactions}
            changeScreen={changeScreen}
          >
            <TransactionsList
              transactions={transactions}
              isLoading={isLoading}
              getTransactions={getTransactions}
              onScroll={onScroll}
              onScrollEnd={onScrollEnd}
            />
          </TopDisplay>
        </View>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface IWalletScreenProps {
  transactions: ITransactionsMap;
  isLoading: boolean;
  balance: number;
  getTransactions: () => void;
  changeScreen: (screen: Screen) => void;
}

const mapStateToProps = (state: IRootState) => ({
  balance: transactionsSelectors.getBalance(state),
  transactions: transactionsSelectors.getTransactions(state),
  isLoading: transactionsSelectors.isLoading(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getTransactions: () => {
    dispatch(transactionsActions.requestTransactions());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletScreen);
