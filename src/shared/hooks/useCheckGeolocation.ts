import {useCallback, useEffect, useState} from 'react';
import {Alert, Linking, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from 'react-native-geolocation-service';

interface ICoords {
  latitude: number | string;
  longitude: number | string;
  currentCoordsVisible: boolean;
}

interface ICoordsReturnedType {
  coords: ICoords;
  getLocation: () => Promise<void>;
}

const useCheckGeolocation = (): ICoordsReturnedType => {
  const [coords, setCoords] = useState<ICoords>({
    latitude: '',
    longitude: '',
    currentCoordsVisible: false,
  });

  const hasPermissionIOS = async () => {
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    return false;
  };

  const hasLocationPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
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

    return false;
  }, []);

  const getLocation = useCallback(async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      Alert.alert(
        '',
        'App needs access to your location ,please allow',
        [
          {
            text: 'Ok',
            onPress: () => Linking.openSettings(),
          },
        ],
        {cancelable: false},
      );
      return;
    }

    Geolocation.getCurrentPosition(
      (position: Geolocation.GeoPosition) => {
        const data = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          currentCoordsVisible: true,
        };
        setCoords(data);
      },
      (error: Geolocation.GeoError) => {
        console.log(error, 'geolocationError');
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );
  }, [hasLocationPermission]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return {coords, getLocation};
};

export default useCheckGeolocation;
