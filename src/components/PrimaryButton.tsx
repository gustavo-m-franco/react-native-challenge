import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';

import { colors } from '../assets';

const PrimaryButton: React.FunctionComponent<IButtonProps> = ({
  text,
  style,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={!disabled ? onPress : undefined}
      style={[styles.container, !!disabled && { opacity: 0.35 }, style]}
    >
      <Text testID="buttonText" style={styles.label}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export interface IButtonProps {
  text: string;
  onPress?: (e?: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    zIndex: 100,
    backgroundColor: colors.brandYellow,
    borderRadius: 2,
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    color: colors.textColor,
  },
});

export default PrimaryButton;
