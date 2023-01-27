import React from "react";
import cn from "classnames";

import * as css from "./ColorSelector.module.css";

import { colors } from "../../../identity/colors";

const colorOptions = [colors.brighter, colors.original, colors.darker];

export const ColorSelector = ({
  value,
  onChange,
  options = colorOptions,
  size = 30
}) => {
  const handleChange = (e, color) => {
    e.stopPropagation();
    onChange(color);
  };
  return (
    <div className={css.root}>
      {options.map((colorArray, optionsIndex) => (
        <div className={css.row} key={optionsIndex}>
          {colorArray.map((color, index) => (
            <div
              key={index}
              className={cn(css.color, { [css.selected]: value === color })}
              onClick={e => handleChange(e, color)}
              style={{ height: size, background: color }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
