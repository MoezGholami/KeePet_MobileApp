import React, { Component } from 'react';
import Moment from 'moment';
import Constant from './Constant';
import { Button as ButtonBase } from 'native-base';
import {
    Text,
    View,
    StyleSheet,
    Image,
    AsyncStorage,
    ScrollView,
} from 'react-native';

class ViewItem extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            description: '',
            startDate: '',
            endDate: '',
            petsInfo: [],
            location: {},
        }
    }

    componentDidMount() {
        this._loadInitialState().done;
    }

    _loadInitialState = async() => {
        let username = await AsyncStorage.getItem('userNameView');
        let email = await AsyncStorage.getItem('emailView');
        let description = await AsyncStorage.getItem('descriptionView');
        let startDate = await AsyncStorage.getItem('startDateView');
        let endDate = await AsyncStorage.getItem('endDateView');
        let petsInfo = JSON.parse(await AsyncStorage.getItem('petsInfoView'));
        let location = JSON.parse(await AsyncStorage.getItem('locationView'));
        if(username !== null) {
            this.setState({username: username});
        }
        if(email !== null) {
            this.setState({email: email});
        }
        if(description !== null) {
            this.setState({description: description});
        }
        if(startDate !== null) {
            this.setState({startDate: Moment(startDate).format('YYYY-MM-DD').toString()});
        }
        if(endDate !== null) {
            this.setState({endDate: Moment(endDate).format('YYYY-MM-DD').toString()});
        }
        if(petsInfo !== null) {
            this.setState({petsInfo: petsInfo});
        }
        if(location !== null) {
            this.setState({location: location});
        }
        AsyncStorage.removeItem('userNameView');
        AsyncStorage.removeItem('emailView');
        AsyncStorage.removeItem('descriptionView');
        AsyncStorage.removeItem('startDateView');
        AsyncStorage.removeItem('endDateView');
        AsyncStorage.removeItem('petsInfoView');
    }

    _onPressLocation = () => {
        this.props.navigation.navigate('MapViewItem')
    }

    render() {
        let petsInfo = [];
        for(let i = 0;i < this.state.petsInfo.length;i++) {
            petsInfo.push(
                <View key={i} style={styles.eachPet}>
                    <Image
                        style={styles.eachPetImage}
                        source={{uri: Constant.urlBase2 + this.state.petsInfo[i].photo}}
                    />
                    <View style={styles.eachPetInfo}>
                        <Text style={styles.text}>
                            type: {this.state.petsInfo[i].type}
                        </Text>
                        <Text style={styles.text}>
                            name: {this.state.petsInfo[i].name}
                        </Text>
                        <Text style={styles.text}>
                            breed: {this.state.petsInfo[i].breedName}
                        </Text>
                        <Text style={styles.text}>
                            sex: {this.state.petsInfo[i].sex}
                        </Text>
                        <Text style={styles.text}>
                            age: {this.state.petsInfo[i].age_month}
                        </Text>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Image style={styles.backgroundImage} source={require('../../image/main.jpg')}>
                    <ScrollView contentContainerStyle={styles.content}>
                        <View style={styles.user}>
                            <Text style={styles.text}>
                                User Name: {this.state.username}
                            </Text>
                            <Text style={styles.text}>
                                email: {this.state.email}
                            </Text>
                            <Text style={styles.text}>
                                description: {this.state.description}
                            </Text>
                            <Text style={styles.text}>
                                Start Date: {this.state.startDate}
                            </Text>
                            <Text style={styles.text}>
                                End Date: {this.state.endDate}
                            </Text>
                        </View>
                        {petsInfo}
                        <ButtonBase
                            info
                            style={{alignSelf: 'stretch', justifyContent: 'center', marginTop: 20}}
                            onPress={this._onPressLocation}
                        >
                            <Text>
                                View location
                            </Text>
                        </ButtonBase>
                    </ScrollView>
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
        alignItems: 'center',
        width: null,
        height: null,
        flex: 1,
    },
    content: {
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: 'transparent'
    },
    user: {
        marginTop: 80,
        paddingBottom: 20,
    },
    break: {
        backgroundColor: 'rgba(0,0,0,0)',
        fontSize: 6,
    },
    border: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
    },
    text: {
        fontSize: 18,
    },
    eachPet: {
        flexDirection: 'row',
        borderWidth: 1,
        padding: 10,
    },
    eachPetImage: {
        width: 100,
        height: 100,
        alignSelf: 'center',
    },
    eachPetInfo: {
        paddingLeft: 20,
    }
});

export default ViewItem