// src/setupTests.ts
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
  adapter: new Adapter(),
});

jest.mock('react-native-gesture-handler', () => ({
  Directions: {},
  FlingGestureHandler: '',
}));

// The previous jest.mock('LayoutAnimation');
// Doesn't work anymore. See https://github.com/facebook/react-native/issues/26579
// This is intentional as we apparently need to mock the modules themselves now. However, there's no real fix except using the full path (which isn't ideal, see the issue above for details)
jest.mock('react-native/Libraries/LayoutAnimation/LayoutAnimation');
jest.mock('react-native/Libraries/Animated/src/Animated', () => ({
  ...jest.requireActual('react-native/Libraries/Animated/src/Animated'),
  timing: () => ({
    start: jest.fn(),
  }),
}));
