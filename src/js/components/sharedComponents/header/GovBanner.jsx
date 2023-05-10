import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const GovBanner = () => {
    const [accordionOpen, setAccordionOpen] = useState(false);
    const toggleAccordion = () => {
        setAccordionOpen((prevState) => !prevState);
    };

    const closeAccordion = () => {
        setAccordionOpen(false);
    };

    return (
        <div className={`usa-banner__wrapper ${accordionOpen ? "open" : ""}`}>
            <section className="usa-banner" data-testid="govBanner">
                <div className="usa-accordion">
                    <header className="usa-banner__header">
                        <div className="usa-banner__inner" data-testid="banner-header-inner-div">
                            <img
                                className="usa-banner__header-flag"
                                alt="U.S. flag"
                                src="img/uswds/us_flag_small.png" />
                            <div className="usa-banner__header-text">&nbsp;&nbsp;<span>An official website of the <span style={{ whiteSpace: 'nowrap' }}>United States government&nbsp;</span></span>
                                <button
                                    type="button"
                                    onClick={toggleAccordion}
                                    className="usa-accordion__button usa-banner__button"
                                    aria-expanded="false"
                                    aria-controls="gov-banner">
                                    <span className="usa-banner__button-text">Here’s how you know</span>
                                    <span>&nbsp;&nbsp;</span>
                                    <FontAwesomeIcon width="11.7px" icon={accordionOpen === true ? "chevron-up" : "chevron-down"} alt="Expanded menu" />
                                </button>
                            </div>
                            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                            <div
                                className="usa-banner-close"
                                onClick={closeAccordion}>
                                <FontAwesomeIcon icon="times" alt="Close Menu" />
                            </div>
                        </div>
                    </header>
                    <div
                        className={`usa-banner__content usa-accordion__content ${accordionOpen === true ? "" : "closed"}`}
                        style={{ marginLeft: "-24px" }}
                        hidden=""
                        id="gov-banner">
                        <div className="usa-banner__guidance">
                            <div className="usa-media-block__body">
                                <img
                                    className="usa-banner__content-lock"
                                    alt="Lock"
                                    style={{ width: "40px" }}
                                    src="img/uswds/icon-dot-gov.svg" />
                                <p><strong>Official websites use .gov</strong><br />A <strong>.gov</strong> website belongs to an official government organization in the United States.</p>
                            </div>
                        </div>
                        <div className="usa-banner__guidance tablet:grid-col-6">
                            <div className="usa-media-block__body">
                                <img
                                    className="usa-banner__content-lock"
                                    alt="Lock"
                                    style={{ width: "40px" }}
                                    src="img/uswds/icon-https.svg" />
                                <p><strong>Secure .gov websites use HTTPS</strong><br />A <strong>lock (
                                    <img
                                        className="usa-banner__content-lock"
                                        alt="Lock"
                                        style={{ width: "9.5px" }}
                                        src="img/uswds/lock.svg" />
                                    )
                                </strong> or <strong>https://</strong> means
                                    you’ve safely connected to the .gov website. Share sensitive information only on official,
                                    secure websites.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default GovBanner;
