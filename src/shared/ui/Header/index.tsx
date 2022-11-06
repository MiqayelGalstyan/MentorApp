import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';

interface IHeaderProps {
  backIconVisible?: boolean;
  title: string;
}

const Header = ({
  backIconVisible = false,
  title = '',
}: IHeaderProps): JSX.Element => {
  const navigation = useNavigation();

  const previousScreenHandler = () => {
    navigation.goBack();
  };

  return (
    <>
      <Appbar.Header style={styles.header}>
        {backIconVisible && (
          <Appbar.BackAction onPress={previousScreenHandler} />
        )}
        <Appbar.Content title={title} />
      </Appbar.Header>
    </>
  );
};

export default memo(Header);

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    width: '100%',
    position: 'relative',
    paddingRight: 20,
    backgroundColor: '#2e1b46',
  },
});
