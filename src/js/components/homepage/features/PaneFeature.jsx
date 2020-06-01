/**
 * PaneFeature.jsx
 * Created by David Trinh 4/19/18
 */

import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RedirectModal from 'components/sharedComponents/RedirectModal';

const PaneFeature = () => {
    const [isRedirectModalMounted, setIsRedirectModalMounted] = useState(false);
    const [redirectModalURL, setRedirectModalURL] = useState('');

    const onRedirectModalClick = (e) => {
        setRedirectModalURL(e.currentTarget.value);
        setIsRedirectModalMounted(true);
    };

    const closeRedirectModal = () => {
        setRedirectModalURL('');
        setIsRedirectModalMounted(false);
    };

    return (
        <div className="feature-pane">
            <div className="feature-pane__wrapper">
                <h2 className="feature-pane__title">Featured Content</h2>
                <div className="feature-pane__content-wrapper">
                    <div className="feature-pane__content">
                        <h3 className="feature-pane__content-title">COVID-19 Related Contract Visualization</h3>
                        <p className="feature-pane_content-text">
                            Explore the General Services Administration’s Contract Obligation Dashboard for contract awards in response to COVID.  
                        </p>
                        <div className="feature-pane__button-wrapper">
                            <button
                                // href="https://d2d.gsa.gov/report/covid-19-contract-obligation-tracking-dashboard"
                                // target="_blank"
                                // role="button"
                                // rel="noopener noreferrer"
                                onClick={onRedirectModalClick}
                                value="https://d2d.gsa.gov/report/covid-19-contract-obligation-tracking-dashboard"
                                className="feature-pane__button feature-pane__button-redirect-modal">
                                Contract Obligation Dashboard <span className="feature-pane__button-icon"><FontAwesomeIcon icon="external-link-alt" /></span>
                            </button>
                        </div>
                    </div>
                    <div className="feature-pane__content-divider" />
                    <hr className="feature-pane__mobile-content-divider" />
                    <div className="feature-pane__content feature-pane__content-middle__sub">
                        <div>
                            <div id="feature-pane__content-header__middle">
                                Updated for FY 2019
                            </div>
                            <h3 className="feature-pane__content-title" id="feature-pane__content-title__middle">
                                Your Guide to America’s Finances
                            </h3>
                            <p className="feature-pane_content-text">
                                Your Guide provides a snapshot of Fiscal Year 2019 revenue, spending,
                                deficit, and debt, along with data for download.
                                Click below to visit our partner site.
                            </p>
                        </div>
                        <div className="feature-pane__button-wrapper">
                            <a
                                href="https://datalab.usaspending.gov/americas-finance-guide/"
                                target="_blank"
                                role="button"
                                rel="noopener noreferrer"
                                className="feature-pane__button">
                                Explore the Guide <span className="feature-pane__button-icon"><FontAwesomeIcon icon="external-link-alt" /></span>
                            </a>
                        </div>
                    </div>
                    <hr className="feature-pane__mobile-content-divider" />
                    <div className="feature-pane__content-divider" />
                    <div className="feature-pane__content">
                        <h3 className="feature-pane__content-title">New! - Congressional Budget Justifications</h3>
                        <p className="feature-pane_content-text">See the rich, detailed documents each agency submits to Congress to justify its annual budget request.</p>
                        <div className="feature-pane__button-wrapper">
                            <a href="/#/agency" role="button" className="feature-pane__button">Explore Budget Justifications</a>
                        </div>
                    </div>
                </div>
                <hr className="feature-pane__bottom-divider" />
            </div>
            <RedirectModal
                mounted={isRedirectModalMounted}
                hideModal={closeRedirectModal}
                url={redirectModalURL} />
        </div>
    );
};

export default PaneFeature;
