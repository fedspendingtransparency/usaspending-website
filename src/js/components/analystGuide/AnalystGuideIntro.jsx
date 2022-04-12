import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const AnalystGuideIntro = ({ onExternalLinkClick }) => (
    <>
        <h3 className="analyst-guide__topTitle">What is the Analyst&apos;s Guide to Federal Spending Data?</h3>
        <div className="analyst-guide__bodyText">
            <p>Welcome to the Analyst&apos;s Guide to Federal Spending Data. Here, you&apos;ll find guidance on effectively using USAspending.gov data, making it easier for you to conduct your own analyses and develop tools using federal spending data</p>
            <p>If you&apos;d like to recommend a question to be added to this guide, please share it on our{' '}
                <button
                    value="https://fiscalservice.force.com/usaspending/s/"
                    role="link"
                    className="analyst-guide__external-link"
                    onClick={onExternalLinkClick}>
                    Community page{' '}
                    <span
                        data-href="https://fiscalservice.force.com/usaspending/s/"
                        className="usa-button-link__icon">
                        <FontAwesomeIcon data-href="https://fiscalservice.force.com/usaspending/s/" icon="external-link-alt" />
                    </span>
                    .
                </button>
            </p>
        </div>
    </>
);

export default AnalystGuideIntro;
