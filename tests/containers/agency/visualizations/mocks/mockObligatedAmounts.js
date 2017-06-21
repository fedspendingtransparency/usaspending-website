/**
 * mockObligatedAmounts.js
 * Created by Lizzie Salita 6/14/17
 */

export const mockObligatedAmounts = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        previous: null
    },
    req: "abc",
    results: [
        {
            budget_authority_amount: "46564455029.68",
            obligated_amount: "17839104086.11",
            outlay_amount: "19368986358.21"
        }
    ]
};

export const mockCgacCode = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        previous: null
    },
    req: "abc",
    results: [
        {
            id: 246,
            toptier_flag: true,
            toptier_agency: {
                cgac_code: "123",
                fpds_code: "4567",
                abbreviation: "ABC",
                name: "Department"
            },
            subtier_agency: {
                subtier_code: "1234",
                abbreviation: "",
                name: "Department"
            },
            office_agency: null
        }
    ]
};

export const mockFiscalQuarter = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        previous: null
    },
    req: "abc",
    results: [
        {
            submission_id: 12,
            cgac_code: "123",
            reporting_fiscal_year: 2017,
            reporting_fiscal_quarter: 2
        }
    ]
};

