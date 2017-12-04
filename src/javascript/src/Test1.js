import React, { Component } from 'react';
import Constant from './Constant';
import { Button } from 'native-base';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';

class Test1 extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            petID: '',
            options: {},
        };
    }

    componentWillMount() {
        var options = {'option1': true, 'option2': false };
        var startDate = new Date(2013, 2, 1, 1, 10);
        var endDate = new Date(2017, 2, 1, 1, 10);
        //console.log(startDate);
        this.setState({options: options, startDate: startDate, endDate: endDate});
    }

    render() {
        //console.log(this.state.options['option1']);
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.input}
                               onChangeText={(petID) => this.setState({petID})}
                               value = {this.state.petID}
                               placeholder='petID'>
                    </TextInput>
                    <TouchableOpacity style={styles.button} onPress={ this.send }>
                        <Text style={styles.buttonText}>
                            send
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    send = () => {
        fetch(Constant.urlBase + 'owner/new_job_post_upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                petID: this.state.petID,
                options: this.state.options,
            })
        })
            .then((response) => {
            console.log(response)
            response.json()
            })
            .then((res) => {
                console.log(res)
            })
            .catch((error) => {
                console.log(error)
            })
            .done()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
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
        backgroundColor: 'rgba(255,255,255,1)',
        marginBottom: 10,
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
});

export default Test1;