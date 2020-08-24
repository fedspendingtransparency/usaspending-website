import { initialState } from 'redux/reducers/recipient/recipientReducer';
import BaseRecipientOverview from 'models/v2/recipient/BaseRecipientOverview';
import { mockRecipientOverview } from '../../models/recipient/mockRecipientApi';

export const mockActions = {
    setRecipientOverview: jest.fn(),
    setRecipientFiscalYear: jest.fn()
};

export const mockProps = {
    match: {
        params: {
            recipientId: '0123456-ABC-P',
            fy: 'latest'
        }
    },
    history: {
        replace: jest.fn()
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
            aggregated_amount: 400.25
        }, {
            time_period: {
                fiscal_year: '1980'
            },
            aggregated_amount: 350.50
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
            aggregated_amount: -100.25
        }, {
            time_period: {
                quarter: 4,
                fiscal_year: '1979'
            },
            aggregated_amount: 125
        }, {
            time_period: {
                quarter: 1,
                fiscal_year: '1980'
            },
            aggregated_amount: 350.5
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
            aggregated_amount: 45
        }, {
            time_period: {
                month: 8,
                fiscal_year: '1979'
            },
            aggregated_amount: 12
        }, {
            time_period: {
                month: 9,
                fiscal_year: '1979'
            },
            aggregated_amount: 10
        }
    ]
};

export const mockTrendline = {
    group: 'quarter',
    results: [
        {
            time_period: {
                quarter: 3,
                fiscal_year: '1979'
            },
            new_award_count_in_period: 25,
            transaction_count_in_period: 50,
            award_ids_in_period: []
        }, {
            time_period: {
                quarter: 4,
                fiscal_year: '1979'
            },
            new_award_count_in_period: 45,
            transaction_count_in_period: 60,
            award_ids_in_period: []
        }, {
            time_period: {
                quarter: 1,
                fiscal_year: '1980'
            },
            new_award_count_in_period: 15,
            transaction_count_in_period: 35,
            award_ids_in_period: []
        }
    ]
};
