import React from 'react';
import {Button} from 'react-native-paper';

interface IRNButtonProps {
  text?: string;
  loading?: boolean;
  onPress: any;
}

const RNButton = ({
  text = 'Submit',
  loading = false,
  onPress,
}: IRNButtonProps): JSX.Element => {
  return (
    <Button
      mode="contained"
      loading={loading}
      disabled={loading}
      onPress={onPress}>
      {text}
    </Button>
  );
};

export default RNButton;
