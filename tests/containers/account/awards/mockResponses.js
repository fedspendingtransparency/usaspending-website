export const mockCount = {
    "page_metadata": {
        "count": 6,
        "page": 1,
        "has_next_page": false,
        "has_previous_page": false,
        "next": null,
        "current": "https://dev-api.usaspending.gov/api/v1/awards/total/?limit=100&page=1",
        "previous": null
    },
    "results": [
        {
            "item": "04",
            "aggregate": "0.00",
            "type": "04"
        },
        {
            "item": "05",
            "aggregate": "0.00",
            "type": "05"
        },
        {
            "item": "A",
            "aggregate": "1.00",
            "type": "A"
        },
        {
            "item": "B",
            "aggregate": "0.00",
            "type": "B"
        },
        {
            "item": "C",
            "aggregate": "1.00",
            "type": "C"
        },
        {
            "item": "D",
            "aggregate": "0.00",
            "type": "D"
        }
    ]
};

export const mockAward = {
    "page_metadata": {
        "count": 238,
        "page": 1,
        "has_next_page": true,
        "has_previous_page": false,
        "next": "https://dev-api.usaspending.gov/api/v1/awards/?limit=1&page=2",
        "current": "https://dev-api.usaspending.gov/api/v1/awards/?limit=1&page=1",
        "previous": null
    },
    "results": [
        {
            "id": 453958,
            "date_signed__fy": 2001,
            "type": "D",
            "type_description": "Definitive Contract",
            "category": "contract",
            "piid": "DEAC0494AL85000",
            "fain": null,
            "uri": null,
            "total_obligation": "37731996565.78",
            "total_outlay": null,
            "date_signed": "2000-10-15",
            "description": null,
            "period_of_performance_start_date": "2000-10-15",
            "period_of_performance_current_end_date": "2017-04-30",
            "potential_total_value_of_award": "-992272957.42",
            "total_subaward_amount": null,
            "subaward_count": 0,
            "awarding_agency": {
                "id": 915,
                "toptier_flag": true,
                "toptier_agency": {
                    "toptier_code": "089",
                    "abbreviation": "DOE",
                    "name": "Department of Energy"
                },
                "subtier_agency": {
                    "subtier_code": "8900",
                    "abbreviation": "DOE",
                    "name": "Department of Energy"
                }
            },
            "funding_agency": {
                "id": 915,
                "toptier_flag": true,
                "toptier_agency": {
                    "toptier_code": "089",
                    "abbreviation": "DOE",
                    "name": "Department of Energy"
                },
                "subtier_agency": {
                    "subtier_code": "8900",
                    "abbreviation": "DOE",
                    "name": "Department of Energy"
                }
            },
            "recipient": {
                "legal_entity_id": 106877,
                "parent_recipient_unique_id": null,
                "recipient_name": "LOCKHEED MARTIN CORPORATION",
                "business_types": "Q",
                "business_types_description": "For-Profit Organization (Other than Small Business)",
                "business_categories": [
                    "other_than_small_business",
                    "category_business"
                ],
                "recipient_unique_id": "926784042",
                "domestic_or_foreign_entity_description": null,
                "small_business_description": null,
                "location": {
                    "country_name": "UNITED STATES",
                    "state_code": "CO",
                    "state_name": "COLORADO",
                    "state_description": null,
                    "city_name": "LITTLETON",
                    "address_line1": "12257 S WADSWORTH BLVD",
                    "address_line2": null,
                    "address_line3": null,
                    "foreign_location_description": null,
                    "zip5": "80125",
                    "foreign_postal_code": null,
                    "foreign_province": null,
                    "foreign_city_name": null,
                    "location_country_code": "USA"
                }
            },
            "place_of_performance": {
                "country_name": "UNITED STATES",
                "state_code": "NM",
                "state_name": "NEW MEXICO",
                "state_description": null,
                "city_name": null,
                "address_line1": null,
                "address_line2": null,
                "address_line3": null,
                "foreign_location_description": null,
                "zip5": "87185",
                "foreign_postal_code": null,
                "foreign_province": null,
                "foreign_city_name": null,
                "location_country_code": "USA"
            }
        }
    ]
};
