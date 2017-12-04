import React, { Component } from 'react';
import { TabNavigator, TabView } from 'react-navigation'
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import Home from '../src/Home';
import Message from '../src/Message';
import Profile from '../src/Profile';

const TabNav = TabNavigator({
    Home: {screen: Home, navigationOptions: {
        tabBarLable: 'Home',
        title: "Home",
        headerTitleStyle: {bottom: 0},
        headerStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 0,
            right: 0,
        },
        tabBarIcon:({ tintColor }) =>
            <FontAwesome name='home' size={32} color='#2980b9'/>,
    }},
    Message: {screen: Message, navigationOptions: {
        tabBarLable: 'Message',
        title: "Message",
        headerTitleStyle: {bottom: 0},
        headerStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 0,
            right: 0,
        },
        tabBarIcon:({ tintColor }) =>
            <Feather name='message-circle' size={32} color='#2980b9'/>,
    }},
    Profile: {screen: Profile, navigationOptions: {
        tabBarLable: 'Profile',
        title: "Profile",
        headerTitleStyle: {bottom: 0},
        headerStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 0,
            right: 0,
        },
        tabBarIcon:({ tintColor }) =>
            <MaterialIcons name='account-box' size={32} color='#2980b9'/>,
    }},
},{
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
        activeTintColor: '#000000',
        activeBackgroundColor: '#cae2da',
        inactiveTintColor: '#000000',
        inactiveBackgroundColor: '#FFFFFF',
        labelStyle: {
            fontSize: 12,

        }
    }
});

export default TabNav;