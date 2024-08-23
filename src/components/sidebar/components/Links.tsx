'use client';
/* eslint-disable */

// chakra imports
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  HStack,
  Text,
  List,
  Icon,
  ListItem,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import { IoMdAdd } from 'react-icons/io';
import NavLink from '@/components/link/NavLink';
import { IRoute } from '@/types/navigation';
import { PropsWithChildren, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface SidebarLinksProps extends PropsWithChildren {
  routes?: IRoute[];
}

export function SidebarLinks(props: SidebarLinksProps) {
  // Chakra color mode
  const pathname = usePathname();
  let activeColor = useColorModeValue('navy.700', 'white');
  let inactiveColor = useColorModeValue('gray.500', 'gray.500');
  let activeIcon = useColorModeValue('brand.500', 'white');
  let iconColor = useColorModeValue('navy.700', 'white');

  const { routes = [] } = props; // Default to empty array if routes are not provided

  // verifies if routeName is the one active (in browser input)
  const activeRoute = useCallback(
    (routeName: string) => {
      return pathname?.includes(routeName);
    },
    [pathname]
  );

  return (
    <Box>
      {/* You can add any static content or components here */}
      <Text fontSize="lg" fontWeight="bold" color={activeColor}>
        Frank
      </Text>
      {/* Example of a static link */}
      <NavLink href="/home">
        <Flex alignItems="center">
          <Icon as={FaCircle} w="6px" h="6px" me="8px" color={iconColor} />
          <Text color={activeColor} fontWeight="500" fontSize="sm">
            Chats
          </Text>
        </Flex>
      </NavLink>
    </Box>
  );
}

export default SidebarLinks;
