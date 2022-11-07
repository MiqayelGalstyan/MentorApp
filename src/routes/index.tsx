import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useCallback, useEffect} from 'react';
import {EPath} from '@src/store/models/enums/route.enum';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialUIIcon from 'react-native-vector-icons/MaterialIcons';
import Profile from '@src/screens/Profile';
import Group from '@src/screens/Group';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@src/store';
import {
  selectUserAuthStatus,
  setAuth,
  setGeolocation,
  setUserData,
} from '@src/store/slicers/user';
import useCheckGeolocation from '@src/shared/hooks/useCheckGeolocation';
import SplashScreen from 'react-native-splash-screen';
import EmployeeRelatedInfo from '@src/screens/EmployeeRelatedInfo';
import PersonalInfo from '@src/screens/PersonalInfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

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
      initialRouteName={EPath.AUTH_USER}
      screenOptions={{headerShown: false}}>
      <Tab.Screen
        name={EPath.PROFILE}
        options={{
          tabBarLabel: 'PROFILE',
          tabBarIcon: ({color}) => (
            <MaterialIcon name="account" color={color} size={30} />
          ),
          ...tabOptions,
        }}
        component={Profile}
      />
      <Tab.Screen
        name={EPath.GROUP}
        options={{
          tabBarLabel: 'MANAGE GROUP',
          tabBarIcon: ({color}) => (
            <MaterialUIIcon name="groups" color={color} size={30} />
          ),
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
      initialRouteName={EPath.REGISTRATION_FLOW}
      screenOptions={{headerShown: false}}>
      <StackAuth.Screen name={EPath.PERSONAL_INFO} component={PersonalInfo} />
      <StackAuth.Screen
        name={EPath.EMPLOYEE_RELATED_INFO}
        component={EmployeeRelatedInfo}
      />
      <StackAuth.Screen name={EPath.GROUP} component={Group} />
    </StackAuth.Navigator>
  );
};

const MainNavigator = (): JSX.Element => {
  const MainStack = createStackNavigator();
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      <MainStack.Screen
        name={EPath.REGISTRATION_FLOW}
        component={AuthNavigator}
      />
      <MainStack.Screen name={EPath.PROFILE} component={TabNavigator} />
    </MainStack.Navigator>
  );
};

const Routes = (): JSX.Element => {
  const dispatch = useDispatch<AppDispatch>();
  const {coords, getLocation} = useCheckGeolocation();
  const isAuthenticated = useSelector(selectUserAuthStatus);
  const {navigate} = useNavigation();

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

  const checkUserAuthenticated = useCallback(async () => {
    const data = await AsyncStorage.getItem('user');
    if (data) {
      dispatch(setAuth(true));
      dispatch(setUserData(JSON.parse(data)));
    } else {
      dispatch(setAuth(false));
    }
  }, [dispatch]);

  useEffect(() => {
    Promise.all([fetchUserLocation(), checkUserAuthenticated()]).then(() => {
      SplashScreen.hide();
    });
  }, [fetchUserLocation, checkUserAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate(EPath.PROFILE as never);
    } else {
      navigate(EPath.PERSONAL_INFO as never);
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <MainNavigator />
    </>
  );
};

export default Routes;
