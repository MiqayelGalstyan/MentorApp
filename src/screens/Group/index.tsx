import Header from '@src/shared/ui/Header';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';

import EMPLOYEES_DATA from '@src/store/models/json/employees.json';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {EGroupMode} from '@src/store/models/enums/group.enum';
import MainWrapper from '@src/shared/wrappers/MainWrapper';
import {IEmployee} from '@src/store/models/interfaces/employee.interface';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FormProvider, useForm} from 'react-hook-form';
import RNButton from '@src/shared/ui/Button';
import RNCheckbox from '@src/shared/ui/Checkbox';
import {useToast} from 'react-native-toast-notifications';
import {toastConfigsError} from '@src/shared/constants/toastConfigs';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '@src/store';
import {selectUserData, setAuth, setUserData} from '@src/store/slicers/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {EPath} from '@src/store/models/enums/route.enum';

type IGroupRouteParams = {
  mode: string;
};
interface IFormData {
  row: Array<IEmployee>;
  employeesRow: Array<IEmployee>;
}

const renderItem = (
  item: IEmployee,
  drag: any,
  isActive: boolean,
): JSX.Element => (
  <ScaleDecorator>
    <TouchableOpacity
      onLongPress={drag}
      disabled={isActive}
      style={[styles.rowItem]}>
      <Text style={styles.title}>First Name: {item.first_name}</Text>
      <Text style={styles.title}>Last Name: {item.last_name}</Text>
      <Text style={styles.title}>Email: {item.email}</Text>
      <Text style={styles.title}>Department: {item.department}</Text>
      <Text style={styles.title}>Job Title: {item.job_title}</Text>
      <Text style={styles.title}>Gender: {item.gender}</Text>
      <Text style={styles.title}>Country: {item.country}</Text>
      <Text style={styles.title}>City: {item.city}</Text>
    </TouchableOpacity>
  </ScaleDecorator>
);

const Group = (): JSX.Element => {
  const [routeParamMode, setRouteParamMode] = useState(EGroupMode.UPDATE);

  const toast = useToast();

  const dispatch = useDispatch<AppDispatch>();

  const userData = useSelector(selectUserData);

  const {navigate} = useNavigation();

  const route = useRoute();

  const routeParams = route.params as IGroupRouteParams;

  const methods = useForm<IFormData>({
    mode: 'all',
    defaultValues: {
      row: [],
      employeesRow: [...EMPLOYEES_DATA],
    },
  });

  const {watch, setValue, handleSubmit} = methods;

  const watchSelectedEmployeesRow = watch('row');

  const watchEmployeesRow = watch('employeesRow');

  useFocusEffect(
    useCallback(() => {
      setRouteParamMode(EGroupMode.UPDATE);
    }, []),
  );

  useEffect(() => {
    if (routeParams) {
      if (routeParams.mode === EGroupMode.REGISTRATION) {
        setRouteParamMode(EGroupMode.REGISTRATION);
      } else {
        setRouteParamMode(EGroupMode.UPDATE);
      }
    }
  }, [routeParams]);

  useEffect(() => {
    if (
      userData &&
      userData?.employeesGroup &&
      userData?.employeesGroup?.length > 0
    ) {
      const updatedData = userData?.employeesGroup?.filter(
        (item: any) => item?.isChecked,
      );
      setValue('row', updatedData);
    }
  }, [userData, setValue]);

  const handleAddEditGroup = useCallback(() => {
    const updatedData = watchEmployeesRow?.filter(
      (item: any) => item.isChecked,
    );
    if (updatedData.length > 0) {
      if (updatedData.length > 5) {
        toast.show('Maximum employees are 5', toastConfigsError);
      } else {
        setValue('row', updatedData);
      }
    } else {
      toast.show('Please select employee', toastConfigsError);
    }
  }, [setValue, toast, watchEmployeesRow]);

  const handleCheck = (checked: boolean, index: number) => {
    setValue(`employeesRow.${index}.isChecked` as never, checked as never);
  };

  const onSubmit = (formData: IFormData) => {
    if (formData.row.length > 0) {
      dispatch(setUserData({...userData, employeesGroup: formData.row}));
      dispatch(setAuth(true));
      AsyncStorage.setItem(
        'user',
        JSON.stringify({...userData, employeesGroup: formData.row}),
      );
      navigate(EPath.PROFILE as never);
    }
  };

  return (
    <>
      <Header
        title="Employees group"
        backIconVisible={
          routeParams && routeParamMode === EGroupMode.REGISTRATION
        }
      />
      <FormProvider {...methods}>
        <MainWrapper>
          <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
              {watchEmployeesRow?.map((item: IEmployee, index: number) => (
                <View key={index}>
                  <Text style={styles.title}>
                    First Name: {item.first_name}
                  </Text>
                  <Text style={styles.title}>Last Name: {item.last_name}</Text>
                  <Text style={styles.title}>Email: {item.email}</Text>
                  <Text style={styles.title}>
                    Department: {item.department}
                  </Text>
                  <Text style={styles.title}>Job Title: {item.job_title}</Text>
                  <Text style={styles.title}>Gender: {item.gender}</Text>
                  <Text style={styles.title}>Country: {item.country}</Text>
                  <Text style={styles.title}>City: {item.city}</Text>
                  <RNCheckbox
                    onChangeCB={(checked: boolean) =>
                      handleCheck(checked, index)
                    }
                    name={`employeesRow.${index}.isChecked`}
                  />
                </View>
              ))}
            </ScrollView>
            {watchSelectedEmployeesRow.length > 0 &&
            watchEmployeesRow.length > 0 ? (
              <View style={styles.btnWrapper}>
                <RNButton text="Update Group" onPress={handleAddEditGroup} />
              </View>
            ) : null}
            {watchSelectedEmployeesRow.length === 0 ? (
              <View style={styles.btnWrapper}>
                <RNButton text="Create Group" onPress={handleAddEditGroup} />
              </View>
            ) : null}
          </View>
          {watchSelectedEmployeesRow.length > 0 ? (
            <View style={styles.employeesTitleContainer}>
              <Text style={styles.employeesListTitle}>
                You can reorder employees' priorities using drag and drop
              </Text>
            </View>
          ) : null}
          <DraggableFlatList
            data={watchSelectedEmployeesRow}
            renderItem={(field: any) =>
              renderItem(field.item, field.drag, field.isActive)
            }
            keyExtractor={(_, idx) => `${idx}`}
            style={styles.draggableListContainer}
            onDragEnd={({data}) => setValue('row', data)}
          />
          {routeParams && routeParamMode === EGroupMode.REGISTRATION ? (
            <View style={styles.signUpBtnWrapper}>
              <RNButton
                text="Sign Up"
                onPress={handleSubmit(onSubmit)}
                disabled={watchSelectedEmployeesRow.length === 0}
              />
            </View>
          ) : null}
        </MainWrapper>
      </FormProvider>
    </>
  );
};

export default Group;

const styles = StyleSheet.create({
  container: {
    height: 220,
  },
  draggableListContainer: {
    height: 230,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowItem: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#171717',
    shadowOffset: {width: -1, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderRadius: 10,
    marginBottom: 15,
  },
  scrollView: {
    flex: 1,
  },
  btnWrapper: {
    marginBottom: 15,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  employeesTitleContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  employeesListTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: 'orange',
    textAlign: 'center',
  },
  signUpBtnWrapper: {
    marginTop: 20,
  },
});
