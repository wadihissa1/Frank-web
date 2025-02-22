'use client';
/*eslint-disable*/

import Link from '@/components/link/Link';
import MessageBoxChat from '@/components/MessageBox';
import {
  Tooltip,
  Button,
  Flex,
  Icon,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  IconButton,
  useMediaQuery
} from '@chakra-ui/react';
import { useState } from 'react';
import { MdAttachFile, MdDescription, MdInsertDriveFile, MdSend } from 'react-icons/md';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import Image from 'next/image';
import FrankIconBlack from '/public/img/svgs/FrankIconBlack.svg';

export default function Chat() {
  const [inputCode, setInputCode] = useState<string>('');
  const [messages, setMessages] = useState<{ input: string; output: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isMobile] = useMediaQuery('(max-width: 768px)');

  const borderColor = useColorModeValue('gray.200', '#0F5CA5');
  const inputColor = useColorModeValue('navy.700', 'white');
  const textColor = useColorModeValue('navy.700', 'white');
  const gray = useColorModeValue('gray.500', 'white');
  const buttonBg = useColorModeValue('gray.200', 'whiteAlpha.300');
  const menuBg = useColorModeValue('rgba(255, 255, 255, 0.1)', 'rgba(0, 0, 0, 0.3)');
  const backdropFilter = 'blur(10px)';

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
      const response = await fetch('https://20.49.30.0/ask', {
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

  const handleFileUpload = (event: any) => {
    const files = Array.from(event.target.files);
    const allowedFormats = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validFiles = files.filter(file => allowedFormats.includes(file.type));
    if (validFiles.length === 0) {
      alert('Only PDF and Word files are allowed.');
      return;
    }
    setSelectedFiles([...selectedFiles, ...validFiles]);
  };

  return (
    <Flex w="100%" pt={{ base: '70px', md: '0px' }} direction="column" position="relative">
      <Image src={FrankIconBlack} alt="Frank Icon" layout="intrinsic" width={350} height={350} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', opacity: 0.3 }} />
      <Flex direction="column" mx="auto" w={{ base: '100%', md: '100%', xl: '100%' }} minH={{ base: '75vh', '2xl': '85vh' }} maxW="1000px">
        <Flex direction="column" w="100%" mx="auto" mb={'auto'}>
          {messages.map((msg, index) => (
            <div key={index}>
              <Flex w="100%" align={'center'} mb="10px">
                <Text color={textColor} fontWeight="600" fontSize={{ base: 'sm', md: 'md' }} lineHeight={{ base: '24px', md: '26px' }}>{msg.input}</Text>
              </Flex>
            </div>
          ))}
        </Flex>
        <Flex mt="20px" align="center" gap="10px">
          <Flex position="relative" flexGrow={1}>
            <Input minH="54px" h="100%" border="1px solid" borderColor={borderColor} borderRadius="45px" p="15px 60px 15px 20px" fontSize="sm" fontWeight="500" color={inputColor} placeholder="Type your message here..." onChange={(e) => setInputCode(e.target.value)} value={inputCode} />
            {/* Mobile Attachment Button Inside Input */}
            <Menu>
              <MenuButton as={Button} position="absolute" right="15px" top="50%" transform="translateY(-50%)" display={{ base: 'block', lg: 'none' }} variant="unstyled">
              <Flex w="40px" h="40px" borderRadius="full" bg={buttonBg} align="center" justify="center" cursor="pointer">
                <Icon as={MdAttachFile} fontSize="20px" color={gray} />
              </Flex>
              </MenuButton>
              <MenuList bg={menuBg} backdropFilter={backdropFilter}>
                <MenuItem as="label" icon={<MdInsertDriveFile fontSize="20px" color={gray} />}>
                  CV
                  <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleFileUpload} />
                </MenuItem>
                <MenuItem as="label" icon={<MdDescription fontSize="20px" color={gray} />}>
                  Cover Letter
                  <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleFileUpload} />
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          {/* Desktop CV & Cover Letter Buttons */}
          <Flex gap="8px" display={{ base: 'none', lg: 'flex' }}>
            <Tooltip label="Upload CV" hasArrow>
              <label>
                <Flex w="55px" h="55px" borderRadius="full" bg={buttonBg} align="center" justify="center" cursor="pointer">
                  <Icon as={MdInsertDriveFile} fontSize="23px" color={gray} />
                </Flex>
                <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleFileUpload} />
              </label>
            </Tooltip>
            <Tooltip label="Upload Cover Letter" hasArrow>
              <label>
                <Flex w="55px" h="55px" borderRadius="full" bg={buttonBg} align="center" justify="center" cursor="pointer">
                  <Icon as={MdDescription} fontSize="23px" color={gray} />
                </Flex>
                <input type="file" accept=".pdf,.doc,.docx" style={{ display: 'none' }} onChange={handleFileUpload} />
              </label>
            </Tooltip>
          </Flex>
          {isMobile ? (
        <IconButton
          icon={<ArrowForwardIcon />}
          aria-label="Send"
          borderRadius="50%"
          backgroundColor="#0F5CA5"
          color="white"
          _hover={{ backgroundColor: '#0F5CA8' }}
          width="50px"
          height="50px"
          onClick={handleTranslate}
          isLoading={loading}
        />
      ) : (
        <Button
        variant="primary"
        borderRadius="full"
        w={{ base: '50px', md: '210px' }}
        h={{ base: '50px', md: '54px' }}
        bg={'linear-gradient(15.46deg, #0F5CA5  26.3%,   #0F5CA8 86.4%)'} 
        _hover={{
          boxShadow: '0px 21px 27px -10px rgba(65, 109, 255, 0.48) !important',
          bg: 'linear-gradient(15.46deg, #416DFF 26.3%,  #0F5CA8 86.4%) !important',
        }}
        onClick={handleTranslate}
        isLoading={loading}
      >
       Submit
      </Button>
      )}
        </Flex>
      </Flex>
    </Flex>
  );
}
