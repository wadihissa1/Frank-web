'use client';

import {
  Button,
  Flex,
  Link,
  Img,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import FrankIconWhite from '../../../../public/img/svgs/FrankIconWhite.svg';

export default function SidebarDocs() {
  const bgColor = 'linear-gradient(135deg, #4D76FF 0%, #0F5CA8  100%)';
  const borderColor = useColorModeValue('white', 'navy.800');

  return (
    <Flex
      justify="center"
      direction="column"
      align="center"
      bg={bgColor}
      borderRadius="16px"
      position="relative"
    >
      <Flex
        border="5px solid"
        borderColor={borderColor}
        bg="linear-gradient(135deg, #4D76FF 0%, #0F5CA8 100%)"
        borderRadius="50%"
        w="80px"
        h="80px"
        align="center"
        justify="center"
        mx="auto"
        position="absolute"
        left="50%"
        top="-47px"
        transform="translate(-50%, 0%)"
      >
        <Img src={FrankIconWhite.src} w="50px" h="50px" />
      </Flex>
      <Flex
        direction="column"
        mb="12px"
        align="center"
        justify="center"
        px="15px"
        pt="55px"
      >
        <Text
          fontSize={{ base: 'lg', xl: '18px' }}
          color="white"
          fontWeight="bold"
          lineHeight="150%"
          textAlign="center"
          mb="14px"
        >
          Go unlimited with Frank
        </Text>
        <Text fontSize="14px" color={'white'} mb="14px" textAlign="center">
          This is Frank Your Antonine University Assistant
        </Text>
      </Flex>
      <Link href="https://horizon-ui.com/ai-template" isExternal>
        <Button
          bg="whiteAlpha.300"
          _hover={{ bg: 'whiteAlpha.200' }}
          _active={{ bg: 'whiteAlpha.100' }}
          mb={{ sm: '16px', xl: '24px' }}
          color={'white'}
          fontWeight="regular"
          fontSize="sm"
          minW="185px"
          mx="auto"
          borderRadius="45px"
        >
          Get started with FRANK
        </Button>
      </Link>
    </Flex>
  );
}
