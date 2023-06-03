import { useReactiveVar } from "@apollo/client";
import { Box, Flex, useBreakpointValue, useStyleConfig } from "@chakra-ui/react";
import { UiState } from "apollo/local-state/state";
import AppHeaderBar, { AppHeaderBarProps } from "components/app-header-bar/app-header-bar";
import AppSideBar from "components/app-side-bar";
import Panel, { PanelProps } from "components/panel/panel";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { CanvasUtils, CssUtils } from "utils";

export interface PageWrapperProps {
    panelProps?: PanelProps,
    backgroundElement?: React.ReactElement<any> | null | false
}

const PageWrapper: React.FC<PropsWithChildren<PageWrapperProps>> = (props) => {

    const sideNavCollapsed = useReactiveVar(UiState.reactiveVars.sideNavCollapsed);

    const panelRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const headerBarRef = useRef<HTMLDivElement>(null);

    // Update the header bar color to match the backgroundElement canvas if available
    // TODO: Find a way to make this more modular
    useEffect(() => {
        if (!headerBarRef.current) return;
        
        let context: CanvasRenderingContext2D | null = null;
        if (canvasRef.current)
            context = canvasRef.current.getContext('2d');

        function onFrame(){
            if (!headerBarRef.current) return;
            if (!canvasRef.current) {
                headerBarRef.current.style.removeProperty('background');
                return;
            };
            let imgData = context?.getImageData(0, 0, context.canvas.width, context.canvas.height);
            if (!imgData) return;

            if (!panelRef.current) return;

            let avgColor = CanvasUtils.getRgbaAverage(imgData);
            let blendedColor = CssUtils.projectAlphaOnOpaque(avgColor, getComputedStyle(panelRef.current).background)
            blendedColor[3] = 0.7; // override alpha
            let blendedColorCss = CssUtils.stringifyRgb(blendedColor);
            headerBarRef.current.style.background = blendedColorCss;
        }

        let interval = setInterval(onFrame, 60/0.1);

        function clear(){
            clearInterval(interval);
        }

        return clear
    }, [ headerBarRef.current, canvasRef.current, panelRef.current ])

    const isMobile = useBreakpointValue({
        base: true,
        md: false
    })

    let bgElement = null;
    if (props.backgroundElement){
        bgElement = React.cloneElement(props.backgroundElement, {
            canvasRef: canvasRef
        })
    }

    return (
        <Flex direction='row' h='100%'>
            {!isMobile ? (    
                <Box width={sideNavCollapsed ? '4rem' : '16rem'}>
                    <AppSideBar />
                </Box>
            ) : null}
            <Panel
                borderLeftRadius={{ md: '1.5rem', base: 0 }}
                headerBar={
                    <AppHeaderBar
                        onMenuClicked={() => UiState.ToggleSideNavCollapsed()}
                        ref={headerBarRef}
                    />
                }
                overflow='hidden'
                {...props.panelProps}
                backgroundElement={bgElement}
                ref={panelRef}
            >
            <Box
                flex={1}
                p={4}
                position='relative'
            >{props.children}
            </Box>
            </Panel>
        </Flex>
    )
}

export default PageWrapper;