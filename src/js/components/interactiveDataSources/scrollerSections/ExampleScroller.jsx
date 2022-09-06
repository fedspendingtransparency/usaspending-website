import React from 'react';
import Scroller from "../scroller/Scroller";
import ScrollerOverlay from "../scroller/scrollerOverlay/ScrollerOverlay";

function ExampleScroller() {
    return (
        <div>
            <Scroller>
                {/* SCROLLER BACKDROPS */}
                <div
                    name="background-color-1"
                    style={{
                        background: `black`
                    }}>
                    <div className="example-scroller-content">
                        <p>First backdrop</p>
                    </div>
                </div>
                <div
                    name="background-color-2"
                    style={{
                        background: `teal`
                    }}>
                    <div className="example-scroller-content">
                        <p>Second backdrop</p>
                    </div>
                </div>

                {/* SCROLLER OVERLAYS */}
                <ScrollerOverlay
                    content="background-color-1"
                    position="left">
                    <p className="scroller-card">
                        This is a Scroller component. It consists of an overlay card and
                        a backdrop. Scrolling changes the content!
                    </p>
                </ScrollerOverlay>
                <ScrollerOverlay
                    content="background-color-2"
                    position="right">
                    <p className="scroller-card">
                        This is the second content overlay and backdrop.
                        The background changed when this card scrolled into view.
                    </p>
                </ScrollerOverlay>
            </Scroller>
        </div>
    );
}

export default ExampleScroller;
