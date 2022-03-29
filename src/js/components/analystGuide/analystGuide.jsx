/**
 * AnalystGuide.jsx
 * Created by Andrea Blackwell 03/29/22
 */

import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";

import AnalystGuideHeader from './header/AnalystGuideHeader';
import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import { SHOW_HOMEPAGE_UPDATE } from '../../GlobalConstants';

const AnalystGuide = () => {
    const [hideContent, setHideContent] = useState();

    useEffect(() => {
        console.log(SHOW_HOMEPAGE_UPDATE);
        setHideContent(!SHOW_HOMEPAGE_UPDATE);
    }, [SHOW_HOMEPAGE_UPDATE]);

    return (<>{hideContent ?
        <Redirect to="/404" />
        :
        <PageWrapper
            pageName="AnaystGuide"
            classNames="usa-da-home-page"
            noHeader
            metaTagProps={{ ...homePageMetaTags }}>
            <main id="main-content" className="main-content homepage-content">
                <AnalystGuideHeader />
                <p>hello world</p>
            </main>
        </PageWrapper>}
    </>);
};

export default AnalystGuide;

