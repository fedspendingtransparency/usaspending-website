import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';
import GlossaryLink from '../../sharedComponents/GlossaryLink';

const AwardData = (props) => {
    const overline = <p>{props.title?.toUpperCase()}</p>;

    const cards = {
        card1: {
            heading: <h4>File C</h4>,
            content: (
                <>
                    <p>
                        <span className="glossary-term">
                        File C (Account Breakdown by Award)
                        </span>{" "}
                        <GlossaryLink term="account-breakdown-by-award-file-c" />{" "}
                    is part of the package of data submitted to USAspending by federal
                    agencies, as required by the DATA Act. It contains obligation and
                    outlay data for all awards issued by a reporting agency, covering both
                    contract and financial assistance awards over the lifetime of those
                    awards.
                    </p>
                    <p>
                    File C is a further breakdown of File B, showing award spending broken down by Treasury Account,{" "}
                        <span className="glossary-term">
                        Program Activity
                        </span>{" "}
                        <GlossaryLink term="program-activity" />,{" "}
                        <span className="glossary-term">Object Class</span>{" "}
                        <GlossaryLink term="object-class" />, and{" "}
                        <span className="glossary-term">Disaster Emergency Fund Code</span>{" "}
                        <GlossaryLink term="disaster-emergency-fund-code-defc" /> (DEFC, which is used to track spending from supplemental appropriation bills addressing topics such as COVID-19 relief and infrastructure investment).
                    </p>
                    <p>
                    Note that File C represents only the financial aspect of awards (e.g., Treasury Account, Program Activity, and Object Class information), whereas Files D1 and D2 provide both financial information and other non-financial details (e.g., recipient name, recipient location, and place of performance).
                    </p>
                </>
            )
        },
        card2: {
            heading: <h4>FPDS (File D1)</h4>,
            content: (
                <>
                    <p>
                        The{" "}
                        <a
                            className="scroller-overlay-card__link"
                            href="https://www.fpds.gov/"
                            target="_blank"
                            rel="noopener noreferrer">
                            Federal Procurement Data System (FPDS)
                        </a>{" "}
                        is the database where federal contracting officials submit{" "}
                        <span className="glossary-term">transaction-level</span>{" "}
                        <GlossaryLink term="transaction" /> data for{" "}
                        <span className="glossary-term">contracts</span>{" "}
                        <GlossaryLink term="contract" /> and contract{" "}
                        <span className="glossary-term">
                        indefinite delivery vehicles (IDV)
                        </span>{" "}
                        <GlossaryLink term="indefinite-delivery-vehicle-idv" />.{" "}
                        It contains information about award
                        transaction obligation,{" "}
                        <span className="glossary-term">
                        award transaction description
                        </span>{" "}
                        <GlossaryLink term="transaction-description" />,{" "}
                        <span className="glossary-term">action date</span>{" "}
                        <GlossaryLink term="action-date" />,{" "}
                        <span className="glossary-term">awarding agency</span>{" "}
                        <GlossaryLink term="awarding-agency" />,{" "}
                        <span className="glossary-term">
                        recipient code
                        </span>{" "}
                        <GlossaryLink term="unique-entity-identifier-uei" />,{" "}
                        <span className="glossary-term">recipient location</span>{" "}
                        <GlossaryLink term="recipient-location" />,{" "}
                        <span className="glossary-term">place of performance</span>{" "}
                        <GlossaryLink term="primary-place-of-performance" />,{" "}
                        <span className="glossary-term">industry (NAICS)</span>{" "}
                        <GlossaryLink term="naics" />,{" "}
                        <span className="glossary-term">product or service</span>{" "}
                        <GlossaryLink term="product-or-service-code-psc" />, and type of{" "}
                        <span className="glossary-term">set aside</span>{" "}
                        <GlossaryLink term="set-aside-type" />, among other details.
                    </p>
                    <p>
                        The collection of data in FPDS that USAspending.gov extracts
                        is known as{" "}
                        <span className="glossary-term">File D1</span>{" "}
                        <GlossaryLink term="awards-data-file-d" />.
                    </p>
                </>
            )
        },
        card3: {
            heading: <h4>FABS (File D2)</h4>,
            content: (
                <>
                    <p>
                        The Financial Assistance Broker Submission (FABS) is how federal agencies submit{" "}
                        <span className="glossary-term">transaction-level</span>{" "}
                        <GlossaryLink term="transaction" /> data for{" "}
                        <span className="glossary-term">financial assistance</span>{" "}
                        <GlossaryLink term="financial-assistance" /> awards to USAspending.gov. It contains information
                        about award transaction obligation,{" "}
                        <span className="glossary-term">
                        award transaction description
                        </span>{" "}
                        <GlossaryLink term="transaction-description" />,{" "}
                        <span className="glossary-term">action date</span>{" "}
                        <GlossaryLink term="action-date" />,{" "}
                        <span className="glossary-term">awarding agency</span>{" "}
                        <GlossaryLink term="awarding-agency" />,{" "}
                        <span className="glossary-term">
                        recipient code
                        </span>{" "}
                        <GlossaryLink term="unique-entity-identifier-uei" />,{" "}
                        <span className="glossary-term">recipient location</span>{" "}
                        <GlossaryLink term="recipient-location" />,{" "}
                        <span className="glossary-term">place of performance</span>{" "}
                        <GlossaryLink term="primary-place-of-performance" />, and {" "}
                        <span className="glossary-term">assistance listing</span>{" "}
                        <GlossaryLink term="assistance-listings-cfda-program" />,{" "}
                        among other details.
                    </p>
                    <p>
                        The collection of data in FABS that USAspending.gov receives
                        is known as{" "}
                        <span className="glossary-term">File D2</span>{" "}
                        <GlossaryLink term="awards-data-file-d" />.
                    </p>
                </>
            )
        },
        card4: {
            heading: <h4>Linked Awards</h4>,
            content: (
                <>
                    <p>
                    While File C provides data over the lifetime of individual awards
                    from agency financial systems, Files D1 and D2 provide data from award{" "}
                        <span className="glossary-term">transactions</span>{" "}
                        <GlossaryLink term="transaction" /> in governmentwide award systems.
                    USAspending.gov links these two sources of award data. However, due to
                    different policies and reporting requirements for these separate
                    systems, not all award data can be linked across both sources.
                    Awards can only be linked through a shared{" "}
                        <span className="glossary-term">award ID</span>{" "}
                        <GlossaryLink term="award-id" />.
                    </p>
                    <p>
                        An award in File C that is missing in Files D1 and D2 will lack non-financial
                        details such as recipient or location information. An award in Files D1 or D2
                        that is missing in File C will lack financial details such as the Treasury
                        Account that funded the award.
                    </p>
                    <p>
                    You can see statistics about unlinked contract awards and unlinked
                    assistance awards in the{" "}
                        <Link
                            className="scroller-overlay-card__link"
                            to="/submission-statistics"
                            target="_blank"
                            rel="noopener noreferrer">
                            Agency Submission Statistics page
                        </Link>
                        . More information about linked awards is available in the{" "}
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
            )
        },
        card5: {
            heading: <h4>SAM.gov (File E)</h4>,
            content: (
                <>
                    <p>
                        <a
                            className="scroller-overlay-card__link"
                            href="https://sam.gov/"
                            target="_blank"
                            rel="noopener noreferrer">
                            SAM.gov
                        </a>{" "}
                        is the “System for Award Management” where potential recipients must
                        register if they want to be eligible to receive federal{" "}
                        <span className="glossary-term">prime awards</span>{" "}
                        <GlossaryLink term="prime-award" />
                        . USAspending.gov uses SAM.gov as the source
                        of authoritative{" "}
                        <span className="glossary-term">
                        recipient name
                        </span>{" "}
                        <GlossaryLink term="recipient-name" />,{" "}
                        <span className="glossary-term">code</span>{" "}
                        <GlossaryLink term="unique-entity-identifier-uei" />
                        , and <span className="glossary-term">executive compensation</span>{" "}
                        <GlossaryLink term="highly-compensated-officer-total-compensation" />{" "}
                        data.
                    </p>
                    <p>
                        The collection of executive compensation data in SAM.gov
                        that USAspending.gov extracts is known as File E.
                    </p>
                </>
            )
        },
        card6: {
            heading: <h4>FSRS (File F)</h4>,
            content: (
                <>
                    <p>
                        <a
                            className="scroller-overlay-card__link"
                            href="https://www.fsrs.gov/"
                            target="_blank"
                            rel="noopener noreferrer">
                            The FFATA Subaward
                            Reporting System (FSRS)
                        </a>{" "}
                        is where{" "}
                        <span className="glossary-term">prime recipients</span>{" "}
                        <GlossaryLink term="prime-recipient" /> submit information about
                        their subawards. This information includes data about both the prime
                        award and the subaward, such as their respective{" "}
                        <span className="glossary-term">action dates</span>{" "}
                        <GlossaryLink term="action-date" />,{" "}
                        <span className="glossary-term">recipient codes</span>{" "}
                        <GlossaryLink term="unique-entity-identifier-uei" />,{" "}
                        <span className="glossary-term">recipient locations</span>{" "}
                        <GlossaryLink term="recipient-location" />,{" "}
                        <span className="glossary-term">places of performance</span>{" "}
                        <GlossaryLink term="primary-place-of-performance" />,{" "}
                        <span className="glossary-term">award descriptions</span>{" "}
                        <GlossaryLink term="transaction-description" />, and{" "}
                        <span className="glossary-term">executive compensation</span>{" "}
                        <GlossaryLink term="highly-compensated-officer-total-compensation" />{" "}
                        data.
                    </p>
                    <p>
                        The collection of data in FSRS that USAspending.gov extracts
                        is known as File F.
                    </p>
                </>
            )
        }
    };
    const ref1 = useRef();
    const ref2 = useRef();
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
                <div name="animation" className="position position--center">
                    <div className="top-animation">
                        <LottieAnimation
                            isScrollerBackdrop
                            ref={ref1}
                            src="/img/interactive-data-sources/5_DS_AWARD.json"
                            role="presentation" />
                    </div>
                    <div className="bottom-animation">
                        <LottieAnimation
                            loop={1}
                            ref={ref2}
                            src="/img/interactive-data-sources/5_DS_AWARD_BG.json"
                            role="presentation" />
                    </div>
                </div>


                {/* SCROLLER OVERLAYS */}

                {/* TRANSITION TO START SECTION */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(0, 120, 1.5);
                        ref2.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>


                {/* FILE C */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(120, 180, 1.5);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(180, 240, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={cards.card1.heading}
                            content={cards.card1.content} />
                    </div>
                </ScrollerOverlay>

                {/* FPDS */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(240, 300, 1.5);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(300, 360, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={cards.card2.heading}
                            content={cards.card2.content} />
                    </div>
                </ScrollerOverlay>


                {/* FABS */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(360, 420, 1.5);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(420, 480, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={cards.card3.heading}
                            content={cards.card3.content} />
                    </div>
                </ScrollerOverlay>


                {/* Linked Awards */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(480, 540, 1);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(540, 600, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={cards.card4.heading}
                            content={cards.card4.content} />
                    </div>
                </ScrollerOverlay>

                {/* SAM */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(600, 660, 1.5);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(660, 720, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={cards.card5.heading}
                            content={cards.card5.content} />
                    </div>
                </ScrollerOverlay>

                {/* FSRS File F */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(720, 780, 1.5);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(780, 840, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={cards.card6.heading}
                            content={cards.card6.content} />
                    </div>
                </ScrollerOverlay>

                {/* TRANSITION TO END SECTION */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(840, 900, 1.5);
                        ref2.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
            </Scroller>
        </div>
    );
};

export default AwardData;
