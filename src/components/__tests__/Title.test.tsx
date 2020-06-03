import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import Title, { ITitleProps } from '../Title';

describe('Title', () => {
  let title: ShallowWrapper;
  const description = 'Description Test';
  const text = 'Text Test';
  const titleProps: ITitleProps = {
    description,
    text,
  };
  beforeEach(() => {
    title = shallow(<Title {...titleProps} />);
  });
  it('+++ Should render the text', () => {
    const textComp = title
      .findWhere(node => node.prop('testID') === 'text')
      .shallow();
    expect(textComp).toHaveLength(1);
    expect(textComp.prop('children')).toBe(text);
  });
  it('+++ Should render a description ', () => {
    const descriptionComp = title
      .findWhere(node => node.prop('testID') === 'description')
      .shallow();
    expect(descriptionComp).toHaveLength(1);
    expect(descriptionComp.prop('children')).toBe(description);
  });
});
