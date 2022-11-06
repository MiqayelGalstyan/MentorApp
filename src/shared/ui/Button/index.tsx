import React from 'react';
import {Button} from 'react-native-paper';

interface IRNButtonProps {
  text?: string;
  loading?: boolean;
  disabled?: boolean;
  onPress: any;
  color?: string;
}

const RNButton = ({
  text = 'Submit',
  loading = false,
  disabled = false,
  color = '#2e1b46',
  onPress,
}: IRNButtonProps): JSX.Element => {
  return (
    <Button
      mode="contained"
      loading={loading}
      disabled={loading || disabled}
      color={color}
      onPress={onPress}>
      {text}
    </Button>
  );
};

export default RNButton;
