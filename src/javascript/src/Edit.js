import React, { Component } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Constant from './Constant';
import { Button } from 'native-base';
import { NavigationActions } from 'react-navigation';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from 'react-native';

class Edit extends Component {
    constructor(props){
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            bio: '',
            user_id: '',
        };
    }

    componentDidMount() {
        this._loadInitialState().done;
    }

    _loadInitialState = async() => {
        let user_id = await AsyncStorage.getItem('user_id');
        if(user_id !== null) {
            this.setState({user_id: user_id});
        }
    };

    save = () => {
        fetch(Constant.urlBase + 'api/owner/edit', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                bio: this.state.bio,
                user_id: this.state.user_id,
            })
        })
            .then((response) => {
                response.json()
                if(response.status === 400) {
                    alert('Something went wrong.');
                } else {
                    alert('Update successfully');
                    AsyncStorage.setItem('firstName', this.state.firstName);
                    AsyncStorage.setItem('lastName', this.state.lastName);
                    AsyncStorage.setItem('email', this.state.email);
                    AsyncStorage.setItem('bio', this.state.bio);
                    this.props.navigation.dispatch(NavigationActions.reset({
                            index: 0,
                            actions: [NavigationActions.navigate({routeName: 'Profile'})]
                        })
                    )
                }
            })
            .done();
    };

    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImage} source={require('../../image/main.jpg')}>
                    <KeyboardAwareScrollView>
                        <ScrollView contentContainerStyle={styles.contentContainer}>
                            <Text style={styles.text}>
                                Edit your profile
                            </Text>
                            <Text style={styles.secondText}>
                                {"\n"} First Name
                            </Text>

                            <TextInput style={styles.input}
                                       onChangeText={(firstName) => this.setState({firstName})}
                                       value = {this.state.firstName}
                                       placeholder='firstName'>
                            </TextInput>
                            <Text style={styles.secondText}>
                                {"\n"} Last Name
                            </Text>
                            <TextInput style={styles.input}
                                       onChangeText={(lastName) => this.setState({lastName})}
                                       value = {this.state.lastName}
                                       placeholder='lastName'>
                            </TextInput>
                            <Text style={styles.secondText}>
                                {"\n"} Email
                            </Text>
                            <TextInput style={styles.input}
                                       onChangeText={(email) => this.setState({email})}
                                       value = {this.state.email}
                                       placeholder='email'>
                            </TextInput>
                            <Text style={styles.secondText}>
                                {"\n"} Biography
                            </Text>
                            <TextInput style={styles.inputBio}
                                       onChangeText={(bio) => this.setState({bio})}
                                       value = {this.state.bio}
                                       multiline = {true}
                                       placeholder='bio'>
                            </TextInput>
                            <Button style={styles.button} primary onPress={ this.save }>
                                <Text style={styles.buttonText}>
                                    save
                                </Text>
                            </Button>

                        </ScrollView>
                    </KeyboardAwareScrollView>
                </Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: null,
        height: null,
        flex: 1,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    text: {
        fontSize: 20,
        backgroundColor: 'rgba(0,0,0,0)',
        marginBottom: 10,
        marginTop: 80,
    },
    secondText: {
        paddingLeft: '10%',
        fontSize: 16,
        alignSelf: 'flex-start',
    },
    button: {
        backgroundColor: '#2980b9',
        paddingVertical: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 5,
        width: '60%',
        height: 40,
        marginBottom: 20,
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: 20,
    },
    input: {
        height: 40,
        width: '80%',
        paddingLeft: 10,
        fontSize: 16,
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,1)',
        marginBottom: 10,
    },
    inputBio: {
        height: 200,
        width: '80%',
        paddingLeft: 10,
        fontSize: 16,
        borderWidth: 1,
        backgroundColor: 'rgba(255,255,255,1)',
        marginBottom: 10,
    }
});

export default Edit;