import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {EPath} from '@src/store/models/enums/route.enum';
import Initial from '@src/screens/Initial';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Profile from '@src/screens/Profile';
import Group from '@src/screens/Group';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '@src/store';
import {setGeolocation} from '@src/store/slicers/user';
import useCheckGeolocation from '@src/shared/hooks/useCheckGeolocation';
import SplashScreen from 'react-native-splash-screen';

const tabOptions: object = {
  headerShown: false,
  unmountOnBlur: true,
  tabBarActiveTintColor: '#52056b',
  tabBarInactiveTintColor: '#281e78',
  tabBarLabelStyle: {
    fontSize: 11,
  },
};

const TabNavigator = (): JSX.Element => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName={EPath.PROFILE}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={EPath.PROFILE}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: () => <MaterialIcon name="account-box" size={30} />,
          ...tabOptions,
        }}
        component={Profile}
      />
      <Tab.Screen
        name={EPath.GROUP}
        options={{
          tabBarLabel: 'MANAGE GROUP',
          tabBarIcon: () => <MaterialIcon name="groups" size={30} />,
          ...tabOptions,
        }}
        component={Group}
      />
    </Tab.Navigator>
  );
};

const AuthNavigator = (): JSX.Element => {
  const StackAuth = createStackNavigator();
  return (
    <StackAuth.Navigator
      initialRouteName={EPath.INITIAL}
      screenOptions={{headerShown: false}}>
      <StackAuth.Screen name={EPath.INITIAL} component={Initial} />
    </StackAuth.Navigator>
  );
};

const Routes = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const {coords, getLocation} = useCheckGeolocation();
  const isAuthenticated = false;

  const fetchUserLocation = useCallback(() => {
    if (coords?.latitude && coords?.latitude) {
      const data = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };
      dispatch(setGeolocation(data));
    } else {
      getLocation();
    }
  }, [coords?.latitude, coords?.longitude, dispatch, getLocation]);

  useEffect(() => {
    fetchUserLocation();
    SplashScreen.hide();
  }, [fetchUserLocation]);

  const generateScreen = useCallback((): JSX.Element => {
    return isAuthenticated ? <TabNavigator /> : <AuthNavigator />;
  }, [isAuthenticated]);

  return <>{generateScreen()}</>;
};

export default Routes;
