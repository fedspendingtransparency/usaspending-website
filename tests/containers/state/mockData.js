import BaseStateProfile from 'models/v2/state/BaseStateProfile';

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
        name: 'California',
        fips: 1,
        year: 1992,
        state_type: "state",
        population: 8414380,
        total_prime_amount: 300200000000,
        total_prime_awards: 327721,
        award_amount_per_capita: 916023.08,
        median_household_income: 68114,
        icon_filename: 'CA.jpg'
    }
};