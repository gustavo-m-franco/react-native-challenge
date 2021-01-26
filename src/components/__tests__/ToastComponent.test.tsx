import React from 'react';
import { fireEvent, render, RenderAPI } from '@testing-library/react-native';

import ToastComponent, { IToastProps } from '../Toast';
import { NotificationTypes } from '../../store/notification';

describe('ToastComponent', () => {
  jest.useFakeTimers();
  let toast: RenderAPI;
  const title = 'Test title';
  const message = 'Test message';
  const type = NotificationTypes.ERROR;
  const show = false;
  let hide: jest.MockedFunction<() => void>;
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
    toast = render(<ToastComponent {...toastProps} />);
  });
  it('+++ Should not call hide function.', () => {
    jest.runAllTimers();
    expect(hide).toHaveBeenCalledTimes(0);
  });
  it('+++ Should call hide function message shows', async () => {
    const { rerender } = toast;
    const newProps = {
      ...toastProps,
      title,
      show: true,
    };
    rerender(<ToastComponent {...newProps} />);
    jest.runAllTimers();
    expect(hide).toHaveBeenCalledTimes(1);
  });
  it('+++ Should render title if title is provided.', () => {
    const { queryAllByText, rerender } = toast;
    const newProps = {
      ...toastProps,
      title,
    };
    expect(queryAllByText(title)).toHaveLength(0);

    rerender(<ToastComponent {...newProps} />);
    expect(queryAllByText(title)).toHaveLength(1);
  });
  it('+++ Should call hide function when cta is pressed', () => {
    const { getByText, rerender } = toast;
    const newProps = {
      ...toastProps,
      show: true,
    };
    rerender(<ToastComponent {...newProps} />);
    const messageComponent = getByText(message);
    fireEvent.press(messageComponent);
    expect(hide).toHaveBeenCalledTimes(1);
  });
});
