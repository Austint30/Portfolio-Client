import { useReactiveVar } from "@apollo/client";
import { Box, Flex, useBreakpointValue } from "@chakra-ui/react";
import { UiState } from "apollo/local-state/state";
import AppHeaderBar from "components/app-header-bar/app-header-bar";
import AppSideBar from "components/app-side-bar";
import Panel from "components/panel/panel";
import { PropsWithChildren } from "react";

export interface PageWrapperProps {
}

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = (props) => {

    const sideNavCollapsed = useReactiveVar(UiState.reactiveVars.sideNavCollapsed);

    const isMobile = useBreakpointValue({
        base: true,
        md: false
    })

    return (
        <Flex direction='row' h='100%'>
            {!isMobile ? (    
                <Box width={sideNavCollapsed ? '4rem' : '16rem'}>
                    <AppSideBar />
                </Box>
            ) : null}
            <Panel
                borderLeftRadius={{ md: '1.5rem', base: 0 }}
                headerBar={<AppHeaderBar onMenuClicked={() => UiState.ToggleSideNavCollapsed()} />}
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