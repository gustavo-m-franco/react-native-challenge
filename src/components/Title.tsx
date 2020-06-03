import React from 'react';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';

import { colors } from '../assets';

const Title: React.FunctionComponent<ITitleProps> = ({
  text,
  description,
  marginTop,
  marginBottom,
  style,
  titleStyle,
}) => {
  return (
    <View style={style}>
      <Text
        testID="text"
        style={[styles.title, { marginBottom, marginTop }, titleStyle]}
      >
        {text}
      </Text>
      {!!description && (
        <Text testID="description" style={styles.description}>
          {description}
        </Text>
      )}
    </View>
  );
};

export interface ITitleProps {
  text: string;
  description?: string;
  marginBottom?: number;
  marginTop?: number;
  style?: ViewStyle;
  titleStyle?: TextStyle;
}
const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    letterSpacing: 0.0,
    lineHeight: 32,
    marginBottom: 32,
    textAlign: 'center',
    color: colors.textColor,
  },
  description: {
    fontSize: 16,
    color: colors.textColor,
    marginBottom: 18,
    lineHeight: 24,
  },
});

export default Title;
