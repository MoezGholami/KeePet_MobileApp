import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
} from 'react-native';

class Profile extends Component<{}> {

    state = {
        username: '',
        isLoggedIn: false,
    };

    componentDidMount() {
        this._loadInitialState().done;
    };

    _loadInitialState = async() => {
        var user = await AsyncStorage.getItem('username');
        if(user !== null) {
            this.setState({username: user, isLoggedIn: true});
        }
    };

    _onPressButton() {
        if(this.state.isLoggedIn) {
            AsyncStorage.removeItem('username');
            AsyncStorage.removeItem('jwt');
            alert('You have been logged out.');
            this.setState({isLoggedIn: false});
            this.props.navigation.dispatch(NavigationActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({routeName: 'Profile'})
                ]
            }));
        } else {
            this.props.navigation.navigate('Login');
        }
    }

    _onPressPost() {
        this.props.navigation.navigate('Post');
    }

    render() {

        let profile = null;
        if(this.state.isLoggedIn) {
            profile = <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => this._onPressButton()}>
                    <Text style={styles.buttonText}>
                        Sign out
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2} onPress={() => this._onPressPost()}>
                    <Text style={styles.buttonText}>
                        Post a Request
                    </Text>
                </TouchableOpacity>
            </View>
        } else {
            profile = <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => this._onPressButton()}>
                    <Text style={styles.buttonText}>
                        Sign in / Sign up
                    </Text>
                </TouchableOpacity>
            </View>
        }
        return (
            profile
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
    button: {
        backgroundColor: '#2980b9',
        paddingVertical: 5,
        marginTop: 5,
        width: '45%',
    },
    button2: {
        backgroundColor: '#2980b9',
        paddingVertical: 5,
        marginTop: 5,
        width: '45%',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
    },
});

export default Profile