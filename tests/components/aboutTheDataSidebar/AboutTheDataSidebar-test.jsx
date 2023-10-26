/**
 * @jest-environment jsdom
 *
 * AboutTheDataSidebar-test.jsx
 * Created by Andrea Blackwell 12/14/2022
 */

import React from 'react';
import schema from 'dataMapping/aboutTheDataSchema';
import AboutTheData from 'components/aboutTheDataSidebar/AboutTheData';
import { mockActions, mockData } from './mockAboutTheDataSidebarFn';
import { render, screen } from '../../testResources/test-utils';

describe('About the Data Main Component', () => {
    it('Should show the About the Data with the correct sections', async () => {
        const mockShowAboutTheData = jest.fn();
        const mockSetAboutTheData = jest.fn();

        const actions = Object.assign({}, mockActions, {
            setAboutTheDataTerm: mockSetAboutTheData,
            showAboutTheData: mockShowAboutTheData
        });

        render(<AboutTheData
            {...actions}
            aboutTheDataSidebar={mockData}
            schema={schema} />);

        expect(mockSetAboutTheData).toHaveBeenCalledTimes(0);
        expect(mockShowAboutTheData).toHaveBeenCalledTimes(0);
        const header = screen.queryByText('About the Data');
        expect(header).toBeTruthy();
        const section = screen.queryByText('Sitewide Data Source Descriptions');
        expect(section).toBeTruthy();
    });
});
