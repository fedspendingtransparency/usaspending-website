import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';

function DataUseCases() {
    const ref1 = useRef();
    return (
        <Scroller>

            {/* SCROLLER BACKDROPS */}
            <div name="animation-loop" className="position position--center">
                <LottieAnimation
                    loop
                    ref={ref1}
                    src="/img/interactive-data-sources/10_UUC.json" />
            </div>


            {/* SCROLLER OVERLAYS */}


            {/* OVERVIEW CARD OF USE CASES */}
            <ScrollerOverlay
                content="animation-loop"
                position="right"
                onStepEnter={() =>
                    ref1.current?.playAnimation(120, 300, 1, false)
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>TBD: Use Cases</p>}
                        content={<p>Intro card, so many different types of users of USAS data</p>} />
                </div>
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>TBD: Use Cases</p>}
                        content={<p>TBD: Example user/use case 1</p>} />
                </div>
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>TBD: Use Cases</p>}
                        content={<p>TBD: Example user/use case 2</p>} />
                </div>
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>TBD: Use Cases</p>}
                        content={<p>TBD: Example user/use case 3</p>} />
                </div>
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>TBD: Use Cases</p>}
                        content={<p>TBD: Example user/use case 4</p>} />
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
                        heading={<p>TBD: Use Cases</p>}
                        content={<p>TBD: Closing card, we hope you find ways to use USAS data, and you can let us know about it or ask us questions at <a className="scroller-overlay-card__link" href="mailto:USAspending.help@fiscal.treasury.gov">USAspending.help@&#8203;fiscal.treasury.gov</a>.</p>} />
                </div>
            </ScrollerOverlay>

        </Scroller>
    );
}

export default DataUseCases;
