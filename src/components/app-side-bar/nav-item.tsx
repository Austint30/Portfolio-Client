import { Text, Link, useColorMode, Flex, useStyleConfig } from "@chakra-ui/react"
import { QuestionOutlineIcon } from "@chakra-ui/icons"
import { Link as RRLink } from "react-router-dom"
import { Children, cloneElement, createContext, PropsWithChildren, ReactElement, useContext } from "react"

export interface NavItemProps {
    path: string,
    title: string,
    active?: boolean,
    icon?: any
}

const NavItemSelectorContext = createContext({ selectedPath: '' })

const NavItem: React.FC<NavItemProps> = (props) => {


    const styles = useStyleConfig('NavItem');

    const { selectedPath } = useContext(NavItemSelectorContext);
    let { colorMode } = useColorMode();

    let active = props.active || selectedPath === props.path;

    let activeBg = '#029bffbd';
    let hoverBg = active ? activeBg : '#2fa9f940'
    
    let textColor = active ? 'white' : undefined
    let iconColor = colorMode === 'light' ? 'blackAlpha.700' : 'whiteAlpha.700';

    return (
        <Link
            __css={styles}
            as={RRLink}
            to={props.path}
            lineHeight='1.5rem'
            padding="0.5rem 1rem"
            borderWidth='1px'
            borderColor='transparent'
            borderRadius={8}
            bg={active ? activeBg : 'transparent'}
            variant='colorless'
            color={active ? 'white' : undefined}
            _hover={{ textDecoration: 'none', bg: hoverBg, borderColor: activeBg }}
            _active={{ bg: activeBg, color: textColor }}
            whiteSpace='nowrap'
            cursor={active ? 'default' : undefined}
        >
            <Flex alignItems="center" gap="1rem">
                {cloneElement(props.icon, { color: textColor || iconColor })}
                <Text as='span'>{props.title}</Text>
            </Flex>
        </Link>
    )
}

NavItem.defaultProps = {
    active: false,
    icon: <QuestionOutlineIcon />
}

export interface NavItemSelectorProps {
    selectedPath: string
}


export const NavItemSelector: React.FC<PropsWithChildren<NavItemSelectorProps>> = (props) => {

    return <NavItemSelectorContext.Provider value={{ selectedPath: props.selectedPath }}>
        {props.children}
    </NavItemSelectorContext.Provider>
}

export default NavItem