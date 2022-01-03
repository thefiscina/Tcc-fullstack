//import liraries
import React, { useEffect, useState } from 'react';
import {
    Container, Header, ItemHeader, MapView
} from './styles';
import { connect, useDispatch } from 'react-redux';
import { ActivityIndicator, Alert, Dimensions, PermissionsAndroid, Platform, View } from 'react-native';
import { appLoaded, logout } from '../../store/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import MapMarkers from '../../components/Map/index';
// create a component
const HomeScreen = ({ navigation, isFocused }) => {

    const [isRefreshing, setIsRefreshing] = useState(false);
    const { width, height } = Dimensions.get("window");

    const ASPECT_RATIO = width / height;
    let LATITUDE_DELTA = 0.1;
    let LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const [region, setRegion] = useState({
        latitude: -20.301318,
        longitude: -40.396402,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });
    const [regionUser, setRegionUser] = useState({
        latitude: -20.301318,
        longitude: -40.396402,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    });
    const [isMapReady, setIsMapReady] = useState(false);
    const [location, setLatLong] = useState(null);
    const [listServices, setListServices] = useState([
        {
            latitude: -20.300493,
            longitude: -40.398236,
            icon: 'briefcase-check', ///  orçamento aceito
            color: '#16C72E'
        },
        {
            latitude: -20.300111,
            longitude: -40.397722,
            icon: 'briefcase-remove', // orçamento recusado
            color: '#E83A30'
        },
        {
            latitude: -20.300423,
            longitude: -40.397110,
            icon: 'briefcase', // sem interação
            color: '#16A9C7'
        },
        {
            latitude: -20.301409,
            longitude: -40.396203,
            icon: 'briefcase-clock', /// aguardando orçamento
            color: '#EECA66'
        },

        {
            latitude: -20.299507,
            longitude: -40.397990,
            icon: 'briefcase-account', /// orçamento em andamento
            color: '#6C16C7'
        },
    ]);

    const dispatch = useDispatch();



    function init() {
        getLocation();
    }


    function logOutSys() {
        const keys = ['@BRR:token', '@BRR:user']
        AsyncStorage.multiRemove(keys);
        dispatch(logout('LOGGOUT'));
        dispatch(appLoaded(true));
    }


    useEffect(() => {
        init();
        let focusListener = navigation.addListener('didFocus', () => init());
        return () => focusListener.remove();
    }, []);


    // permisions location
    async function hasLocationPermissionPlatform() {
        const openSetting = () => {
            Linking.openSettings().catch(() => {
                Alert.alert('Unable to open settings');
            });
        };
        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            return true;
        }

        if (status === 'denied') {
            Alert.alert('Location permission denied');
        }

        if (status === 'disabled') {
            Alert.alert(
                `Turn on Location Services to allow "${appConfig.displayName
                }" to determine your location.`,
                '',
                [
                    { text: 'Go to Settings', onPress: openSetting },
                    { text: "Don't Use Location", onPress: () => { } },
                ],
            );
        }

        return false;
    };

    async function hasLocationPermission() {
        if (Platform.OS === 'ios') {
            const hasPermission = await hasLocationPermissionPlatform();
            return hasPermission;
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            setInterval(() => {
                Alert.alert(
                    'Ativar GPS',
                    'Permissão de localização negada pelo usuário. Para Ativar segue este caminho: Configurações -> Location -> Permissões de Aplicativo.',
                );
            }, 30000);
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            // this.setState({ hasNeverAskAgain: true });
            setInterval(() => {
                Alert.alert(
                    'Ativar GPS',
                    'Permissão de localização revogada pelo usuário. Para Ativar segue este caminho: Configurações -> Location -> Permissões de Aplicativo.',
                );
            }, 30000);
        }

        return false;
    };

    async function getLocation() {
        const hasLocationPermission_ = await hasLocationPermission();

        if (!hasLocationPermission_) {
            return;
        }


        Geolocation.getCurrentPosition(
            async (position) => {
                // await setRegion({
                //     latitude: position.coords.latitude,
                //     longitude: position.coords.longitude,
                //     latitudeDelta: LATITUDE_DELTA,
                //     longitudeDelta: LONGITUDE_DELTA,
                // });
                // await setRegionUser({
                //     latitude: position.coords.latitude,
                //     longitude: position.coords.longitude,
                //     latitudeDelta: LATITUDE_DELTA,
                //     longitudeDelta: LONGITUDE_DELTA,
                // });
                setIsMapReady(true);
            },
            error => {
                Alert.alert(`Code ${error.code}`, error.message);
            },
            {
                accuracy: {
                    android: 'high',
                    ios: 'best',
                },
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
                distanceFilter: 0,
            },
        );
    };



    function onRefresh() {
        setIsRefreshing(true);
        init();
    }

    return (
        <Container>
            <Header>
                <ItemHeader></ItemHeader>
            </Header>
            <MapView>
                <View style={{ flex: 1 }} >
                    {
                        isMapReady ?
                            <MapMarkers
                                markers={listServices}
                                centerMap={region}
                                goToLatLong={location}
                                regionUser={regionUser}
                            />
                            :
                            <View style={{ position: 'relative', top: 100 }}>
                                <ActivityIndicator size="large" color="#11c1f3" />
                            </View>
                    }
                </View>
            </MapView>
        </Container>
    );
};



//make this component available to the app
export default connect()(HomeScreen)

