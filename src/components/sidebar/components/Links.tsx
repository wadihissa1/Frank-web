'use client';

/* eslint-disable */
// chakra imports
import {
  Box,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaCircle } from 'react-icons/fa';
import NavLink from '@/components/link/NavLink';

export function SidebarLinks() {
  // Chakra color mode
  let activeColor = useColorModeValue('navy.700', 'white');
  let iconColor = useColorModeValue('navy.700', 'white');

  return (
    <Box>
      {/* Static Header */}
      <Text fontSize="lg" fontWeight="bold" color={activeColor} mb="20px">
        Frank
      </Text>

      {/* Static Links */}
      <NavLink href="/home">
        <Flex alignItems="center" mb="12px">
          <Icon as={FaCircle} w="6px" h="6px" me="8px" color={iconColor} />
          <Text color={activeColor} fontWeight="500" fontSize="sm">
            Chats
          </Text>
        </Flex>
      </NavLink>
      <NavLink href="/profile">
        <Flex alignItems="center" mb="12px">
          <Icon as={FaCircle} w="6px" h="6px" me="8px" color={iconColor} />
          <Text color={activeColor} fontWeight="500" fontSize="sm">
            Profile
          </Text>
        </Flex>
      </NavLink>
      <NavLink href="/settings">
        <Flex alignItems="center" mb="12px">
          <Icon as={FaCircle} w="6px" h="6px" me="8px" color={iconColor} />
          <Text color={activeColor} fontWeight="500" fontSize="sm">
            Settings
          </Text>
        </Flex>
      </NavLink>
    </Box>
  );
}

export default SidebarLinks;
