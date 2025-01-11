'use client';
/*eslint-disable*/

import Link from '@/components/link/Link';
import MessageBoxChat from '@/components/MessageBox';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Icon,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdEdit, MdPerson } from 'react-icons/md';
import Image from 'next/image'; // Correctly using next/image for SVGs
import FrankIconBlack from '/public/img/svgs/FrankIconBlack.svg'; 
import FrankIconWhite from '/public/img/svgs/FrankIconWhite.svg';

export default function Chat() {
  const [inputCode, setInputCode] = useState<string>('');
  const [messages, setMessages] = useState<{ input: string; output: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.200');
  const inputColor = useColorModeValue('navy.700', 'white');
  const iconColor = useColorModeValue('brand.500', 'white');
  const frankIconColor = useColorModeValue('black', 'white');
  const bgIcon = useColorModeValue(
    'linear-gradient(180deg, #FBFBFF 0%, #CACAFF 100%)',
    'whiteAlpha.200'
  );
  const brandColor = useColorModeValue('brand.500', 'white');
  const buttonBg = useColorModeValue('white', 'whiteAlpha.100');
  const gray = useColorModeValue('gray.500', 'white');
  const buttonShadow = useColorModeValue(
    '14px 27px 45px rgba(112, 144, 176, 0.2)',
    'none'
  );
  const textColor = useColorModeValue('navy.700', 'white');
  const placeholderColor = useColorModeValue(
    { color: 'gray.500' },
    { color: 'whiteAlpha.600' }
  );

  const handleTranslate = async () => {
    const maxCodeLength = 700;

    if (!inputCode) {
      alert('Please enter your message.');
      return;
    }

    if (inputCode.length > maxCodeLength) {
      alert(
        `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://20.49.30.0:80/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputCode }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong fetching from the API.');
      }

      const data = await response.json();
      const outputCode = data.response;

      setMessages((prevMessages) => [
        ...prevMessages,
        { input: inputCode, output: outputCode },
      ]);
      setInputCode('');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event: any) => {
    setInputCode(event.target.value);
  };

  return (
    <Flex
      w="100%"
      pt={{ base: '70px', md: '0px' }}
      direction="column"
      position="relative"
    >
      <Image
        src={FrankIconBlack}
        alt="Frank Icon"
        layout="intrinsic"
        width={350}
        height={350}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.3,
        }}
      />
      <Flex
        direction="column"
        mx="auto"
        w={{ base: '100%', md: '100%', xl: '100%' }}
        minH={{ base: '75vh', '2xl': '85vh' }}
        maxW="1000px"
      >
        <Accordion color={gray} allowToggle w="100%" my="0px" mx="auto">
          <AccordionItem border="none">
            <AccordionButton
              borderBottom="0px solid"
              maxW="max-content"
              mx="auto"
              _hover={{ border: '0px solid', bg: 'none' }}
              _focus={{ border: '0px solid', bg: 'none' }}
            >
              <Box flex="1" display="flex" alignItems="center" textAlign="left">
                <Icon
                  as={() => (
                    <Image
                      src={FrankIconWhite}
                      alt="Frank Icon"
                      width={20}
                      height={20}
                    />
                  )}
                  color={frankIconColor}
                  mr="8px"
                />
                <Text color={gray} fontWeight="500" fontSize="sm">
                  Frank
                </Text>
              </Box>
              <AccordionIcon color={gray} />
            </AccordionButton>
            <AccordionPanel mx="auto" w="max-content" p="0px 0px 10px 0px">
              <Text
                color={gray}
                fontWeight="500"
                fontSize="sm"
                textAlign={'center'}
              >
                Is Here From Students To Students.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
        {/* Main Box */}
        <Flex direction="column" w="100%" mx="auto" mb={'auto'}>
          {messages.map((msg, index) => (
            <div key={index}>
              <Flex w="100%" align={'center'} mb="10px">
                <Flex
                  borderRadius="full"
                  justify="center"
                  align="center"
                  bg={'transparent'}
                  border="1px solid"
                  borderColor={borderColor}
                  me="20px"
                  h="40px"
                  minH="40px"
                  minW="40px"
                >
                  <Icon as={MdPerson} width="20px" height="20px" color="#0F5CA8" />
                </Flex>
                <Flex
                  p="22px"
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="14px"
                  w="100%"
                  zIndex={'2'}
                >
                  <Text
                    color={textColor}
                    fontWeight="600"
                    fontSize={{ base: 'sm', md: 'md' }}
                    lineHeight={{ base: '24px', md: '26px' }}
                  >
                    {msg.input}
                  </Text>
                  <Icon
                    cursor="pointer"
                    as={MdEdit}
                    ms="auto"
                    width="20px"
                    height="20px"
                    color={gray}
                  />
                </Flex>
              </Flex>
              <Flex w="100%" mb="10px">
                <Flex
                  borderRadius="full"
                  justify="center"
                  align="center"
                  bg={'linear-gradient(15.46deg, #0F5CA8 26.3%, #416DFF 86.4%)'}
                  me="20px"
                  h="40px"
                  minH="40px"
                  minW="40px"
                >
                  <Icon
                    as={() => (
                      <Image
                        src={FrankIconWhite}
                        alt="Frank Icon"
                        width={20}
                        height={20}
                      />
                    )}
                    color="white"
                  />
                </Flex>
                <MessageBoxChat output={msg.output} />
              </Flex>
            </div>
          ))}
        </Flex>
        {/* Chat Input */}
        <Flex ms={{ base: '0px', xl: '60px' }} mt="20px" justifySelf={'flex-end'}>
          <Input
            minH="54px"
            h="100%"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="45px"
            p="15px 20px"
            me="10px"
            fontSize="sm"
            fontWeight="500"
            _focus={{ borderColor: 'none' }}
            color={inputColor}
            _placeholder={placeholderColor}
            placeholder="Type your message here..."
            onChange={handleChange}
            value={inputCode}
          />
          <Button
            variant="primary"
            py="20px"
            px="16px"
            fontSize="sm"
            borderRadius="45px"
            ms="auto"
            w={{ base: '160px', md: '210px' }}
            h="54px"
            bg={'linear-gradient(15.46deg, #0F5CA5  26.3%,   #0F5CA8 86.4%)'} 
            _hover={{
              boxShadow:
                '0px 21px 27px -10px rgba(65, 109, 255, 0.48) !important',
              bg: 'linear-gradient(15.46deg, #416DFF 26.3%,  #0F5CA8 86.4%) !important',
              _disabled: {
                bg: 'linear-gradient(15.46deg, #0F5CA8 26.3%, #0F5CA8 86.4%)',
              },
            }}
            onClick={handleTranslate}
            isLoading={loading}
          >
            Submit
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
