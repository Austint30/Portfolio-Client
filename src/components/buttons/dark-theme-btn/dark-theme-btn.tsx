import { IconButton, IconButtonProps, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const DarkThemeBtn: React.FC<Omit<IconButtonProps, "aria-label">> = (props) => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<IconButton
			aria-label="Toggle dark theme"
			onClick={toggleColorMode}
			variant="ghost"
			icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
		/>
	);
};

export default DarkThemeBtn;
