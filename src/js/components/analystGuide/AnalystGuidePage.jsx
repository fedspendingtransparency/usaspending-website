/**
 * AnalystGuide.jsx
 * Created by Andrea Blackwell 03/29/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol } from "data-transparency-ui";

import '../../../_scss/pages/analystGuide/analystGuide.scss';
import { getBaseUrl, handleShareOptionClick } from '../../helpers/socialShare';
import { showModal } from '../../redux/actions/modal/modalActions';
import { analystGuideMetaTags } from "../../helpers/metaTagHelper";
import IsMobileContext from "../../context/IsMobileContext";
import BannerPageHeader from "../../components/sharedComponents/header/BannerPageHeader";
import PageWrapper from "../sharedComponents/PageWrapper";
import AnalystGuideQuestions from "./AnalystGuideQuestions";
import AnalystGuideIntro from "./AnalystGuideIntro";

const AnalystGuidePage = () => {
    return (
        <PageWrapper
            pageName="FederalSpendingGuide"
            classNames="usa-da-analyst-guide-page"
            noHeader
            metaTagProps={{ ...analystGuideMetaTags }}>
            <main id="main-content" className="main-content">
                <BannerPageHeader
                    kicker="RESOURCES"
                    title="Federal Spending Guide"
                    body="Questions and answers about USAspending data and federal spending concepts"
                    faIcon="sack-dollar"
                    primaryColor="#0081A1"
                    secondaryColor="#00687D" />
                <FlexGridRow style={{ justifyContent: 'center' }}>
                    <FlexGridCol desktop={6} tablet={12} className="analyst-guide-body">
                        <AnalystGuideIntro />
                        <AnalystGuideQuestions />
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>
    );
};

export default AnalystGuidePage;

