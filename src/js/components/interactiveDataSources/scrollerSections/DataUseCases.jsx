import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';

const DataUseCases = (props) => {
    const overline = <p>{props.title?.toUpperCase()}</p>;

    const ref1 = useRef();
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
                <div name="animation-loop" className="position position--center">
                    <LottieAnimation
                        loop={1}
                        ref={ref1}
                        src="/img/interactive-data-sources/10_UUC.json"
                        role="presentation" />
                </div>


                {/* SCROLLER OVERLAYS */}


                {/* OVERVIEW CARD OF USE CASES */}
                <ScrollerOverlay
                    content="animation-loop"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(120, 300, 1, false)
                    }>
                    {/* used as transition. no card */}
                </ScrollerOverlay>

                {/* USE CASE 1 */}
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            content={
                                <p>
                                The wealth of data on USAspending.gov allows for many use cases by
                                users of diverse backgrounds, from citizens and taxpayers to
                                researchers, journalists, small business owners, public
                                servants, government watchdogs, and more. Read about some of
                                these use cases below.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>

                {/* USE CASE 2 */}
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Federal Spending Transparency and Accountability</h4>}
                            content={
                                <p>
                                Congressional staffers and researchers use USAspending.gov to
                                identify award recipients and spending amounts to states and
                                congressional districts.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>

                {/* USE CASE 3 */}
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Market Research</h4>}
                            content={
                                <p>
                                Small business owners use USAspending.gov to perform market research
                                for particular locations, industries, and set asides.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>

                {/* USE CASE 4 */}
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Grant Opportunities and Compliance</h4>}
                            content={
                                <p>
                                State and local government agencies use USAspending.gov to research
                                potential grant opportunities and monitor their own grants for
                                compliance purposes.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>

                {/* USE CASE 5 */}
                <ScrollerOverlay
                    content="animation-loop"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Federal Spending Trends and Stories</h4>}
                            content={
                                <p>
                                Journalists use USAspending.gov to find noteworthy trends or stories
                                about federal spending.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>

                {/* CLOSING CARD */}
                <ScrollerOverlay
                    content="animation-loop"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(120, 300, 1, false)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            content={
                                <p>
                                We hope you find your own way to use USAspending data. You can
                                reach us at{" "}
                                    <br />
                                    <a
                                        className="scroller-overlay-card__link"
                                        href="mailto:USAspending.help@fiscal.treasury.gov">
                                USAspending.help@&#8203;fiscal.treasury.gov
                                    </a>{" "}
                                    <br />
                                to give feedback or ask questions about the data or the website.
                                We look forward to hearing from you!
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>

            </Scroller>
        </div>
    );
};

export default DataUseCases;
