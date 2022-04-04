import {
  Box,
  Text,
  Heading,
  Icon,
  BoxProps,
  keyframes,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";
import { FiRefreshCw } from "react-icons/fi";

const containerAnimationKeyframes = keyframes`
  0% {background-color: #FFF5F5;}
  25% {background-color: #FED7D7;}
  50% {background-color: #FFF5F5;}
  75% {background-color: #FED7D7;}
  100% {background-color: #FFF5F5;}
`;

const iconAnimationKeyframes = keyframes`
  0% { transform: rotate(0);}
  100% { transform: rotate(360deg);}
`;

const containerAnimation = `${containerAnimationKeyframes} 3s ease-in infinite`;
const iconAnimation = `${iconAnimationKeyframes} .8s linear infinite`;

const Header: FC<BoxProps> = (props) => {
  return (
    <Box {...props}>
      <Box
        as={motion.div}
        animation={containerAnimation}
        rounded="full"
        w="14"
        h="14"
        display="flex"
        justifyContent="center"
        alignItems="center"
        mb="2"
      >
        <Box w="7" h="7" as={motion.div} animation={iconAnimation}>
          <Icon as={FiRefreshCw} w="inherit" h="inherit" color="red.500" />
        </Box>
      </Box>
      <Heading
        letterSpacing="tight"
        bgGradient="linear(to-r, blue.400, cyan.400)"
        bgClip="text"
        fontSize="3xl"
        fontWeight="black"
      >
        On-Demand ISR
      </Heading>
      <Text
        letterSpacing="tight"
        bgGradient="linear(to-r, blue.400, cyan.400)"
        bgClip="text"
        fontWeight="medium"
        fontSize="lg"
      >
        An app for testing On-Demand Incremental Static Regeneration.
      </Text>
    </Box>
  );
};

export default Header;
