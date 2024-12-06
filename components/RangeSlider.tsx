"use client";
import React, { useState } from "react";
import { Slider } from "antd";
import { Button } from "./Button";

interface RangeType {
  setRangeValue: (value: number[]) => void;
}

export const RangeSlider = ({ setRangeValue }: RangeType) => {
  const [values, setValues] = useState<number[]>([99, 800]);

  const onAfterChange = (value: number[]) => {
    setValues(value);
    setRangeValue(value);
  };

  return (
    <div>
      <Slider
        range
        step={1}
        value={values}
        min={39}
        max={1500}
        onAfterChange={onAfterChange}
        onChange={setValues}
      />
      <p>
        <span className="text-[15px] leading-[16px]"> Price:</span>
        <span className="font-semibold text-[#46A358] ml-2">
          {values[0]}$ -
        </span>
        <span className="font-semibold text-[#46A358]">{values[1]}$</span>
      </p>
      <br />
      <Button bgBtn={false} title="Filter" buttonWidth={90} />
    </div>
  );
};
