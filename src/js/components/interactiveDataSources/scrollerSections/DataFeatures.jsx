import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';
import GlossaryLink from '../../sharedComponents/GlossaryLink';

const DataFeatures = (props) => {
    const overline = <p>{props.title?.toUpperCase()}</p>;

    const ref1 = useRef();
    return (
        <div className="data-sources-titles__container">
            <div className="data-sources__title">
                {props.title}
                <div className="data-sources__subtitle">
                    {props.subtitle}
                </div>
            </div>
            <Scroller>

                {/* SCROLLER BACKDROPS */}
                <div name="animation-loop" className="position position--center">
                    <LottieAnimation
                        loop={1}
                        ref={ref1}
                        src="/img/interactive-data-sources/9_DA.json"
                        role="presentation" />
                </div>


                {/* SCROLLER OVERLAYS */}

                {/* ACCOUNT DATA */}
                <ScrollerOverlay
                    content="animation-loop"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(120, 300, 1, false)
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Features for Account Data</h4>}
                            content={
                                <>
                                    <p>
                                If you are looking for account data, you can use the following
                                features:
                                    </p>
                                    <ul className="interactives-guide_bullet-points">
                                        <li>
                                            <Link
                                                className="scroller-overlay-card__link"
                                                to="/explorer"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        Spending Explorer
                                            </Link>{" "}
                                        lets you drill down from larger budget categories to smaller
                                        ones
                                        </li>
                                        <li>
                                            <Link
                                                className="scroller-overlay-card__link"
                                                to="/agency"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        Agency Profiles
                                            </Link>{" "}
                                        show you account spending (and award spending) summaries for
                                        specific <span className="glossary-term">agencies</span>{" "}
                                            <GlossaryLink term="agency" /> and{" "}
                                            <span className="glossary-term">fiscal years</span>{" "}
                                            <GlossaryLink term="fiscal-year-fy" />
                                        </li>
                                        <li>
                                            <Link
                                                className="scroller-overlay-card__link"
                                                to="/federal_account"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        Federal Account Profiles
                                            </Link>{" "}
                                        show you account spending (and award spending) summaries for
                                        specific{" "}
                                            <span className="glossary-term">federal accounts</span>{" "}
                                            <GlossaryLink term="federal-account" /> in the current
                                        fiscal year
                                        </li>
                                    </ul>
                                </>
                            } />
                    </div>
                </ScrollerOverlay>

                {/* AWARD DATA */}
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Features for Award Data</h4>}
                            content={
                                <>
                                    <p>
                                    If you are looking for award data (both{" "}
                                        <span className="glossary-term">prime award</span>{" "}
                                        <GlossaryLink term="prime-award" /> and{" "}
                                        <span className="glossary-term">subaward</span>{" "}
                                        <GlossaryLink term="sub-award" />
                                    ), you should go directly to{" "}
                                        <Link
                                            className="scroller-overlay-card__link"
                                            to="/search"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                        Advanced Search
                                        </Link>
                                    . This feature has many filters to help narrow your search,
                                    such as by:
                                    </p>
                                    <ul className="interactives-guide_bullet-points">
                                        <li>
                                            <span className="glossary-term">Action Date</span>{" "}
                                            <GlossaryLink term="action-date" />
                                        </li>
                                        <li>
                                            <span className="glossary-term">Award Type</span>{" "}
                                            <GlossaryLink term="award-type" />
                                        </li>
                                        <li>
                                            <span className="glossary-term">Awarding Agency</span>{" "}
                                            <GlossaryLink term="awarding-agency" />
                                        </li>
                                        <li>
                                            <span className="glossary-term">Place of Performance</span>{" "}
                                            <GlossaryLink term="primary-place-of-performance" />
                                        </li>
                                        <li>
                                            <span className="glossary-term">Recipient Name</span>{" "}
                                            <GlossaryLink term="recipient-name" /> or{" "}
                                            <span className="glossary-term">Code</span>{" "}
                                            <GlossaryLink term="unique-entity-identifier-uei" />
                                        </li>
                                        <li>
                                            <span className="glossary-term">
                                        Assistance Listing (CFDA Program)
                                            </span>{" "}
                                            <GlossaryLink term="assistance-listings-cfda-program" />
                                        </li>
                                        <li>
                                            <span className="glossary-term">Industry (NAICS)</span>{" "}
                                            <GlossaryLink term="naics" />
                                        </li>
                                    </ul>
                                </>
                            } />
                    </div>
                </ScrollerOverlay>

                {/* COVID-19 and INFRASTRUCTURE SPENDING */}
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Features for COVID-19 and Infrastructure Spending Data</h4>}
                            content={
                                <>
                                    <p>
                                    The{" "}
                                        <span className="glossary-term">
                                        Disaster Emergency Fund Code (DEFC)
                                        </span>{" "}
                                        <GlossaryLink term="disaster-emergency-fund-code-defc" /> data
                                    element tracks spending from supplemental appropriation bills
                                    addressing topics such as COVID-19 relief and infrastructure
                                    investment. These data elements are found in{" "}
                                        <span className="glossary-term">File B</span>{" "}
                                        <GlossaryLink term="account-breakdown-by-program-activity-object-class-file-b" />{" "}
                                    and <span className="glossary-term">File C</span>{" "}
                                        <GlossaryLink term="account-breakdown-by-award-file-c" />{" "}
                                    (i.e., in submissions from agency financial systems). You can find DEFC spending data in
                                    the following features:
                                    </p>
                                    <ul className="interactives-guide_bullet-points">
                                        <li>
                                            <Link
                                                className="scroller-overlay-card__link"
                                                to="/disaster/covid-19"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        COVID-19 Spending Profile
                                            </Link>{" "}
                                        (with more information available in the{" "}
                                            <Link
                                                className="scroller-overlay-card__link"
                                                to="/disaster/covid-19/data-sources"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        Data Sources and Methodology page
                                            </Link>
                                        )
                                        </li>
                                        <li>
                                            <Link
                                                className="scroller-overlay-card__link"
                                                to="/search"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        Advanced Search
                                            </Link>{" "}
                                        (using the DEFC filter)
                                        </li>
                                        <li>
                                            <Link
                                                className="scroller-overlay-card__link"
                                                to="/download_center/custom_account_data"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        Custom Account Data Download
                                            </Link>{" "}
                                        (using the DEFC filter)
                                        </li>
                                    </ul>
                                </>
                            } />
                    </div>
                </ScrollerOverlay>

                {/* DOWNLOADS and APIs */}
                <ScrollerOverlay
                    content="animation-loop"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(120, 300, 1, false)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Features for Downloads and APIs</h4>}
                            content={
                                <>
                                    <p>
                                If you just want to access the data for your own purposes, you can
                                use our various download and API features:
                                    </p>
                                    <ul className="interactives-guide_bullet-points">
                                        <li>
                                        Award data can be accessed as pre-generated files in the{" "}
                                            <Link
                                                className="scroller-overlay-card__link"
                                                to="/download_center/award_data_archive"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        Award Data Archive
                                            </Link>{" "}
                                        , or as customized downloads in the{" "}
                                            <Link
                                                className="scroller-overlay-card__link"
                                                to="download_center/custom_award_data"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        Custom Award Data Download
                                            </Link>
                                        </li>
                                        <li>
                                        Account data can be accessed as customized downloads in the{" "}
                                            <Link
                                                className="scroller-overlay-card__link"
                                                to="/download_center/custom_account_data"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        Custom Account Data Download
                                            </Link>
                                        </li>
                                        <li>
                                        The USAspending database can be accessed in the{" "}
                                            <a
                                                className="scroller-overlay-card__link"
                                                href="https://files.usaspending.gov/database_download/"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        Database Download
                                            </a>
                                        </li>
                                        <li>
                                        Results from{" "}
                                            <Link
                                                className="scroller-overlay-card__link"
                                                to="/search"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                            Advanced Search
                                            </Link>{" "}
                                        can be downloaded from the top right of the page
                                        </li>
                                        <li>
                                        Data from individual Award Summary Profile pages (accessed from the “Award ID”
                                        column in{" "}
                                            <Link
                                                className="scroller-overlay-card__link"
                                                to="/search"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                            Advanced Search
                                            </Link>{" "}
                                        results) can be downloaded from the top right of the page
                                        </li>
                                        <li>
                                        The USAspending API documentation includes a list of{" "}
                                            <a
                                                className="scroller-overlay-card__link"
                                                href="https://api.usaspending.gov/docs/endpoints"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        API Endpoints
                                            </a>{" "}
                                        as well as an{" "}
                                            <a
                                                className="scroller-overlay-card__link"
                                                href="https://api.usaspending.gov/docs/intro-tutorial"
                                                target="_blank"
                                                rel="noopener noreferrer">
                                        API Tutorial
                                            </a>
                                        </li>
                                    </ul>
                                </>
                            } />
                    </div>
                </ScrollerOverlay>

            </Scroller>
        </div>
    );
};

export default DataFeatures;
