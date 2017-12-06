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
    Image,
} from 'react-native';
import Splash from "./Splash";

class Home extends Component<{}> {

    state = {
        firstName: '',
    };

    componentWillMount() {
        this._loadInitialState().done;
    };

    _loadInitialState = async() => {
        var user = await AsyncStorage.getItem('firstName');
        if(user !== null) {
            this.setState({firstName: user});
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
                <Image style={styles.backgroundImage} source={require('../../image/main.jpg')}>
                    <View style={styles.content}>
                        <Text>
                            {'Hello '+ this.state.firstName}
                        </Text>
                        <Text>
                            This is home
                        </Text>
                    </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        width: null,
        height: null,
        flex: 1,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    }
});


//AppRegistry.registerComponent('RCTTest', () => Splash);

export default Home