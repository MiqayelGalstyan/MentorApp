import Header from '@src/shared/ui/Header';
import {FormProvider, useForm} from 'react-hook-form';
import TextInputField from '@src/shared/ui/TextInputField';
import MainWrapper from '@src/shared/wrappers/MainWrapper';
import {Image, StyleSheet, Text, View} from 'react-native';
import RNButton from '@src/shared/ui/Button';
import React, {useCallback, useMemo, useState} from 'react';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import useCheckGeolocation from '@src/shared/hooks/useCheckGeolocation';
import {requiredFields} from '@src/shared/constants';
import {useToast} from 'react-native-toast-notifications';
import {toastConfigsError} from '@src/shared/constants/toastConfigs';
import {useDispatch, useSelector} from 'react-redux';
import {selectUserData, setUserData} from '@src/store/slicers/user';
import {AppDispatch} from '@src/store';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {EPath} from '@src/store/models/enums/route.enum';

interface IImageProperties {
  width: number;
  height: number;
  cropping: boolean;
  cropperCircleOverlay: boolean;
}

interface IFormData {
  firstName: string;
  lastName: string;
  latitude: number | string;
  longitude: number | string;
  image: string | null;
}

const imageProperties: IImageProperties = {
  width: 300,
  height: 400,
  cropping: true,
  cropperCircleOverlay: true,
};

const PersonalInfo = (): JSX.Element => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const {coords, getLocation} = useCheckGeolocation();
  const toast = useToast();
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch<AppDispatch>();
  const {navigate} = useNavigation();

  const methods = useForm<IFormData>({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      latitude: coords?.latitude ?? '',
      longitude: coords?.longitude ?? '',
      image: null,
    },
  });

  const {setValue, watch, handleSubmit} = methods;

  const uri = watch('image');

  useFocusEffect(
    useCallback(() => {
      setSubmitted(false);
    }, []),
  );

  const onSubmit = (formData: IFormData) => {
    if (!formData.image) {
      toast.show('Please upload photo', toastConfigsError);
      return;
    }
    setSubmitted(true);
    dispatch(
      setUserData({
        ...userData,
        ...formData,
        latitude: coords?.latitude,
        longitude: coords?.longitude,
      }),
    );
    navigate(EPath.EMPLOYEE_RELATED_INFO as never);
  };

  const onAvatarChange = useCallback(
    (image: ImageOrVideo) => {
      setValue('image', image.path);
    },
    [setValue],
  );

  const openCamera = useCallback(() => {
    ImagePicker.openCamera({
      ...imageProperties,
      useFrontCamera: true,
    }).then(image => {
      onAvatarChange(image);
    });
  }, [onAvatarChange]);

  const removeImageHandler = useCallback(() => {
    setValue('image', null);
  }, [setValue]);

  const checkCoords = useMemo(() => {
    return coords.latitude && coords.longitude
      ? {latitude: coords.latitude, longitude: coords.longitude}
      : null;
  }, [coords.latitude, coords.longitude]);

  const generateImageView = useCallback((): JSX.Element => {
    return uri ? (
      <>
        <View style={styles.avatarWrapper}>
          <Image source={{uri}} style={styles.avatar} resizeMode="cover" />
          <RNButton
            onPress={removeImageHandler}
            text="Remove Photo"
            color="#ff5505"
          />
        </View>
      </>
    ) : (
      <>
        <>
          <RNButton onPress={openCamera} text="Upload Photo" color="green" />
        </>
      </>
    );
  }, [openCamera, removeImageHandler, uri]);

  const generateGeolocationView = useCallback((): JSX.Element => {
    return checkCoords?.latitude && checkCoords?.longitude ? (
      <>
        <View style={styles.itemWrapper}>
          <Text style={styles.text}>Latitude: {checkCoords?.latitude}</Text>
        </View>
        <View style={styles.itemWrapper}>
          <Text style={styles.text}>Longitude: {checkCoords.longitude}</Text>
        </View>
      </>
    ) : (
      <>
        <View style={styles.itemWrapper}>
          <Text style={styles.title}>
            Please allow your Geolocation permission
          </Text>
          <RNButton onPress={getLocation} text="Get Geolocation" />
        </View>
      </>
    );
  }, [checkCoords?.latitude, checkCoords?.longitude, getLocation]);

  return (
    <>
      <Header title="Personal Information" />
      <MainWrapper>
        <FormProvider {...methods}>
          <View style={styles.itemWrapper}>
            <TextInputField
              name="firstName"
              label="First Name"
              rules={{...requiredFields}}
            />
          </View>
          <View style={styles.itemWrapper}>
            <TextInputField
              name="lastName"
              label="Last Name"
              rules={{...requiredFields}}
            />
          </View>
          <View style={styles.itemWrapper}>{generateImageView()}</View>
          {generateGeolocationView()}
          <View style={[styles.itemWrapper, styles.submitBtnWrapper]}>
            <RNButton onPress={handleSubmit(onSubmit)} loading={submitted} />
          </View>
        </FormProvider>
      </MainWrapper>
    </>
  );
};

export default PersonalInfo;

const styles = StyleSheet.create({
  itemWrapper: {
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontWeight: '700',
    fontSize: 15,
    color: 'black',
  },
  avatarWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 200,
    height: 200,
    maxWidth: '100%',
    borderRadius: 200 / 2,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  submitBtnWrapper: {
    marginTop: 30,
  },
  errorMessage: {
    marginTop: 10,
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
});
