import { FC, useState } from "react";
import Image, { ImageProps } from "next/image";
import { css } from "@emotion/react";

const BlurImage: FC<ImageProps> = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  const blurUpImage = css({
    transition: ".6s ease-in-out all",
    filter: isLoading ? "blur(40px)" : "blur(0)",
    transform: isLoading ? "scale(1.1)" : "scale(1.0)",
    willChange: "transform, filter",
    borderRadius: "1rem",
  });

  return (
    <Image
      css={blurUpImage}
      {...props}
      onLoadingComplete={() => setIsLoading(false)}
    />
  );
};

export default BlurImage;
