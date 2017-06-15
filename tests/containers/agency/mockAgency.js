import AgencyOverviewModel from 'models/agency/AgencyOverviewModel';

export const mockApi = {
    results: {
        agency_name: "Department of Test",
        active_fy: "2017"
    }
};

export const mockRedux = {
    agency: {
        id: '123',
        overview: new AgencyOverviewModel({
            id: '123',
            name: 'Department of Test',
            activeFY: '2017'
        })
    },
    params: {
        agencyId: '123'
    },
    resetAgency: jest.fn(),
    setAgencyOverview: jest.fn()
};
