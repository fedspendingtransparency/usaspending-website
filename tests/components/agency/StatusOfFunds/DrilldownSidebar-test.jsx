/**
 * @jest-environment jsdom
 *
 * DrilldownSidebar-test.jsx
 * Created by Zoey Sears 2/27/25
 */

import React from 'react';
import DrilldownSidebar
    from "components/agency/statusOfFunds/DrilldownSidebar";
import { render, screen } from '../../../testResources/test-utils';

    const mockProps = {
        toggle: false,
        level: 0,
        goBack: jest.fn(),
        fy: "2021",
        dropdownSelection: "Program Activity"
    };

describe('Drilldown Sidebar', () => {
    it('correct text label for level 0', () => {
        render(<DrilldownSidebar {...mockProps} />);
        expect(screen.getByText("Parent Agency")).toBeTruthy();
    })

    it('correct text label for level 1', () => {
        render(<DrilldownSidebar {...mockProps} level={1}/>);
        expect(screen.getByText("Sub-Component")).toBeTruthy();
        expect(screen.getByText("Parent Agency")).toBeTruthy();
    })
    it('correct text label for level 2', () => {
        render(<DrilldownSidebar {...mockProps} level={2}/>);
        expect(screen.getByText("Federal Account")).toBeTruthy();
        expect(screen.getByText("Sub-Component")).toBeTruthy();
        expect(screen.getByText("Parent Agency")).toBeTruthy();
    })
    it('correct text label for level 3', () => {
        render(<DrilldownSidebar {...mockProps} level={3}/>);
        expect(screen.getByText("Treasury Account Symbol")).toBeTruthy();
        expect(screen.getByText("Federal Account")).toBeTruthy();
        expect(screen.getByText("Sub-Component")).toBeTruthy();
        expect(screen.getByText("Parent Agency")).toBeTruthy();
    })

    it('correct text label for level 4', () => {
        render(<DrilldownSidebar {...mockProps} level={4}/>);
        expect(screen.getByText(mockProps.dropdownSelection)).toBeTruthy();
        expect(screen.getByText("Treasury Account Symbol")).toBeTruthy();
        expect(screen.getByText("Federal Account")).toBeTruthy();
        expect(screen.getByText("Sub-Component")).toBeTruthy();
        expect(screen.getByText("Parent Agency")).toBeTruthy();
    })

    it('correct text on rerender', () => {
        const {rerender} = render(<DrilldownSidebar {...mockProps} level={4}/>);
        expect(screen.getByText(mockProps.dropdownSelection)).toBeTruthy();
        expect(screen.getByText("Treasury Account Symbol")).toBeTruthy();
        expect(screen.getByText("Federal Account")).toBeTruthy();
        expect(screen.getByText("Sub-Component")).toBeTruthy();
        expect(screen.getByText("Parent Agency")).toBeTruthy();
        rerender(<DrilldownSidebar {...mockProps} level={2}/>);
        expect(screen.queryByText(mockProps.dropdownSelection)).toBeNull();
        expect(screen.queryByText("Treasury Account Symbol")).toBeNull();
        expect(screen.getByText("Federal Account")).toBeTruthy();
        expect(screen.getByText("Sub-Component")).toBeTruthy();
        expect(screen.getByText("Parent Agency")).toBeTruthy();
    })

})

