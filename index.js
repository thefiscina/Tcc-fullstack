
import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from "./src/store/index";
import { colors } from './src/styles';

const appRootComponent = () => (
    <Provider store={store}>
        <StatusBar backgroundColor={colors.background_principal} barStyle="dark-content" />
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => appRootComponent);
