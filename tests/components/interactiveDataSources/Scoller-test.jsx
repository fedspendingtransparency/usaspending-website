/* eslint-disable react/jsx-indent */
import React from 'react';
import Scroller from 'components/interactiveDataSources/scroller/Scroller';
import ScrollerOverlay from "components/interactiveDataSources/scroller/scrollerOverlay/ScrollerOverlay";
import ScrollerOverlayCard from 'components/interactiveDataSources/scroller/scrollerOverlay/ScrollerOverlayCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { render, screen, waitFor, fireEvent } from '@test-utils';
import { mount } from 'enzyme';

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
const scroller = (
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


    it('Renders scroller with props', () => {
        const renderComponent = () =>
            render(<>
                {scroller}
            </>);
        const { getByTestId } = renderComponent();
        expect(getByTestId).toBeTruthy();
        expect(screen.queryByText("This is a Scroller component. It consists of an overlay card and a backdrop.")).toBeTruthy();
    });


    it('Check scroller after scrolling down with mock', async () => {
        const observe = jest.fn();
        const unobserve = jest.fn();
        const disconnect = jest.fn();

        window.IntersectionObserver = jest.fn(() => ({
            observe,
            unobserve,
            disconnect
        }));
        const { container, queryByText } = render(scroller);
        const textToSee = queryByText("This is the second content overlay and backdrop.");
        const scrollerVisible = container.querySelector('div[name="background-color-2"]');
        const scrollama = container.querySelector('div[data-react-scrollama-id="react-scrollama-1"]').style;

        fireEvent.scroll(window, { target: { scrollY: 2000 } });
        await waitFor(() => {
            expect(textToSee).toBeTruthy();
            expect(scrollerVisible).toBeTruthy();


            expect(scrollama).toHaveProperty('opacity', '0.2');
            expect(observe).toHaveBeenCalledTimes(4);
        }, { timeout: 200 });
    });


    it('Check scroller after scrolling down', async () => {
        const container = mount(scroller);
        container.find('.scroller-container').simulate('scroll', { target: { scrollY: 2000 } });

        const scrollama = container.find('div[data-react-scrollama-id="react-scrollama-1"]');
        container.update();


        await waitFor(() => {
            expect(scrollama.props().style).toHaveProperty('opacity', 0.2);
        }, { timeout: 200 });
    });
});
