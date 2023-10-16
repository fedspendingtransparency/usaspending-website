/**
 * @jest-environment jsdom
 *
 * AboutTheDataSidebarContainer-test.jsx
 * Created by Nick Torres 10/13/2023
 */

import React from 'react';
import { mockData } from '../../components/aboutTheDataSidebar/mockAboutTheDataSidebarFn';
import { render, screen, act } from '../../testResources/test-utils';
import { AboutTheDataContainer } from "../../../src/js/containers/aboutTheDataSidebar/AboutTheDataContainer";

export const mockATDContainerProps = {
    aboutTheDataSidebar: mockData,
    showAboutTheData: jest.fn(),
    setAboutTheDataTerm: jest.fn(),
    setAboutTheDataTermFromUrl: jest.fn(),
    clearAboutTheDataTerm: jest.fn()
};

jest.mock("../../../src/js/components/aboutTheDataSidebar/AboutTheDataDrilldown", () => {
    const ComponentToMock = () => <div id="atd-drilldown" />;
    return ComponentToMock;
});

describe('About The Data Sidebar Container Test', () => {
    it(`Render ATD Container with appropriate props`, () => {
        act(() => {
            render(<AboutTheDataContainer {...mockATDContainerProps} />);
        });
        const header = screen.queryByText('About the Data');
        expect(header).toBeTruthy();
        screen.debug();
    });
});

