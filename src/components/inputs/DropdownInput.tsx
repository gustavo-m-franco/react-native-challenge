import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { WrappedFieldProps } from 'redux-form';

import { colors } from '../../assets';
import LeftChevron from '../../assets/icons/LeftChevron';
import DropdownOptions from './DropdownOptions';
import Error from './Error';

export class DropdownInputComponent extends React.PureComponent<
  IDropdownInputProps,
  IDropdownInputState
> {
  private view?: View;
  constructor(props: IDropdownInputProps) {
    super(props);
    this.state = {
      showOptions: false,
      positionY: 200,
    };
  }

  private measure = (callback: () => void) => {
    if (this.view) {
      this.view.measureInWindow((x, positionY) => {
        if (positionY) {
          this.setState({ positionY: positionY + 30 }, callback);
        }
      });
    } else {
      callback();
    }
  };

  private referenceView = (view: View) => {
    this.view = view;
  };

  private showOptions = () => {
    const { onFocus } = this.props.input;
    this.measure(() => {
      this.setState({ showOptions: true }, () => {
        // @ts-ignore
        onFocus();
      });
    });
  };

  private hideOptions = () => {
    const { onBlur } = this.props.input;
    this.setState({ showOptions: false }, () => {
      // @ts-ignore
      onBlur();
    });
  };

  private selectOption = (selectedOption: string) => {
    const { input } = this.props;
    input.onChange(selectedOption);
  };

  public render() {
    const { showOptions, positionY } = this.state;
    const { label, placeholder, input, meta, options } = this.props;
    const displayError = meta.invalid && meta.touched;
    return (
      <View
        ref={this.referenceView}
        style={styles.container}
        collapsable={false}
      >
        <DropdownOptions
          select={this.selectOption}
          options={options}
          close={this.hideOptions}
          showOptions={showOptions}
          positionY={positionY + (displayError ? 30 : 0)}
        />
        <Text style={styles.label}>{label}</Text>
        {displayError && <Error errorMessage={meta.error} />}
        <TouchableOpacity onPress={this.showOptions}>
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
  }
}

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

export interface IDropdownInputState {
  showOptions: boolean;
  selectedOption?: string;
  positionY: number;
}

export interface IDropdownValues {
  [key: string]: string;
}
export interface IDropdownInputProps extends WrappedFieldProps {
  label: string;
  placeholder: string;
  options: IDropdownValues;
}

export default DropdownInputComponent;
