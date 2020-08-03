/**
 * PaneFeature.jsx
 * Created by David Trinh 4/19/18
 */

import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RedirectModal from 'components/sharedComponents/RedirectModal';

import GlobalConstants from "GlobalConstants";

const PaneFeature = () => {
    const [isRedirectModalMounted, setIsRedirectModalMounted] = useState(false);
    const [redirectModalURL, setRedirectModalURL] = useState('');

    const closeRedirectModal = () => {
        setRedirectModalURL('');
        setIsRedirectModalMounted(false);
    };

    return (
        <div className="feature-pane">
            <div className="feature-pane__wrapper">
                <h2 className="feature-pane__title">{GlobalConstants.CARES_ACT_RELEASED_2 ? 'OTHER DATA ACT CONTENT' : 'FEATURED CONTENT'}</h2>
                <div className="feature-pane__content-wrapper">
                    <div className="feature-pane__content feature-pane__content-fiscal-data">
                        <div>
                            <h3 className="feature-pane__content-title">FiscalData.Treasury.gov</h3>
                            <p className="feature-pane_content-text">
                                Fiscal Data is a new site featuring federal financial data in machine-readable formats with comprehensive metadata. Explore and download the data today!
                            </p>
                        </div>
                        <div className="feature-pane__button-wrapper">
                            <a
                                href="https://FiscalData.Treasury.gov"
                                target="_blank"
                                role="button"
                                rel="noopener noreferrer"
                                className="feature-pane__button white">
                                Explore Fiscal Data <span className="feature-pane__button-icon"><FontAwesomeIcon icon="external-link-alt" /></span>
                            </a>
                        </div>
                    </div>
                    <div className="feature-pane__content-divider" />
                    <hr className="feature-pane__mobile-content-divider" />

                    {GlobalConstants.CARES_ACT_RELEASED && (
                        <div className="feature-pane__content feature-pane__content-covid">
                            <div className="covid-announcement-text-box">
                                <p className="feature-pane__content-title">
                                    The Federal Response to COVID-19
                                </p>
                            </div>
                            <div className="feature-pane__button-wrapper">
                                <a
                                    href="https://datalab.usaspending.gov/federal-covid-funding/"
                                    target="_blank"
                                    role="button"
                                    rel="noopener noreferrer"
                                    value="https://datalab.usaspending.gov/federal-covid-funding/"
                                    className="feature-pane__button white">
                                    Explore Data Lab <span className="feature-pane__button-icon"><FontAwesomeIcon icon="external-link-alt" /></span>
                                </a>
                            </div>
                        </div>
                    )
                    }

                    {!GlobalConstants.CARES_ACT_RELEASED && (
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
                    )
                    }

                    <hr className="feature-pane__mobile-content-divider" />
                    <div className="feature-pane__content-divider" />
                    <div className="feature-pane__content">
                        <h3 className="feature-pane__content-title">COVID-19 Spending Profile Preview</h3>
                        <p className="feature-pane_content-text">
                            Check out a preview of our new COVID-19 Spending profile page. Data updates will be released on an ongoing basis.
                        </p>
                        <div className="feature-pane__button-wrapper">
                            <a
                                href="#/disaster/covid-19/"
                                role="button"
                                rel="noopener noreferrer"
                                className="feature-pane__button">
                                Explore COVID-19 Spending
                            </a>
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
