/**
 * AnalystGuide.jsx
 * Created by Andrea Blackwell 03/29/22
 */

import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexGridRow, FlexGridCol, ShareIcon } from "data-transparency-ui";
import { useDispatch } from "react-redux";

import 'pages/analystGuide/analystGuide.scss';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { showModal } from 'redux/actions/modal/modalActions';
import AnalystGuideHeader from './AnalystGuideHeader';
import PageWrapper from "../sharedComponents/PageWrapper";
import { analystGuideMetaTags } from "../../helpers/metaTagHelper";
import AnalystGuideQuestions from "./AnalystGuideQuestions";
import AnalystGuideIntro from "./AnalystGuideIntro";
import useWindowWidth from "../../hooks/useWindowWidth";


const AnalystGuidePage = () => {
    const windowWidth = useWindowWidth();
    const dispatch = useDispatch();
    const onExternalLinkClick = (e) => {
        dispatch(showModal(e));
    };

    const isMobile = windowWidth < mediumScreen;
    const slug = 'federal-spending-guide';

    const onShareClick = (name) => {
        const emailSubject = `USAspending.gov Federal Spending Guide`;
        const emailArgs = {
            subject: `${emailSubject}`,
            body: `Interested in learning how to effectively use Federal Spending Data? Check out #USAspending Federal Spending Guide! ${getBaseUrl(slug)}`
        };
        handleShareOptionClick(name, slug, emailArgs, onExternalLinkClick);
    };

    return (
        <PageWrapper
            pageName="FederalSpendingGuide"
            classNames="usa-da-analyst-guide-page"
            noHeader
            metaTagProps={{ ...analystGuideMetaTags }}>
            <main id="main-content" className="main-content">
                <section>
                    <AnalystGuideHeader
                        title="Federal Spending Guide"
                        subtitle="Questions and answers about USAspending data and federal spending concepts" />
                </section>
                <FlexGridRow style={{ justifyContent: 'center' }}>
                    <FlexGridCol desktop={6} tablet={12} className="analyst-guide-body">
                        <div className="analyst-guide__share-dl-wrapper">
                            <div className="analyst-guide__share-wrapper">
                                <ShareIcon
                                    url={getBaseUrl(slug)}
                                    onShareOptionClick={onShareClick}
                                    colors={{
                                        backgroundColor: "white",
                                        color: "#0071bc",
                                        confirmationBackgroundColor: "white"
                                    }}
                                    dropdownDirection={isMobile ? 'right' : 'left'}
                                    keepText
                                    classNames="margin-right no-margin-left"
                                    pickerButtonClassNames="side-margin"
                                    pickerListClassNames="padding top-margin min-width" />
                            </div>
                            <div className="analyst-guide__download-wrapper">
                                <a
                                    href="/data/Federal-Spending-Guide.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="analyst-guide__download-button"
                                    aria-label="download"
                                    download>
                                    <FontAwesomeIcon
                                        data-href="/data/Federal-Spending-Guide.pdf"
                                        icon="file-download"
                                        className="analyst-guide__download-icon" />
                                </a>
                                <div>
                                    <span>Download</span>
                                </div>
                            </div>
                        </div>
                        <AnalystGuideIntro onExternalLinkClick={onExternalLinkClick} />
                        <AnalystGuideQuestions onExternalLinkClick={onExternalLinkClick} />
                    </FlexGridCol>
                </FlexGridRow>
            </main>
        </PageWrapper>
    );
};

export default AnalystGuidePage;

