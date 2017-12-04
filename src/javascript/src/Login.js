import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base'
import Constant from './Constant';
import { NavigationActions } from 'react-navigation';
import {
    AsyncStorage,
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
} from 'react-native';

class Login extends Component<{}> {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImage} source={require('../../image/login.jpg')}>
                </Image>
                <View style={styles.content}>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.input}
                                   onChangeText={(username) => this.setState({username})}
                                   value = {this.state.username}
                                   placeholder='username'>
                        </TextInput>
                        <TextInput style={styles.input}
                                   onChangeText={(password) => this.setState({password})}
                                   value = {this.state.password}
                                   placeholder='password'>
                        </TextInput>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={ this.signUp }>
                                <Text style={styles.buttonText}>
                                    Sign up
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={ this.login }>
                                <Text style={styles.buttonText}>
                                    Log in
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
    }

    login = () => {
        const { navigate } = this.props.navigation;
        fetch(Constant.urlBase + 'api/owner/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then((response) => response.json())
            .then((res) => {
                if(res.error) {
                    alert("Please log in again.");
                }
                else
                {
                    console.log(res.jwt);
                    AsyncStorage.setItem('username', res.username);
                    AsyncStorage.setItem('jwt', res.jwt);
                    AsyncStorage.setItem('nextScreen', 'Profile');
                    this.props.navigation.dispatch(NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Profile'})]
                        })
                    )
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .done();
    };

    signUp = () => {
        fetch(Constant.urlBase + 'api/owner/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            })
        })
            .then((response) => {
                response.json();
                if(response.status === 400) {
                    alert('You should try another username.')
                } else {
                    alert('Success! You may now log in.');
                }
            })
            .catch((error) => {
                alert('Something went wrong.');
            })
            .done();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    content: {
        position: 'absolute',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#2980b9',
        paddingVertical: 5,
        marginTop: 5,
        width: '45%',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
    },
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        width: null,
        height: null,
    },
    inputContainer: {
        margin: 20,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        padding: 20,
        alignSelf: 'stretch',
    },
    input: {
        height: 40,
        padding: 20,
        //fontSize: 16,
        backgroundColor: 'rgba(255,255,255,1)',
        marginBottom: 10,
    }
});

export default Login;