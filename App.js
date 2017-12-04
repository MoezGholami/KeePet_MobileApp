import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Splash from './src/javascript/src/Splash';
import Post from './src/javascript/src/Post';


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
