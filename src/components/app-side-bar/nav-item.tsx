import { Text, Link, useColorMode, Flex } from "@chakra-ui/react"
import { QuestionIcon } from "@chakra-ui/icons"
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

    const { selectedPath } = useContext(NavItemSelectorContext);

    let active = props.active || selectedPath === props.path;

    let activeBg = '#2fa9f9bd';
    let hoverBg = active ? activeBg : '#2fa9f940'
    
    let textColor = active ? 'white' : undefined

    return (
        <Link
            as={RRLink}
            to={props.path}
            lineHeight='1.5rem'
            padding="0.5rem 1rem"
            borderWidth='1px'
            borderColor='transparent'
            borderRadius={8}
            bg={active ? activeBg : 'transparent'}
            color={active ? 'white' : undefined}
            _hover={{ textDecoration: 'none', bg: hoverBg, borderColor: activeBg }}
            _active={{ bg: activeBg, color: textColor }}
            whiteSpace='nowrap'
            cursor={active ? 'default' : undefined}
        >
            <Flex alignItems="center" gap="1rem">
                {props.icon}
                <Text as='span'>{props.title}</Text>
            </Flex>
        </Link>
    )
}

NavItem.defaultProps = {
    active: false,
    icon: <QuestionIcon />
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