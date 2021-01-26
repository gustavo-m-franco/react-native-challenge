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

import { useDispatch } from 'react-redux';
import { TopDisplay } from '../components';
import {
  transactionsSelectors,
  transactionsActions,
} from '../store/transactions';
import TransactionsList from '../components/TransactionsList';
import { Screen } from '../App';

const WalletScreen: React.FC<IWalletScreenProps> = ({ changeScreen }) => {
  const [beginingReached, setBeginingReached] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [interacting, setInteracting] = useState(false);
  const transactions = transactionsSelectors.getTransactions();
  const balance = transactionsSelectors.getBalance();
  const isLoading = transactionsSelectors.isLoading();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  });

  const getTransactions = () => {
    dispatch(transactionsActions.requestTransactions());
  };

  const onTouch = () => {
    animateBar(!collapsed);
  };

  const handleSwipeUp = (event: FlingGestureHandlerStateChangeEvent) => {
    event.nativeEvent.state === State.ACTIVE && !collapsed && animateBar(true);
  };

  const handleSwipeDown = (event: FlingGestureHandlerStateChangeEvent) => {
    event.nativeEvent.state === State.ACTIVE && collapsed && animateBar(false);
  };

  const animateBar = (isCollapsing: boolean) => {
    setCollapse(isCollapsing);
    if (!interacting) {
      // waits any interaction to finish
      // before starting the collapse animation
      InteractionManager.runAfterInteractions(() => {
        setInteracting(true);
      });
    }
  };
  // Bar animation and interaction starts
  // No other animations should be executed during this
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setCollapsed(collapse);
  }, [interacting]);
  // Bar animation and interaction finishes
  // Interaction flag set to false
  useEffect(() => {
    setTimeout(() => {
      interacting && setInteracting(false);
    }, 500);
  }, [collapsed]);

  const onScroll = (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
    const { y } = e.nativeEvent.contentOffset;
    if (y > 0 && !collapsed) {
      animateBar(true);
      setBeginingReached(false);
    }
  };

  const onScrollEnd = (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
    const { y } = e.nativeEvent.contentOffset;
    if (y === 0 && collapsed) {
      animateBar(false);
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
  changeScreen: (screen: Screen) => void;
}

export default WalletScreen;
