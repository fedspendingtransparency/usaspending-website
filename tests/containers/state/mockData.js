import BaseStateProfile from 'models/v2/state/BaseStateProfile';
import mockStateApi from '../../models/state/mockStateApi';

export const mockActions = {
    setStateOverview: jest.fn(),
    setStateFiscalYear: jest.fn()
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
        overview: stateProfile
    }
};

export const mockStateOverview = {
    results: {
        mockStateApi
    }
};