import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { colors } from '../../assets';
import { IDropdownValues } from './DropdownInput';

export enum Category {
  BILLS = 'Bills',
  EATING_OUT = 'Eating Out',
  ENTERTAINMENT = 'Entertainment',
  GENERAL = 'General',
  GIFTS = 'Gifts',
  SUBSCRIPTIONS = 'Subscriptions',
  TRAVEL = 'Travel',
  GROCERIES = 'Groceries',
}

const optionHeight = 32;
export const DropdownOptions: React.FunctionComponent<IDropdownOptionsProps> = ({
  showOptions,
  positionY,
  options,
  close,
  select,
}) => {
  const handlePress = (key: string) => () => {
    select(key);
    close();
  };
  const keys = Object.keys(options);
  return (
    <Modal
      animationIn={{
        from: { opacity: 0 },
        to: { opacity: 1 },
      }}
      animationOut={{
        from: { opacity: 1 },
        to: { opacity: 0 },
      }}
      onBackdropPress={close}
      style={styles.modal}
      isVisible={showOptions}
      backdropOpacity={0}
    >
      <View
        style={[
          styles.container,
          {
            height: 10 + keys.length * optionHeight,
            width: 272,
            top: positionY,
          },
        ]}
      >
        {keys.map((key, index) => (
          <TouchableOpacity
            testID={`option${index}`}
            key={key}
            onPress={handlePress(options[key])}
          >
            <Text style={styles.optionText}>{options[key]}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    marginHorizontal: 0,
    marginBottom: 0,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  container: {
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: colors.darkGrey,
    backgroundColor: colors.dropdownBackground,
    elevation: 4,
    shadowOffset: {
      width: 3,
      height: 9,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  optionText: {
    paddingLeft: 32,
    color: colors.textColor,
    fontSize: 14,
    lineHeight: optionHeight,
    fontFamily: 'Arial',
  },
});
export interface IDropdownOptionsProps {
  positionY: number;
  showOptions: boolean;
  options: IDropdownValues;
  close: () => void;
  select: (selectedOption: string) => void;
}

export default DropdownOptions;
