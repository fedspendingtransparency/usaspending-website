/**
 * AnalystGuide.jsx
 * Created by Andrea Blackwell 03/29/22
 */

import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { FlexGridRow, FlexGridCol } from "data-transparency-ui";
import 'pages/analystGuide/analystGuide.scss';

import AnalystGuideHeader from './AnalystGuideHeader';
import PageWrapper from "../sharedComponents/PageWrapper";
import { homePageMetaTags } from "../../helpers/metaTagHelper";
import { SHOW_HOMEPAGE_UPDATE } from '../../GlobalConstants';
import AnalystGuideQuestions from "./AnalystGuideQuestions";
import AnalystGuideIntro from "./AnalystGuideIntro";

const AnalystGuidePage = () => {
    const [hideContent, setHideContent] = useState();

    useEffect(() => {
        setHideContent(!SHOW_HOMEPAGE_UPDATE);
    }, [SHOW_HOMEPAGE_UPDATE]);

    return (<>{hideContent ?
        <Redirect to="/404" />
        :
        <PageWrapper
            pageName="AnalystGuide"
            classNames="usa-da-analyst-guide-page"
            noHeader
            metaTagProps={{ ...homePageMetaTags }}>
            <main id="main-content" className="main-content">
                <section>
                    <AnalystGuideHeader title="Analyst&apos;s Guide to Federal Spending Data" subtitle="Guidance on effectively using USAspending.gov data." />
                </section>
                <FlexGridRow style={{ justifyContent: 'center' }}>
                    <FlexGridCol desktop={6} tablet={12} className="analyst-guide-body">
                        <AnalystGuideIntro />
                        <AnalystGuideQuestions />
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>}
    </>);
};

export default AnalystGuidePage;

