import { extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools'

export const theme = extendTheme({
    styles: {
        global: (props: any) => ({
            'html, body': {
                background: mode('gray.200', 'gray.900')(props)
            }
        })
    },
    shadows: {
        appHeaderBar: {
            light: '0 2px 4px var(--chakra-colors-blackAlpha-200)',
            dark: '0 2px var(--chakra-colors-whiteAlpha-100)'
        }
    }
})