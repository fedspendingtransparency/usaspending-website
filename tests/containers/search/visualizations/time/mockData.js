export const mockApi = {
    results: [
        {
            time_period: {
                fiscal_year: '1979'
            },
            aggregated_amount: 123,
            group: 'fiscal_Year'
        },
         {
            time_period: {
                fiscal_year: '1980'
            },
            aggregated_amount: 234,
            group: 'fiscal_Year'
        }
    ]
};

export const mockQuarters = {
    results: [{
        time_period: {
            fiscal_year: "1979",
            quarter: "1"
        },
        aggregated_amount: "1234"
    },
    {
        time_period: {
            fiscal_year: "1979",
            quarter: "2"
        },
        aggregated_amount: "5555"
    }]
};

export const mockMonths = {
    results: [{
        time_period: {
            fiscal_year: "1979",
            month: "1"
        },
        aggregated_amount: "1234"
    },
    {
        time_period: {
            fiscal_year: "1979",
            month: "2"
        },
        aggregated_amount: "5555"
    }]
};

export const mockActions = {
    setAppliedFilterCompletion: jest.fn()
};
