/**
 * AgencyOverview-test.jsx
 * Created by Lizzie Salita 3/26/21
 */

import React from 'react';
import { render, screen } from 'test-utils';
import AgencyOverview from 'components/agencyV2/AgencyOverview';
import BaseAgencyOverview from 'models/v2/agencyV2/BaseAgencyOverview';
import { mockAgency } from '../../models/agency/BaseAgencyOverview-test';

const overviewDod = Object.create(BaseAgencyOverview);
overviewDod.populate({ ...mockAgency, about_agency_data: true });

const mockStoreDod = {
    agencyV2: {
        overview: overviewDod
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
    agencyV2: {
        overview
    }
};

test('should not display the \'About this Agency\'s Data\' section for non-DOD', () => {
    render(<AgencyOverview />, { initialState: mockStore });
    const heading = screen.queryByText('About this Agency\'s Data');
    expect(heading).toBeFalsy();
});
