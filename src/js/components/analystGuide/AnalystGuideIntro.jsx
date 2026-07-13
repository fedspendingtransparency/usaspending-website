/* eslint-disable max-len */
import React from 'react';
import { FlexGridCol, FlexGridRow  } from "data-transparency-ui";
import { useDispatch } from "react-redux";

import '../../../_scss/pages/analystGuide/analystGuide.scss';
import { getBaseUrl, handleShareOptionClick } from '../../helpers/socialShare';
import { showModal } from '../../redux/actions/modal/modalActions';
import ShareDownloadButtonGroup from '../../components/sharedComponents/buttons/ShareDownloadButtonGroup';

const AnalystGuideIntro = () => {
    const dispatch = useDispatch();
    const onExternalLinkClick = (e) => {
        dispatch(showModal(e));
    };

    const slug = 'federal-spending-guide';

    const onShareClick = (name) => {
        const emailSubject = `USAspending.gov Federal Spending Guide`;
        const emailArgs = {
            subject: `${emailSubject}`,
            // eslint-disable-next-line max-len
            body: `Interested in learning how to effectively use Federal Spending Data? Check out #USAspending Federal Spending Guide! ${getBaseUrl(slug)}`
        };
        handleShareOptionClick(name, slug, emailArgs, onExternalLinkClick);
    };


    return (
        <FlexGridRow className="analyst-guide__intro">
            <FlexGridCol width={10}>
                <div className="analyst-guide__title-wrapper">
                    <h2 className="analyst-guide__topTitle">What is the Federal Spending Guide?</h2>
                </div>
                <div className="analyst-guide__bodyText">
                    <p>Welcome to the Federal Spending Guide. You&apos;ll find answers here to commonly asked questions about federal spending concepts and USAspending data. We hope this guide makes it easier for you to conduct your own analyses and develop your own tools.</p>
                    <p>If you&apos;d like to recommend a question to be added to this guide, please share it on our <a href="https://onevoicecrm.my.site.com/usaspending/s/" alt="Community Page" target="_blank" rel="noopener noreferrer">Community page</a> or send an email to <a href="mailto:USAspending.Help@fiscal.treasury.gov" alt="email link USAspending.help@fiscal.treasury.gov">USAspending.Help@fiscal.treasury.gov</a>. We look forward to hearing from you!
                    </p>
                </div>
            </FlexGridCol>
            <FlexGridCol width={2}>
                <ShareDownloadButtonGroup
                    url={getBaseUrl(slug)}
                    downloadLink={"/data/Federal-Spending-Guide.pdf"}
                    onShareClick={onShareClick} />
            </FlexGridCol>
        </FlexGridRow>
    );

};

export default AnalystGuideIntro;
