export const mockData = {
    results: [
        {
            current_total_budget_authority_amount: 123.0,
            active_fq: "2",
            active_fy: "2017",
            agency_id: 1,
            agency_name: "Agency 1",
            obligated_amount: 123.0,
            percentage_of_total_budget_authority: 0.655,
            congressional_justification_url: 'https://google.com/cj',
            outlay_amount: 123.0,
            budget_authority_amount: 123.0,
            abbreviation: "ABC"
        },
        {
            current_total_budget_authority_amount: 234.0,
            active_fq: "2",
            active_fy: "2017",
            agency_id: 2,
            agency_name: "Agency 2",
            obligated_amount: 234.0,
            percentage_of_total_budget_authority: 0.345,
            congressional_justification_url: 'https://google.com/cj',
            outlay_amount: 234.0,
            budget_authority_amount: 23400000000.0,
            abbreviation: "XYZ"
        },
        {
            current_total_budget_authority_amount: 0.10,
            active_fq: "2",
            active_fy: "2017",
            agency_id: 3,
            agency_name: "Agency 3",
            obligated_amount: 0.10,
            percentage_of_total_budget_authority: 0.00003,
            congressional_justification_url: 'https://google.com/cj',
            outlay_amount: 0.10,
            budget_authority_amount: 0.10,
            abbreviation: "FFF"
        }
    ]
};

export const mockAgenciesOrder = {
    sort: 'agency_name',
    direction: 'desc'
};

export const mockPopulated = [
    {
        agency_id: 1,
        agency_name: "Agency 1 (ABC)",
        percentage_of_total_budget_authority: 0.655,
        budget_authority_amount: 123.0,
        display: {
            agency_name: "Agency 1 (ABC)",
            budget_authority_amount: "$123",
            percentage_of_total_budget_authority: "65.50%",
            congressional_justification_url: 'https://google.com/cj'
        }
    },
    {
        agency_id: 2,
        agency_name: "Agency 2 (XYZ)",
        percentage_of_total_budget_authority: 0.345,
        budget_authority_amount: 23400000000.0,
        display: {
            agency_name: "Agency 2 (XYZ)",
            budget_authority_amount: "$23,400,000,000",
            percentage_of_total_budget_authority: "34.50%",
            congressional_justification_url: 'https://google.com/cj'
        }
    },
    {
        agency_id: 3,
        agency_name: "Agency 3 (FFF)",
        percentage_of_total_budget_authority: 0.00003,
        budget_authority_amount: 0.10,
        display: {
            agency_name: "Agency 3 (FFF)",
            percentage_of_total_budget_authority: "Less than 0.01%",
            budget_authority_amount: "$0",
            congressional_justification_url: 'https://google.com/cj'
        }
    }
];
