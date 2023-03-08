import { Box, StackDivider, useColorMode, VStack } from "@chakra-ui/react"
import { useLocation } from "react-router-dom";
import NavItem, { NavItemSelector } from "./nav-item";

const AppSideBar: React.FC<{}> = () => {

    const { colorMode } = useColorMode();

    let { pathname } = useLocation();

    return <Box w='15rem' h='100%' p="0 0.4rem" pt="0.8rem">
        <NavItemSelector selectedPath={pathname}>
        <VStack spacing={2} align='stretch' divider={<StackDivider ml="8px !important" mr="8px !important" />}>
            
            <NavItem path="/" title="About Me" />
            <NavItem path="/experience" title="Experience" />
        </VStack>
        </NavItemSelector>
    </Box>
}

export default AppSideBar