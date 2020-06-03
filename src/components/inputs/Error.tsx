import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { colors } from '../../assets';

const Error: React.FunctionComponent<IErrorProps> = ({ errorMessage }) => {
  return (
    <View style={styles.errorContainer}>
      <View style={styles.errorImage}>
        <Text style={styles.exclamation}>!</Text>
      </View>
      <Text testID="error" style={styles.error}>
        {errorMessage}
      </Text>
    </View>
  );
};

export interface IErrorProps {
  errorMessage: string;
}

const styles = StyleSheet.create({
  errorContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  errorImage: {
    backgroundColor: colors.brandYellow,
    height: 20,
    width: 20,
    borderRadius: 10,
    marginRight: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  error: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textColor,
  },
  exclamation: {
    color: colors.white,
    fontWeight: '900',
  },
});

export default Error;
