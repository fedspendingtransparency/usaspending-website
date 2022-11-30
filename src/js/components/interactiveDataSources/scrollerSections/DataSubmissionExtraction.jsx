import React, { useRef } from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import LottieAnimation from '../lottieAnimation/LottieAnimation';
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';

const DataSubmissionExtraction = (props) => {
    const overline = <p>{props.title?.toUpperCase()}</p>;

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
                            src="/img/interactive-data-sources/6_DSE.json"
                            role="presentation" />
                    </div>
                    <div className="bottom-animation">
                        <LottieAnimation
                            loop={1}
                            ref={ref2}
                            src="/img/interactive-data-sources/6_DSE_BG.json"
                            role="presentation" />
                    </div>
                </div>


                {/* SCROLLER OVERLAYS */}


                {/* SUBMISSION AND EXCTRACTION */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(0, 120, 1.5);
                        ref2.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="center"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(120, 300, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            content={
                                <p>
                                Data from government systems flow into USAspending.gov in one of two
                                ways: they are either submitted directly or extracted.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>

                {/* SUBMISSION */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(300, 360, 1.5)
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="right"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(360, 420, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Data Submitted</h4>}
                            content={
                                <p>
                                Files A, B, and C, as well as FABS data, are all sent directly
                                from federal agencies to USAspending.gov. For more information about
                                what is included in these submissions, please consult the
                                Reporting Submission Specification (RSS) spreadsheet in the{" "}
                                    <a
                                        className="scroller-overlay-card__link"
                                        href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html#fed"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                    USAspending Source and Submission Model
                                    </a>{" "}
                                page.
                                </p>
                            } />
                    </div>
                </ScrollerOverlay>


                {/* EXTRACTION */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(420, 480, 1.5)
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="animation"
                    position="left"
                    onStepEnter={() =>
                        ref1.current?.playAnimation(480, 540, 1)
                    }>
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            overline={overline}
                            heading={<h4>Data Extracted</h4>}
                            content={
                                <p>
                                Data in Files D1, E, and F, as well as all reference data,
                                are extracted by USAspending.gov from government sources. For more
                                information about what is included in these extractions, please
                                consult the Interface Definition Document (IDD) spreadsheet in
                                the{" "}
                                    <a
                                        className="scroller-overlay-card__link"
                                        href="https://fiscal.treasury.gov/data-transparency/DAIMS-current.html"
                                        target="_blank"
                                        rel="noopener noreferrer">
                                    USAspending Source and Submission Model
                                    </a>{" "}
                                page.
                                </p>} />
                    </div>
                </ScrollerOverlay>

                {/* TRANSITION TO END SECTION */}
                <ScrollerOverlay
                    content="animation"
                    onStepEnter={() => {
                        ref1.current?.playAnimation(540, 600, 1.5);
                        ref2.current?.playAnimation(120, 300, 1, false);
                    }
                    }>
                    {/* used as transition. no card. */}
                </ScrollerOverlay>

            </Scroller>
        </div>
    );
};

export default DataSubmissionExtraction;
