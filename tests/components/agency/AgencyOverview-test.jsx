/**
 * AgencyOverview-test.jsx
 * Created by Lizzie Salita 3/26/21
 */

import React from 'react';
import { render, screen } from 'test-utils';
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

test('should display the \'About this Agency\'s Data\' section for DOD', () => {
    render(<AgencyOverview />, { initialState: mockStoreDod });
    const heading = screen.queryByText('About this Agency\'s Data');
    expect(heading).toBeTruthy();
});

const overview = Object.create(BaseAgencyOverview);
overview.populate(mockAgency);

const mockStore = {
    agency: {
        overview,
        budgetaryResources,
        recipientDistribution
    }
};

test('should not display the \'About this Agency\'s Data\' section for non-DOD', () => {
    render(<AgencyOverview />, { initialState: mockStore });
    const heading = screen.queryByText('About this Agency\'s Data');
    expect(heading).toBeFalsy();
});
