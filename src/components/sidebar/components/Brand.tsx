'use client';
// Chakra imports
import { Flex, Img, useColorModeValue } from '@chakra-ui/react';

import { HSeparator } from '@/components/separator/Separator';
import Fullualogo from '../../../../public/img/layout/fullualogo.png'; // Adjust the path to your logo

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue('navy.700', 'white');

  return (
    <Flex alignItems="center" flexDirection="column">
      <Img src={Fullualogo.src} alt="Fullualogo"  />
      <HSeparator mb="20px" w="284px" />
    </Flex>
  );
}

export default SidebarBrand;
