import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { List, ListItem } from "react-native-elements";
import Constant from './Constant';
import { Button } from 'native-base';
import {
    Text,
    View,
    StyleSheet,
    AsyncStorage,
    Image,
    ScrollView,
    FlatList,
    ActivityIndicator,
} from 'react-native';

class Profile extends Component<{}> {

    state = {
        isLoggedIn: false,
        firstName: '',
        lastName: '',
        email: '',
        bio: '',
        picture: '',
        loading: false,
        data: [],
        refreshing: false
    };

    componentDidMount() {
        this._loadInitialState().done;
        this.makeRemoteRequest();
    };

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = Constant.urlBase+'owner/all_job_posts';
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                for(var i = 0;i < res.length;i++) {
                    res[i]['key'] = i;
                }
                this.setState({
                    data: res,
                    loading: false,
                    refreshing: false,
                })
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    handleRefresh = () => {
        this.setState(
            {
                refreshing: true
            },
            () => {
                this.makeRemoteRequest();
            }
        );
    };

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderFooter = () => {
        if (!this.state.loading) return null;

        return (
            <View
                style={{
                    paddingVertical: 20,
                    borderTopWidth: 1,
                    borderColor: "#CED0CE"
                }}
            >
                <ActivityIndicator animating size="large" />
            </View>
        );
    };

    _onPressItem(key) {
        AsyncStorage.setItem('userNameProfile', this.state.data[key].username);
        AsyncStorage.setItem('emailProfile', this.state.data[key].email);
        AsyncStorage.setItem('descriptionProfile', this.state.data[key].description);
        AsyncStorage.setItem('startDateProfile', this.state.data[key].from);
        AsyncStorage.setItem('endDateProfile', this.state.data[key].to);
        AsyncStorage.setItem('petsInfoProfile', JSON.stringify(this.state.data[key].animals));
        this.props.navigation.navigate('MyPost');
    };

    _loadInitialState = async() => {
        var user_id = await AsyncStorage.getItem('user_id');
        AsyncStorage.getItem('user_id', (error, text)=>{
            if(text !== null) {
                this.setState({isLoggedIn: true});
            }
        });
        AsyncStorage.getItem('firstName', (error, text)=>{
            if(text !== null) {
                this.setState({firstName: text});
            }
        });
        AsyncStorage.getItem('lastName', (error, text)=>{
            if(text !== null) {
                this.setState({lastName: text});
            }
        });
        AsyncStorage.getItem('email', (error, text)=>{
            if(text !== null) {
                this.setState({email: text});
            }
        });
        AsyncStorage.getItem('bio', (error, text)=>{
            if(text !== null) {
                this.setState({bio: text});
            }
        });
        AsyncStorage.getItem('picture', (error, text)=>{
            if(text !== null) {
                this.setState({picture: text});
            }
        });
    };

    _onPressButton() {
        if(this.state.isLoggedIn) {
            AsyncStorage.removeItem('username');
            //AsyncStorage.removeItem('jwt');
            AsyncStorage.removeItem('firstName');
            AsyncStorage.removeItem('lastName');
            AsyncStorage.removeItem('email');
            AsyncStorage.removeItem('bio');
            AsyncStorage.removeItem('user_id');
            AsyncStorage.removeItem('picture');
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
                    <ScrollView>
                        <View style={styles.buttonContainer}>
                            <Button style={styles.button} primary onPress={() => this._onPressRegister()}>
                                <Text style={styles.buttonText}>
                                    Sign up
                                </Text>
                            </Button>
                            <Button style={styles.button} primary onPress={() => this._onPressButton()}>
                                <Text style={styles.buttonText}>
                                    Sign out
                                </Text>
                            </Button>
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
                            <Button style={styles.button2} primary onPress={() => this._onPressPost()}>
                                <Text style={styles.buttonText}>
                                    Post a Request
                                </Text>
                            </Button>
                            <Button style={styles.button2} primary onPress={() => this._onPressEdit()}>
                                <Text style={styles.buttonText}>
                                    Edit Profile
                                </Text>
                            </Button>
                        </View>
                        <Text style={styles.break}>
                            {"\n"}
                        </Text>
                        <View style={styles.border} />
                        <Text style={styles.textList}>
                            All my posts
                        </Text>
                        <List containerStyle={styles.container}>
                            <FlatList
                                data={this.state.data}
                                renderItem={({ item }) => (
                                    <ListItem
                                        roundAvatar
                                        title={`${item.title}`}
                                        subtitle={item.username}
                                        avatar={{ uri: item.animals[0].image }}
                                        containerStyle={{ borderBottomWidth: 0 }}
                                        onPress={() => this._onPressItem(item.key)}
                                    />
                                )}
                                keyExtractor={item => item.key}
                                ItemSeparatorComponent={this.renderSeparator}
                                // ListHeaderComponent={this.renderHeader}
                                ListFooterComponent={this.renderFooter}
                                onRefresh={this.handleRefresh}
                                refreshing={this.state.refreshing}
                                //onEndReached={this.handleLoadMore}
                                onEndReachedThreshold={50}
                            />
                        </List>
                    </ScrollView>
                </Image>
            </View>
        } else {
            profile = <View style={styles.container}>
                <Image style={styles.backgroundImage} source={require('../../image/main.jpg')}>
                    <ScrollView>
                        <View style={styles.buttonContainer}>
                            <Button style={styles.button} primary onPress={() => this._onPressRegister()}>
                                <Text style={styles.buttonText}>
                                    Sign up
                                </Text>
                            </Button>
                            <Button style={styles.button} primary onPress={() => this._onPressButton()}>
                                <Text style={styles.buttonText}>
                                    Sign in
                                </Text>
                            </Button>
                        </View>
                        <Text style={styles.break}>
                            {"\n"}
                        </Text>
                        <View style={styles.border} />
                        <Text style={styles.break}>
                            {"\n"}
                        </Text>
                    </ScrollView>
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
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    textList: {
        fontSize: 18,
        paddingLeft: 10,
        paddingTop: 20,
        backgroundColor: 'transparent',
    }
});

export default Profile