import React, {memo} from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

type SpinnerSize = number | 'large' | 'small';

interface ISpinner {
  size?: SpinnerSize;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

const Spinner = ({
  size = 'large',
  color = '#2e1b46',
  style,
}: ISpinner): JSX.Element => {
  return (
    <ActivityIndicator
      size={size}
      color={color}
      style={style ?? styles.defaultStyle}
    />
  );
};

export default memo(Spinner);

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
  },
});
