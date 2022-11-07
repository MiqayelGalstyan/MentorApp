import RNButton from '@src/shared/ui/Button';
import Header from '@src/shared/ui/Header';
import MainWrapper from '@src/shared/wrappers/MainWrapper';
import {selectUserData} from '@src/store/slicers/user';
import React from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSelector} from 'react-redux';
import Share from 'react-native-share';

const Profile = (): JSX.Element => {
  const userData = useSelector(selectUserData);

  const handleShare = () => {
    Share.open({
      title: 'Share',
      message: `
        FirstName: ${userData?.firstName},
        LastName: ${userData?.lastName},
        Latitude: ${userData?.latitude},
        Longitude: ${userData?.longitude},
        Department: ${userData?.department},
        Job Title: ${userData?.jobTitle}
        `,
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        err && console.log(err);
      });
  };

  return (
    <>
      <Header title="Profile" logoutBtnVisible />
      <MainWrapper>
        <View style={styles.container}>
          <ScrollView style={styles.scrollViewContainer}>
            <View style={styles.itemWrapper}>
              <Text style={styles.title}>Name: {userData?.firstName}</Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text style={styles.title}>LastName: {userData?.lastName}</Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text style={styles.title}>Latitude: {userData?.latitude}</Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text style={styles.title}>Longitude: {userData?.longitude}</Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text style={styles.title}>
                Department: {userData?.department}
              </Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text style={styles.title}>Job Title: {userData?.jobTitle}</Text>
            </View>
            <View style={styles.itemWrapper}>
              <Text style={styles.title}>
                Work Experience: {userData?.workExperience}
              </Text>
            </View>
            {userData?.image ? (
              <View style={styles.itemWrapper}>
                <Image
                  source={{uri: userData?.image}}
                  style={styles.avatar}
                  resizeMode="cover"
                />
              </View>
            ) : null}
            <View style={styles.itemWrapper}>
              <Text style={styles.title}>
                Work Experience: {userData?.workExperience}
              </Text>
            </View>
          </ScrollView>
        </View>
        <RNButton text="Share" onPress={handleShare} />
      </MainWrapper>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height - 350,
  },
  scrollViewContainer: {
    flex: 1,
  },
  itemWrapper: {
    marginBottom: 15,
  },
  avatar: {
    width: 150,
    height: 150,
    maxWidth: '100%',
    borderRadius: 150 / 2,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    color: 'black',
  },
});
