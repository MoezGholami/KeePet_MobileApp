import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation'
import Login from '../src/Login';
import Home from '../src/Home';
import TabNav from './tabnav';

const StackNav = StackNavigator({
    Home: {
        screen: TabNav,
        navigationOptions:({navigation}) => ({
            title: "Home",
        })
    },
    Login: {
        screen: Login,
        navigationOptions: (props) => ({
            title: "Login",
        })
    }
});

export default StackNav;