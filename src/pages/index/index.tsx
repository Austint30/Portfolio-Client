import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
	Container,
	Heading,
	Stack,
	Text,
	Box,
	SlideFade,
	Link,
	Button,
	HStack,
	Divider,
	useColorMode,
} from "@chakra-ui/react";
import { CanvasBackgrounds } from "canvas";
import AmbientBackground from "components/ambient-background/ambient-background";
import PageWrapper from "components/page-wrapper/page-wrapper";
import usePageTitle from "hooks/page-title";
import React from "react";

const IndexPage: React.FC<{}> = (props) => {
	usePageTitle("About Me");

	const { colorMode } = useColorMode();

	return (
		<PageWrapper
			backgroundElement={
				colorMode === "dark" && (
					<AmbientBackground
						canvasFunction={
							CanvasBackgrounds.BlurryMovingCirclesBackground
						}
					/>
				)
			}
			panelProps={{ useDynamicHeaderBar: true }}
		>
			<Container maxW="container.xl" marginTop="3rem">
				<Stack spacing={12}>
					<SlideFade
						in
						offsetY="30px"
						transition={{ enter: { duration: 1, ease: "easeOut" } }}
					>
						<Box mb="-7">
							<Heading fontSize={["2rem", "3rem", "4rem"]}>
								Hi, I'm{" "}
								<Box
									as="br"
									display={{ base: "initial", lg: "none" }}
								/>{" "}
								<Text as="span" variant="primary">
									Austin Thibodeaux.
								</Text>
							</Heading>
							<Heading fontSize={["1.5rem", "2rem", "3rem"]}>
								I make cool web applications.
							</Heading>
							<Divider borderWidth="2px" width="10rem" mt="5" />
						</Box>
					</SlideFade>
					<SlideFade
						in
						offsetY="30px"
						transition={{
							enter: { duration: 1, ease: "easeOut", delay: 0.2 },
						}}
					>
						<Text>
							I'm mostly a frontend developer with backend development
							experience using Amazon Web Services. I specialize in
							building complex web applications for any business need
							using modern web technologies. Currently I am developing
							Manifest Central (flight following software) for{" "}
							<Link href="https://www.dataflyt.com" isExternal>
								DataFlyt. <ExternalLinkIcon mx="2px" />
							</Link>
						</Text>
					</SlideFade>
					<SlideFade
						in
						offsetY="30px"
						transition={{
							enter: { duration: 1, ease: "easeOut", delay: 0.4 },
						}}
					>
						<HStack spacing={6}>
							<Button colorScheme="blue" size="lg" variant="outline">
								My Projects
							</Button>
							<Button colorScheme="blue" size="lg" variant="outline">
								My Resume
							</Button>
						</HStack>
					</SlideFade>
				</Stack>
			</Container>
		</PageWrapper>
	);
};

export default IndexPage;
