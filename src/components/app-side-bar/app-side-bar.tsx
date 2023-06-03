import { Flex, Text, VStack } from "@chakra-ui/react";
import NavGroup from "./nav-group";
import NavItem from "./nav-item";

const AppSideBar: React.FC<{}> = () => {
	return (
		<Flex w="100%" h="100%" flexDirection="column">
			<Text
				w="100%"
				h="3rem"
				p="0 0.6rem"
				mb="5px"
				mt="5px"
				lineHeight="3rem"
				textAlign="center"
				fontSize="xl"
			>
				Austin's Portfolio
			</Text>
			<VStack
				spacing="2rem"
				align="stretch"
				overflowX="auto"
				overflowY="hidden"
				p="0 0.6rem"
			>
				<NavGroup>
					<NavItem path="/" title="About Me" />
					<NavItem path="/projects" title="Projects" />
					<NavItem path="/experience" title="Experience" />
				</NavGroup>
				<NavGroup title="Cool Demos" openable>
					<NavItem path="/a" title="Page 1" />
					<NavItem path="/b" title="Page 2" />
				</NavGroup>
			</VStack>
		</Flex>
	);
};

export default AppSideBar;
