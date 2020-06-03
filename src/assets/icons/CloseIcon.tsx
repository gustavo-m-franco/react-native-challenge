import React from 'react';
import Svg, { G, Use, Defs, Path, Mask } from 'react-native-svg';
import colors from '../colors';
import { IIcon } from './types';

const CloseIcon: React.FunctionComponent<IIcon> = ({ style, size = 1 }) => (
  <Svg width={24 * size} height={24 * size} style={style} viewBox="0 0 24 24">
    <Defs>
      <Path
        id="a"
        d="M13.487 12l5.205 5.205a1.052 1.052 0 0 1-1.487 1.487L12 13.487l-5.205 5.205a1.052 1.052 0 0 1-1.487-1.487L10.513 12 5.308 6.795a1.052 1.052 0 0 1 1.487-1.487L12 10.513l5.205-5.205a1.052 1.052 0 0 1 1.487 1.487L13.487 12z"
      />
    </Defs>
    <G fill="none" fillRule="evenodd">
      <Mask id="b" fill={colors.white}>
        <Use href="#a" />
      </Mask>
      <Use fill={colors.white} fillRule="nonzero" href="#a" />
      <G fill={colors.white} mask="url(#b)">
        <Path d="M0 0h24v24H0z" />
      </G>
    </G>
  </Svg>
);

export default CloseIcon;
