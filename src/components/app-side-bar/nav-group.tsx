import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import {
	Box,
	BoxProps,
	Button,
	Collapse,
	Heading,
	Spacer,
	useColorMode,
	VStack,
} from "@chakra-ui/react";
import { ReactElement, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavItemProps, NavItemSelector } from "./nav-item";

export interface NavGroupProps extends BoxProps {
	title?: string;
	open?: boolean;
	onOpen?: (open: boolean) => void;
	openable?: boolean;
	children: ReactElement<NavItemProps>[] | ReactElement<NavItemProps>;
}

const NavGroup: React.FC<NavGroupProps> = (props) => {
	let {
		title,
		open: openProp,
		onOpen,
		openable,
		children,
		...restProps
	} = props;
	const [openState, setOpenState] = useState(true);
	let { colorMode } = useColorMode();
	let { pathname } = useLocation();

	let isOpen = props.open === undefined ? openState : props.open;

	function setOpen(open: boolean) {
		if (props.open === undefined) setOpenState(open);
		else if (onOpen) onOpen(open);
	}

	let heading = null;

	let headingColor =
		colorMode === "light" ? "blackAlpha.700" : "whiteAlpha.700";
	let iconColor = headingColor;

	if (title) {
		heading = (
			<Heading
				as="h4"
				color={headingColor}
				size="xs"
				textTransform="uppercase"
			>
				{title}
			</Heading>
		);
	}

	let chevronIcon = isOpen ? (
		<ChevronUpIcon color={iconColor} />
	) : (
		<ChevronDownIcon color={iconColor} />
	);

	return (
		<Box {...restProps} overflow="hidden">
			<Collapse startingHeight={40} in={isOpen} animateOpacity>
				{openable || title ? (
					<Button
						as={openable ? "button" : "div"}
						_hover={!openable ? { bg: "transparent" } : undefined}
						display="flex"
						alignItems="center"
						variant="ghost"
						w="100%"
						mb="0.5rem"
						height="40px"
						maxHeight="40px"
						onClick={() => openable && setOpen(!isOpen)}
					>
						{heading}
						<Spacer />
						{openable ? chevronIcon : null}
					</Button>
				) : null}
				<NavItemSelector selectedPath={pathname}>
					<VStack spacing="0.5rem" align="stretch">
						{children}
					</VStack>
				</NavItemSelector>
			</Collapse>
		</Box>
	);
};

NavGroup.defaultProps = {
	openable: false,
};

export default NavGroup;
