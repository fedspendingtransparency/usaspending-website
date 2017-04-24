/**
 * mockAccount.js
 * Created by Kevin Li 3/27/17
 */

export const mockAccount = {
    id: 2507,
    agency_identifier: "089",
    main_account_code: "0208",
    account_title: "Title 17 Innovative Technology Loan Guarantee Program, Energy Programs, Energy"
};

export const mockReduxAccount = {
    id: 2507,
    title: 'Title 17 Innovative Technology Loan Guarantee Program, Energy Programs, Energy',
    agency_identifier: '089',
    main_account_code: '0208',
    description: 'Not available',
    totals: {
        outlay: {
            2016: '-5505246.42'
        },
        budgetAuthority: {
            2016: '201404661.47'
        },
        obligated: {
            2016: '2696684.86'
        },
        unobligated: {
            2016: '198707976.61'
        }
    }
};

export const mockReduxAccountFiltered = {
    id: 2507,
    title: 'Title 17 Innovative Technology Loan Guarantee Program, Energy Programs, Energy',
    agency_identifier: '089',
    main_account_code: '0208',
    description: 'Not available',
    totals: {
        outlay: {
            2016: '-5505246.42'
        },
        budgetAuthority: {
            2016: '201404661.47'
        },
        unobligated: {
            2016: '198707976.61'
        },
        obligatedFiltered: {
            2016: '2696684.86'
        }
    }
};

export const mockReduxAccountQuarters = {
    id: 2507,
    title: 'Title 17 Innovative Technology Loan Guarantee Program, Energy Programs, Energy',
    agency_identifier: '089',
    main_account_code: '0208',
    description: 'Not available',
    totals: {
        outlay: {
            "2016 Q1": '-5505246.42',
            "2016 Q2": '-4413237.11'
        },
        budgetAuthority: {
            "2016 Q1": '201404661.47',
            "2016 Q2": '101905442.35'
        },
        obligated: {
            "2016 Q1": '2696684.86',
            "2016 Q2": '3851752.00'
        },
        unobligated: {
            "2016 Q1": '198707976.61',
            "2016 Q2": '5851779752.00'
        }
    }
};

export const mockReduxAccountQuartersFiltered = {
    id: 2507,
    title: 'Title 17 Innovative Technology Loan Guarantee Program, Energy Programs, Energy',
    agency_identifier: '089',
    main_account_code: '0208',
    description: 'Not available',
    totals: {
        outlay: {
            "2016 Q1": '-5505246.42',
            "2016 Q2": '-4413237.11'
        },
        budgetAuthority: {
            "2016 Q1": '201404661.47',
            "2016 Q2": '101905442.35'
        },
        unobligated: {
            "2016 Q1": '198707976.61',
            "2016 Q2": '5851779752.00'
        },
        obligatedFiltered: {
            "2016 Q1": '2696684.86',
            "2016 Q2": '3851752.00'
        }
    }
};

export const mockBalances = {
    unobligated: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "198707976.61"
        }],
        total_metadata: {
            count: 1
        }
    },
    obligated: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "2696684.86"
        }],
        total_metadata: {
            count: 1
        }
    },
    budgetAuthority: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "201404661.47"
        }],
        total_metadata: {
            count: 1
        }
    },
    outlay: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "-5505246.42"
        }],
        total_metadata: {
            count: 1
        }
    }
};

export const mockQuarters = {
    unobligated: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "198707976.61",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "1"
        },
        {
            item: "2016",
            aggregate: "5851779752.00",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "2"
        }],
        total_metadata: {
            count: 1
        }
    },
    obligated: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "2696684.86",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "1"
        },
        {
            item: "2016",
            aggregate: "3851752.00",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "2"
        }],
        total_metadata: {
            count: 1
        }
    },
    budgetAuthority: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "201404661.47",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "1"
        },
        {
            item: "2016",
            aggregate: "101905442.35",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "2"
        }],
        total_metadata: {
            count: 1
        }
    },
    outlay: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "-5505246.42",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "1"
        },
        {
            item: "2016",
            aggregate: "-4413237.11",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "2"
        }],
        total_metadata: {
            count: 1
        }
    }
};

export const mockFilteredObligated = {
    unobligated: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "198707976.61"
        }],
        total_metadata: {
            count: 1
        }
    },
    obligatedFiltered: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "2696684.86"
        }],
        total_metadata: {
            count: 1
        }
    },
    budgetAuthority: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "201404661.47"
        }],
        total_metadata: {
            count: 1
        }
    },
    outlay: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "-5505246.42"
        }],
        total_metadata: {
            count: 1
        }
    }
};

export const mockFilteredObligatedQuarters = {
    unobligated: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "198707976.61",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "1"
        },
        {
            item: "2016",
            aggregate: "5851779752.00",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "2"
        }],
        total_metadata: {
            count: 1
        }
    },
    obligatedFiltered: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "2696684.86",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "1"
        },
        {
            item: "2016",
            aggregate: "3851752.00",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "2"
        }],
        total_metadata: {
            count: 1
        }
    },
    budgetAuthority: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "201404661.47",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "1"
        },
        {
            item: "2016",
            aggregate: "101905442.35",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "2"
        }],
        total_metadata: {
            count: 1
        }
    },
    outlay: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [{
            item: "2016",
            aggregate: "-5505246.42",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "1"
        },
        {
            item: "2016",
            aggregate: "-4413237.11",
            submission__reporting_fiscal_year: "2016",
            submission__reporting_fiscal_quarter: "2"
        }],
        total_metadata: {
            count: 1
        }
    }
};

export const mockCategories = {
    req: 'abc',
    page_metadata: {
        page: 1,
        current: 'blerg',
        next: 'blerg',
        previous: 'blerg',
        has_next_page: true,
        has_previous_page: false
    },
    results: [{
        program_activity__program_activity_name: "Program Name",
        aggregate: "2696684.86"
    }]
};

export const mockAwards = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        current: "https://spending-api-dev.us/api/v1/awards/?limit=60&page=1&req=19822973ca5",
        previous: null
    },
    req: "19822973ca5",
    results: [{
        id: 57557,
        type_description: "Definitive Contract",
        piid: "DEAC0494AL85000",
        fain: null,
        uri: null,
        total_obligation: "88074905.67",
        description: "MANAGEMENT AND OPERATION OF SANDIA NATIONAL LABORATORIES BY SANDIA CORPORATION, CONTRACT NO. DE-AC04-94AL85000",
        period_of_performance_start_date: "2016-11-30",
        period_of_performance_current_end_date: "2017-04-30",
        awarding_agency: {
            id: 1611,
            toptier_agency: {
                cgac_code: "089",
                fpds_code: "8900",
                abbreviation: "DOE",
                name: "Department of Energy"
            },
            subtier_agency: {
                subtier_code: "8900",
                abbreviation: "",
                name: "Department of Energy"
            },
            office_agency: null
        },
        funding_agency: {
            id: 1805,
            toptier_agency: {
                cgac_code: "097",
                fpds_code: "9700",
                abbreviation: "DOD",
                name: "Department of Defense"
            },
            subtier_agency: {
                subtier_code: "5700",
                abbreviation: "",
                name: "Department of the Air Force"
            },
            office_agency: null
        },
        recipient: {
            legal_entity_id: 7113228,
            parent_recipient_unique_id: null,
            recipient_name: "SANDIA CORP",
            business_types: null,
            business_types_description: "Unknown Types",
            location: {
                country_name: "UNITED STATES",
                state_code: "IL",
                state_name: null,
                city_name: "ALBUQUERQUE",
                address_line1: "1515 EUBANK BLVD. SE",
                address_line2: "P.O. BOX 5800, MS-0180, 87185-0180",
                address_line3: null,
                zip5: null,
                foreign_postal_code: null,
                foreign_province: "NM",
                foreign_city_name: null,
                location_country_code: "USA"
            }
        }
    }]
};

export const mockReduxAwards = {
    awards: [{
        id: 57557,
        award_id: 'DEAC0494AL85000',
        recipient_name: 'SANDIA CORP',
        description: 'MANAGEMENT AND OPERATION OF SANDIA NATIONAL LABORATORIES BY SANDIA CORPORATION, CONTRACT NO. DE-AC04-94AL85000',
        date_signed: '',
        period_of_performance_start_date: '11/30/2016',
        period_of_performance_current_end_date: '4/30/2017',
        award_type: '',
        type: 'Definitive Contract',
        type_description: 'Definitive Contract',
        awarding_agency_name: 'Department of Energy',
        awarding_subtier_name: 'Department of Energy',
        awarding_office_name: '',
        funding_agency_name: 'Department of Defense',
        funding_subtier_name: 'Department of the Air Force',
        funding_office_name: '',
        recipient_street: '1515 EUBANK BLVD. SEundefinednull',
        recipient_city: 'ALBUQUERQUE',
        recipient_state_province: 'IL',
        recipient_zip_postal: '',
        recipient_country: 'UNITED STATES',
        pop_city: '',
        parent_id: 0,
        pop_state_province: '',
        pop_zip: '',
        pop_country: '',
        total_obligation: '$88,074,906',
        potential_total_value_of_award: '$0',
        recipient_duns: '',
        recipient_parent_duns: '',
        recipient_business_type: 'Unknown Types',
        type_of_contract_pricing: '',
        type_of_contract_pricing_description: '',
        latest_transaction: '',
        _jsid: 'award-35'
    }],
    awardsMeta: {
        batch: {
            queryId: '31',
            searchId: '32'
        },
        page: 1,
        hasNext: false,
        type: 'contracts'
    },
    awardsOrder: {
        field: 'award_id',
        direction: 'asc'
    }
};
