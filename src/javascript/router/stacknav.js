import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation'
import Login from '../src/Login';
import Home from '../src/Home';
import Post from '../src/Post';
import TabNav from './tabnav';
import TabNavProfile from './tabnavProfile';

const StackNav = StackNavigator({
    Home: {
        screen: TabNav,
        navigationOptions:({navigation}) => ({
            title: "Home",
        })
    },
    Profile: {
        screen: TabNavProfile,
        navigationOptions:({navigation}) => ({
            title: "Profile",
        })
    },
    Login: {
        screen: Login,
        navigationOptions: ({navigation}) => ({
            title: "Login",
        })
    },
    Post: {
        screen: Post,
        navigationOptions: ({navigation}) => ({
            title: "Post",
        })
    }
});

export default StackNav;