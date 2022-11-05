import Header from '@src/shared/ui/Header';
import React from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import TextInputField from '@src/shared/ui/TextInputField';
import MainWrapper from '@src/shared/wrappers/MainWrapper';
import {StyleSheet, Text, View} from 'react-native';
import RNButton from '@src/shared/ui/Button';
import {useState} from 'react';

const requiredFields = {
  required: {
    value: true,
    message: 'Required field',
  },
};

interface IFormData {
  firstName: string;
  lastName: string;
}

const Initial = (): JSX.Element => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const methods = useForm<IFormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = (formData: IFormData) => {
    setSubmitted(true);
    console.log(formData, 'formData');
  };

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
          <View style={styles.itemWrapper}>
            <Text style={styles.text}>Latitude: lat</Text>
          </View>
          <View style={styles.itemWrapper}>
            <Text style={styles.text}>Longitude: long</Text>
          </View>
          <View style={styles.itemWrapper}>
            <RNButton
              onPress={methods.handleSubmit(onSubmit)}
              loading={submitted}
            />
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
});
