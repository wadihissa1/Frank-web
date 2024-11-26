'use client';
// Chakra Imports
import {
  Flex,
  Button,
  Icon,
  Text,
  Img,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { IoMdMoon, IoMdSunny } from 'react-icons/io';

export default function HeaderLinks() {
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  const navbarIcon = useColorModeValue('gray.500', 'white');
  const toggleText = colorMode === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode';

  return (
    <Flex
      zIndex="100"
      w="auto"
      alignItems="center"
      flexDirection="row"
      p="10px"
      gap="8px"
    >
      {/* Dark Mode Toggle */}
      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
        display="flex"
        alignItems="center"
        gap="8px"
        mr="16px"
      >
        <Icon
          h="18px"
          w="18px"
          color={navbarIcon}
          as={colorMode === 'light' ? IoMdMoon : IoMdSunny}
        />
        <Text fontSize="sm" color={navbarIcon}>
          {toggleText}
        </Text>
      </Button>
    </Flex>
  );
}
