import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
} from 'react-native';

class Message extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImage} source={require('../../image/main.jpg')}>
                    <View style={styles.content}>
                        <Text>
                            This is message
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

export default Message