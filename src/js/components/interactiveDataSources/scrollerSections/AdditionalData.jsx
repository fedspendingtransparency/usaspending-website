import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';
import GlossaryLink from '../../sharedComponents/GlossaryLink';

function AdditionalData() {
    const cards = {
        card1: {
            heading: <p>Census, population and location data for map visualizations</p>,
            content: (
                <p>
                Examples include U.S. Postal Code data for zip codes, Census Bureau
                data for congressional district, SAM.gov data for Assistance Listing
                (CFDA Program) names and codes, and federal hierarchy data from the
                Office of Management and Budget (OMB) and the General Services
                Administration (GSA). A complete list of systems for data extracted to
                USAspending is found on{" "}
                    <a
                        className="scroller-overlay-card__link"
                        href="https://github.com/fedspendingtransparency/data-act-documentation/blob/master/data/data_exchanges.md"
                        target="_blank"
                        rel="noopener noreferrer">
                    this GitHub page
                    </a>
                .
                </p>
            )
        },
        card2: {
            heading: <p>TBD: CARD ON FEDERAL HIERARCY</p>,
            content: (
                <>
                    <p>
                        OMB, federal hierarchy for account data, plus TAS information
                    </p>
                    <p>GSA, federal hierarchy for award data</p>
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
                        src="/img/interactive-data-sources/5_DS_ADDITIONAL.json" />
                </div>
                <div className="bottom-animation">
                    <LottieAnimation
                        loop
                        ref={ref2}
                        src="/img/interactive-data-sources/5_DS_ADDITIONAL_BG.json" />
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

            {/* CENSUS, POPULATION, LOCATION */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() =>
                    ref1.current?.playAnimation(120, 180, 1.5)
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


            {/* Cards on Federal Hierarchy */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() =>
                    ref1.current?.playAnimation(180, 240, 1, false)
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={cards.card2.heading}
                        content={cards.card2.content} />
                </div>
            </ScrollerOverlay>

            {/* TRANSITION TO END SECTION */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() =>
                    ref1.current?.playAnimation(240, 300, 1.5)
                }>
                {/* used as transition. no card. */}
            </ScrollerOverlay>


        </Scroller>
    );
}

export default AdditionalData;
