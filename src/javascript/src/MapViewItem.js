import React from 'react';
import { MapView } from 'expo';
import {
    AsyncStorage,
} from 'react-native';

class MapViewItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: 0,
            lon: 0,
        }
    }

    componentDidMount() {
        this._loadInitialState().done;
    }

    _loadInitialState = async() => {
        let location = JSON.parse(await AsyncStorage.getItem('locationView'));
        if(location !== null) {
            this.setState({
                lat: location.lat,
                lon: location.lon,
            })
        }
    }

    render() {
        return (
            <MapView
                style={{ flex: 1 }}
                showsUserLocation={true}
                initialRegion={{
                    latitude: 30.290,
                    longitude: -97.731,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: this.state.lat,
                        longitude: this.state.lon,
                    }}
                />
            </MapView>
        );
    }
}

export default MapViewItem;