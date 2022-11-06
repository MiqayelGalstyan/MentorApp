import {Theme} from '@src/styles/Theme';
import React, {useState} from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {Checkbox} from 'react-native-paper';

interface ICheckboxProps {
  name: string;
  rules?: any;
  label?: string;
  color?: string;
}

const RNCheckbox = ({
  name,
  rules,
  label = '',
  color = '#2e1b46',
}: ICheckboxProps): JSX.Element => {
  const [checked, setChecked] = useState<boolean>(false);
  const {
    control,
    formState: {errors},
  } = useFormContext();

  const handlePress = (field: ControllerRenderProps<FieldValues, string>) => {
    setChecked(!checked);
    field.onChange(!checked);
  };

  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View style={styles.checkboxWrapper}>
          <Controller
            control={control}
            name={name}
            rules={rules}
            render={({field}) => (
              <Checkbox
                status={field.value ? 'checked' : 'unchecked'}
                onPress={() => handlePress(field)}
                color={color}
              />
            )}
          />
        </View>
        {label ? <Text style={styles.textFieldLabel}>{label}</Text> : null}
      </View>
      {errors && errors[name] ? (
        <Text style={styles.errorMessage}>
          {errors[name]?.message as string}
        </Text>
      ) : null}
    </View>
  );
};

export default RNCheckbox;

const styles = StyleSheet.create({
  root: {
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  checkboxWrapper: {
    width: 40,
    borderWidth: Platform.OS === 'android' ? 0 : 1,
    borderColor: Platform.OS === 'ios' ? 'darkgray' : 'none',
    borderRadius: Platform.OS === 'ios' ? 20 : 0,
  },
  errorMessage: {
    marginTop: 10,
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  textFieldLabel: {
    ...Theme.textFieldsLabel,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});
