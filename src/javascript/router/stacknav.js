import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation'
import Login from '../src/Login';
import Post from '../src/Post';
import Register from '../src/Register';
import TabNav from './tabnav';
import TabNavProfile from './tabnavProfile';

const StackNav = StackNavigator({
    Home: {
        screen: TabNav,
    },
    Profile: {
        screen: TabNavProfile,
    },
    Login: {
        screen: Login,
        navigationOptions: ({navigation}) => ({
            title: 'Sign in',
            headerTitleStyle: {bottom: 0},
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
                left: 0,
                right: 0,
            },
        })
    },
    Post: {
        screen: Post,
        navigationOptions: ({navigation}) => ({
            title: '',
            headerTitleStyle: {bottom: 0},
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
            },
        })
    },
    Register: {
        screen: Register,
        navigationOptions: ({navigation}) => ({
            title: 'Sign up',
            headerTitleStyle: {bottom: 0},
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
                left: 0,
                right: 0,
            },
        })
    },
});

export default StackNav;