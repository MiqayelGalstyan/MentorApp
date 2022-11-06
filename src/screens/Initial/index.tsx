import Header from '@src/shared/ui/Header';
import {FormProvider, useForm} from 'react-hook-form';
import TextInputField from '@src/shared/ui/TextInputField';
import MainWrapper from '@src/shared/wrappers/MainWrapper';
import {Image, StyleSheet, Text, View} from 'react-native';
import RNButton from '@src/shared/ui/Button';
import React, {useMemo, useState} from 'react';
import ImagePicker, {ImageOrVideo} from 'react-native-image-crop-picker';
import useCheckGeolocation from '@src/shared/hooks/useCheckGeolocation';
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

const requiredFields = {
  required: {
    value: true,
    message: 'Required field',
  },
};

const Initial = (): JSX.Element => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const {coords, getLocation} = useCheckGeolocation();

  const methods = useForm<IFormData>({
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

  const onSubmit = (formData: IFormData) => {
    setSubmitted(true);
    console.log(formData, 'formData');
  };

  const onAvatarChange = (image: ImageOrVideo): void => {
    setValue('image', image.path);
  };

  const openCamera = (): void => {
    ImagePicker.openCamera({
      ...imageProperties,
      useFrontCamera: true,
    }).then(image => {
      onAvatarChange(image);
    });
  };

  const removeImageHandler = (): void => {
    setValue('image', null);
  };

  const checkCoords = useMemo(() => {
    return coords.latitude && coords.longitude
      ? {latitude: coords.latitude, longitude: coords.longitude}
      : null;
  }, [coords.latitude, coords.longitude]);

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
          {uri ? (
            <>
              <View style={styles.itemWrapper}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={{uri}}
                    style={styles.avatar}
                    resizeMode="cover"
                  />
                  <RNButton
                    onPress={removeImageHandler}
                    text="Remove Photo"
                    color="#ff5505"
                  />
                </View>
              </View>
            </>
          ) : (
            <>
              <View style={styles.itemWrapper}>
                <RNButton
                  onPress={openCamera}
                  text="Upload Photo"
                  color="green"
                />
              </View>
            </>
          )}
          {checkCoords?.latitude && checkCoords?.longitude ? (
            <>
              <View style={styles.itemWrapper}>
                <Text style={styles.text}>
                  Latitude: {checkCoords?.latitude}
                </Text>
              </View>
              <View style={styles.itemWrapper}>
                <Text style={styles.text}>
                  Longitude: {checkCoords.longitude}
                </Text>
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
          )}
          <View style={[styles.itemWrapper, styles.submitBtnWrapper]}>
            <RNButton onPress={handleSubmit(onSubmit)} loading={submitted} />
          </View>
        </FormProvider>
      </MainWrapper>
    </>
  );
};

export default Initial;

const styles = StyleSheet.create({
  itemWrapper: {
    marginTop: 10,
    marginBottom: 5,
  },
  text: {
    fontWeight: '700',
    fontSize: 15,
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
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center',
  },
  submitBtnWrapper: {
    marginTop: 30,
  },
});
