import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WrappedFieldProps } from 'redux-form';

import { colors } from '../../assets';
import LeftChevron from '../../assets/icons/LeftChevron';
import DropdownOptions from './DropdownOptions';
import Error from './Error';

export const DropdownInputComponent: React.FC<IDropdownInputProps> = ({
  label,
  placeholder,
  input,
  meta,
  options,
}) => {
  const view = useRef<View | undefined>(undefined) as React.MutableRefObject<
    View
  >;
  const [showOptions, setShowOptions] = useState(false);
  const [posY, setPosY] = useState(200);
  const [callback, setCallback] = useState<(() => void) | undefined>(undefined);

  useEffect(() => {
    callback && callback();
  }, [showOptions, posY]);

  const measure = () => {
    if (view.current) {
      view.current.measureInWindow((x, positionY) => {
        if (positionY) {
          setPosY(positionY + 30);
        }
      });
    } else {
      callback && callback();
    }
  };

  const showOptionsDrop = () => {
    const { onFocus } = input;
    setCallback(() => {
      setShowOptions(true);
      // @ts-ignore
      setCallback(onFocus);
    });
    measure();
  };

  const hideOptions = () => {
    const { onBlur } = input;
    setShowOptions(false);
    // @ts-ignore
    setCallback(onBlur);
  };

  const selectOption = (selectedOption: string) => {
    input.onChange(selectedOption);
  };

  const displayError = meta.invalid && meta.touched;
  return (
    <View ref={view} style={styles.container} collapsable={false}>
      <DropdownOptions
        select={selectOption}
        options={options}
        close={hideOptions}
        showOptions={showOptions}
        positionY={posY + (displayError ? 30 : 0)}
      />
      <Text style={styles.label}>{label}</Text>
      {displayError && <Error errorMessage={meta.error} />}
      <TouchableOpacity onPress={showOptionsDrop}>
        <View
          style={[
            styles.input,
            showOptions && styles.active,
            displayError && styles.onError,
          ]}
        >
          <Text
            testID="value"
            style={[styles.text, !input.value && styles.placeholder]}
          >
            {input.value ? input.value : placeholder}
          </Text>
        </View>
      </TouchableOpacity>
      <LeftChevron top={displayError ? 82 : 52} style={styles.chevron} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },
  label: {
    fontSize: 18,
    height: 24,
    fontWeight: 'bold',
    color: colors.textColor,
    marginBottom: 16,
  },
  input: {
    borderColor: colors.darkGrey,
    borderWidth: 1,
    height: 48,
    borderRadius: 2,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    fontSize: 16,
    color: colors.textColor,
  },
  placeholder: {
    color: colors.darkGrey,
  },
  active: {
    borderColor: colors.brandYellow,
    borderWidth: 2,
  },
  chevron: {
    transform: [{ rotate: '-90deg' }],
    position: 'absolute',
    right: 16,
  },
  onError: {
    borderColor: colors.red,
    borderLeftWidth: 3,
  },
});

export interface IDropdownValues {
  [key: string]: string;
}
export interface IDropdownInputProps extends WrappedFieldProps {
  label: string;
  placeholder: string;
  options: IDropdownValues;
}

export default DropdownInputComponent;
