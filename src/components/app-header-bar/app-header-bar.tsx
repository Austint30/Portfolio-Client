import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Box, IconButton, Flex, Spacer, Text, useColorMode } from '@chakra-ui/react';

const AppHeaderBar: React.FC<{}> = () => {

    const { colorMode, toggleColorMode } = useColorMode();

    return <Box h='3rem' lineHeight='3rem'>
        <Flex alignItems='center'>
            <Text w='15rem' textAlign='center' fontSize='xl'>Austin's Portfolio</Text>
            <IconButton
                aria-label='Toggle side menu'
                icon={<HamburgerIcon />}
                variant='ghost'
            />
            <Spacer />
            <Flex padding='0 2rem'>
                <IconButton
                    aria-label='Toggle dark theme'
                    onClick={toggleColorMode}
                    variant='ghost'

                    icon={colorMode === 'light' ? (
                        <MoonIcon />
                    ) : <SunIcon />}
                />
            </Flex>
        </Flex>
        
    </Box>
}

export default AppHeaderBar