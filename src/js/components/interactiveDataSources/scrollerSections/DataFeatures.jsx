import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';

function DataFeatures() {
    const ref1 = useRef();
    return (
        <Scroller>

            {/* SCROLLER BACKDROPS */}
            <div name="animation-loop" className="position position--center">
                <LottieAnimation
                    loop
                    ref={ref1}
                    src="/img/interactive-data-sources/9_DA.json" />
            </div>


            {/* SCROLLER OVERLAYS */}

            {/* ACCOUNT DATA */}
            <ScrollerOverlay
                content="animation-loop"
                position="right"
                onStepEnter={() =>
                    ref1.current?.playAnimation(120, 300, 1, false)
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>CARD FOR ACCOUNT DATA</p>}
                        content={<>
                            <p>- - - - TBD - - - -</p>
                        </>} />
                </div>
            </ScrollerOverlay>
            {/* PRIME DATA */}
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>CARD FOR PRIME AWARD DATA</p>}
                        content={<>
                            <p>- - - - TBD - - - -</p>
                        </>} />
                </div>
            </ScrollerOverlay>
            {/* SUBAWARD DATA */}
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>CARD FOR SUBAWARD DATA</p>}
                        content={<>
                            <p>- - - - TBD - - - -</p>
                        </>} />
                </div>
            </ScrollerOverlay>
            {/* COVID AND INFRASTRUCTURE DATA */}
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>CARD FOR COVID AND INFRASTRUCTURE DATA</p>}
                        content={<>
                            <p>- - - - TBD - - - -</p>
                        </>} />
                </div>
            </ScrollerOverlay>
            {/* DOWNLOADS */}
            <ScrollerOverlay
                content="animation-loop"
                position="right">
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>Downloads</p>}
                        content={<>
                            <p>GTAS on Spending Explorer and DEFC data (COVID profile and Custom Account Data download)</p>
                            <p>Each advanced search download includes a zip file of Account, Contract Awards and Assistance Awards with associated transactions and subawards.</p>
                            <p>Users can also select custom downloads with only account or only assistance data from the download center.</p>
                        </>} />
                </div>
            </ScrollerOverlay>

            {/* APIs */}
            <ScrollerOverlay
                content="animation-loop"
                position="right"
                onStepEnter={() =>
                    ref1.current?.playAnimation(120, 300, 1, false)
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>APIs</p>}
                        content={<p>Users can access all USAspending data via the public Application Programming Interface (API)</p>} />
                </div>
            </ScrollerOverlay>
        </Scroller>
    );
}

export default DataFeatures;
