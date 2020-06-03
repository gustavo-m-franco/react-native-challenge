import React from 'react';
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

class WalletScreen extends React.Component<
  IWalletScreenProps,
  IWalletScreenState
> {
  constructor(props: IWalletScreenProps) {
    super(props);
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.state = {
      beginingReached: true,
      collapsed: false,
      interacting: false,
    };
  }

  private onTouch = () => {
    const { collapsed } = this.state;
    this.animatedBarAction(!collapsed);
  };

  private handleSwipeUp = (event: FlingGestureHandlerStateChangeEvent) => {
    const { collapsed } = this.state;
    event.nativeEvent.state === State.ACTIVE &&
      !collapsed &&
      this.animatedBarAction(true);
  };

  private handleSwipeDown = (event: FlingGestureHandlerStateChangeEvent) => {
    const { collapsed } = this.state;
    event.nativeEvent.state === State.ACTIVE &&
      collapsed &&
      this.animatedBarAction(false);
  };

  private animatedBarAction = (collapse: boolean) => {
    const { interacting } = this.state;
    if (!interacting) {
      InteractionManager.runAfterInteractions(() => {
        this.setState({ interacting: true }, () => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({ collapsed: collapse }, () => {
            setTimeout(() => {
              this.setState({ interacting: false });
            }, 500);
          });
        });
      });
    }
  };

  private onScroll = (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
    const { collapsed } = this.state;
    const { y } = e.nativeEvent.contentOffset;
    if (y > 0 && !collapsed) {
      this.animatedBarAction(true);
      this.setState({ beginingReached: false });
    }
  };

  private onScrollEnd = (e: NativeSyntheticEvent<TextInputScrollEventData>) => {
    const { collapsed } = this.state;
    const { y } = e.nativeEvent.contentOffset;
    if (y === 0 && collapsed) {
      this.animatedBarAction(false);
      this.setState({ beginingReached: true });
    }
  };

  public render() {
    const { collapsed, beginingReached } = this.state;
    const {
      balance,
      transactions,
      isLoading,
      getTransactions,
      changeScreen,
    } = this.props;
    return (
      <FlingGestureHandler
        direction={Directions.UP}
        onHandlerStateChange={this.handleSwipeUp}
      >
        <FlingGestureHandler
          direction={Directions.DOWN}
          onHandlerStateChange={collapsed ? this.handleSwipeDown : undefined}
        >
          <View style={styles.container}>
            <TopDisplay
              balance={balance}
              onPress={this.onTouch}
              collapsed={collapsed}
              isAtTop={beginingReached}
              onPressRefresh={getTransactions}
              changeScreen={changeScreen}
            >
              <TransactionsList
                transactions={transactions}
                isLoading={isLoading}
                getTransactions={getTransactions}
                onScroll={this.onScroll}
                onScrollEnd={this.onScrollEnd}
              />
            </TopDisplay>
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
interface IWalletScreenState {
  collapsed: boolean;
  interacting: boolean;
  beginingReached: boolean;
}

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
