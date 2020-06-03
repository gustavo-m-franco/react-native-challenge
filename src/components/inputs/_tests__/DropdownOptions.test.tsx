import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Modal from 'react-native-modal';

import {
  DropdownOptions,
  IDropdownOptionsProps,
  Category,
} from '../DropdownOptions';

describe('DropdownOptions', () => {
  let dropdown: ShallowWrapper;
  let dropdownProps: IDropdownOptionsProps;
  beforeEach(() => {
    const positionY = 100;
    const options = { ...Category };
    const close = jest.fn(() => {});
    const select = jest.fn(() => {});
    dropdownProps = {
      showOptions: false,
      positionY,
      options,
      close,
      select,
    };
    dropdown = shallow(<DropdownOptions {...dropdownProps} />);
  });
  it('+++ Should render successfully but not show modal', () => {
    expect(dropdown).toHaveLength(1);
    expect(dropdown.prop('isVisible')).toBeFalsy();
  });
  it('+++ Should show modal when showOptions is true', () => {
    const newDropdownOptionsProps = {
      ...dropdownProps,
      showOptions: true,
    };
    dropdown.setProps(newDropdownOptionsProps);
    expect(dropdown.prop('isVisible')).toBeTruthy();
  });
  it('+++ Should not call close', () => {
    expect(dropdownProps.close).not.toBeCalled();
  });
  it('+++ Should call close onBackdropPress', () => {
    const modal = dropdown.find(Modal);
    expect(modal).toHaveLength(1);
    modal.simulate('backdropPress');
    expect(dropdownProps.close).toBeCalled();
  });
  it('+++ Should not call select', () => {
    expect(dropdownProps.select).not.toBeCalled();
  });
  it('+++ Should call select with value 1', () => {
    const touchable = dropdown.findWhere(
      node => node.prop('testID') === 'option1',
    );
    expect(touchable).toHaveLength(1);
    touchable.simulate('press');
    expect(dropdownProps.close).toBeCalled();
    expect(dropdownProps.select).toBeCalledWith('Eating Out');
  });
  it('+++ Should call select with value 0', () => {
    const touchable = dropdown.findWhere(
      node => node.prop('testID') === 'option0',
    );
    expect(touchable).toHaveLength(1);
    touchable.simulate('press');
    expect(dropdownProps.close).toBeCalled();
    expect(dropdownProps.select).toBeCalledWith('Bills');
  });
});
