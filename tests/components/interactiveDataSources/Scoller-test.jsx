/**
 * @jest-environment jsdom
 */
/* eslint-disable react/jsx-indent */
import React from 'react';
import Scroller from 'components/interactiveDataSources/scroller/Scroller';
import ScrollerOverlay from "components/interactiveDataSources/scroller/scrollerOverlay/ScrollerOverlay";
import ScrollerOverlayCard from 'components/interactiveDataSources/scroller/scrollerOverlay/ScrollerOverlayCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { render, screen } from '@test-utils';

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
const handleScroll = jest.fn();
const ref1 = React.createRef();
const scroller = (
    <Scroller ref={ref1}>
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
            position="left"
            onStepEnter={handleScroll}>
            <div className="scroller-overlay-card-container">
                <ScrollerOverlayCard
                    icon={cardIcon1}
                    heading={cardHeading1}
                    content={cardContent1} />
            </div>
        </ScrollerOverlay>
        <ScrollerOverlay
            content="background-color-2"
            position="right"
            onStepEnter={handleScroll}>
            <div className="scroller-overlay-card-container">
                <ScrollerOverlayCard
                    heading={cardHeading2}
                    content={cardContent2} />
            </div>
        </ScrollerOverlay>
    </Scroller>
);

describe('Scroller Tests', () => {
    beforeEach(() => {
        const mockIntersectionObserver = jest.fn();
        mockIntersectionObserver.mockReturnValue({
            observe: () => null,
            unobserve: () => null,
            disconnect: () => null
        });
        window.IntersectionObserver = mockIntersectionObserver;
    });

    afterAll(() => {
        jest.clearAllMocks();
    });


    it('Renders scroller with props', () => {
        const renderComponent = () =>
            render(<>
                {scroller}
            </>);
        const { getByTestId } = renderComponent();
        expect(getByTestId).toBeTruthy();
        expect(screen.queryByText("This is a Scroller component. It consists of an overlay card and a backdrop.")).toBeTruthy();
    });


    it('Check scroller backdrops and content overlays', () => {
        const { container, queryByText } = render(scroller);
        const cardOverlayText = queryByText("This is the second content overlay and backdrop.");
        const secondBackdrop = container.querySelector('div[name="background-color-2"]');
        const secondOverlay = container.querySelector('div[data-react-scrollama-id="react-scrollama-1"]').style;

        expect(cardOverlayText).toBeTruthy();
        expect(secondBackdrop).toBeTruthy();
        expect(secondOverlay).toHaveProperty('opacity', '0.2');
    });


    it('Trigger onStepEnter and check if callback is called', () => {
        render(scroller);
        ref1.current.onStepEnter({
            element: null,
            data: 1,
            direction: "up",
            entry: null
        });

        expect(handleScroll).toHaveBeenCalled();
    });


    it('Trigger onStepEnter and check if setupLists is called', () => {
        render(scroller);
        const spy = jest.spyOn(ref1.current, "setupLists");
        ref1.current.componentDidMount();
        ref1.current.onStepEnter({
            element: null,
            data: 1,
            direction: "up",
            entry: null
        });

        expect(spy).not.toHaveBeenCalled();
    });
});
