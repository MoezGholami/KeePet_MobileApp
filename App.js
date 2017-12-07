import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './src/javascript/src/Splash';
import PostDetail from './src/javascript/src/PostDetail';
import ViewItem from './src/javascript/src/ViewItem';


export default class App extends React.Component {
    render() {
        return (
            <Splash />
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
});
