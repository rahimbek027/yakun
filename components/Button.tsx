import React from "react";

interface ButtonType {
  title: string;
  icon?: any;
  iconPosition?: "prev" | "next";
  buttonWidth?: number;
  bgBtn: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const Button: React.FC<ButtonType> = ({
  title,
  icon,
  iconPosition = "next",
  buttonWidth,
  bgBtn,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      style={{ width: buttonWidth ? `${buttonWidth}px` : "auto" }} // Handle width
      className={`${bgBtn ? "bg-transparent" : "bg-[#46A358]"} ${
        icon ? "py-[8px]" : "py-[10px]"
      } hover:opacity-90 duration-300 rounded-[6px] flex items-center justify-center space-x-[4px] w-full`}
    >
      {icon && iconPosition === "prev" && icon}
      <span
        className={`${
          bgBtn
            ? "text-[#46A358] text-[12px] font-bold leading-[14px]"
            : "text-white font-medium leading-[20px] text-[16px] cursor-pointer"
        }`}
      >
        {title}
      </span>
      {icon && iconPosition === "next" && icon}
    </button>
  );
};
