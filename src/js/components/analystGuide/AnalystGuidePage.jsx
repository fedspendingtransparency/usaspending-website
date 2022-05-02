/**
 * AnalystGuide.jsx
 * Created by Andrea Blackwell 03/29/22
 */

import React from 'react';
import { FlexGridRow, FlexGridCol, ShareIcon } from "data-transparency-ui";
import 'pages/analystGuide/analystGuide.scss';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { useDispatch } from "react-redux";
import { showModal } from 'redux/actions/modal/modalActions';

import AnalystGuideHeader from './AnalystGuideHeader';
import PageWrapper from "../sharedComponents/PageWrapper";
import { analystGuideMetaTags } from "../../helpers/metaTagHelper";
import AnalystGuideQuestions from "./AnalystGuideQuestions";
import AnalystGuideIntro from "./AnalystGuideIntro";


const AnalystGuidePage = () => {
    const slug = 'analyst-guide';

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
                        <div className="analyst-guide__share-wrapper">
                            <ShareIcon
                                url={getBaseUrl(slug)}
                                onShareOptionClick={onShareClick}
                                colors={{ backgroundColor: "white", color: "#0071bc" }}
                                classNames="" />
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

