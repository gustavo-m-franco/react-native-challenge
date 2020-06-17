import React, { useState } from 'react';
import { Provider } from 'react-redux';

import WalletScreen from './screens/WalletScreen';
import { store } from './store';
import Toast from './containers/Toast';
import AddTransactionScreen from './screens/AddTransactionScreen';

export enum Screen {
  TRANSACTIONS_SCREEN = 'TRANSACTIONS_SCREEN',
  ADD_TRANSACTION_SCREEN = 'ADD_TRANSACTION_SCREEN',
}

const App: React.FC = () => {
  const [screen, setScreen] = useState(Screen.TRANSACTIONS_SCREEN);

  const changeScreen = (screenName: Screen) => {
    setScreen(screenName);
  };

  return (
    <Provider store={store}>
      {screen === Screen.TRANSACTIONS_SCREEN ? (
        <WalletScreen changeScreen={changeScreen} />
      ) : (
        <AddTransactionScreen changeScreen={changeScreen} />
      )}
      <Toast />
    </Provider>
  );
};

export default App;
