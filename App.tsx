import React from 'react';
import store from '@src/store';
import Routes from '@src/routes';
import {NavigationContainer} from '@react-navigation/native';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {Provider as StoreProvider} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2e2196',
  },
};

const App = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StoreProvider store={store}>
          <PaperProvider theme={theme}>
            <ToastProvider>
              <Routes />
            </ToastProvider>
          </PaperProvider>
        </StoreProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
