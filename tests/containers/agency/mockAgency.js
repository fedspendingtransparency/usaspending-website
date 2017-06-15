import AgencyOverviewModel from 'models/agency/AgencyOverviewModel';

export const mockApi = {
    results: {
        agency_name: "Department of Justice",
        active_fy: "2017"
    }
};

export const mockRedux = {
    agency: {
        id: '123',
        overview: new AgencyOverviewModel({
            id: '123',
            name: 'Department of Test'
        })
    },
    params: {
        agencyId: '123'
    },
    resetAgency: jest.fn(),
    setAgencyOverview: jest.fn()
};
