import React from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import Error from './Error';
import { colors } from '../../assets';
import { IInputProps } from './Input';
import { CURRENCY_SYMBOL } from '../../services/format';

const MaskedInputComponent: React.FunctionComponent<IInputProps> = ({
  label,
  placeholder,
  input,
  meta,
  ...inputProps
}) => {
  const displayError = meta.invalid && meta.touched;
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        {displayError && <Error errorMessage={meta.error} />}
        <TextInputMask
          options={{
            precision: 2,
            separator: '.',
            delimiter: ',',
            unit: CURRENCY_SYMBOL,
            suffixUnit: '',
          }}
          type="money"
          keyboardType="numeric"
          placeholderTextColor={colors.darkGrey}
          style={[styles.input, displayError && styles.onError]}
          placeholder={placeholder}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          value={input.value}
          customTextInput={TextInput}
          customTextInputProps={{
            contextMenuHidden: true,
            selectTextOnFocus: false,
          }}
          {...inputProps}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 26,
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
    paddingHorizontal: 10,
    paddingVertical: 12,
    fontSize: 16,
    color: colors.textColor,
  },
  onError: {
    borderColor: colors.red,
    borderLeftWidth: 3,
  },
});

export default MaskedInputComponent;
