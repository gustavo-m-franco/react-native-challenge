import React from 'react';
import { Provider } from 'react-redux';

import WalletScreen from './screens/WalletScreen';
import { store } from './store/index';
import Toast from './containers/Toast';
import AddTransactionScreen from './screens/AddTransactionScreen';

export enum Screen {
  TRANSACTIONS_SCREEN = 'TRANSACTIONS_SCREEN',
  ADD_TRANSACTION_SCREEN = 'ADD_TRANSACTION_SCREEN',
}

class App extends React.Component<{}, IAppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      screen: Screen.TRANSACTIONS_SCREEN,
    };
  }

  private changeScreen = (screen: Screen) => {
    this.setState({ screen });
  };

  public render() {
    const { screen } = this.state;
    return (
      <Provider store={store}>
        {screen === Screen.TRANSACTIONS_SCREEN ? (
          <WalletScreen changeScreen={this.changeScreen} />
        ) : (
          <AddTransactionScreen changeScreen={this.changeScreen} />
        )}
        <Toast />
      </Provider>
    );
  }
}
interface IAppState {
  screen: Screen;
}

export default App;
