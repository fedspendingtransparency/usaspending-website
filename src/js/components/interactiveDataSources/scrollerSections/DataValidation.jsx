import React, { useRef } from 'react';
import { Link } from "react-router-dom";
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';
import GlossaryLink from "../../sharedComponents/GlossaryLink";

const DataValidation = (props) => {
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
                        src="/img/interactive-data-sources/8_DVBS.json"
                        role="presentation" />
                </div>

                {/* SCROLLER OVERLAYS */}
                <ScrollerOverlay
                    content="animation-loop"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(120, 300, 1, false)
                    }>
                    {/* used as transition. no card */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>DATA Act Broker Practices</h4>}
                            content={
                                <p>
                            The DATA Act Broker is the system that collects and validates federal spending
                            data from source systems before they are ultimately published on USAspending.gov.
                            It receives data through two processes: one process is for FABS (i.e., transaction-level
                            financial assistance data) and one process is for monthly compilations and quarterly
                            certifications of Files A, B, C, D1, D2, E, and F. Data from the FABS process generates
                            File D2. Both processes involve data validation checks within the DATA Act Broker.
                            The results of some validation checks prevent publication of data, while others
                            raise warnings without preventing publication. Auditors can review these results
                            to monitor agency submissions.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>System Validations</h4>}
                            content={
                                <>
                                    <p>
                                The DATA Act Broker validates the data it receives from agency financial systems (Files A, B, and C) as well as FABS. These validations are based on business rules (such as for award linkage between File C and Files D1 and D2) and checks against authoritative sources such as GTAS. Agency financial systems are subject to other data quality assurance measures, such as review by Offices of Inspector General (OIG) and the Government Accountability Office (GAO) for reports as required by the DATA Act.
                                    </p>
                                    <p>
                                USAspending.gov relies on internal validations of data within source systems outside of the Treasury Department (such as FPDS, FSRS, and SAM.gov). The data extracted from these systems may not always align with the data standards, definitions, and requirements established in guidance from the Office of Management and Budget (OMB) and Treasury Department.
                                    </p>
                                    <p>
                                Read below for examples of the DATA Act Broker’s validation measures.
                                    </p>
                                </>
                            } />
                    </div>
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Treasury Account Validations</h4>}
                            content={
                                <p>
                            The DATA Act Broker checks that{" "}
                                    <span className="glossary-term">Treasury Accounts</span>{" "}
                                    <GlossaryLink term="treasury-account-symbol-tas" />{" "}
                            submitted to GTAS for any given reporting period are also submitted to File A,
                            and vice versa. It also checks that Treasury Accounts submitted to File A for
                            any given reporting period are also submitted to File B, and vice versa.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Zip Code Validations</h4>}
                            content={
                                <p>
                            The DATA Act Broker checks that all financial assistance recipient zip codes
                            are valid five-digit U.S. Postal Service zip codes. It also checks that these
                            zip codes are provided for all domestic financial assistance award recipients
                            (excluding aggregated and redacted{" "}
                                    <span className="glossary-term">records</span>{" "}
                                    <GlossaryLink term="record-type" />).
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation-loop"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(120, 300, 1, false)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Unique Entity Identifier (UEI) Validations</h4>}
                            content={
                                <p>
                            The DATA Act Broker checks that financial assistance award recipients with a
                            unique entity identifier (UEI) are registered in SAM.gov as of the date of the{" "}
                                    <span className="glossary-term">award transaction</span>{" "}
                                    <GlossaryLink term="action-date" />.{" "}
                            Some exceptions apply, such as if the date is before October 1, 2010.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Award Linkage Validation</h4>}
                            content={
                                <>
                                    <p>
                                    The DATA Act Broker warns agencies about award IDs (i.e.,{" "}
                                        <span className="glossary-term">PIID</span>{" "}
                                        <GlossaryLink term="procurement-instrument-identifier-piid" />,{" "}
                                        <span className="glossary-term">FAIN</span>{" "}
                                        <GlossaryLink term="fain" />,{" "}
                                    and{" "}
                                        <span className="glossary-term">URI</span>{" "}
                                        <GlossaryLink term="uri" />){" "}
                                    in File C that don’t exist in Files D1 and D2, and vice versa,
                                    for the same reporting period. This check only applies for award
                                    transactions where the obligation amount is not zero.
                                    </p>
                                    <p>
                                    You can see statistics about unlinked contract awards and unlinked assistance
                                    awards in the{" "}
                                        <Link
                                            className="scroller-overlay-card__link"
                                            to="/submission-statistics"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                        Agency Submission Statistics page
                                        </Link>.
                                    More information about linked awards is available in the{" "}
                                        <Link
                                            className="scroller-overlay-card__link"
                                            to="/submission-statistics/data-sources"
                                            target="_blank"
                                            rel="noopener noreferrer">
                                        Data Sources and Methodology page
                                        </Link>{" "}
                                    for these statistics.
                                    </p>
                                </>
                            } />
                    </div>
                </ScrollerOverlay>
            </Scroller>
        </div>
    );
};

export default DataValidation;
