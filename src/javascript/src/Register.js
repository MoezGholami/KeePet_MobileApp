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
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            email: '',
            firstName: '',
            lastName: '',
        };
    }

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
                                   placeholder='Username'>
                        </TextInput>
                        <TextInput style={styles.input}
                                   onChangeText={(password) => this.setState({password})}
                                   value = {this.state.password}
                                   secureTextEntry={true}
                                   placeholder='Password'>
                        </TextInput>
                        <TextInput style={styles.input}
                                   onChangeText={(email) => this.setState({email})}
                                   value = {this.state.email}
                                   placeholder='Email Address'>
                        </TextInput>
                        <TextInput style={styles.input}
                                   onChangeText={(firstName) => this.setState({firstName})}
                                   value = {this.state.firstName}
                                   placeholder='First Name'>
                        </TextInput>
                        <TextInput style={styles.input}
                                   onChangeText={(lastName) => this.setState({lastName})}
                                   value = {this.state.lastName}
                                   placeholder='Last Name'>
                        </TextInput>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={ this.signUp }>
                                <Text style={styles.buttonText}>
                                    Sign up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

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
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
            })
        })
            .then((response) => {
                response.json();
                if(response.status === 400) {
                    alert('You should try another username.')
                } else {
                    alert('Success! You may now log in.');
                    this.props.navigation.navigate('Login');
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
        flex: 1,
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
        backgroundColor: 'rgba(255,255,255,1)',
        marginBottom: 10,
        paddingHorizontal: 10,
        width: 250,
    }
});

export default Login;