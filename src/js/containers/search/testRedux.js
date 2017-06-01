export const testRedux = {
    keyword: "blerg",
    timePeriodType: "fy",
    timePeriodFY: ["2017"],
    timePeriodStart: null,
    timePeriodEnd: null,
    selectedLocations: {},
    locationDomesticForeign: "all",
    budgetFunctions: {},
    federalAccounts: {},
    objectClasses: {
        30: "Acquisition of Assets"
    },
    selectedFundingAgencies: {},
    selectedAwardingAgencies: {},
    selectedRecipients: {},
    recipientDomesticForeign: "all",
    recipientType: [],
    selectedRecipientLocations: {
        '451,637,638,4028,4029,4297,4298,44094410_ARLINGTON_CITY': {
            parent: "VIRGINIA",
            matched_ids: [451, 637, 638, 4028, 4029, 4297, 4298, 4409, 4410],
            place_type: "CITY",
            place: "ARLINGTON",
            identifier: "451,637,638,4028,4029,4297,4298,4409,4410_ARLINGTON_CITY"
        }
    },
    awardType: [],
    selectedAwardIDs: {},
    awardAmounts: {}
};

export const testRedux2 = {
    "filters": {
        "keyword": "blerg",
        "timePeriodType": "dr",
        "timePeriodFY": ["2017"],
        "timePeriodStart": "2017-06-05",
        "timePeriodEnd": "2017-06-10",
        "selectedLocations": {
            "501,502,564,800,801,812,3524,3525,3588,3589,3653,3654,3840,3841,4067,4068,4164,4165,4630,4631_ARKANSAS_STATE": {
                "matched_ids": [3588, 4164, 4630, 812, 3524, 4067, 564, 501, 800, 3840, 3653, 3589, 4631, 4165, 3841, 3525, 3654, 4068, 502, 801],
                "place_type": "STATE",
                "parent": "UNITED STATES",
                "place": "ARKANSAS",
                "identifier": "501,502,564,800,801,812,3524,3525,3588,3589,3653,3654,3840,3841,4067,4068,4164,4165,4630,4631_ARKANSAS_STATE"
            }
        },
        "locationDomesticForeign": "domestic",
        "budgetFunctions": {
            "Income Security": {
                "title": "Income Security",
                "functionType": "Function"
            }
        },
        "federalAccounts": {
            "8": {
                "id": 8,
                "agency_identifier": "000",
                "main_account_code": "0123",
                "account_title": "Contingent Expenses, Miscellaneous Items, Senate"
            },
            "308": {
                "id": 308,
                "agency_identifier": "012",
                "main_account_code": "0600",
                "account_title": "Salaries and Expenses, Farm Service Agency, Agriculture"
            }
        },
        "objectClasses": {
            "30": "Acquisition of Assets"
        },
        "selectedFundingAgencies": {
            "1141_toptier": {
                "id": 1141,
                "toptier_flag": true,
                "toptier_agency": {
                    "cgac_code": "097",
                    "fpds_code": "9700",
                    "abbreviation": "DOD",
                    "name": "Department of Defense"
                },
                "subtier_agency": {
                    "subtier_code": "9700",
                    "abbreviation": "",
                    "name": "Department of Defense"
                },
                "office_agency": null,
                "agencyType": "toptier"
            }
        },
        "selectedAwardingAgencies": {
            "1364_subtier": {
                "id": 1364,
                "toptier_flag": false,
                "toptier_agency": {
                    "cgac_code": "097",
                    "fpds_code": "9700",
                    "abbreviation": "DOD",
                    "name": "Department of Defense"
                },
                "subtier_agency": {
                    "subtier_code": "573T",
                    "abbreviation": "",
                    "name": "Air Force Elements U.S. Transportation Command "
                },
                "office_agency": null,
                "agencyType": "subtier"
            }
        },
        "selectedRecipients": {
            "050299890": {
                "legal_entity_id": 6916,
                "parent_recipient_unique_id": "050299890",
                "recipient_name": "BAYTOWN, CITY OF",
                "business_types": null,
                "business_types_description": "Unknown Types",
                "business_categories": ["national_government", "local_government", "government"],
                "recipient_unique_id": "050299890",
                "domestic_or_foreign_entity_description": "Other U.S. Entity (e.g. Government)",
                "small_business_description": null,
                "location": {
                    "country_name": "UNITED STATES",
                    "state_code": "TX",
                    "state_name": null,
                    "state_description": null,
                    "city_name": "BAYTOWN",
                    "address_line1": "2401 MARKET ST",
                    "address_line2": null,
                    "address_line3": null,
                    "foreign_location_description": null,
                    "zip5": null,
                    "foreign_postal_code": null,
                    "foreign_province": null,
                    "foreign_city_name": null,
                    "location_country_code": "USA"
                }
            },
            "021974928": {
                "legal_entity_id": 2360,
                "parent_recipient_unique_id": "690549662",
                "recipient_name": "CANON FINANCIAL SERVICES, INC.",
                "business_types": null,
                "business_types_description": "Unknown Types",
                "business_categories": ["category_business", "us_owned_business", "special_designations"],
                "recipient_unique_id": "021974928",
                "domestic_or_foreign_entity_description": "U.S. Owned Business",
                "small_business_description": null,
                "location": {
                    "country_name": "UNITED STATES",
                    "state_code": "NJ",
                    "state_name": null,
                    "state_description": null,
                    "city_name": "MOUNT LAUREL",
                    "address_line1": "158 GAITHER DR STE 200",
                    "address_line2": null,
                    "address_line3": null,
                    "foreign_location_description": null,
                    "zip5": null,
                    "foreign_postal_code": null,
                    "foreign_province": null,
                    "foreign_city_name": null,
                    "location_country_code": "USA"
                }
            }
        },
        "recipientDomesticForeign": "all",
        "recipientType": ["asian_pacific_american_owned_business", "black_american_owned_business", "hispanic_american_owned_business"],
        "selectedRecipientLocations": {
            "451,637,638,4028,4029,4297,4298,44094410_ARLINGTON_CITY": {
                "parent": "VIRGINIA",
                "matched_ids": [451, 637, 638, 4028, 4029, 4297, 4298, 4409, 4410],
                "place_type": "CITY",
                "place": "ARLINGTON",
                "identifier": "451,637,638,4028,4029,4297,4298,4409,4410_ARLINGTON_CITY"
            }
        },
        "awardType": ["A", "B", "C", "D"],
        "selectedAwardIDs": {
            "18347": {
                "id": 18347,
                "piid": "DJJ21800178",
                "uri": null,
                "fain": null,
                "awardIDType": "PIID"
            }
        },
        "awardAmounts": {
            "range-1": [1000000, 25000000]
        }
    },
    "version": 1
};
