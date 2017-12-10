import React from 'react';
import { MapView } from 'expo';
import Constant from './Constant';
import { Button as ButtonBase } from 'native-base';
import { List, ListItem, SearchBar } from "react-native-elements";
import {
    StyleSheet,
    View,
    Image,
    AsyncStorage,
} from 'react-native';

class Map extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            latInit: 0,
            lonInit: 0,
            isSearch: false,
            loading: false,
            data: [],
            flag: false,
        }
    }

    componentDidMount() {
        this.makeRemoteRequest();
    }

    makeRemoteRequest = () => {
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
                })
            })
            .catch(error => {
                this.setState({ error, loading: false });
            });
    };

    setMarkerRef = (ref) => {
        this.marker = ref
    };

    _onPressCallout(key) {
        AsyncStorage.setItem('userNameView', this.state.data[key].owner.firstName + ' ' + this.state.data[key].owner.lastName);
        AsyncStorage.setItem('emailView', this.state.data[key].owner.email);
        AsyncStorage.setItem('descriptionView', this.state.data[key].description);
        AsyncStorage.setItem('startDateView', this.state.data[key].start_date);
        AsyncStorage.setItem('endDateView', this.state.data[key].end_date);
        AsyncStorage.setItem('petsInfoView', JSON.stringify(this.state.data[key].pets));
        AsyncStorage.setItem('locationView', JSON.stringify({lat: this.state.data[key].latitude, lon: this.state.data[key].longitude}));
        this.props.navigation.navigate('ViewItem');
    }

    // _onSearch = async(key) => {
    //     this.setState({key: key});
    //     let data = JSON.parse(await AsyncStorage.getItem('allData'));
    //     let res = [];
    //     for(let i = 0;i < data.length;i++) {
    //         if(data[i].typeStr.toLowerCase().includes(key.toLowerCase())) {
    //             res.push(data[i])
    //         }
    //     }
    //     this.setState({data: res});
    // }

    render() {
        // console.log(this.state.data[0].owner)
        let Marker = []
        for(let i = 0;i <= this.state.data.length;i++) {
            if(i === this.state.data.length) {
                Marker.push(
                    <MapView.Marker
                        key={i}
                        coordinate={{
                            latitude: 0,
                            longitude: 0
                        }}
                        ref = {this.setMarkerRef}
                    >

                    </MapView.Marker>
                )} else {
                Marker.push(
                    <MapView.Marker
                        key={i}
                        title={this.state.data[i].owner.firstName + this.state.data[i].owner.lastName}
                        description={this.state.data[i].description}
                        coordinate={{
                            latitude: this.state.data[i].latitude,
                            longitude: this.state.data[i].longitude,
                        }}
                        ref={this.setMarkerRef}
                        onCalloutPress={() => this._onPressCallout(i)}
                    >

                    </MapView.Marker>
                )
            }
        }
        return (
            <Image style={styles.backgroundImage} source={require('../../image/main.jpg')}>
                <View style={{flex: 1, marginTop: 64}}>
                    {/*<SearchBar*/}
                        {/*placeholder="Type Here..."*/}
                        {/*lightTheme*/}
                        {/*round*/}
                        {/*onChangeText={(key) => this._onSearch(key)}*/}
                    {/*/>*/}
                    <MapView
                        style={{ flex: 1 }}
                        showsUserLocation={true}
                        onMarkerPress={() => {
                            if(this.state.flag) {
                                this.setState({flag: false})
                            } else {
                                this.marker.showCallout()
                            }
                        }}
                        initialRegion={{
                            latitude: 30.290,
                            longitude: -97.731,
                            latitudeDelta: 0.1822,
                            longitudeDelta: 0.0821,
                        }}
                    >
                        { Marker }
                    </MapView>
                </View>
            </Image>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
    },
    backgroundImage: {
        //justifyContent: 'center',
        alignItems: 'stretch',
        width: null,
        height: null,
        flex: 1,
    },
});

export default Map;