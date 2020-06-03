import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import {
  DropdownInputComponent as DropdownInput,
  IDropdownInputProps,
} from '../DropdownInput';
import DropdownOptions, { Category } from '../DropdownOptions';
import { invalidateFieldAndFindError } from './Input.test';

describe('DropdownInput', () => {
  let input: ShallowWrapper;
  let inputProps: IDropdownInputProps;
  const label = 'Label text';
  const placeholder = 'Test placeholder';
  const metaError = 'metaError';
  const options = { ...Category };
  beforeEach(() => {
    const meta = {
      touched: false,
      error: metaError,
      invalid: false,
    };
    const reduxFormsDropdownInput = {
      onBlur: jest.fn(() => {}),
      onChange: jest.fn(() => {}),
      onFocus: jest.fn(() => {}),
      value: '',
    };
    inputProps = {
      label,
      placeholder,
      options,
      // @ts-ignore
      meta,
      // @ts-ignore
      input: reduxFormsDropdownInput,
    };
    input = shallow(<DropdownInput {...inputProps} />);
  });
  it('+++ Should render successfully', () => {
    expect(input).toHaveLength(1);
  });
  it('+++ Should not render an Error if Dropdown is not touched or invalid', () => {
    const error = input.findWhere(node => node.prop('testID') === 'error');
    expect(error).toHaveLength(0);
  });
  it('+++ Should render an Error if Dropdown is touched and invalid', () => {
    const error = invalidateFieldAndFindError(inputProps, input);
    expect(error).toHaveLength(1);
    expect(error.prop('errorMessage')).toBe(metaError);
  });
  it('+++ Should render placeholder text when no option is selected', () => {
    const value = input.findWhere(node => node.prop('testID') === 'value');
    expect(value).toHaveLength(1);
    expect(value.prop('children')).toBe(placeholder);
  });
  it('+++ Should render the selected value', () => {
    const newDropdownInputProps = {
      ...inputProps,
      input: {
        ...inputProps.input,
        value: options.TRAVEL,
      },
    };
    input.setProps(newDropdownInputProps);
    const value = input.findWhere(node => node.prop('testID') === 'value');
    expect(value).toHaveLength(1);
    expect(value.prop('children')).toBe(options.TRAVEL);
  });
  it('+++ Should not show options', () => {
    const dropdownOptions = input.find(DropdownOptions);
    expect(dropdownOptions).toHaveLength(1);
    expect(dropdownOptions.prop('showOptions')).toBeFalsy();
  });
  it('+++ Should not call onFocus if not pressed', () => {
    const touchable = input.find('TouchableOpacity');
    expect(touchable).toHaveLength(1);
    expect(inputProps.input.onFocus).not.toBeCalled();
  });
  it('+++ Should call onFocus if pressed', () => {
    const touchable = input.find('TouchableOpacity');
    touchable.simulate('press');
    expect(inputProps.input.onFocus).toBeCalled();
  });
  it('+++ Should show options on press', () => {
    const touchable = input.find('TouchableOpacity');
    touchable.simulate('press');
    const dropdownOptions = input.find(DropdownOptions);
    expect(dropdownOptions).toHaveLength(1);
    expect(dropdownOptions.prop('showOptions')).toBeTruthy();
  });
});
