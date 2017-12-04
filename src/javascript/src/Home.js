import React, { Component } from 'react';
import Constant from './Constant';
import { NavigationActions } from 'react-navigation';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    AppRegistry,
} from 'react-native';
import Splash from "./Splash";

class Home extends Component<{}> {

    state = {
        username: '',
    };

    componentWillMount() {
        this._loadInitialState().done;
    };

    _loadInitialState = async() => {
        var user = await AsyncStorage.getItem('username');
        if(user !== null) {
            this.setState({username: user});
        }
        /*AsyncStorage.getItem('jwt', (err, token) => {
            fetch(Constant.urlBase + 'api/owner/verify', {
                headers: {
                    Accept: 'application/json',
                    Authorization: `JWT ${token}`
                }
            })
                .then((response) => response.json())
                .then((json) => {
                    this.setState({
                        secret: json.secret,
                        //showIndicator: false
                    })
                })
                .catch(() => {
                    alert('There was an error fetching the secret info.')
                })
                .done()
        })
        */
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    {'Hello '+ this.state.username}
                </Text>
                <Text>
                    This is home
                </Text>
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
});


//AppRegistry.registerComponent('RCTTest', () => Splash);

export default Home