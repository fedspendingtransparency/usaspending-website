/**
 * HomepageUpdate.jsx
 * Created by Andrea Blackwell 03/07/22
 */

import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import Download from './download/Download';
import Community from './community/Community';
import Hero from './hero/Hero';
import Covid from './covid/Covid';
import GettingStarted from './gettingStarted/GettingStarted';
import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import { SHOW_HOMEPAGE_UPDATE } from '../../GlobalConstants';

require('pages/homepageUpdate/homepageUpdate.scss');

const HomepageUpdate = () => {
    const [hideContent, setHideContent] = useState();

    useEffect(() => {
        setHideContent(!SHOW_HOMEPAGE_UPDATE);
    }, []);

    return (<>{hideContent ?
        <Redirect to="/404" />
        :
        <PageWrapper
            pageName="Homepage"
            classNames="usa-da-home-page"
            noHeader
            metaTagProps={{ ...homePageMetaTags }}>
            <main id="main-content" className="main-content homepage-content">
                <Hero />
                <Covid />
                <GettingStarted />
                <Download />
                <Community />
            </main>
        </PageWrapper>}
    </>);
};

export default HomepageUpdate;
