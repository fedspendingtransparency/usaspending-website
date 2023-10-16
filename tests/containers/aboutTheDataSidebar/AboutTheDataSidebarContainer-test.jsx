/**
 * @jest-environment jsdom
 *
 * AboutTheDataSidebarContainer-test.jsx
 * Created by Nick Torres 10/13/2023
 */

import React from 'react';
import { mockData, standardTerm } from '../../components/aboutTheDataSidebar/mockAboutTheDataSidebarFn';
import { render, screen, act } from '../../testResources/test-utils';
import { AboutTheDataContainer } from "../../../src/js/containers/aboutTheDataSidebar/AboutTheDataContainer";
import aboutTheDataReducer from "../../../src/js/redux/reducers/aboutTheDataSidebar/aboutTheDataReducer";
import slideoutReducer from "../../../src/js/redux/reducers/slideouts/slideoutReducer";

beforeEach(() => {
    jest.clearAllMocks();
});

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

describe('About The Data Sidebar Container Test', () => {
    it(`Render ATD Container with appropriate props`, () => {
        act(() => {
            render(<AboutTheDataContainer {...mockATDContainerProps} />);
        });
        const header = screen.queryByText('About the Data');
        expect(header).toBeTruthy();
    });

    it('set last opened slideout reducer', () => {
        // setLastOpenedSlideout('atd');
        let state = slideoutReducer(undefined, {});

        const action = {
            type: 'SET_LAST_OPENED',
            lastOpenedSlideout: 'atd'
        };

        state = slideoutReducer(state, action);

        expect(state.lastOpenedSlideout).toEqual('atd');
    });
    it('show atd', () => {
        let state = aboutTheDataReducer(undefined, {});

        const action = {
            type: 'SHOW_ABOUT_THE_DATA'
        };

        state = aboutTheDataReducer(state, action);
        expect(state.display).toBeTruthy();
    });
    // SET_ABOUT_THE_DATA_TERM
    it('set atd term from url', () => {
        let state = aboutTheDataReducer(undefined, {});
        const action = {
            type: 'SET_ABOUT_THE_DATA_TERM_FROM_URL',
            term: standardTerm
        };

        state = aboutTheDataReducer(state, action);
        expect(state.termFromUrl).toEqual(standardTerm);
    });
});

