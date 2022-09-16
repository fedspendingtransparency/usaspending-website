import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';

function DataSubmissionExtraction() {
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
                        src="/img/interactive-data-sources/6_DSE.json" />
                </div>
                <div className="bottom-animation">
                    <LottieAnimation
                        loop
                        ref={ref2}
                        src="/img/interactive-data-sources/6_DSE_BG.json" />
                </div>
            </div>


            {/* SCROLLER OVERLAYS */}


            {/* SUBMISSION AND EXCTRACTION */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() => {
                    ref1.current?.playAnimation(0, 120, 1);
                    ref2.current?.playAnimation(120, 300, 1, false);
                }
                }>
                {/* used as transition. no card. */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() =>
                    ref1.current?.playAnimation(120, 300, 1)
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>Intro Card</p>}
                        content={<p>- - - - TBD - - - - </p>} />
                </div>
            </ScrollerOverlay>

            {/* SUBMISSION */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() =>
                    ref1.current?.playAnimation(300, 360, 1)
                }>
                {/* used as transition. no card. */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() =>
                    ref1.current?.playAnimation(360, 420, 1)
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>TBD: CARD ON DATA SUBMITTED</p>}
                        content={<p>Agencies submit account and contract award data from their financial systems and submit assistance awards (grants, loans, etc.) via FABS. You can learn more about the Agency submission requirements and process <a className="scroller-overlay-card__link" href="https://fiscal.treasury.gov/files/data-transparency/daims-information-flow-diagram.pdf" target="_blank" rel="noopener noreferrer">here</a>.</p>} />
                </div>
            </ScrollerOverlay>


            {/* EXTRACTION */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() =>
                    ref1.current?.playAnimation(420, 480, 1)
                }>
                {/* used as transition. no card. */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="left"
                onStepEnter={() =>
                    ref1.current?.playAnimation(480, 540, 1)
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>TBD: CARD ON DATA EXTRACTED</p>}
                        content={<p>USAspending extracts all its other data from source systems to validate agency data, to enrich award record with additional details, and provide context for visualizations.</p>} />
                </div>
            </ScrollerOverlay>

            {/* TRANSITION TO END SECTION */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() =>
                    ref1.current?.playAnimation(540, 600, 1)
                }>
                {/* used as transition. no card. */}
            </ScrollerOverlay>

        </Scroller>
    );
}

export default DataSubmissionExtraction;
