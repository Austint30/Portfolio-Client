import { Flex, Box, useColorMode } from "@chakra-ui/react";
import AppHeaderBar from "components/app-header-bar/app-header-bar";
import AppSideBar from "components/app-side-bar";
import { PropsWithChildren, ReactElement } from "react"

export interface PageWrapperProps {
}

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = (props) => {

    const { colorMode } = useColorMode();

    return (
        <Flex direction='row' h='100%'>
            <AppSideBar />
            <Flex
                direction='column'
                flex={1}
                borderLeftRadius='16px'
                bg={colorMode === 'light' ? 'gray.50' : 'gray.800'}
                overflow="hidden"
            >
                <AppHeaderBar />
                <Box
                    flex={1}
                    p={4}
                >{props.children}</Box>
            </Flex>
        </Flex>
    )
}

export default PageWrapper;