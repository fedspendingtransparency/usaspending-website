import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';
import GlossaryLink from '../../sharedComponents/GlossaryLink';

function FederalSpendingOverview() {
    const cards = {
        card1: {
            heading: <p>Appropriations</p>,
            content: (
                <p>
                Every year, the Treasury Department issues funds to federal agency
                spending accounts (known as Treasury Accounts) as a result of{" "}
                    <span className="glossary-term">appropriations</span>{" "}
                    <GlossaryLink term="appropriation" /> from Congress.
                </p>
            )
        },
        card2: {
            heading: <p>Obligations</p>,
            content: (
                <p>
                Agencies enter into binding agreements called{" "}
                    <span className="glossary-term">obligations</span>{" "}
                    <GlossaryLink term="obligation" /> to spend the appropriated money for
                certain authorized purposes. These purposes could be for agency
                expenses or for federal awards such as contracts, grants, and loans.
                Obligations could commit the agency to spend money immediately or in
                the future.
                </p>
            )
        },
        card3: {
            heading: <p>Outlays</p>,
            content: (
                <>
                    <p>
                        <span className="glossary-term">Outlays</span>{" "}
                        <GlossaryLink term="outlay" /> occur when federal agencies authorize
                    payments to individuals, businesses, or other organizations. Whereas
                    an obligation is merely a promise to spend money, an outlay
                    represents actual spending.
                    </p>
                    <p>
                    USAspending has data on both obligations and outlays, but obligation
                    data are currently more common.
                    </p>
                </>
            )
        }
    };
    const ref1 = useRef();
    const ref2 = useRef();
    return (
        <>
            <Scroller>
                {/* SCROLLER BACKDROPS */}
                <div name="animation" className="position position--center">
                    <div className="top-animation">
                        <LottieAnimation
                            isScrollerBackdrop
                            ref={ref1}
                            src="/img/interactive-data-sources/1_FSO_COIN.json" />
                    </div>
                    <div className="bottom-animation">
                        <LottieAnimation
                            isScrollerBackdrop
                            loop
                            ref={ref2}
                            src="/img/interactive-data-sources/1_FSO.json" />
                    </div>
                </div>


                {/* SCROLLER OVERLAYS */}


                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(0, 120, 1);
                        ref2.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>

                {/* APPROPRIATIONS */}
                <ScrollerOverlay
                    content="animation"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            heading={cards.card1.heading}
                            content={cards.card1.content} />
                    </div>
                </ScrollerOverlay>

                {/* OBLIGATIONS */}
                <ScrollerOverlay
                    content="animation"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            heading={cards.card2.heading}
                            content={cards.card2.content} />
                    </div>
                </ScrollerOverlay>

                {/* OUTLAYS */}
                <ScrollerOverlay
                    content="animation"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            heading={cards.card3.heading}
                            content={cards.card3.content} />
                    </div>
                </ScrollerOverlay>

                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(300, 420, 1)
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
            </Scroller>
        </>
    );
}

export default FederalSpendingOverview;
