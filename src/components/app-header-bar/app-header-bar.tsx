import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, IconButton, Flex, Spacer, useColorMode } from '@chakra-ui/react';
import DarkThemeBtn from 'components/buttons/dark-theme-btn/dark-theme-btn';
import HeaderBar, { HeaderBarProps } from 'components/header-bar/header-bar';

export interface AppHeaderBarProps extends HeaderBarProps {
    onMenuClicked?: () => void
}

const AppHeaderBar: React.FC<AppHeaderBarProps> = (props) => {
    return (
        <HeaderBar {...props}>
            <Flex alignItems='center' h='100%'>
                <IconButton
                    aria-label='Toggle side menu'
                    icon={<HamburgerIcon />}
                    variant='ghost'
                    onClick={props.onMenuClicked}
                />
                <Spacer />
                <Flex>
                    <DarkThemeBtn />
                </Flex>
            </Flex>
        </HeaderBar>
    )
}

export default AppHeaderBar