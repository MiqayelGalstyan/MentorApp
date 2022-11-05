import React, {memo} from 'react';
import {View, StyleSheet, StyleProp, TextStyle, ViewStyle} from 'react-native';
import {Snackbar} from 'react-native-paper';

interface ISnackbarAction {
  label: string;
  onPress: () => void;
}

interface ISnackbar {
  visible: boolean;
  onDismissSnackBar: () => void;
  duration?: number;
  action?: ISnackbarAction | undefined;
  style?: StyleProp<TextStyle>;
  wrapperStyle?: StyleProp<ViewStyle> | null;
  children: React.ReactNode;
}

const RNSnackbar = ({
  onDismissSnackBar,
  visible,
  action = undefined,
  duration = 7000,
  children,
  wrapperStyle = null,
  style,
}: ISnackbar) => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        duration={duration}
        onDismiss={onDismissSnackBar}
        action={action}
        wrapperStyle={wrapperStyle}
        style={style}>
        {children}
      </Snackbar>
    </View>
  );
};

export default memo(RNSnackbar);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
