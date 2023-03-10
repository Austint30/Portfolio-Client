import { Box, StackDivider, useColorMode, VStack, Text } from "@chakra-ui/react"
import { useLocation } from "react-router-dom";
import NavGroup from "./nav-group";
import NavItem, { NavItemSelector } from "./nav-item";

const AppSideBar: React.FC<{}> = () => {

    return <Box w='15rem' h='100%' p="0 0.6rem">
        <Text w='100%' h='3rem' mb='5px' mt='5px' lineHeight='3rem' textAlign='center' fontSize='xl'>Austin's Portfolio</Text>
        <VStack spacing='2rem' align='stretch'>
            <NavGroup>
                <NavItem path="/" title="About Me" />
                <NavItem path="/experience" title="Experience" />
            </NavGroup>
            <NavGroup title="Test Pages" openable>
                <NavItem path="/a" title="Page 1" />
                <NavItem path="/b" title="Page 2" />
            </NavGroup>
        </VStack>
        
    </Box>
}

export default AppSideBar