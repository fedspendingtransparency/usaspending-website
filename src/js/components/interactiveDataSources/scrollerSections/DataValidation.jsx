import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';

function DataValidation() {
    const ref1 = useRef();
    return (
        <Scroller>
            {/* SCROLLER BACKDROPS */}
            <div name="animation-loop" className="position position--center">
                <LottieAnimation
                    loop
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
                        heading={<h4>TBD</h4>}
                        content={<p>[Intro card]</p>} />
                </div>
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<h4>TBD</h4>}
                        content={<p>[Example validation 1]</p>} />
                </div>
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<h4>TBD</h4>}
                        content={<p>[Example validation 2]</p>} />
                </div>
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<h4>TBD</h4>}
                        content={<p>[Example validation 3]</p>} />
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
                        heading={<h4>TBD</h4>}
                        content={<p>[Example validation 4]</p>} />
                </div>
            </ScrollerOverlay>
        </Scroller>
    );
}

export default DataValidation;
