import React, { Component } from 'react';
import Constant from './Constant';
import Moment from 'moment';
import { NavigationActions } from 'react-navigation';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    Image,
    FlatList, ActivityIndicator
} from 'react-native';
import { List, ListItem, SearchBar } from "react-native-elements";

class Home extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: [],
            error: null,
            refreshing: false,
            key: '',
        };
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
        const { page, seed } = this.state;
        const url = Constant.urlBase+'owner/all_job_posts';
        //const url = `https://randomuser.me/api/?seed=${seed}&page=${page}&results=20`;
        this.setState({ loading: true });

        fetch(url)
            .then(res => res.json())
            .then(res => {
                for(var i = 0;i < res.length;i++) {
                    res[i]['key'] = i;
                    var t = '';
                    for(var j = 0;j < res[i].pets.length;j++) {
                        t = t + res[i].pets[j].type + ' ';
                    }
                    res[i]['typeStr'] = t;
                }
                //console.log('ddd'+JSON.stringify(res));
                AsyncStorage.setItem('allData', JSON.stringify(res));
                this.setState({
                    data: res,
                    loading: false,
                    refreshing: false,
                })
                //console.log(res);
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

    renderHeader = () => {
        return <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            //value = {this.state.key}
            onChangeText={(key) => this._onSearch(key)}
        />;
    };

    _onSearch = async(key) => {
        this.setState({key: key});
        let data = JSON.parse(await AsyncStorage.getItem('allData'));
        let res = [];
        for(let i = 0;i < data.length;i++) {
            if(data[i].typeStr.toLowerCase().includes(key.toLowerCase())) {
                res.push(data[i])
            }
        }
        this.setState({data: res});
    }

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

    _onPressItem = async(key) => {
        let data = JSON.parse(await AsyncStorage.getItem('allData'));
        if(data !== null) {
            AsyncStorage.setItem('userNameView', data[key].owner.firstName + ' ' + data[key].owner.lastName);
            AsyncStorage.setItem('emailView', data[key].owner.email);
            AsyncStorage.setItem('descriptionView', data[key].description);
            AsyncStorage.setItem('startDateView', data[key].start_date);
            AsyncStorage.setItem('endDateView', data[key].end_date);
            AsyncStorage.setItem('petsInfoView', JSON.stringify(data[key].pets));
            AsyncStorage.setItem('locationView', JSON.stringify({lat: data[key].latitude, lon: data[key].longitude}));
            this.props.navigation.navigate('ViewItem');
        }
    };

    render() {
        return (
            <Image style={styles.backgroundImage} source={require('../../image/main.jpg')}>
            <List containerStyle={styles.container}>
                <FlatList
                    data={this.state.data}
                    renderItem={({ item }) => (
                        <ListItem
                            roundAvatar
                            title={`${item.owner.firstName} ${item.owner.lastName} -- ${item.typeStr}` }
                            subtitle={Moment(item.start_date).format('YYYY-MM-DD').toString() + ' - ' + Moment(item.end_date).format('YYYY-MM-DD')}
                            avatar={{ uri: Constant.urlBase + item.pets[0].photo }}
                            containerStyle={{ borderBottomWidth: 0 }}
                            onPress={() => this._onPressItem(item.key)}
                        />
                    )}
                    keyExtractor={item => item.key}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                    onRefresh={this.handleRefresh}
                    refreshing={this.state.refreshing}
                    //onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={50}
                />
            </List>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderTopWidth: 0,
        borderBottomWidth: 0,
        marginTop: 64,
        //backgroundColor: 'transparent',
        alignSelf: 'stretch',
    },
    backgroundImage: {
        //justifyContent: 'center',
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