import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, IconButton, Flex, Spacer, useColorMode } from '@chakra-ui/react';
import DarkThemeBtn from 'components/buttons/dark-theme-btn/dark-theme-btn';

const AppHeaderBar: React.FC<{}> = () => {

    const { colorMode } = useColorMode();

    let boxShadow = colorMode === 'light' ?
        'appHeaderBar.light' : 'appHeaderBar.dark';

    return (
        <Box
            h='3rem'
            lineHeight='3rem'
            p="0 16px"
            boxShadow={boxShadow}
            zIndex={1}
        >
            <Flex alignItems='center' h='100%'>
                <IconButton
                    aria-label='Toggle side menu'
                    icon={<HamburgerIcon />}
                    variant='ghost'
                />
                <Spacer />
                <Flex>
                    <DarkThemeBtn />
                </Flex>
            </Flex>
            
        </Box>
    )
}

export default AppHeaderBar