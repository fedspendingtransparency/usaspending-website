import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";
import ScrollerOverlayCard from '../scroller/scrollerOverlay/ScrollerOverlayCard';


function ExampleScroller() {
    // Content for first overlay card
    const cardIcon1 = (
        <span
            className="fa-layers fa-fw">
            <FontAwesomeIcon icon="chart-bar" inverse size="xl" style={{ height: '20px', width: '20px' }} />
        </span>);
    const cardHeading1 = <p>Card 1</p>;
    const cardContent1 = (
        <div>
            <p>This is a Scroller component. It consists of an overlay card and a backdrop.</p>
            <p>Scrolling changes the content!</p>
        </div>);

    // Content for second overlay card
    const cardHeading2 = <p>Card 2</p>;
    const cardContent2 = (
        <div>
            <p>This is the second content overlay and backdrop.</p>
            <p>The background changed when this card scrolled into view.</p>
        </div>);
    return (
        <div>
            <Scroller>
                {/* SCROLLER BACKDROPS */}
                <div
                    name="background-color-1"
                    style={{
                        background: `black`
                    }} />
                <div
                    name="background-color-2"
                    style={{
                        background: `teal`
                    }} />

                {/* SCROLLER OVERLAYS */}
                <ScrollerOverlay
                    content="background-color-1"
                    position="left">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            icon={cardIcon1}
                            heading={cardHeading1}
                            content={cardContent1} />
                    </div>
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="background-color-2"
                    position="right">
                    <div className="scroller-overlay-card-container">
                        <ScrollerOverlayCard
                            heading={cardHeading2}
                            content={cardContent2} />
                    </div>
                </ScrollerOverlay>
            </Scroller>
        </div>
    );
}

export default ExampleScroller;
