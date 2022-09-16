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
                    src="/img/interactive-data-sources/8_DVBS.json" />
            </div>

            {/* SCROLLER OVERLAYS */}
            <ScrollerOverlay
                content="animation-loop"
                position="right"
                onStepEnter={() =>
                    ref1.current?.playAnimation(120, 300, 1, false)
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>TBD: Intro Card</p>}
                        content={<p>- - - - TBD - - - - </p>} />
                </div>
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>TBD: Example Validation 1</p>}
                        content={<p>TBD: Example validation 1</p>} />
                </div>
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>TBD: Example Validation 2</p>}
                        content={<p>TBD: Example validation 2</p>} />
                </div>
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>TBD: Example Validation 3</p>}
                        content={<p>TBD: Example validation 3</p>} />
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
                        heading={<p>TBD: Example Validation 4</p>}
                        content={<p>TBD: Example validation 4</p>} />
                </div>
            </ScrollerOverlay>
        </Scroller>
    );
}

export default DataValidation;
