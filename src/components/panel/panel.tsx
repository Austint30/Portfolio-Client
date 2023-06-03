import { Box, BoxProps, useStyleConfig } from "@chakra-ui/react";
import HeaderBar, { HeaderBarProps } from "components/header-bar/header-bar";
import React, { useMemo } from "react";

export interface PanelProps extends BoxProps {
	headerBar?: React.ReactElement<HeaderBarProps>;

	/**
	 * If enabled the bottom shadow of the headerbar disappears when scrolled to the top
	 * Looks good for highly presentational pages
	 */
	useDynamicHeaderBar?: boolean;

	/**
	 * Element to place in the background of the panel with absolute positioning.
	 * Good for animated backgrounds.
	 */
	backgroundElement?: React.ReactElement<any> | null | false;
}

const Panel = React.forwardRef<HTMLDivElement, PanelProps>((props, ref) => {
	const {
		children,
		headerBar,
		backgroundElement,
		useDynamicHeaderBar,
		...rest
	} = props;

	const styles = useStyleConfig("Panel");
	const [hoverHeader, setHoverHeader] = React.useState(false);

	function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
		let divElement = event.currentTarget;
		setHoverHeader(divElement.scrollTop > 0);
	}

	let mutatableHeaderBar = headerBar;

	if (mutatableHeaderBar) {
		mutatableHeaderBar = React.cloneElement(mutatableHeaderBar, {
			variant: hoverHeader || !useDynamicHeaderBar ? "hovering" : undefined,
			className:
				hoverHeader || !useDynamicHeaderBar ? "hovering" : undefined,
			zIndex: 1,
		});
	}

	let _backgroundElement = null;

	// TODO: Fix background element (AmbientBackground) canvas covering scrollbar
	if (props.backgroundElement) {
		_backgroundElement = (
			<Box position="absolute" left={0} top={0} width="100%" height="100%">
				{backgroundElement}
			</Box>
		);
	}

	return (
		<Box
			__css={styles}
			{...rest}
			width="100%"
			height="100%"
			position="relative"
			ref={ref}
		>
			{_backgroundElement}
			<Box height="100%" overflow="auto" onScroll={handleScroll}>
				{mutatableHeaderBar}
				{children}
			</Box>
		</Box>
	);
});

Panel.displayName = "Panel";

export default Panel;
