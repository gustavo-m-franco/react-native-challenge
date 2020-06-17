import React from 'react';
import { TextInput, View, Text, StyleSheet, ViewStyle } from 'react-native';
import { WrappedFieldProps } from 'redux-form';

import Error from './Error';
import { colors } from '../../assets';
import { CURRENCY_SYMBOL } from '../../services/format';

const Input: React.FunctionComponent<IInputProps> = ({
  label,
  placeholder,
  input,
  meta,
  isNumeric,
  style,
  ...inputProps
}) => {
  const displayError = meta.invalid && meta.touched;
  return (
    <View style={style}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.label}>{label}</Text>
        </View>
        {displayError && <Error errorMessage={meta.error} />}
        <TextInput
          selectTextOnFocus={false}
          contextMenuHidden
          placeholderTextColor={colors.darkGrey}
          style={[styles.input, displayError && styles.onError]}
          placeholder={placeholder}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          value={input.value}
          {...inputProps}
        />
        {isNumeric && <Text style={styles.pounds}>{CURRENCY_SYMBOL}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    height: 24,
    color: colors.textColor,
    marginBottom: 16,
  },
  input: {
    borderColor: colors.darkGrey,
    borderWidth: 1,
    height: 48,
    borderRadius: 2,
    paddingHorizontal: 18,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textColor,
  },
  onError: {
    borderColor: colors.red,
    borderLeftWidth: 3,
  },
  pounds: {
    color: colors.textColor,
    fontSize: 16,
    position: 'absolute',
    left: 8,
    bottom: 14,
  },
});

export interface IInputProps extends WrappedFieldProps {
  label: string;
  placeholder: string;
  isNumeric?: boolean;
  style?: ViewStyle;
}

export default Input;
