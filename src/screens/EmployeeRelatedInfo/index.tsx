import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {requiredFields} from '@src/shared/constants';
import RNButton from '@src/shared/ui/Button';
import Header from '@src/shared/ui/Header';
import TextInputField from '@src/shared/ui/TextInputField';
import MainWrapper from '@src/shared/wrappers/MainWrapper';
import {AppDispatch} from '@src/store';
import {EGroupMode} from '@src/store/models/enums/group.enum';
import {EPath} from '@src/store/models/enums/route.enum';
import {selectUserData, setUserData} from '@src/store/slicers/user';
import React, {useCallback, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

interface IFormData {
  department: string;
  jobTitle: string;
  workExperience: string;
}

const EmployeeRelatedInfo = (): JSX.Element => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const userData = useSelector(selectUserData);
  const {navigate} = useNavigation();

  const methods = useForm<IFormData>({
    mode: 'all',
    defaultValues: {
      department: '',
      jobTitle: '',
      workExperience: '',
    },
  });

  const {handleSubmit} = methods;

  useFocusEffect(
    useCallback(() => {
      setSubmitted(false);
    }, []),
  );

  const onSubmit = (formData: IFormData) => {
    setSubmitted(true);
    dispatch(setUserData({...userData, ...formData}));
    navigate(EPath.GROUP as never, {mode: EGroupMode.REGISTRATION} as never);
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
          <View style={styles.itemWrapper}>
            <TextInputField
              name="workExperience"
              label="Work Experience"
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
