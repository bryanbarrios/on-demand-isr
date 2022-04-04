import { FC, useState } from "react";
import Image, { ImageProps } from "next/image";
import { css } from "@emotion/react";
import { Box } from "@chakra-ui/react";

const BlurImage: FC<ImageProps> = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  const blurUpImage = css({
    transition: ".6s ease-in-out",
    filter: isLoading ? "blur(40px) brightness(2)" : "blur(0) brightness(1)",
    transform: isLoading ? "scale(1.1)" : "scale(1.0)",
    willChange: "transform, filter",
    borderRadius: "1.5rem",
  });

  return (
    <Box overflow="hidden" borderRadius="1.5rem">
      <Image
        css={blurUpImage}
        {...props}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </Box>
  );
};

export default BlurImage;
