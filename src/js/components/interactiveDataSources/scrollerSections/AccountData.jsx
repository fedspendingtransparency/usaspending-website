import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';
import GlossaryLink from '../../sharedComponents/GlossaryLink';

function AccountData() {
    const cards = {
        card1: {
            heading: <p>GTAS</p>,
            content: (
                <p>
                Agency budget execution information is submitted in a system called
                the Governmentwide Treasury Account Symbol Adjusted Trial Balance
                System (GTAS), and this information is used to generate authoritative{" "}
                    <span className="glossary-term">Treasury Account</span>{" "}
                    <GlossaryLink term="treasury-account-symbol-tas" /> balances. USAspending
                extracts some data from GTAS for governmentwide spending figures and
                other purposes.
                </p>
            )
        },
        card2: {
            heading: <p>File A</p>,
            content: (
                <p>
                File A (“Account Balances”) is part of the package of data submitted
                to USAspending by federal agencies, as required by the DATA Act. File
                A is generated from data in GTAS. It contains{" "}
                    <span className="glossary-term">budgetary resources</span>{" "}
                    <GlossaryLink term="budgetary-resources" />, obligation, and outlay
                data for all the Treasury Accounts in that agency.
                </p>
            )
        },
        card3: {
            heading: <p>File B</p>,
            content: (
                <>
                    <p>
                    File B (“Account Breakdown by Program Activity & Object Class”) is
                    part of the package of data submitted to USAspending by federal
                    agencies, as required by the DATA Act. It contains obligation and
                    outlay data for all the Treasury Accounts in that agency, with a
                    breakdown by accounting categories known as{" "}
                        <span className="glossary-term">Program Activitys</span>{" "}
                        <GlossaryLink term="program-activity" /> and{" "}
                        <span className="glossary-term">object class</span>{" "}
                        <GlossaryLink term="object-class" />.
                    </p>
                    <p>
                        File B also contains obligations and outlays tagged by{" "}
                        <span className="glossary-term">
                            Disaster Emergency Fund Codes (DEFC)
                        </span>{" "}
                        <GlossaryLink term="disaster-emergency-fund-code-defc" /> to track spending from supplemental
                        appropriation bills addressing topics such as COVID-19 relief and
                        infrastructure investment.
                    </p>
                </>
            )
        }
    };
    const ref1 = useRef();
    const ref2 = useRef();
    return (
        <Scroller>

            {/* SCROLLER BACKDROPS */}
            <div name="animation" className="position position--center">
                <div className="top-animation">
                    <LottieAnimation
                        isScrollerBackdrop
                        ref={ref1}
                        src="/img/interactive-data-sources/5_DS_ACCOUNT.json" />
                </div>
                <div className="bottom-animation">
                    <LottieAnimation
                        loop
                        ref={ref2}
                        src="/img/interactive-data-sources/5_DS_ACCOUNT_BG.json" />
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
                        heading={cards.card1.heading}
                        content={cards.card1.content} />
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
                        heading={cards.card3.heading}
                        content={cards.card3.content} />
                </div>
            </ScrollerOverlay>

            {/* TRANSITION TO END SECTION */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() => {
                    ref1.current?.playAnimation(480, 540, 1.5);
                }
                }>
                {/* used as transition. no card. */}
            </ScrollerOverlay>

        </Scroller>
    );
}

export default AccountData;
