import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';
import HeaderBar, { HeaderBarProps } from 'components/header-bar/header-bar';
import React, { useMemo } from 'react';

export interface PanelProps extends BoxProps {
    headerBar?: React.ReactElement<HeaderBarProps>
}

const Panel: React.FC<PanelProps> = (props) => {
    const { children, headerBar, ...rest } = props;

    const styles = useStyleConfig('Panel');
    const [ hoverHeader, setHoverHeader ] = React.useState(false);

    function handleScroll(event: React.UIEvent<HTMLDivElement, UIEvent>){
        let divElement = event.currentTarget;
        setHoverHeader(divElement.scrollTop > 0);
    }

    let mutatableHeaderBar = headerBar;

    if (mutatableHeaderBar){
        mutatableHeaderBar = React.cloneElement(mutatableHeaderBar, {
            variant: hoverHeader ? 'hovering' : undefined
        })
    }

    return (
        <Box
            __css={styles}
            {...rest}
            width='100%'
            overflow='auto'
            onScroll={handleScroll}
        >
            {mutatableHeaderBar}
            {children}
        </Box>
    )
}

export default Panel