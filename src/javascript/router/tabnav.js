import React, { Component } from 'react';
import { TabNavigator, TabView } from 'react-navigation'
import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import Home from '../src/Home';
import Map from '../src/Map';
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
    Map: {screen: Map, navigationOptions: {
        tabBarLable: 'Map',
        title: "Map",
        headerTitleStyle: {bottom: 0},
        headerStyle: {
            backgroundColor: 'transparent',
            position: 'absolute',
            left: 0,
            right: 0,
        },
        tabBarIcon:({ tintColor }) =>
            <FontAwesome name='map-marker' size={32} color='#2980b9'/>,
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
    initialRouteName: 'Home',
    animationEnabled: false,
    swipeEnabled: false,
    lazyLoad: true,
    tabBarOptions: {
        activeTintColor: '#000000',
        activeBackgroundColor: '#ecfff6',
        inactiveTintColor: '#000000',
        showIcon: true,
        showLabel: true,
        lazyLoad: true,
        upperCaseLabel: false,
        indicatorStyle: {
            backgroundColor: 'transparent'
        },
        style: {
            backgroundColor: 'rgba(22, 22, 22, 0.1)',
            //position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0
        },
        labelStyle: {
            fontSize: 12,
        }
    }
});

export default TabNav;