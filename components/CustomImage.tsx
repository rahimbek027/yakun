import Image from "next/image";
import React from "react";

interface ImagePropsType {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  onClick?: () => void;
}

export const CustomImage: React.FC<ImagePropsType> = ({
  src,
  alt,
  width,
  height,
  priority,
  className,
  onClick,
}) => {
  return (
    <Image
      className="max-w-[250px] w-full h-[250px] object-contain"
      onClick={onClick}
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
    />
  );
};
