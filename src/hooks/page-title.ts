import { useEffect } from "react";
import appConfig from "app.config";

/**
 * Modifies the page title on component mount
 * @param pageTitle Page title string (leaving empty resets page title to default)
 */
function usePageTitle(pageTitle?: string) {
	function resetTitle() {
		document.title = appConfig.appName;
	}

	function setTitle(title: string) {
		document.title = appConfig.appName + " | " + title;
	}

	useEffect(() => {
		if (pageTitle) setTitle(pageTitle);
		else resetTitle();

		return () => {
			// Reset the page title on unmount
			resetTitle();
		};
	}, []);
}

export default usePageTitle;
