import { FC, useState } from "react";

import { Box } from "@mui/material";
import { CirclePicker } from "react-color";

import { circlePickerStyle, colorPickerIconStyle } from "./style";
import { ColorPickerIcon } from "~/components/SVG/ColorPickerIcon";
import { useGridModalProvider } from "~/providers/GridModalProvider";

export const ColorPicker: FC = () => {
  const [isCirclePickerVisible, setIsCirclePickerVisible] = useState(false);
  
  const {inputs, updateInputField} = useGridModalProvider();
  const handleColorChange = (newColor) => {
    updateInputField("color", newColor.hex);
    setIsCirclePickerVisible(false);
  };

  const handlePicker = () => {
    setIsCirclePickerVisible(!isCirclePickerVisible);
  };

  return (
    <Box sx={colorPickerIconStyle}>
      <ColorPickerIcon onClick={handlePicker} fill={inputs.color} />
      <Box sx={circlePickerStyle}>
        {isCirclePickerVisible && (
          <CirclePicker
            color={inputs.color}
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
