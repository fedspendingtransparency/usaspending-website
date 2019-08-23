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
        available: true,
        appropriations: 0,
        balanceBroughtForward: 49394224538.76,
        budgetAuthority: 84734289679.5,
        obligated: 39762255686.2,
        otherBudgetaryResources: 35340065140.74,
        outlay: 48474446887.76,
        unobligated: 44972033993.3
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
        results: [
            {
                item: "2016",
                aggregate: "198707976.61"
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    obligated: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
                item: "2016",
                aggregate: "2696684.86"
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    budgetAuthority: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
                item: "2016",
                aggregate: "201404661.47"
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    outlay: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
                item: "2016",
                aggregate: "-5505246.42"
            }
        ],
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
        results: [
            {
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
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    obligated: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
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
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    budgetAuthority: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
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
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    outlay: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
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
            }
        ],
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
        results: [
            {
                item: "2016",
                aggregate: "198707976.61"
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    obligatedFiltered: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
                item: "2016",
                aggregate: "2696684.86"
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    budgetAuthority: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
                item: "2016",
                aggregate: "201404661.47"
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    outlay: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
                item: "2016",
                aggregate: "-5505246.42"
            }
        ],
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
        results: [
            {
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
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    obligatedFiltered: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
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
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    budgetAuthority: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
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
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    outlay: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
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
            }
        ],
        total_metadata: {
            count: 1
        }
    }
};

export const mockIncomplete = {
    unobligated: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
                item: "2016",
                aggregate: "500.00",
                submission__reporting_fiscal_year: "2016",
                submission__reporting_fiscal_quarter: "2"
            },
            {
                item: "2016",
                aggregate: "200.00",
                submission__reporting_fiscal_year: "2016",
                submission__reporting_fiscal_quarter: "3"
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    obligatedFiltered: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
                item: "2016",
                aggregate: "250.00",
                submission__reporting_fiscal_year: "2016",
                submission__reporting_fiscal_quarter: "1"
            },
            {
                item: "2016",
                aggregate: "400.00",
                submission__reporting_fiscal_year: "2016",
                submission__reporting_fiscal_quarter: "2"
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    budgetAuthority: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
                item: "2016",
                aggregate: "200.00",
                submission__reporting_fiscal_year: "2016",
                submission__reporting_fiscal_quarter: "1"
            },
            {
                item: "2016",
                aggregate: "100.00",
                submission__reporting_fiscal_year: "2016",
                submission__reporting_fiscal_quarter: "2"
            }
        ],
        total_metadata: {
            count: 1
        }
    },
    outlay: {
        page_metadata: {
            count: 1,
            page_number: 1
        },
        results: [
            {
                item: "2016",
                aggregate: "400.00",
                submission__reporting_fiscal_year: "2016",
                submission__reporting_fiscal_quarter: "2"
            },
            {
                item: "2016",
                aggregate: "-500.00",
                submission__reporting_fiscal_year: "2016",
                submission__reporting_fiscal_quarter: "3"
            }
        ],
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
    results: [
        {
            program_activity__program_activity_name: "Program Name",
            aggregate: "2696684.86"
        }
    ]
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
    results: [
        {
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
                    abbreviation: "DOE",
                    name: "Department of Energy"
                },
                subtier_agency: {
                    subtier_code: "8900",
                    abbreviation: "",
                    name: "Department of Energy"
                }
            },
            funding_agency: {
                id: 1805,
                toptier_agency: {
                    cgac_code: "097",
                    abbreviation: "DOD",
                    name: "Department of Defense"
                },
                subtier_agency: {
                    subtier_code: "5700",
                    abbreviation: "",
                    name: "Department of the Air Force"
                }
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
        }
    ]
};

export const mockReduxAwards = {
    awards: [
        {
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
            funding_agency_name: 'Department of Defense',
            funding_subtier_name: 'Department of the Air Force',
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
            base_and_all_options_value: '$0',
            recipient_duns: '',
            recipient_parent_duns: '',
            recipient_business_type: 'Unknown Types',
            type_of_contract_pricing: '',
            type_of_contract_pricing_description: '',
            latest_transaction: '',
            _jsid: 'award-35'
        }
    ],
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

export const mockTabCount = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        current: "blerg",
        previous: null
    },
    req: "ab71bbda468",
    results: [
        {
            item: null,
            aggregate: "0.00",
            type: null
        }, {
            item: "04",
            aggregate: "0.00",
            type: "04"
        }, {
            item: "05",
            aggregate: "0.00",
            type: "05"
        }, {
            item: "02",
            aggregate: "0.00",
            type: "02"
        }, {
            item: "09",
            aggregate: "0.00",
            type: "09"
        }, {
            item: "C",
            aggregate: "7751.00",
            type: "C"
        }, {
            item: "D",
            aggregate: "1682.00",
            type: "D"
        }, {
            item: "03",
            aggregate: "0.00",
            type: "03"
        }, {
            item: "08",
            aggregate: "0.00",
            type: "08"
        }, {
            item: "B",
            aggregate: "6404.00",
            type: "B"
        }, {
            item: "07",
            aggregate: "0.00",
            type: "07"
        }, {
            item: "06",
            aggregate: "0.00",
            type: "06"
        }, {
            item: "A",
            aggregate: "3225.00",
            type: "A"
        }, {
            item: "E",
            aggregate: "585.00",
            type: "E"
        }, {
            item: "11",
            aggregate: "0.00",
            type: "11"
        }
    ]
};

export const parsedYearYSeries = {
    obligated: {
        bottom: 0,
        top: 2696684.86,
        value: 2696684.86,
        description: 'Obligations Incurred'
    },
    unobligated: {
        bottom: 2696684.86,
        top: 198707976.61 + 2696684.86,
        value: 198707976.61,
        description: 'Unobligated Balance'
    },
    outlay: {
        bottom: -5505246.42,
        top: -5505246.42,
        value: -5505246.42,
        description: 'Outlay'
    }
};

export const parsedYearYSeriesFiltered = {
    obligatedFiltered: {
        bottom: 0,
        top: 2696684.86,
        value: 2696684.86,
        description: 'Obligations Incurred (Filtered)'
    },
    obligatedOther: {
        bottom: 2696684.86,
        top: (201404661.47 - 198707976.61 - 2696684.86) + 2696684.86,
        value: (201404661.47 - 198707976.61 - 2696684.86),
        description: 'Obligations Incurred (Other)'
    },
    unobligated: {
        bottom: (201404661.47 - 198707976.61),
        top: 201404661.47,
        value: 198707976.61,
        description: 'Unobligated Balance'
    },
    outlay: {
        bottom: -5505246.42,
        top: -5505246.42,
        value: -5505246.42,
        description: 'Outlay'
    }
};

export const parsedQuarterYSeries = [
    {
        obligated: {
            bottom: 0,
            top: 2696684.86,
            value: 2696684.86,
            description: 'Obligations Incurred'
        },
        unobligated: {
            bottom: 2696684.86,
            top: 198707976.61 + 2696684.86,
            value: 198707976.61,
            description: 'Unobligated Balance'
        },
        outlay: {
            bottom: -5505246.42,
            top: -5505246.42,
            value: -5505246.42,
            description: 'Outlay'
        }
    },
    {
        obligated: {
            bottom: 0,
            top: 3851752.00,
            value: 3851752.00,
            description: 'Obligations Incurred'
        },
        unobligated: {
            bottom: 3851752.00,
            top: 5851779752.00 + 3851752.00,
            value: 5851779752.00,
            description: 'Unobligated Balance'
        },
        outlay: {
            bottom: -4413237.11,
            top: -4413237.11,
            value: -4413237.11,
            description: 'Outlay'
        }
    }
];

export const parsedQuarterYSeriesFiltered = [
    {
        obligatedFiltered: {
            bottom: 0,
            top: 2696684.86,
            value: 2696684.86,
            description: 'Obligations Incurred (Filtered)'
        },
        obligatedOther: {
            bottom: 2696684.86,
            top: (201404661.47 - 198707976.61 - 2696684.86) + 2696684.86,
            value: (201404661.47 - 198707976.61 - 2696684.86),
            description: 'Obligations Incurred (Other)'
        },
        unobligated: {
            bottom: (201404661.47 - 198707976.61),
            top: 201404661.47,
            value: 198707976.61,
            description: 'Unobligated Balance'
        },
        outlay: {
            bottom: -5505246.42,
            top: -5505246.42,
            value: -5505246.42,
            description: 'Outlay'
        }
    },
    {
        obligatedFiltered: {
            bottom: 0,
            top: 3851752.00,
            value: 3851752.00,
            description: 'Obligations Incurred (Filtered)'
        },
        obligatedOther: {
            bottom: 3851752.00,
            top: (101905442.35 - 5851779752.00 - 3851752) + 3851752,
            value: (101905442.35 - 5851779752.00 - 3851752),
            description: 'Obligations Incurred (Other)'
        },
        unobligated: {
            bottom: (101905442.35 - 5851779752.00),
            top: 101905442.35,
            value: 5851779752.00,
            description: 'Unobligated Balance'
        },
        outlay: {
            bottom: -4413237.11,
            top: -4413237.11,
            value: -4413237.11,
            description: 'Outlay'
        }
    }
];

export const mockSnapshot = {
    results: {
        outlay: 48474446887.76,
        name: "Federal-Aid Highways, Liquidation of Contract Authorization, " +
            "Federal Highway Administration, Transportation",
        unobligated: 44972033993.3,
        appropriations: 0.0,
        balance_brought_forward: 49394224538.76,
        budget_authority: 84734289679.5,
        obligated: 39762255686.2,
        other_budgetary_resources: 35340065140.74
    }
};
