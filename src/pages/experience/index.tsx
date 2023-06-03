import PageWrapper from "components/page-wrapper/page-wrapper";
import usePageTitle from "hooks/page-title";
import React from "react";

const ExperiencePage: React.FC<{}> = (props) => {
	usePageTitle("Experience");

	return (
		<PageWrapper>
			<h1>This is the experience page</h1>
		</PageWrapper>
	);
};

export default ExperiencePage;
