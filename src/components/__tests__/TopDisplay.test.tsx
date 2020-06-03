import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { ITopDisplayProps, TopDisplay } from '../TopDisplay';
import Balance from '../Balance';

describe('TopDisplay', () => {
  let topDisplayProps: ITopDisplayProps;
  let topDisplay: ShallowWrapper;
  beforeEach(() => {
    const onPressRefresh = jest.fn(() => {});
    const onPress = jest.fn(() => {});
    const changeScreen = jest.fn(() => {});
    topDisplayProps = {
      onPressRefresh,
      onPress,
      changeScreen,
      isAtTop: false,
      collapsed: false,
      balance: 0,
    };
    topDisplay = shallow(<TopDisplay {...topDisplayProps} />);
  });
  it('+++ Should render TopDisplay successfully with balance 0', () => {
    const amount = topDisplay.find(Balance);
    expect(amount.prop('balance')).toBe(0);
  });
  it('+++ Should not call changeScreen function when add button is not pressed', () => {
    expect(topDisplayProps.changeScreen).toBeCalledTimes(0);
  });
  it('+++ Should call changeScreen function when add button is pressed', () => {
    topDisplay
      .findWhere(node => node.prop('testID') === 'add')
      .simulate('press');
    expect(topDisplayProps.changeScreen).toBeCalledTimes(1);
  });
  it('+++ Should not call onPressRefresh function when add button is not pressed', () => {
    expect(topDisplayProps.onPressRefresh).toBeCalledTimes(0);
  });
  it('+++ Should call onPressRefresh function when add button is pressed', () => {
    topDisplay
      .findWhere(node => node.prop('testID') === 'refresh')
      .simulate('press');
    expect(topDisplayProps.onPressRefresh).toBeCalledTimes(1);
  });
  it('+++ Should not call onPress function when display is not pressed', () => {
    expect(topDisplayProps.onPress).toBeCalledTimes(0);
  });
  it('+++ Should call onPress function when display is pressed', () => {
    topDisplay.find('TouchableWithoutFeedback').simulate('press');
    expect(topDisplayProps.onPress).toBeCalledTimes(1);
  });
});
