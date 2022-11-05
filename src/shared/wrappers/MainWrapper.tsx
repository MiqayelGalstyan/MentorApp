import React from 'react';
import {StyleSheet, View} from 'react-native';

interface IMainWrapperProps {
  children: React.ReactNode;
}

const MainWrapper = ({children}: IMainWrapperProps): JSX.Element => {
  return <View style={styles.root}>{children}</View>;
};

export default MainWrapper;

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
});
