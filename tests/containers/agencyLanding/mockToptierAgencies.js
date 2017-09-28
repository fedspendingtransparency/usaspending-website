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
    // Temporarily calculate percentage of budget authority using the
    // hardcoded total budget authority value
    {
        agency_id: 1,
        agency_name: "Agency 1 (ABC)",
        // percentage_of_total_budget_authority: 0.655,
        percentage_of_total_budget_authority: (123.0 / 8361447130497.72),
        budget_authority_amount: 123.0,
        display: {
            agency_name: "Agency 1 (ABC)",
            budget_authority_amount: "$123",
            //percentage_of_total_budget_authority: "65.50%"
            percentage_of_total_budget_authority: "Less than 0.01%"
        }
    },
    {
        agency_id: 2,
        agency_name: "Agency 2 (XYZ)",
        // percentage_of_total_budget_authority: 0.345,
        percentage_of_total_budget_authority: (23400000000.0 / 8361447130497.72),
        budget_authority_amount: 23400000000.0,
        display: {
            agency_name: "Agency 2 (XYZ)",
            budget_authority_amount: "$23,400,000,000",
            percentage_of_total_budget_authority: "0.28%"
        }
    },
    {
        agency_id: 3,
        agency_name: "Agency 3 (FFF)",
        // percentage_of_total_budget_authority: 0.00003,
        percentage_of_total_budget_authority: (0.10 / 8361447130497.72),
        budget_authority_amount: 0.10,
        display: {
            agency_name: "Agency 3 (FFF)",
            percentage_of_total_budget_authority: "Less than 0.01%",
            budget_authority_amount: "$0"
        }
    }
];
