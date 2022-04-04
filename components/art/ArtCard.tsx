import { Box, Flex, Text, Avatar, BoxProps } from "@chakra-ui/react";
import { Art } from "@/types";
import BlurImage from "../BlurImage";
import { FC } from "react";

interface ArtCardProps extends BoxProps {
  art: Art;
}

const ArtCard: FC<ArtCardProps> = ({ art, ...props }) => {
  return (
    <Box {...props}>
      <BlurImage
        key={art.id}
        width="300"
        height="300"
        layout="responsive"
        src={art.artUrl}
        alt={art.title}
        objectFit="cover"
      />
      <Text mt="1" fontSize="xs" color="gray.500">
        {new Date(art.creationDate).getFullYear()}
      </Text>
      <Text mt="1" fontSize="lg" fontWeight="bold" color="gray.700">
        {art.title}
      </Text>
      <Text noOfLines={2} color="gray.600">
        {art.description}
      </Text>
      <Flex mt="2" alignItems="center">
        <Avatar name={art.artist} size="xs" />
        <Text ml="1" fontSize="sm" color="gray.500">
          {art.artist}
        </Text>
      </Flex>
    </Box>
  );
};

export default ArtCard;
