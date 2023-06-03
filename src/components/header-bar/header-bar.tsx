import { Box, BoxProps, useStyleConfig } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

export interface HeaderBarProps extends BoxProps {
    variant?: 'hovering'
}

const HeaderBar = React.forwardRef<HTMLDivElement, HeaderBarProps>((props, ref) => {
    const { children, variant, ...rest } = props;

    const styles = useStyleConfig('HeaderBar', { variant });

    return (
        <Box
            h='3rem'
            lineHeight='3rem'
            p="0 16px"
            position="sticky"
            top={0}
            __css={styles}
            {...rest}
            ref={ref}
        >
            {children}
        </Box>
    )
})

HeaderBar.displayName = 'HeaderBar'

export default HeaderBar