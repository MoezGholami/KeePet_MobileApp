import React from 'react';
import { MapView } from 'expo';
import Constant from './Constant';
import { Button as ButtonBase } from 'native-base';
import {
    StyleSheet,
    Text,
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
        AsyncStorage.setItem('userNameView', this.state.data[key].username);
        AsyncStorage.setItem('emailView', this.state.data[key].email);
        AsyncStorage.setItem('descriptionView', this.state.data[key].description);
        AsyncStorage.setItem('startDateView', this.state.data[key].from);
        AsyncStorage.setItem('endDateView', this.state.data[key].to);
        AsyncStorage.setItem('petsInfoView', JSON.stringify(this.state.data[key].animals));
        AsyncStorage.setItem('locationView', JSON.stringify({lat: this.state.data[key].latitude, lon: this.state.data[key].longitude}));
        this.props.navigation.navigate('ViewItem');
    }

    render() {
        console.log(this.state.data)
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
                        title={this.state.data[i].title}
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
            <MapView
                style={{ flex: 1 }}
                showsUserLocation={true}
                onCalloutPress={() => {
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
});

export default Map;