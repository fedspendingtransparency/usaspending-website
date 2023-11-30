/**
 * @jest-environment jsdom
 * 
 * AgencyOverview-test.jsx
 * Created by Lizzie Salita 3/26/21
 */

import React from 'react';
import { render, screen, act } from 'test-utils';
import AgencyOverview from 'components/agency/overview/AgencyOverview';
import BaseAgencyOverview from 'models/v2/agency/BaseAgencyOverview';
import BaseAgencyBudgetaryResources from 'models/v2/agency/BaseAgencyBudgetaryResources';
import BaseAgencyRecipients from 'models/v2/agency/BaseAgencyRecipients';
import { mockAgency } from '../../models/agency/BaseAgencyOverview-test';
import { mockTotalBudgetaryResources } from './overview/mockData';

const overviewDod = Object.create(BaseAgencyOverview);
overviewDod.populate({ ...mockAgency, about_agency_data: true });
const budgetaryResources = Object.create(BaseAgencyBudgetaryResources);
budgetaryResources.populate({ agency_data_by_year: mockTotalBudgetaryResources });
const recipientDistribution = Object.create(BaseAgencyRecipients);
recipientDistribution.populate({
    count: 12345,
    total_federal_count: 7654321
});

const mockStoreDod = {
    agency: {
        overview: overviewDod,
        budgetaryResources,
        recipientDistribution
    }
};

describe('AgencyOverview', () => {
    test('should display the \'About this Agency\'s Data\' section for DOD', async () => {
        act(() => {
            render(<AgencyOverview fy="2017" dataThroughDate="no data" />, { initialState: mockStoreDod });
        });
        const heading = screen.queryByText('About this Agency\'s Data');
        await expect(heading).toBeTruthy();
    });


    const overview = Object.create(BaseAgencyOverview);
    overview.populate(mockAgency);
    test('should not display the \'About this Agency\'s Data\' section for non-DOD', async () => {
        act(() => {
            render(<AgencyOverview fy="2017" dataThroughDate="no data" />);
        });
        const heading = screen.queryByText('About this Agency\'s Data');
        await expect(heading).toBeFalsy();
    });
});
