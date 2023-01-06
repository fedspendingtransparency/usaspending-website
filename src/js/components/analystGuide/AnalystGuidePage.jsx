/**
 * AnalystGuide.jsx
 * Created by Andrea Blackwell 03/29/22
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from 'react';
import { FlexGridRow, FlexGridCol, ShareIcon } from "data-transparency-ui";
import { faFileDownload } from "@fortawesome/free-solid-svg-icons";
import { throttle } from 'lodash';
import 'pages/analystGuide/analystGuide.scss';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { useDispatch } from "react-redux";
import { mediumScreen } from 'dataMapping/shared/mobileBreakpoints';
import { showModal } from 'redux/actions/modal/modalActions';
import AnalystGuideHeader from './AnalystGuideHeader';
import PageWrapper from "../sharedComponents/PageWrapper";
import { analystGuideMetaTags } from "../../helpers/metaTagHelper";
import AnalystGuideQuestions from "./AnalystGuideQuestions";
import AnalystGuideIntro from "./AnalystGuideIntro";


const AnalystGuidePage = () => {
    const slug = 'analyst-guide';
    const [windowWidth, setWindowWidth] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < mediumScreen);

    const onShareClick = (name) => {
        const emailSubject = `USAspending.gov Analyst's Guide`;
        const emailArgs = {
            subject: `${emailSubject}`,
            body: `Interested in learning how to effectively use Federal Spending Data? Check out #USAspending Analyst Guide! ${getBaseUrl(slug)}`
        };
        handleShareOptionClick(name, slug, emailArgs);
    };

    const dispatch = useDispatch();
    const onExternalLinkClick = (e) => {
        e.persist();
        if (e?.target) {
            dispatch(showModal(e.target.parentNode.getAttribute('data-href') || e.target.getAttribute('data-href') || e.target.value));
        }
    };
    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < mediumScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <PageWrapper
            pageName="AnalystGuide"
            classNames="usa-da-analyst-guide-page"
            noHeader
            metaTagProps={{ ...analystGuideMetaTags }}>
            <main id="main-content" className="main-content">
                <section>
                    <AnalystGuideHeader title="Analyst&apos;s Guide to Federal Spending Data" subtitle="Guidance on effectively using USAspending.gov data." />
                </section>
                <FlexGridRow style={{ justifyContent: 'center' }}>
                    <FlexGridCol desktop={6} tablet={12} className="analyst-guide-body">
                        <div className="analyst-guide__share-dl-wrapper">
                            <div className="analyst-guide__share-wrapper">
                                <ShareIcon
                                    url={getBaseUrl(slug)}
                                    onShareOptionClick={onShareClick}
                                    colors={{ backgroundColor: "white", color: "#0071bc" }}
                                    dropdownDirection={isMobile ? 'right' : 'left'} />
                            </div>
                            <div className="analyst-guide__download-wrapper">
                                <a
                                    href="/data/analyst-guide-download.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="analyst-guide__download-button"
                                    download>
                                    <FontAwesomeIcon data-href="/data/analyst-guide-download.pdf" icon={faFileDownload} className="analyst-guide__download-icon" />
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

