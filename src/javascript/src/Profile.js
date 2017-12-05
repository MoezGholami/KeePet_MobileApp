import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    Image,
} from 'react-native';

class Profile extends Component<{}> {

    state = {
        username: '',
        isLoggedIn: false,
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
    };

    componentDidMount() {
        this._loadInitialState().done;
    };

    _loadInitialState = async() => {
        let username = await AsyncStorage.getItem('username');
        let firstName = await AsyncStorage.getItem('firstName');
        let lastName = await AsyncStorage.getItem('lastName');
        let email = await AsyncStorage.getItem('email');
        let bio = await AsyncStorage.getItem('bio');
        if(username !== null) {
            this.setState({
                username: username,
                isLoggedIn: true,
                firstName: firstName,
                lastName: lastName,
                email: email,
            });
            if(bio !== '') {
                this.setState({bio: bio})
            } else {
                this.setState({bio: 'Your haven\'t added your bio'})
            }
        }
    };

    _onPressButton() {
        if(this.state.isLoggedIn) {
            AsyncStorage.removeItem('username');
            AsyncStorage.removeItem('jwt');
            AsyncStorage.removeItem('firstName');
            AsyncStorage.removeItem('lastName');
            AsyncStorage.removeItem('email');
            AsyncStorage.removeItem('bio');
            AsyncStorage.removeItem('user_id');
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

    _onPressRegister() {
        this.props.navigation.navigate('Register');
    }

    _onPressPost() {
        this.props.navigation.navigate('Post');
    }

    _onPressEdit() {
        this.props.navigation.navigate('Edit');
    }

    render() {

        let profile = null;
        if(this.state.isLoggedIn) {
            profile = <View style={styles.container}>
                <Image style={styles.backgroundImage} source={require('../../image/main.jpg')}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => this._onPressRegister()}>
                            <Text style={styles.buttonText}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this._onPressButton()}>
                            <Text style={styles.buttonText}>
                                Sign out
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.break}>
                        {"\n"}
                    </Text>
                    <View style={styles.border} />
                    <Text style={styles.break}>
                        {"\n"}
                    </Text>
                    <View style={styles.textContainer}>

                        <Text style={styles.text}>
                            First Name: {this.state.firstName}
                        </Text>
                        <Text style={styles.text}>
                            Last Name: {this.state.lastName}
                        </Text>

                        <View>
                            <Text style={styles.text}>
                                Email: {this.state.email}
                            </Text>
                        </View>
                        <Text style={styles.text}>
                            Bio: {this.state.bio}
                        </Text>
                    </View>
                    <View style={styles.border} />
                    <Text style={styles.break}>
                        {"\n"}
                    </Text>
                    <View style={styles.buttonContainerBottom}>
                        <TouchableOpacity style={styles.button2} onPress={() => this._onPressPost()}>
                            <Text style={styles.buttonText}>
                                Post a Request
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button2} onPress={() => this._onPressEdit()}>
                            <Text style={styles.buttonText}>
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Image>
            </View>
        } else {
            profile = <View style={styles.container}>
                <Image style={styles.backgroundImage} source={require('../../image/main.jpg')}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={() => this._onPressRegister()}>
                            <Text style={styles.buttonText}>
                                Sign up
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this._onPressButton()}>
                            <Text style={styles.buttonText}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.break}>
                        {"\n"}
                    </Text>
                    <View style={styles.border} />
                    <Text style={styles.break}>
                        {"\n"}
                    </Text>
                </Image>
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
        //justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: '#F5FCFF',
    },
    button: {
        backgroundColor: '#2980b9',
        justifyContent: 'center',
        height: 40,
        marginTop: 80,
        width: '45%',
    },
    button2: {
        backgroundColor: '#2980b9',
        justifyContent: 'center',
        height: 40,
        //alignSelf: 'center',
        width: '45%',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonContainerBottom: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingLeft: 10,
        paddingTop: 15,
        paddingBottom: 15,
    },
    text: {
        fontSize: 18,
        paddingBottom: 20,
        backgroundColor: 'transparent',
    },
    break: {
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 6,
    },
    border: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    backgroundImage: {
        width: null,
        height: null,
        flex: 1,
    },
});

export default Profile