import { FC, useState } from "react";

import { Box } from "@mui/material";
import { CirclePicker } from "react-color";

import { circlePickerStyle, colorPickerIconStyle } from "./style";
import { HexaColor } from "./types";
import { ColorPickerIcon } from "~/components/SVG/ColorPickerIcon";

export const ColorPicker: FC = () => {
  const [isCirclePickerVisible, setIsCirclePickerVisible] = useState(false);
  const [color, setColor] = useState<HexaColor>("#f44336");
  const handleColorChange = (newColor) => {
    console.log(newColor.type);
    setColor(newColor.hex);
    setIsCirclePickerVisible(false);
  };

  const handlePicker = () => {
    console.log("clicked");
    setIsCirclePickerVisible(!isCirclePickerVisible);
  };

  return (
    <Box sx={colorPickerIconStyle}>
      <ColorPickerIcon onClick={handlePicker} fill={color} />
      <Box sx={circlePickerStyle}>
        {isCirclePickerVisible && (
          <CirclePicker
            color={color}
            onChange={handleColorChange}
            circleSize={20}
            circleSpacing={5}
            width="16rem"
          />
        )}
      </Box>
    </Box>
  );
};
