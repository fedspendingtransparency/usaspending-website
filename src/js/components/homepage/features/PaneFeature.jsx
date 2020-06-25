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
                    <hr className="feature-pane__mobile-content-divider" />

                    {/*DEV-5402*/}
                    <div className="feature-pane__content feature-pane__content-fiscal-data">
                        <div>
                            <h3 className="feature-pane__content-title">FiscalData.Treasury.gov</h3>
                            <p className="feature-pane_content-text">
                                Fiscal Data is a new site featuring federal financial data in machine-readable formats with comprehensive metadata. Explore and download the data today!
                            </p>
                        </div>
                        <div className="feature-pane__button-wrapper">
                            <a
                                href="https://www.FiscalData.Treasury.gov"
                                target="_blank"
                                role="button"
                                rel="noopener noreferrer"
                                className="feature-pane__button-covid">
                                Explore Fiscal Data <span className="feature-pane__button-icon"><FontAwesomeIcon icon="external-link-alt" /></span>
                            </a>
                        </div>
                    </div>

                    <div className="feature-pane__content-divider" />
                    <hr className="feature-pane__mobile-content-divider" />

                    {/*DEV-5403*/}
                    <div className="feature-pane__content feature-pane__content-covid">
                        <div>
                            <div className="covid-announcement-text-box">
                                <p className="feature-pane__content-title-covid">
                                    The Federal Response to COVID-19
                                </p>
                            </div>
                        </div>
                        <div className="feature-pane__button-wrapper">
                            <a href="https://datalab.usaspending.gov/federal-covid-spending" role="button" className="feature-pane__button-covid">Explore Data Lab<span className="feature-pane__button-icon"><FontAwesomeIcon icon="external-link-alt" /></span></a>
                        </div>
                    </div>

                    <div className="feature-pane__content-divider" />
                    <hr className="feature-pane__mobile-content-divider" />

                    <div className="feature-pane__content">
                        <h3 className="feature-pane__content-title">COVID-19 Related Contract Visualization</h3>
                        <p className="feature-pane_content-text">
                            Explore the General Services Administration’s Contract Obligation Dashboard for contract awards in response to COVID.
                        </p>
                        <div className="feature-pane__button-wrapper">
                            <button
                                onClick={onRedirectModalClick}
                                value="https://d2d.gsa.gov/report/covid-19-contract-obligation-tracking-dashboard"
                                className="feature-pane__button feature-pane__button-redirect-modal">
                                Contract Obligation Dashboard <span className="feature-pane__button-icon"><FontAwesomeIcon icon="external-link-alt" /></span>
                            </button>
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
