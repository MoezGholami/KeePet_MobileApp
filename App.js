import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/javascript/Login';
import Home from './src/javascript/Home';
import { StackNavigator } from 'react-navigation';

const NavigationApp = StackNavigator({
    Home: {screen: Login},
    HomePage: {screen: Home},
});

export default class App extends React.Component {
    render() {
        return (
          <NavigationApp />
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
});
