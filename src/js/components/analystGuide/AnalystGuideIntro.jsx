/* eslint-disable max-len */
import React, { useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FlexGridCol, FlexGridRow, ShareIcon } from "data-transparency-ui";
import { useDispatch } from "react-redux";

import 'pages/analystGuide/analystGuide.scss';
import { getBaseUrl, handleShareOptionClick } from 'helpers/socialShare';
import { showModal } from 'redux/actions/modal/modalActions';
import IsMobileContext from "context/IsMobileContext";

const AnalystGuideIntro = () => {
    const { isMedium } = useContext(IsMobileContext);
    const dispatch = useDispatch();
    const onExternalLinkClick = (e) => {
        dispatch(showModal(e));
    };

    const dropdownDirection = isMedium ? 'right' : 'left';
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
                <div className="analyst-guide__share-dl-wrapper">
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
                    <div className="analyst-guide__share-wrapper">
                        <ShareIcon
                            url={getBaseUrl(slug)}
                            onShareOptionClick={onShareClick}
                            colors={{
                                backgroundColor: "white",
                                color: "#0071bc",
                                confirmationBackgroundColor: "white"
                            }}
                            dropdownDirection={dropdownDirection}
                            pickerButtonClassNames="side-margin"
                            pickerListClassNames="padding top-margin min-width" />
                    </div>
                </div>
            </FlexGridCol>
        </FlexGridRow>
    );

};

export default AnalystGuideIntro;
