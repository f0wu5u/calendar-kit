import React from "react";
import Svg, { Path } from "react-native-svg";

const SvgCheckOutArrow = React.memo(
  () => (
    <Svg viewBox="0 0 12 44" fill="currentColor" height={44} width={14}>
      <Path
        d="M12 22v22a7.856 7.856 0 0 1-7.579-5.789L.287 23.052a4 4 0 0 1 0-2.104l4.134-15.16A7.855 7.855 0 0 1 12 0v22Z"
        fill="#3C69F5"
      />
    </Svg>
  ),
  () => true,
);

SvgCheckOutArrow.displayName = "CheckOutArrow";
export default SvgCheckOutArrow;
