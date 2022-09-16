import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';

function Frequency() {
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
                        src="/img/interactive-data-sources/7_FDU_UPDATES.json" />
                </div>
                <div className="bottom-animation">
                    <LottieAnimation
                        loop
                        ref={ref2}
                        src="/img/interactive-data-sources/7_FDU.json" />
                </div>
            </div>


            {/* SCROLLER OVERLAYS */}

            {/* INTRO CARD ON FREQUENCY */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(0, 120, 1);
                    ref2.current?.playAnimation(120, 300, 1, false);
                }
                }>
                {/* transition no card. */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(120, 300, 1);
                }
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>TBD: Frequency of Updates</p>}
                        content={<p>The website is updated daily, but source systems have different requirements for the frequency of reporting.</p>} />
                </div>
            </ScrollerOverlay>

            {/* NEW OBLIGATIONS AND OUTLAYS */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(300, 360, 1);
                }
                }>
                {/* transition no card */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(360, 420, 1);
                }
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>New Obligations & Outlays</p>}
                        content={<p>New Obligations & Outlays update monthly with Agency submissions (File A-C and GTAS).</p>} />
                </div>
            </ScrollerOverlay>

            {/* FABS */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(420, 480, 1);
                }
                }>
                {/* transition no card */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(480, 540, 1);
                }
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>FABS</p>}
                        content={<p>New assistance awards appear within about two weeks of the award, except loans which are a month after</p>} />
                </div>
            </ScrollerOverlay>

            {/* FPDS */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(540, 600, 1);
                }
                }>
                {/* transition no card */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(600, 660, 1);
                }
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>FPDS</p>}
                        content={<p>New contract awards & transactions appear within about a few days of the award</p>} />
                </div>
            </ScrollerOverlay>

            {/* FSRS */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(660, 720, 1);
                }
                }>
                {/* transition no card */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(720, 780, 1);
                }
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>FSRS</p>}
                        content={<p>New Subawards appear by end of the month following the month of the subaward</p>} />
                </div>
            </ScrollerOverlay>

            {/* REFRENCE DATA AND EXISTING RECORDS */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(780, 840, 1);
                }
                }>
                {/* transition no card */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(840, 900, 1);
                }
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<p>Reference Data and Existing Records</p>}
                        content={<p>Reference data and existing records refresh daily with any updates or corrections that agencies make</p>} />
                </div>
            </ScrollerOverlay>

            {/* TBD CARD SECTION */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() => {
                    ref1.current?.playAnimation(900, 960, 1);
                    ref2.current?.playAnimation(120, 300, 1, false);
                }
                }>
                {/* transition no card */}
            </ScrollerOverlay>

        </Scroller>
    );
}

export default Frequency;
