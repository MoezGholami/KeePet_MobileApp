import React, { Component } from 'react';
import { Button } from 'native-base';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    AsyncStorage,
} from 'react-native';

class Home extends Component<{}> {

    state = {
        username: '',
    };

    componentDidMount() {
        this._loadInitialState().done;
    }
    _loadInitialState = async() => {
        var user = await AsyncStorage.getItem('user');
        if(user !== null) {
            console.log(user);
            this.setState({username: user.username});
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Hello! {this.state.username}
                </Text>
                <Text style={styles.welcome}>
                    Welcome to React Native!
                </Text>
                <Button success>
                    <Text>
                        Log out
                    </Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

export default Home;