/**
 * About.jsx
 * Created by Mike Bray 11/20/2017
 **/

import React from 'react';
import { ShareIcon } from 'data-transparency-ui';

import { PageWrapper } from 'components/sharedComponents/Page';
import { aboutPageMetaTags } from 'helpers/metaTagHelper';

import AboutContent from './AboutContent';

require('pages/about/aboutPage.scss');

export default class About extends React.Component {
    render() {
        return (
            <div className="usa-da-about-page">
                <MetaTags {...aboutPageMetaTags} />
                <Header />
                <PageHeader title="About" stickyBreakPoint={getStickyBreakPointForSidebar()}>
                    <main
                        id="main-content"
                        className="main-content">
                        <AboutContent />
                    </main>
                    <Footer />
                </PageHeader>
            </div>
        );
    }
}
