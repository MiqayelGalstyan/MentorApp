import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {AppDispatch} from '@src/store';
import {selectUserData, setAuth, setUserData} from '@src/store/slicers/user';
import React, {memo} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface IHeaderProps {
  backIconVisible?: boolean;
  logoutBtnVisible?: boolean;
  title: string;
}

const Header = ({
  backIconVisible = false,
  logoutBtnVisible = false,
  title = '',
}: IHeaderProps): JSX.Element => {
  const navigation = useNavigation();
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(selectUserData);

  const previousScreenHandler = () => {
    navigation.goBack();
  };

  const handleLogOut = () => {
    AsyncStorage.removeItem('user');
    dispatch(setAuth(false));
    dispatch(
      setUserData({
        latitude: userData?.latitude,
        longitude: userData?.longitude,
      }),
    );
  };

  return (
    <>
      <Appbar.Header style={styles.header}>
        {backIconVisible && (
          <Appbar.BackAction onPress={previousScreenHandler} />
        )}
        <Appbar.Content title={title} />
        {logoutBtnVisible && (
          <TouchableOpacity onPress={handleLogOut}>
            <Ionicon
              name="log-in"
              size={20}
              style={styles.logoutBtn}
              color="white"
            />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        )}
      </Appbar.Header>
    </>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
    paddingRight: 20,
    backgroundColor: '#2e1b46',
  },
  logoutBtn: {
    width: 20,
    height: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 11,
    marginLeft: 3,
  },
});
