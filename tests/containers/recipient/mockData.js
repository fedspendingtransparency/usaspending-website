import { initialState } from 'redux/reducers/recipient/recipientReducer';
import BaseRecipientOverview from 'models/v2/recipient/BaseRecipientOverview';
import { mockRecipientOverview } from '../../models/recipient/mockRecipientApi';

export const mockActions = {
    setRecipientOverview: jest.fn(),
    setRecipientFiscalYear: jest.fn()
};

export const mockRedux = {
    params: {
        recipientId: '123456'
    },
    recipient: initialState
};

export const mockModalActions = {
    setRecipientChildren: jest.fn()
};

// Create a populated recipient overview
const overview = Object.create(BaseRecipientOverview);
overview.populate(mockRecipientOverview);

// Set the id and recipient overview
const recipient = Object.assign({}, initialState, {
    overview
});

export const mockModalRedux = {
    recipient,
    mounted: false,
    hideModal: jest.fn()
};

export const mockTimes = {
    fiscal_year: '2017',
    quarter: '4',
    month: 4
};

export const mockYears = {
    group: 'fiscal_year',
    results: [
        {
            time_period: {
                fiscal_year: '1979'
            },
            aggregated_amount: 400.25,
            new_awards: 25
        }, {
            time_period: {
                fiscal_year: '1980'
            },
            aggregated_amount: 350.50,
            new_awards: 15
        }
    ]
};

export const mockQuarters = {
    group: 'quarter',
    results: [
        {
            time_period: {
                quarter: 3,
                fiscal_year: '1979'
            },
            aggregated_amount: -100.25,
            new_awards: 0
        }, {
            time_period: {
                quarter: 4,
                fiscal_year: '1979'
            },
            aggregated_amount: 125,
            new_awards: 4
        }, {
            time_period: {
                quarter: 1,
                fiscal_year: '1980'
            },
            aggregated_amount: 350.5,
            new_awards: 8
        }
    ]
};

export const mockMonths = {
    group: 'month',
    results: [
        {
            time_period: {
                month: 7,
                fiscal_year: '1979'
            },
            aggregated_amount: 45,
            new_awards: 6
        }, {
            time_period: {
                month: 8,
                fiscal_year: '1979'
            },
            aggregated_amount: 12,
            new_awards: 6
        }, {
            time_period: {
                month: 9,
                fiscal_year: '1979'
            },
            aggregated_amount: 10,
            new_awards: 5
        }
    ]
};