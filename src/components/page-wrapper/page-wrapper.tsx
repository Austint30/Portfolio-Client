import { Flex, Box, useColorMode, Text } from "@chakra-ui/react";
import AppHeaderBar from "components/app-header-bar/app-header-bar";
import AppSideBar from "components/app-side-bar";
import Panel from "components/panel/panel";
import { PropsWithChildren, ReactElement } from "react"

export interface PageWrapperProps {
}

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = (props) => {

    const { colorMode } = useColorMode();

    return (
        <Flex direction='row' h='100%'>
            <AppSideBar />
            <Panel
                borderLeftRadius='16px'
                headerBar={<AppHeaderBar />}
            >
            <Box
                flex={1}
                p={4}
            >{props.children}
            </Box>
            </Panel>
        </Flex>
    )
}

export default PageWrapper;