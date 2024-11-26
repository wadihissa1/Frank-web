'use client';
import React, { ReactNode } from 'react';
import { Box, Portal, Flex, Img, useDisclosure } from '@chakra-ui/react';
import Footer from '@/components/footer/FooterAdmin';
import Navbar from '@/components/navbar/NavbarAdmin';
import { getActiveRoute, getActiveNavbar } from '@/utils/navigation';
import { usePathname } from 'next/navigation';
import '@/styles/App.css';
import '@/styles/Contact.css';
import '@/styles/Plugins.css';
import '@/styles/MiniCalendar.css';
import AppWrappers from './AppWrappers';

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <html lang="en">
      <body id={'root'}>
        <AppWrappers>
          {pathname?.includes('register') || pathname?.includes('sign-in') ? (
            children
          ) : (
            <Box>

              <Box
                pt={{ base: '60px', md: '100px' }}
                minHeight="100vh"
                height="100%"
                overflow="auto"
                position="relative"
                maxHeight="100%"
                w="100%"
                maxWidth="100%"
                transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
                transitionDuration=".2s, .2s, .35s"
                transitionProperty="top, bottom, width"
                transitionTimingFunction="linear, linear, ease"
              >
                <Portal>
                  <Box>
                    <Navbar
                      onOpen={onOpen}
                      logoText={'UA Frank'}

                    />
                  </Box>
                </Portal>
                <Box
                  mx="auto"
                  p={{ base: '20px', md: '30px' }}
                  pe="20px"
                  minH="100vh"
                  pt="50px"
                >
                  {children}
                </Box>
                <Box>
                  <Footer />
                </Box>
              </Box>
            </Box>
          )}
        </AppWrappers>
      </body>
    </html>
  );
}
