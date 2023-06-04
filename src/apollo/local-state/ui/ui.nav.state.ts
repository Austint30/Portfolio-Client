import { makeVar } from "@apollo/client";

export const reactiveVars = {
	sideNavCollapsed: makeVar(false),
};

export function ToggleSideNavCollapsed() {
	const collapsed = reactiveVars.sideNavCollapsed();
	reactiveVars.sideNavCollapsed(!collapsed);
}
