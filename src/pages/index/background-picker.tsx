import { useReactiveVar } from "@apollo/client";
import {
	Box,
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
	useBoolean,
} from "@chakra-ui/react";
import { UiState } from "apollo/local-state/state";
import React from "react";

export interface BackgroundPickerProps {}

const BackgroundPicker: React.FC<BackgroundPickerProps> = (props) => {
	const options = UiState.IndexPageState.GetBackgrounds();

	const selectedBg = useReactiveVar(
		UiState.IndexPageState.reactiveVars.indexBackground
	);

	const menuItems = Object.keys(options).map((bName) => (
		<MenuItem
			key={bName}
			onClick={() => UiState.IndexPageState.SetIndexBackground(bName)}
			bg="transparent"
		>
			<Text
				fontWeight="hairline"
				variant={bName === selectedBg ? "" : "secondary"}
				fontSize="0.75rem"
				textAlign="center"
				width="100%"
			>
				{bName}
			</Text>
		</MenuItem>
	));

	return (
		<Box position="absolute" right="1rem" bottom="1rem">
			<Menu>
				<MenuButton as={Button} variant="ghost" width="6rem">
					<Text
						fontWeight="hairline"
						variant="secondary"
						fontSize="0.75rem"
					>
						Backgrounds
					</Text>
				</MenuButton>
				<MenuList
					bg="transparent"
					border="none"
					boxShadow="none"
					maxW="6rem"
					minW="6rem"
				>
					{menuItems}
				</MenuList>
			</Menu>
		</Box>
	);
};

export default BackgroundPicker;
