import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';

const AdditionalData = (props) => {
    const overline = <p>{props.title?.toUpperCase()}</p>;

    const cards = {
        card1: {
            content: (
                <p>
                    USAspending.gov uses information from authoritative government systems to
                    provide additional context to account data and award data. Some
                    examples of these additional data are below.
                </p>
            )
        },
        card2: {
            heading: <h4>Location Data</h4>,
            content: (
                <p>
                    USAspending.gov standardizes the location elements in its award data by
                    using authoritative names and codes from government systems. For
                    example, U.S. Postal Code data are used for zip codes, and Census
                    Bureau data are used for congressional districts.
                </p>
            )
        },
        card3: {
            heading: <h4>Federal Hierarchy Data</h4>,
            content: (
                <p>
                    There are two federal hierarchies that relate agencies to their
                    subcomponents. USAspending.gov draws from the Office of Management and
                    Budget's hierarchy for account data, and from the General Services
                    Administration's hierarchy for award data. You can see these two
                    hierarchies in any of the{" "}
                    <Link
                        className="scroller-overlay-card__link"
                        to="/agency"
                        target="_blank"
                        rel="noopener noreferrer">
                        Agency Profile pages
                    </Link>.
                </p>
            )
        }
    };
    const ref1 = useRef();
    const ref2 = useRef();
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
                            src="/img/interactive-data-sources/5_DS_ADDITIONAL.json"
                            role="presentation" />
                    </div>
                    <div className="bottom-animation">
                        <LottieAnimation
                            loop={1}
                            ref={ref2}
                            src="/img/interactive-data-sources/5_DS_ADDITIONAL_BG.json"
                            role="presentation" />
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
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(120, 180, 1.5)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
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
                            overline={overline}
                            heading={cards.card2.heading}
                            content={cards.card2.content} />
                    </div>
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(180, 240, 1, false)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={cards.card3.heading}
                            content={cards.card3.content} />
                    </div>
                </ScrollerOverlay>

                {/* TRANSITION TO END SECTION */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(240, 300, 1.5);
                        ref2.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>


            </Scroller>
        </div>
    );
};

export default AdditionalData;
