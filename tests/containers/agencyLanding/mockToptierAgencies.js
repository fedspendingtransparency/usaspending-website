import { Agency } from 'redux/reducers/agencyLanding/agencyLandingReducer';
import Immutable from 'immutable';

export const mockData = {
    results: [
        {
            agency_id: 1,
            agency_name: 'Test 1',
            budget_authority_amount: '1234567',
            percentage_of_total_budget_authority: '0.012'
        },
        {
            agency_id: 2,
            agency_name: 'Test 2',
            budget_authority_amount: '2345678',
            percentage_of_total_budget_authority: '0.023'
        }
    ]
};

export const mockMeta = {
    batch: {
        queryId: "01",
        searchId: "02"
    }
};

export const mockAgenciesOrder = {
    sort: 'agency_name',
    direction: 'desc'
};

