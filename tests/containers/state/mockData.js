import BaseStateProfile from 'models/v2/state/BaseStateProfile';
import mockStateApi from '../../models/state/mockStateApi';

export const mockActions = {
    setStateOverview: jest.fn(),
    setStateFiscalYear: jest.fn(),
    setStateCenter: jest.fn()
};

const stateProfile = Object.create(BaseStateProfile);
stateProfile.populate({});

export const mockRedux = {
    params: {
        stateId: '1'
    },
    stateProfile: {
        id: '',
        fy: 'latest',
        center: [],
        overview: stateProfile
    }
};

export const mockStateOverview = {
    results: {
        mockStateApi
    }
};

export const mockGeoApi = {
    results: [
        {
            shape_code: 'AK',
            display_name: 'Alaska',
            aggregated_amount: '123.12'
        },
        {
            shape_code: 'AL',
            display_name: 'Alabama',
            aggregated_amount: '345.56'
        }
    ]
};
