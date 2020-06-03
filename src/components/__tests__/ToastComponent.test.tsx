import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import ToastComponent, { IToastProps } from '../Toast';
import { NotificationTypes } from '../../store/notification';

describe('ToastComponent', () => {
  jest.useFakeTimers();
  let toast: ShallowWrapper;
  const title = 'Test title';
  const message = 'Test message';
  const type = NotificationTypes.ERROR;
  const show = false;
  let hide: () => void;
  let toastProps: IToastProps;
  beforeEach(() => {
    hide = jest.fn(() => {});
    toastProps = {
      title: undefined,
      hide,
      message,
      type,
      show,
    };
    toast = shallow(<ToastComponent {...toastProps} />);
  });
  it('+++ Should render one text component.', () => {
    jest.runAllTimers();
    expect(toast.find('Text')).toHaveLength(1);
    const text = toast.find('Text').prop('children');
    expect(text).toBe(message);
  });
  it('+++ Should not call hide function.', () => {
    jest.runAllTimers();
    expect(hide).toHaveBeenCalledTimes(0);
  });
  it('+++ Should render title if title is provided.', () => {
    const newProps = {
      ...toastProps,
      title,
    };
    toast.setProps(newProps);
    const text = toast.find('Text');
    expect(text).toHaveLength(2);
    expect(text.at(0).prop('children')).toBe(title);
  });
  it('+++ Should call hide function some time after show changes to true.', () => {
    const newProps = {
      ...toastProps,
      show: true,
    };
    toast.setProps(newProps);
    jest.runAllTimers();
    expect(hide).toHaveBeenCalledTimes(1);
  });
});
