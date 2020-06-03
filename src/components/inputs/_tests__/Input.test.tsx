import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import Input, { IInputProps } from '../Input';
import { store } from '../../../store';

export const metaError = 'metaError';
export const meta: WrappedFieldMetaProps = {
  asyncValidating: false,
  autofilled: false,
  dirty: false,
  dispatch: store.dispatch,
  form: '',
  initial: undefined,
  pristine: false,
  submitFailed: false,
  submitting: false,
  valid: false,
  visited: false,
  touched: false,
  error: metaError,
  invalid: false,
};
export const reduxFormsInput: WrappedFieldInputProps = {
  onBlur: jest.fn(() => {}),
  onChange: jest.fn(() => {}),
  onFocus: jest.fn(() => {}),
  onDragStart: jest.fn(() => {}),
  onDrop: jest.fn(() => {}),
  value: '',
  name: 'test-input',
};

export function invalidateFieldAndFindError(
  inputProps: IInputProps,
  input: ShallowWrapper<{}, {}, React.Component>,
) {
  const newInputProps = {
    ...inputProps,
    meta: {
      ...inputProps.meta,
      touched: true,
      invalid: true,
    },
  };
  input.setProps(newInputProps);
  const error = input.find('Error');
  return error;
}

describe('Input', () => {
  let input: ShallowWrapper;
  let inputProps: IInputProps;
  beforeEach(() => {
    inputProps = {
      label: 'Label text',
      placeholder: 'Test placeholder',
      meta,
      input: reduxFormsInput,
    };
    input = shallow(<Input {...inputProps} />);
  });
  it('+++ Should not render an Error if not touched or invalid', () => {
    const error = input.findWhere(node => node.prop('testID') === 'error');
    expect(error).toHaveLength(0);
  });
  it('+++ Should render an Error if touched and invalid', () => {
    const error = invalidateFieldAndFindError(inputProps, input);
    expect(error).toHaveLength(1);
    expect(error.prop('errorMessage')).toBe(metaError);
  });
});
