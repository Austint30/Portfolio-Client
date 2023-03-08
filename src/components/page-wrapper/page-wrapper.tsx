import { Flex, Box, useColorMode } from "@chakra-ui/react";
import AppHeaderBar from "components/app-header-bar/app-header-bar";
import AppSideBar from "components/app-side-bar";
import { PropsWithChildren, ReactElement } from "react"

export interface PageWrapperProps {
    sidebarComponent?: ReactElement
}

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = (props) => {

    const { colorMode } = useColorMode();

    return (
        <Flex direction='column' h='100%' bg={colorMode === 'light' ? 'gray.100' : 'gray.900'}>
            <AppHeaderBar />
            <Flex direction='row' flex={1}>
                {props.sidebarComponent}
                <Box
                    borderTopLeftRadius='8px'
                    bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
                    borderLeftWidth={1}
                    borderTopWidth={1}
                    flex={1}
                    p={4}
                >{props.children}</Box>
            </Flex>
        </Flex>
    )
}

PageWrapper.defaultProps = {
    sidebarComponent: <AppSideBar />
}

export default PageWrapper;