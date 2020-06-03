import React from 'react';
import Svg, { G, Use, Defs, Path, Mask } from 'react-native-svg';
import { ViewStyle } from 'react-native';

const LeftChevron: React.FunctionComponent<ILeftChevron> = ({
  style,
  size = 1,
  top,
}) => (
  <Svg
    style={[style, { top }]}
    width={24 * size}
    height={24 * size}
    viewBox="0 0 24 24"
  >
    <Defs>
      <Path
        id="a"
        d="M9.414 12l6.293-6.293a1 1 0 1 0-1.414-1.414l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414L9.414 12z"
      />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="b" fill="#fff">
        <Use href="#a" />
      </Mask>
      <Use fill="#0C0C0C" fillRule="nonzero" href="#a" />
      <G fill="#4C4C4C" mask="url(#b)">
        <Path d="M0 0h24v24H0z" />
      </G>
    </G>
  </Svg>
);

interface ILeftChevron {
  style?: ViewStyle;
  size?: number;
  top?: number;
}

export default LeftChevron;
