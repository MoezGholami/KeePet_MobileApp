import React, { Component } from 'react';
import StackNav from '../router/stacknav';
import {
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';

class Splash extends Component<{}> {
    constructor(props){
        super(props);
        this.state = {
            timePassed: false
        };
    }

    componentDidMount() {
        setTimeout( () => {
            this.setState({timePassed: true})
        },2000);
    }

    render() {
        if(!this.state.timePassed) {
            return (
                <View style={styles.container}>
                    <Image style={styles.backgroundImage} source={require('../../image/background.jpg')}>
                        <View style={styles.content}>
                            <Text style={styles.welcome}>
                                Welcome to KeePet!
                            </Text>
                        </View>
                    </Image>
                </View>
            )
        } else {
            return (
                <StackNav/>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 30,
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,0)',
        margin: 10,
    },
});

export default Splash;