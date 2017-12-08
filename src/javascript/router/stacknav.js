import React, { Component } from 'react';
import { StackNavigator} from 'react-navigation'
import Login from '../src/Login';
import Post from '../src/Post';
import Register from '../src/Register';
import Edit from '../src/Edit';
import PostDetail from '../src/PostDetail';
import ViewItem from  '../src/ViewItem';
import MapPicker from '../src/MapPicker';
import MyPost from '../src/MyPost';
import TabNav from './tabnav';
import TabNavProfile from './tabnavProfile';
import MapViewItem from "../src/MapViewItem";

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
    PostDetail: {
        screen: PostDetail,
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
    Edit: {
        screen: Edit,
        navigationOptions: ({navigation}) => ({
            title: '',
            headerTitleStyle: {bottom: 0},
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
            },
        })
    },
    ViewItem: {
        screen: ViewItem,
        navigationOptions: ({navigation}) => ({
            title: '',
            headerTitleStyle: {bottom: 0},
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
            },
        })
    },
    MapPicker: {
        screen: MapPicker,
        navigationOptions: ({navigation}) => ({
            title: '',
            headerTitleStyle: {bottom: 0},
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
            },
        })
    },
    MyPost: {
        screen: MyPost,
        navigationOptions: ({navigation}) => ({
            title: '',
            headerTitleStyle: {bottom: 0},
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
            },
        })
    },
    MapViewItem: {
        screen: MapViewItem,
        navigationOptions: ({navigation}) => ({
            title: '',
            headerTitleStyle: {bottom: 0},
            headerStyle: {
                backgroundColor: 'transparent',
                position: 'absolute',
            },
        })
    }
});

export default StackNav;