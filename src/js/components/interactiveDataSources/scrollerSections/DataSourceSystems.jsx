import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';
import GlossaryLink from '../../sharedComponents/GlossaryLink';

const DataSourceSystems = (props) => {
    const overline = <p>{props.title?.toUpperCase()}</p>;

    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
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
                            src="/img/interactive-data-sources/4_DSS.json"
                            role="presentation" />
                    </div>
                    <div className="top-animation">
                        <LottieAnimation
                            loop={1}
                            ref={ref2}
                            src="/img/interactive-data-sources/4_DSS_TYPES.json"
                            role="presentation" />
                    </div>
                    <div className="bottom-animation">
                        <LottieAnimation
                            loop={1}
                            ref={ref3}
                            src="/img/interactive-data-sources/4_DSS_BG.json"
                            role="presentation" />
                    </div>
                </div>


                {/* SCROLLER OVERLAYS */}

                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(0, 120, 1);
                        ref2.current?.playAnimation(0, 180, 1);
                        ref3.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            content={
                                <p>
                                You can understand the USAspending source systems as grouped by
                                the type of data they provide: Account Data, Award Data, and
                                Additional Data.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>


                {/* AGENCY BUDGET EXECUTION */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(120, 180, 1);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(180, 360, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Agency Budget Execution</h4>}
                            content={
                                <p>
                                Agency budget execution information (compiled in SF 133 reports) shows how agencies across
                                the federal government spend their funding, as required by the{" "}
                                    <a
                                        className="scroller-overlay-card__link"
                                        href="https://www.whitehouse.gov/wp-content/uploads/2018/06/a11.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                Office of Management and Budget's Circular A-11
                                    </a>
                                . Some smaller agencies do not submit their account data to
                                USAspending.gov but nonetheless submit budget execution data to a
                                different system.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>


                {/* AGENCY FINANCIAL SYSTEMS */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(360, 420, 1);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(420, 600, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Agency Financial Systems</h4>}
                            content={
                                <p>
                                Federal agencies maintain business systems to track their own
                                finances, such as for operational costs, employee salaries, and
                                spending for federal awards. Data from these systems are
                                submitted directly to USAspending.gov in accordance with the DATA
                                Act and guidance from the Office of Management and Budget.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>

                {/* GOVERNMENTWIDE AWARD SYSTEMS */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(600, 660, 1);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="left"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(660, 840, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Governmentwide Award Systems</h4>}
                            content={
                                <>
                                    <p>
                            Agencies maintain detailed records of their federal awards in
                            governmentwide award systems. These award systems track
                            obligations for award{" "}
                                        <span className="glossary-term">transactions</span>{" "}
                                        <GlossaryLink term="transaction" /> as well as related data
                                about federal awards such as recipients, locations, and
                                purposes. Any individual award is composed of one or more
                                transactions with a common{" "}
                                        <span className="glossary-term">award ID</span>{" "}
                                        <GlossaryLink term="award-id" />.
                                    </p>
                                    <p>
                                Separate systems exist for{" "}
                                        <span className="glossary-term">contract</span>{" "}
                                        <GlossaryLink term="contract" /> awards,{" "}
                                        <span className="glossary-term">financial assistance</span>{" "}
                                        <GlossaryLink term="financial-assistance" /> awards,{" "}
                                        <span className="glossary-term">subawards</span>{" "}
                                        <GlossaryLink term="sub-award" />, as well as recipient
                                registration data.
                                    </p>
                                </>
                            } />
                    </div>
                </ScrollerOverlay>


                {/* ADDITIONAL GOVERNMENT DATA */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(840, 900, 1);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="left"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(900, 1080, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Additional Government Data</h4>}
                            content={
                                <p>
                                Certain agencies are considered authoritative sources for
                                information related to the spending data that USAspending.gov
                                publishes. USAspending.gov draws from these agencies' systems as
                                needed to provide standardized names, codes, and element
                                relationships.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>

                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(1080, 1140, 1)
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>

            </Scroller>
        </div>
    );
};

export default DataSourceSystems;
