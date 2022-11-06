import {requiredFields} from '@src/shared/constants';
import RNButton from '@src/shared/ui/Button';
import Header from '@src/shared/ui/Header';
import TextInputField from '@src/shared/ui/TextInputField';
import MainWrapper from '@src/shared/wrappers/MainWrapper';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';

interface IFormData {
  department: string;
  jobTitle: string;
}

const EmployeeRelatedInfo = (): JSX.Element => {
  const [submitted, setSubmitted] = useState<boolean>(false);

  const methods = useForm<IFormData>({
    defaultValues: {
      department: '',
      jobTitle: '',
    },
  });

  const {handleSubmit} = methods;

  const onSubmit = (formData: IFormData) => {
    setSubmitted(true);
    console.log(formData);
  };

  return (
    <>
      <Header backIconVisible title="Employment-related information" />
      <MainWrapper>
        <FormProvider {...methods}>
          <View style={styles.itemWrapper}>
            <TextInputField
              name="department"
              label="Department"
              rules={{...requiredFields}}
            />
          </View>
          <View style={styles.itemWrapper}>
            <TextInputField
              name="jobTitle"
              label="Job title"
              rules={{...requiredFields}}
            />
          </View>
          <View style={[styles.itemWrapper, styles.submitBtnWrapper]}>
            <RNButton onPress={handleSubmit(onSubmit)} loading={submitted} />
          </View>
        </FormProvider>
      </MainWrapper>
    </>
  );
};

export default EmployeeRelatedInfo;

const styles = StyleSheet.create({
  itemWrapper: {
    marginTop: 10,
    marginBottom: 5,
  },
  submitBtnWrapper: {
    marginTop: 30,
  },
});
