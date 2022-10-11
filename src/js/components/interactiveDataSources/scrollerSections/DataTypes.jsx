import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';

function DataTypes() {
    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    return (
        <Scroller>

            {/* SCROLLER BACKDROPS */}
            <div name="animation" className="position position--center">
                <div className="top-animation">
                    <LottieAnimation
                        isScrollerBackdrop
                        ref={ref1}
                        src="/img/interactive-data-sources/3_DT.json"
                        role="presentation" />
                </div>
                <div className="top-animation">
                    <LottieAnimation
                        loop
                        ref={ref2}
                        src="/img/interactive-data-sources/3_DT_GIRL.json"
                        role="presentation" />
                </div>
                <div className="bottom-animation">
                    <LottieAnimation
                        loop
                        ref={ref3}
                        src="/img/interactive-data-sources/3_DT_BG.json"
                        role="presentation" />
                </div>
            </div>


            {/* SCROLLER OVERLAYS */}


            {/* OVERVIEW OF DATA TYPES */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() => {
                    ref1.current?.playAnimation(0, 120, 1.5);
                    ref2.current?.playAnimation(120, 300, 1, false);
                    ref3.current?.playAnimation(120, 300, 1, false);
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
                        content={
                            <p>
                                Even though USAspending has hundreds of data elements, you can
                                think of them in three major categories: Account Data; Award
                                Data; and Additional Data.
                            </p>
                        } />
                </div>
            </ScrollerOverlay>


            {/* ACCOUNT DATA */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() =>
                    ref1.current?.playAnimation(300, 420, 1.5)
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
                        heading={<h4>Account Data</h4>}
                        content={
                            <p>
                                Account data contain information about an agency's overall
                                spending authority, obligations and outlays, including the subset of
                                spending on federal awards. Account data provide the “big
                                picture” of an agency's total spending. USAspending receives account
                                data from most federal agencies and supplements the data with
                                authoritative agency budget execution data.
                            </p>
                        } />
                </div>
            </ScrollerOverlay>


            {/* AWARD DATA */}
            <ScrollerOverlay
                content="animation"
                onStepEnter={() =>
                    ref1.current?.playAnimation(600, 720, 1.5)
                }>
                {/* used as transition. no card. */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() =>
                    ref1.current?.playAnimation(720, 900, 1)
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<h4>Award Data</h4>}
                        content={
                            <p>
                                Award data contain rich details about individual federal awards,
                                such as who received the award, when obligations were made,
                                where the money went, and what the award's purpose is. Award
                                spending is a subset of an agency's total spending.
                                USAspending receives award data from agency financial systems as
                                well as governmentwide award systems.
                            </p>
                        } />
                </div>
            </ScrollerOverlay>


            {/* ADDITIONAL DATA */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() =>
                    ref1.current?.playAnimation(900, 1020, 1.5)
                }>
                {/* used as transition. no card. */}
            </ScrollerOverlay>
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() =>
                    ref1.current?.playAnimation(1020, 1200, 1)
                }>
                <div className="scroller-overlay-card-container">
                    <ScrollerOverlayCard
                        heading={<h4>Additional Data</h4>}
                        content={
                            <p>
                                USAspending extracts reference data from government sources to
                                ensure consistency and provide additional context to the account
                                data and award data.
                            </p>
                        } />
                </div>
            </ScrollerOverlay>

            {/* TRANSITION TO SYSTEMS */}
            <ScrollerOverlay
                content="animation"
                position="right"
                onStepEnter={() => {
                    ref1.current?.playAnimation(1200, 1320, 1.5);
                    ref2.current?.playAnimation(120, 300, 1, false);
                    ref3.current?.playAnimation(120, 300, 1, false);
                }
                }>
                {/* used as transition. no card. */}
            </ScrollerOverlay>
        </Scroller>
    );
}

export default DataTypes;
