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
import { showAboutTheData, setAboutTheDataTerm } from "../../../src/js/redux/actions/aboutTheDataSidebar/aboutTheDataActions";
import { setLastOpenedSlideout } from "../../../src/js/redux/actions/slideouts/slideoutActions";

beforeEach(() => {
    jest.clearAllMocks();
});

describe('About The Data Sidebar Container Test', () => {
    it(`Render ATD Container with appropriate props`, () => {
        const mockATDContainerProps = {
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
        act(() => {
            render(<AboutTheDataContainer {...mockATDContainerProps} />);
        });
        const header = screen.queryByText('About the Data');
        expect(header).toBeTruthy();
    });

    // it('set last opened slideout', () => {
    //     jest.mock("../../../src/js/components/aboutTheDataSidebar/AboutTheDataDrilldown", () => {
    //         const ComponentToMock = () => <div id="atd-drilldown" />;
    //         return ComponentToMock;
    //     });
    //     act(() => {
    //         setLastOpenedSlideout('atd');
    //     });
    //     screen.debug();
    // });
    // it('show atd', () => {
    //     showAboutTheData();
    //     screen.debug();
    // });
    // it('set atd term from url', () => { });
});

