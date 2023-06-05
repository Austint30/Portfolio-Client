import { makePVar } from "../persistent-var";

export const reactiveVars = {
	sideNavCollapsed: makePVar(false, 'ui.nav.sideNavCollapsed'),
};

export function ToggleSideNavCollapsed() {
	const collapsed = reactiveVars.sideNavCollapsed();
	reactiveVars.sideNavCollapsed(!collapsed);
}