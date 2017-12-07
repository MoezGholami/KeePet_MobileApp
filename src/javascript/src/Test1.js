import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';
import {
    ScrollView,
    StyleSheet,
} from 'react-native';
export default class Test1 extends Component {
    render() {
        return (

<ScrollView contentContainerStyle={styles.contentContainer}>
                    <List>
                        <ListItem>
                            <Thumbnail square size={80} source={{ uri: 'Image URL' }} />
                            <Body>
                            <Text>Sankhadeep</Text>
                            <Text note>Its time to build a difference . .</Text>
                            </Body>
                        </ListItem>
                    </List>
</ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        width: null,
        height: null,
        flex: 1,
    },
    contentContainer: {
        justifyContent: 'center',
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
    },
})