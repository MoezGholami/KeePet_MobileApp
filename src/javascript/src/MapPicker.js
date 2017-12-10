import React from 'react';
import { MapView } from 'expo';
import { Button as ButtonBase } from 'native-base';
import {
    StyleSheet,
    Text,
    AsyncStorage,
    View,
} from 'react-native';

class MapPicker extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            lat: 0,
            lon: 0,
        }
    }

    _onPressMap(res) {
        //console.log(res.nativeEvent)
        this.setState({
            lat: res.nativeEvent.coordinate.latitude,
            lon: res.nativeEvent.coordinate.longitude,
        })
    }

    _onPressButton = () => {
        AsyncStorage.setItem('locationPost', JSON.stringify({'lat': this.state.lat, 'lon': this.state.lon}));
        this.props.navigation.navigate('Post');
    }

    render() {
        return (
            <View style={{flex: 1}}>
            <MapView
                style={{ flex: 1 }}
                showsUserLocation={true}
                onPress={(res) => this._onPressMap(res)}
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
                <ButtonBase style={styles.button} primary onPress={() => this._onPressButton()}>
                    <Text>
                        Submit
                    </Text>
                </ButtonBase>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    button: {
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
    },
});

export default MapPicker;