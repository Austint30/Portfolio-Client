import { Flex, Box, useColorMode, Text, useBreakpointValue, useBoolean } from "@chakra-ui/react";
import AppHeaderBar from "components/app-header-bar/app-header-bar";
import AppSideBar from "components/app-side-bar";
import Panel from "components/panel/panel";
import { PropsWithChildren, ReactElement } from "react"

export interface PageWrapperProps {
}

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = (props) => {

    // TODO: Replace with global state
    const [ isCollapsed, setCollapsed ] = useBoolean();

    const isMobile = useBreakpointValue({
        base: true,
        md: false
    })

    return (
        <Flex direction='row' h='100%'>
            {!isMobile ? (    
                <Box width={isCollapsed ? '4rem' : '16rem'}>
                    <AppSideBar />
                </Box>
            ) : null}
            <Panel
                borderLeftRadius={{ md: '1.5rem', base: 0 }}
                headerBar={<AppHeaderBar onMenuClicked={() => setCollapsed.toggle()} />}
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