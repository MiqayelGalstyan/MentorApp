import {Theme} from '@src/styles/Theme';
import React, {memo, useState} from 'react';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';

interface ITextInputField {
  name: string;
  rules?: any;
  placeholder?: string;
  customValue?: string;
  onChangeCB?: (value: string) => void | any;
  keyboardType?: KeyboardTypeOptions;
  isPassword?: boolean;
  secureTextEntry?: boolean;
  errorMessageStyles?: StyleProp<TextStyle>;
  editable?: boolean;
  label?: string;
  selectTextOnFocus?: boolean;
}

const TextInputField = ({
  name,
  rules,
  placeholder,
  label = '',
  errorMessageStyles,
  customValue,
  onChangeCB,
  secureTextEntry = false,
  isPassword = false,
  keyboardType = 'default',
  editable = true,
  selectTextOnFocus = false,
}: ITextInputField) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const {
    control,
    formState: {errors},
  } = useFormContext();

  const handlePasswordToggle = (): void => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleChange = (
    text: string,
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    return onChangeCB ? onChangeCB(text) : field.onChange(text);
  };

  return (
    <View style={styles.inputWrapper}>
      {label ? <Text style={styles.textFieldLabel}>{label}</Text> : null}
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({field}) => (
          <TextInput
            onBlur={field.onBlur}
            onChangeText={text => handleChange(text, field)}
            value={customValue || field.value}
            placeholder={placeholder}
            editable={editable}
            style={styles.input}
            secureTextEntry={
              secureTextEntry && isPassword && !isPasswordVisible
            }
            keyboardType={keyboardType}
            selectTextOnFocus={selectTextOnFocus}
          />
        )}
      />
      {errors && errors[name] ? (
        <Text style={[styles.errorMessage, errorMessageStyles]}>
          {errors[name]?.message as string}
        </Text>
      ) : null}
      {isPassword && (
        <Ionicon
          name={!isPasswordVisible ? 'md-eye-off' : 'md-eye'}
          style={styles.passwordIcon}
          size={20}
          onPress={handlePasswordToggle}
        />
      )}
    </View>
  );
};

export default memo(TextInputField);

const styles = StyleSheet.create({
  errorMessage: {
    marginTop: 10,
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  inputWrapper: {
    position: 'relative',
  },
  passwordIcon: {
    position: 'absolute',
    right: 10,
    top: 26.5,
  },
  textFieldLabel: {
    ...Theme.textFieldsLabel,
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: 'darkgray',
    borderRadius: 3.5,
    paddingVertical: 5,
    height: 35,
    paddingHorizontal: 10,
    color: 'black',
  },
});
