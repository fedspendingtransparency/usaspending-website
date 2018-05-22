import BaseStateProfile from 'models/v2/state/BaseStateProfile';
import { mockStateApi } from '../../models/state/mockStateApi';

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

const parsedProfile = Object.create(BaseStateProfile);
parsedProfile.populate(mockStateApi);

export const mockBreakdownProps = {
    stateProfile: {
        id: '06',
        fy: 'latest',
        overview: parsedProfile
    }
};

export const mockStateOverview = {
    results: {
        mockStateApi
    }
};
