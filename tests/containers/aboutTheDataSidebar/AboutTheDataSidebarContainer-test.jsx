/**
 * @jest-environment jsdom
 *
 * AboutTheDataSidebarContainer-test.jsx
 * Created by Nick Torres 10/13/2023
 */

import React from 'react';
// import { expect } from '@jest/globals';
// import * as redux from 'react-redux';
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

jest.mock('schema', () => ({
    ...jest.requireActual('schema'),
    ...require('../../../src/js/dataMapping/aboutTheDataSchema')
}));
describe('About The Data Sidebar Container Test', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it(`Render ATD Container with appropriate props`, () => {
        act(() => {
            render(<AboutTheDataContainer {...mockATDContainerProps} />);
        });
        screen.debug();
    });
});

