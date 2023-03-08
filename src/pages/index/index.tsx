import PageWrapper from 'components/page-wrapper/page-wrapper';
import usePageTitle from 'hooks/page-title';
import React from 'react';

const IndexPage: React.FC<{}> = (props) => {
    usePageTitle('About Me')

    return (
        <PageWrapper>
            <h1>This is the index page</h1>
        </PageWrapper>
    )
}

export default IndexPage