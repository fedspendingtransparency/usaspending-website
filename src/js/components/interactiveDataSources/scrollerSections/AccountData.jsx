import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';
import GlossaryLink from '../../sharedComponents/GlossaryLink';


const AccountData = (props) => {
    const overline = <p>{props.title?.toUpperCase()}</p>;

    const cards = {
        card1: {
            heading: <h4>GTAS</h4>,
            content: (
                <p>
                Agency budget execution information is submitted in a system called
                the Governmentwide Treasury Account Symbol Adjusted Trial Balance
                System (GTAS), and this information is used to generate authoritative{" "}
                    <span className="glossary-term">Treasury Account</span>{" "}
                    <GlossaryLink term="treasury-account-symbol-tas" /> balances. USAspending.gov
                extracts some data from GTAS for governmentwide spending figures and
                other purposes.
                </p>
            )
        },
        card2: {
            heading: <h4>File A</h4>,
            content: (
                <p>
                    <span className="glossary-term">File A (Account Balances)</span>{" "}
                    <GlossaryLink term="account-balance-file-a" />{" "}
                    is part of the package of data submitted to USAspending.gov by federal
                    agencies, as required by the DATA Act. It can be generated from data
                    in GTAS, but agencies may also upload their own custom File A data.
                    File A contains{" "}
                    <span className="glossary-term">budgetary resources</span>{" "}
                    <GlossaryLink term="budgetary-resources" />, obligation, and outlay
                data for all the relevant Treasury Accounts in a reporting agency. It includes both award and non-award spending (grouped together), and crosswalks with the SF 133 report.
                </p>
            )
        },
        card3: {
            heading: <h4>File B</h4>,
            content: (
                <>
                    <p>
                        <span className="glossary-term">File B (Account Breakdown by Program Activity & Object Class)</span>{" "}
                        <GlossaryLink term="account-breakdown-by-program-activity-object-class-file-b" />{" "}
                        is part of the package of data submitted to USAspending.gov by federal
                        agencies, as required by the DATA Act. It contains obligation and
                        outlay data for all the relevant <span className="glossary-term">Treasury Accounts</span>{" "}
                        <GlossaryLink term="treasury-account-symbol-tas" />{" "} in a reporting agency, with a
                        breakdown by two accounting categories called{" "}
                        <span className="glossary-term">Program Activity</span>{" "}
                        <GlossaryLink term="program-activity" />,{" "}
                        <span className="glossary-term">Object Class</span>{" "}
                        <GlossaryLink term="object-class" />, and{" "}
                        <span className="glossary-term">Disaster Emergency Fund Code</span>{" "}
                        <GlossaryLink term="disaster-emergency-fund-code-defc" /> (DEFC, which is used to track spending from supplemental appropriation bills addressing topics such as COVID-19 relief and infrastructure investment). It includes both award and non-award spending (grouped together).
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
                            src="/img/interactive-data-sources/5_DS_ACCOUNT.json"
                            role="presentation" />
                    </div>
                    <div className="bottom-animation">
                        <LottieAnimation
                            loop={1}
                            ref={ref2}
                            src="/img/interactive-data-sources/5_DS_ACCOUNT_BG.json"
                            role="presentation" />
                    </div>
                </div>


                {/* SCROLLER OVERLAYS */}


                {/* GTAS/AGENCY BUDGET EXECUTION */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(0, 120, 1.5);
                        ref2.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
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
                            content={cards.card1.content}
                            role="presentation" />
                    </div>
                </ScrollerOverlay>


                {/* FILE A */}
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


                {/* FILE B */}
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

                {/* TRANSITION TO END SECTION */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(480, 540, 1.5);
                        ref2.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>

            </Scroller>
        </div>
    );
};

export default AccountData;
