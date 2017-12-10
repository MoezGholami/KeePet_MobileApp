import React, { Component } from 'react';
import Expo from 'expo';
import Constant from './Constant';
import Icon from '@expo/vector-icons/FontAwesome';
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
                        {/*<TextInput style={styles.input}*/}
                                   {/*onChangeText={(username) => this.setState({username})}*/}
                                   {/*value = {this.state.username}*/}
                                   {/*placeholder='Username'>*/}
                        {/*</TextInput>*/}
                        {/*<TextInput style={styles.input}*/}
                                   {/*onChangeText={(password) => this.setState({password})}*/}
                                   {/*value = {this.state.password}*/}
                                   {/*secureTextEntry={true}*/}
                                   {/*placeholder='Password'>*/}
                        {/*</TextInput>*/}
                        {/*<View style={styles.buttonContainer}>*/}
                            {/*<TouchableOpacity style={styles.button} onPress={ this.login }>*/}
                                {/*<Text style={styles.buttonText}>*/}
                                    {/*Log in*/}
                                {/*</Text>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                        <View style={styles.googleButton}>
                            <Icon.Button
                                name='google'
                                backgroundColor='#DD4B39'
                                onPress={ this.signInWithGoogleAsync.bind(this) }
                                {...iconStyles}
                            >
                                <Text style={styles.buttonText}>
                                    Google sign in
                                </Text>
                            </Icon.Button>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    async signInWithGoogleAsync() {
        try {
            const result = await Expo.Google.logInAsync({
                //androidClientId: YOUR_CLIENT_ID_HERE,
                iosClientId: '363576231093-fbl4r3laghhu4de8hnvg3kk621en5e27.apps.googleusercontent.com' ,
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                tokeninfoUrl = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='
                    +result.idToken;
                //console.log(tokeninfoUrl)
                fetch(tokeninfoUrl, {method: 'GET'})
                    .then((response) => response.json())
                    .then((res) => {
                    //console.log(res)
                        AsyncStorage.setItem('user_id', res.sub);
                        AsyncStorage.setItem('email', res.email);
                        AsyncStorage.setItem('firstName', res.given_name);
                        AsyncStorage.setItem('lastName', res.family_name);
                        AsyncStorage.setItem('picture', res.picture);
                        AsyncStorage.setItem('username', '');
                        AsyncStorage.setItem('bio', '');
                    })
                    .done()
                this.props.navigation.dispatch(NavigationActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({routeName: 'Profile'})]
                    })
                )
            } else {
                return {cancelled: true};
            }
        } catch(e) {
            return {error: true};
        }
    }

    // googleVerify = (accessToken) => {
    //     fetch(Constant.urlBase + 'api/owner/googleVerify', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             token: accessToken,
    //         })
    //     })
    //         .then((response) => response.json())
    //         .then((res) => {
    //             console.log(res)
    //         })
    //         .done();
    // };

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
                    AsyncStorage.setItem('username', res.username);
                    //AsyncStorage.setItem('jwt', res.jwt);
                    AsyncStorage.setItem('firstName', res.firstName);
                    AsyncStorage.setItem('lastName', res.lastName);
                    AsyncStorage.setItem('email', res.email);
                    AsyncStorage.setItem('bio', res.bio);
                    AsyncStorage.setItem('user_id', res.user_id);
                    AsyncStorage.setItem('picture', '');
                    this.props.navigation.dispatch(NavigationActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'Profile'})]
                        })
                    )
                }
            })
            .done();
    };
}

const iconStyles = {
    borderRadius: 10,
    textAlign: 'center',
    //iconStyle: { paddingVertical: 2 },
};

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
        justifyContent: 'center',
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
        flex: 1,
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,1)',
        marginBottom: 10,
        paddingHorizontal: 10,
        width: 250,
    },
    googleButton: {
        flex:1,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingTop: 15,
    },
});

export default Login;