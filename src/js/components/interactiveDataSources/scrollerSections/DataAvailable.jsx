import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';
import GlossaryLink from '../../sharedComponents/GlossaryLink';

const DataAvailable = (props) => {
    const overline = <p>{props.title?.toUpperCase()}</p>;

    const ref1 = useRef();
    const ref2 = useRef();
    const ref3 = useRef();
    const ref4 = useRef();
    const ref5 = useRef();
    const ref6 = useRef();
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

                {/* For the Transition between data available and not available */}
                <div name="animation" className="position position--center">
                    <div className="top-animation">
                        <LottieAnimation
                            isScrollerBackdrop
                            ref={ref1}
                            src="/img/interactive-data-sources/2_DA.json"
                            role="presentation" />
                    </div>
                    <div className="bottom-animation">
                        <LottieAnimation
                            loop={1}
                            ref={ref2}
                            src="/img/interactive-data-sources/2_DA_BG.json"
                            role="presentation" />
                    </div>
                </div>
                {/* used with data Available */}
                <div name="animation-loop1" className="position position--center">
                    <div className="top-animation">
                        <LottieAnimation
                            loop={1}
                            ref={ref3}
                            src="/img/interactive-data-sources/2_DA.json"
                            role="presentation" />
                    </div>
                    <div className="bottom-animation">
                        <LottieAnimation
                            loop={1}
                            ref={ref4}
                            src="/img/interactive-data-sources/2_DA_BG.json"
                            role="presentation" />
                    </div>
                </div>
                {/* used with data not Available */}
                <div name="animation-loop2" className="position position--center">
                    <div className="top-animation">
                        <LottieAnimation
                            loop={1}
                            ref={ref5}
                            src="/img/interactive-data-sources/2_DA.json"
                            role="presentation" />
                    </div>
                    <div className="bottom-animation">
                        <LottieAnimation
                            loop={1}
                            ref={ref6}
                            src="/img/interactive-data-sources/2_DA_BG.json"
                            role="presentation" />
                    </div>
                </div>


                {/* SCROLLER OVERLAYS */}
                <ScrollerOverlay
                    content="animation-loop1"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(0, 300, 1);
                        ref2.current?.playAnimation(120, 300, 1, false);
                        ref3.current?.playAnimation(120, 300, 1, false);
                        ref4.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    {/* no card. */}
                </ScrollerOverlay>

                {/* DATA ON */}
                <ScrollerOverlay
                    content="animation-loop1"
                    position="right"
                    onStepEnter={() => {
                        ref3.current?.playAnimation(120, 300, 1, false);
                        ref4.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Data Available on USAspending.gov</h4>}
                            content={
                                <p>
                                USAspending.gov receives over 400 data elements coming from
                                various government systems. These data elements cover
                                information about federal{" "}
                                    <span className="glossary-term">agencies</span>{" "}
                                    <GlossaryLink term="agency" />, agency{" "}
                                    <span className="glossary-term">accounts</span>{" "}
                                    <GlossaryLink term="treasury-account-symbol-tas" />,{" "}
                                    <span className="glossary-term">award types</span>{" "}
                                    <GlossaryLink term="award-type" />,{" "}
                                    <span className="glossary-term">prime award recipients</span>{" "}
                                    <GlossaryLink term="prime-recipient" />, and{" "}
                                    <span className="glossary-term">subrecipients</span>{" "}
                                    <GlossaryLink term="sub-recipient" />, as well as
                                information such as Census data for additional context.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>

                {/* DATA NOT ON */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(300, 420, 1.5);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation-loop2"
                    position="right"
                    onStepEnter={() => {
                        ref5.current?.playAnimation(420, 600, 1, false);
                        ref6.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Data Not Available on USAspending.gov</h4>}
                            content={(
                                <>
                                    <p>
                                    Due to existing laws and regulations, some data are not published on USAspending.gov. These exceptions include:
                                    </p>
                                    <ul className="interactives-guide_bullet-points">
                                        <li>Personally identifiable information (PII);</li>
                                        <li>Information that may compromise national security;</li>
                                        <li>Proprietary information or documents from federal award recipients; and</li>
                                        <li>Tax expenditure data, including Economic Impact Payments (i.e., COVID stimulus checks)</li>
                                    </ul>
                                    <p>
                                    While USAspending.gov does receive contract award data from the Department of Defense (DOD) and the
                                    U.S. Army Corps of Engineers (USACE), there is a 90-day delay in the submission of these data to the FPDS source system.
                                    </p>
                                </>
                            )
                            } />
                    </div>
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation-loop2"
                    position="right"
                    onStepEnter={() => {
                        ref5.current?.playAnimation(420, 600, 1, false);
                        ref6.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            content={
                                <p>
                                Note that some smaller executive branch agencies, as well as
                                the entire legislative and judicial branches, are not required
                                to report to USAspending.gov. The full list of reporting agencies
                                can be found on our{" "}
                                    <Link className="scroller-overlay-card__link" to="/agency" target="_blank" rel="noopener noreferrer">
                                Agency Profile landing page
                                    </Link>
                                .
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>

            </Scroller>
        </div>
    );
};

export default DataAvailable;
