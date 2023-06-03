import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

export const theme = extendTheme({
	config: {
		initialColorMode: "dark",
	},
	styles: {
		global: (props: StyleFunctionProps) => ({
			"html, body": {
				background: mode("htmlBody.light", "htmlBody.dark")(props),
			},
		}),
	},
	components: {
		HeaderBar: {
			baseStyle: (props: StyleFunctionProps) => ({
				bg: "transparent",
				transition: "box-shadow 300ms linear, background 300ms linear",
			}),
			variants: {
				hovering: (props: StyleFunctionProps) => ({
					boxShadow: mode(
						"0 2px 4px var(--chakra-colors-blackAlpha-200)",
						"0 2px var(--chakra-colors-whiteAlpha-100)"
					)(props),
					backdropFilter: "blur(25px)",
					bg: mode("content.lightAcrylic", "content.darkAcrylic")(props),
				}),
			},
		},
		Panel: {
			baseStyle: (props: StyleFunctionProps) => ({
				bg: mode("content.light", "content.dark")(props),
			}),
		},
		Heading: {
			baseStyle: (props: StyleFunctionProps) => ({
				color: mode("gray.800", "gray.200")(props),
			}),
			variants: {
				primary: (props: StyleFunctionProps) => ({
					color: mode("brand.light", "brand.dark")(props),
				}),
				secondary: (props: StyleFunctionProps) => ({
					color: mode("gray.600", "gray.400")(props),
				}),
			},
		},
		Text: {
			baseStyle: (props: StyleFunctionProps) => ({
				color: mode("gray.800", "gray.200")(props),
			}),
			variants: {
				primary: (props: StyleFunctionProps) => ({
					color: mode("brand.light", "brand.dark")(props),
				}),
				secondary: (props: StyleFunctionProps) => ({
					color: mode("gray.600", "gray.400")(props),
				}),
			},
		},
		Link: {
			baseStyle: (props: StyleFunctionProps) => ({
				color: mode("brand.light", "brand.dark")(props),
			}),
			variants: {
				colorless: {
					color: "inherit",
				},
			},
		},
	},
	colors: {
		brand: {
			light: "#029bffbd",
			dark: "#029bffbd",
		},
		htmlBody: {
			light: "#E2E8F0",
			lightAcrylic: "#E2E8F0D1",
			dark: "#171923",
			darkAcrylic: "#171923D1",
		},
		content: {
			light: "#f7fafc",
			lightAcrylic: "#f7fafcaa",
			dark: "#1A202C",
			darkAcrylic: "#1A202CC1",
		},
	},
});
