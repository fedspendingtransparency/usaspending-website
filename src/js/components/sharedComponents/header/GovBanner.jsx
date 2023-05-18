import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as Icons from 'components/sharedComponents/icons/Icons';
import { throttle } from "lodash";
import { tabletScreen } from 'dataMapping/shared/mobileBreakpoints';


const GovBanner = () => {
    const [accordionOpen, setAccordionOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < tabletScreen);
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        const handleResize = throttle(() => {
            const newWidth = window.innerWidth;
            if (windowWidth !== newWidth) {
                setWindowWidth(newWidth);
                setIsMobile(newWidth < tabletScreen);
            }
        }, 50);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [windowWidth]);

    const toggleAccordion = () => {
        setAccordionOpen((prevState) => !prevState);
    };

    const closeAccordion = () => {
        setAccordionOpen(false);
    };

    useEffect(() => {
        if (isMobile && document.querySelector(".usa-banner-close").style.display === "none") {
            // isMobile
        }
    }, [isMobile]);

    return (
        <div className={`usa-banner__wrapper ${accordionOpen ? "open" : ""}`}>
            <section className="usa-banner" data-testid="govBanner">
                <div className="usa-accordion">
                    <header className="usa-banner__header">
                        <div
                            className="usa-banner__inner"
                            tabIndex={isMobile ? 0 : ""}
                            role="button"
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && isMobile) toggleAccordion();
                            }}
                            onClick={() => ((isMobile) ? toggleAccordion() : "")}
                            data-testid="banner-header-inner-div">
                            <div className="usa-banner__header-text-wrapper">
                                <img
                                    className="usa-banner__header-flag"
                                    alt="U.S. flag"
                                    src="img/uswds/us_flag_small.png" />
                                <div
                                    className="usa-banner__header-text">
                                    <div className="usa-banner__header-sub-text">An official website of the United States government</div>
                                    <button
                                        type="button"
                                        tabIndex={!isMobile ? 0 : -1}
                                        onClick={() => (!isMobile ? toggleAccordion() : "")}
                                        className="usa-accordion__button usa-banner__button"
                                        aria-expanded="false"
                                        aria-controls="gov-banner">
                                        <span className="usa-banner__button-text">Here’s how you know</span>
                                        <div style={{ marginTop: "3px" }}><FontAwesomeIcon width="11.7px" height="6.9px" icon={accordionOpen === true ? "chevron-up" : "chevron-down"} alt="Expanded menu" /></div>
                                    </button>
                                </div>
                            </div>
                            <div
                                className="usa-banner-close"
                                tabIndex={0}
                                role="button"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !isMobile) closeAccordion();
                                }}
                                onClick={() => (!isMobile ? closeAccordion() : "")}>
                                <Icons.Close alt="Close Top Hat Mobile Menu" />
                            </div>
                        </div>
                    </header>
                    <div
                        className={`usa-banner__content usa-accordion__content ${accordionOpen === true ? "" : "closed"}`}
                        hidden=""
                        id="gov-banner">
                        <div className="usa-banner__guidance">
                            <div className="usa-media-block__body">
                                <img
                                    className="usa-banner__content-icon"
                                    alt="Lock"
                                    src="img/uswds/icon-dot-gov.svg" />
                                <p><strong>Official websites use .gov</strong><br />A <strong>.gov</strong> website belongs to an official government organization in the United States.</p>
                            </div>
                        </div>
                        <div className="usa-banner__guidance">
                            <div className="usa-media-block__body">
                                <img
                                    className="usa-banner__content-icon"
                                    alt="Lock"
                                    src="img/uswds/icon-https.svg" />
                                <p><strong>Secure .gov websites use HTTPS</strong><br />A&nbsp;
                                    <strong>lock (
                                        <img
                                            className="usa-banner__content-lock"
                                            alt="Lock"
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
