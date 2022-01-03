//import liraries
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import MapView, { Circle } from 'react-native-maps';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../../styles';

// create a component
export default function MapMarkers({ markers = [], centerMap, goToLatLong, raio = 1, regionUser }) {
    const { width, height } = Dimensions.get("window");
    const ASPECT_RATIO = width / height;
    const CARD_HEIGHT = height / 4;
    const CARD_WIDTH = CARD_HEIGHT - 50;
    let LATITUDE_DELTA = 0.1;
    let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const [isMapReady, setIsMapReady] = useState(false);
    const [region, setRegion] = useState(null);
    var map_ = useRef();

    useEffect(() => {
        console.log("centerMap", centerMap)
        setRegion(centerMap)
        map_.animateToRegion(centerMap, 350);
        setIsMapReady(true);
    }, [centerMap]);

    useEffect(() => {
        if (goToLatLong != null) {
            console.log("goToLatLong", goToLatLong)
            setRegion({
                latitude: goToLatLong.latitude,
                longitude: goToLatLong.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            })
            map_.animateToRegion({
                latitude: goToLatLong.latitude,
                longitude: goToLatLong.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }, 350);
        }

    }, [goToLatLong]);


    return (
        <MapView
            ref={map => map_ = map}
            initialRegion={region}
            style={{
                width: width,
                height: '100%'
            }}
        >
            <Circle
                center={regionUser}
                radius={1000}
                fillColor="rgba(255, 0, 0, 0.2)"
                strokeColor="rgba(255,0,0,0.5)"
                zIndex={2}
                strokeWidth={2}
            />
            <MapView.Marker
                coordinate={regionUser}>
                <Icon name="account-circle" size={25} color={'#F18E92'} />
            </MapView.Marker>

            {
                markers.length > 0 ?
                    markers.map((marker, index) => {
                        return (
                            marker.latitude != null && marker.longitude != null ?
                                <MapView.Marker
                                    coordinate={{
                                        latitude: marker.latitude,
                                        longitude: marker.longitude
                                    }}>

                                    <Icon name={marker.icon} size={34} color={marker.color} />
                                </MapView.Marker>
                                : null
                        );
                    })
                    : null
            }

        </MapView>
    );
};
