import React from 'react';
import { render, RenderAPI } from '@testing-library/react-native';

import Title, { ITitleProps } from '../Title';

describe('Title', () => {
  let title: RenderAPI;
  const description = 'Description Test';
  const text = 'Text Test';
  const titleProps: ITitleProps = {
    description,
    text,
  };
  beforeEach(() => {
    title = render(<Title {...titleProps} />);
  });
  it('+++ Should render the text and description', () => {
    const { getByTestId } = title;
    expect(getByTestId('text').children[0]).toBe(text);
    expect(getByTestId('description').children[0]).toBe(description);
  });
  it('+++ Should not render the description', () => {
    const { queryByTestId, rerender } = title;
    rerender(<Title text="Text" />);
    expect(queryByTestId('description')).toBeNull();
  });
});
