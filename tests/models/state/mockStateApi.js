/**
 * mockStateApi.js
 * Created by Lizzie Salita 5/7/18
 */

export const mockStateApi = {
    name: 'California',
    code: 'CA',
    fips: '06',
    pop_year: 1992,
    mhi_year: 1993,
    type: 'state',
    population: 1234567,
    total_prime_amount: 300200000000,
    total_prime_awards: 555555,
    award_amount_per_capita: 900000.08,
    median_household_income: 68000,
    total_face_value_loan_amount: 399200000000,
    total_face_value_loan_prime_awards: 123123
};

export const mockStateCategoryApi = {
    category: "awarding_agency",
    results: [
        {
            id: 1,
            name: "Banana",
            code: "1234",
            amount: 1.01,
            agency_slug: "banana"
        },
        {
            id: 2,
            name: "Robot",
            code: "2345",
            amount: 1.02
        },
        {
            id: 3,
            name: "Machine",
            code: "2345",
            amount: 1000000.02
        }
    ]
};

export const mockBreakdownApi = [
    {
        type: 'contracts',
        amount: 1500654.19,
        count: 5012
    },
    {
        type: 'grants',
        amount: -50654.19,
        count: 20
    },
    {
        type: 'direct_payments',
        amount: 654.19,
        count: 15
    },
    {
        type: 'loans',
        amount: 10,
        count: 10
    },
    {
        type: 'other',
        amount: 15,
        count: 5
    }
];
