import { HamburgerIcon } from "@chakra-ui/icons";
import { Box, IconButton, Flex, Spacer, useColorMode } from "@chakra-ui/react";
import DarkThemeBtn from "components/buttons/dark-theme-btn/dark-theme-btn";
import HeaderBar, { HeaderBarProps } from "components/header-bar/header-bar";
import React from "react";

export interface AppHeaderBarProps extends HeaderBarProps {
	onMenuClicked?: () => void;
}

const AppHeaderBar = React.forwardRef<HTMLDivElement, AppHeaderBarProps>(
	(props, ref) => {
		const { onMenuClicked, ...rest } = props;

		return (
			<HeaderBar {...rest} ref={ref}>
				<Flex alignItems="center" h="100%">
					<IconButton
						aria-label="Toggle side menu"
						icon={<HamburgerIcon />}
						variant="ghost"
						onClick={props.onMenuClicked}
					/>
					<Spacer />
					<Flex>
						<DarkThemeBtn />
					</Flex>
				</Flex>
			</HeaderBar>
		);
	}
);

AppHeaderBar.displayName = "AppHeaderBar";

export default AppHeaderBar;
