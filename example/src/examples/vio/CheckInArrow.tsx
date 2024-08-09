import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgCheckInArrow = React.memo(
  () => (
    <Svg viewBox="0 0 12 44" fill="currentColor" height={44} width={14}>
      <Path
        d="M0 22v22a7.856 7.856 0 0 0 7.579-5.789l4.134-15.159a4 4 0 0 0 0-2.104L7.579 5.788A7.855 7.855 0 0 0 0 0v22Z"
        fill="#3C69F5"
      />
    </Svg>
  ),
  () => true,
);

SvgCheckInArrow.displayName = "CheckInArrow";
export default SvgCheckInArrow;
