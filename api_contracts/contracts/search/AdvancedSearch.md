FORMAT: 1A
HOST: https://api.usaspending.gov

# Advanced Search

These endpoints support the advanced search page and allow for complex filtering for specific subsets of spending data.

# Group Visualizations

These endpoints return data that is grouped in preset units to support the various data visualizations on USAspending.gov's Advanced Search page.

## Spending By Category [/api/v2/search/spending_by_category/]

This endpoint returns a list of the top results of specific categories sorted by the total amounts in descending order.

### Spending By Category [POST]

+ Request (application/json)
    + Attributes (object)
        + category: `awarding_agency` (required, enum[string])
            + `awarding_agency`
            + `awarding_subagency`
            + `funding_agency`
            + `funding_subagency`
            + `recipient_duns`
            + `recipient_parent_duns`
            + `cfda`
            + `psc`
            + `naics`
            + `county`
            + `district`
            + `federal_accounts`
            + `product_service`
            + `countries`
            <!-- + `states_and_territories` -->
        + filters (required, FilterObject)
            The filters to find with said category
        + limit: 5 (optional, number)
            The number of results to include per page
        + page: 1 (optional, number)
            The page of results to return based on the limit

+ Response 200 (application/json)
    + Attributes
        + category: awarding_agency (required, string)
        + results (array[CategoryResult], fixed-type)
        + limit: 10 (required, number)
        + page_metadata (PageMetadataObject)

# Data Structures

## CategoryResult (object)
+ id: 1 (required, number)
    The `id` is the database key.
+ name: Aircraft Manufacturing (required, string)
+ code: 336411 (optional, string)
    `code` is a user-displayable code (such as a program activity or NAICS code, but **not** a database ID). When no such code is relevant, return a `null`.
+ amount: 591230394.12 (required, number)

## PageMetadataObject (object)
+ page: 1 (required, number)
+ hasNext: false (required, boolean)
+ hasPrevious: false (required, boolean)

## FilterObject (object)
+ keywords: zombie, pizza (optional, array[string])
+ time_period (optional, array[TimePeriodObject], fixed-type)
+ place_of_performance_scope: domestic (optional, enum[string])
    + domestic
    + foreign
+ place_of_performance_locations (optional, array[LocationObject], fixed-type)
+ agencies (optional, array[AgencyObject])
+ recipient_search_text: kearney (optional, array[string])
+ recipient_scope: domestic (optional, enum[string])
    + domestic
    + foreign
+ recipient_locations (optional, array[LocationObject])
+ recipient_type_names: Small Business (optional, array[string])
    See options at https://github.com/fedspendingtransparency/usaspending-api/wiki/Recipient-Business-Types
+ award_type_codes: A, B, 03 (optional, array[string])
+ award_ids: 1605SS17F00018, P063P151708, `AID-OFDA-G-14-00121-01` (optional, array[string])
+ award_amounts (optional, array[AwardAmounts])
+ program_numbers: 10.553 (optional, array[string])
+ naics_codes: 336411 (optional, array[string])
+ psc_codes: 1510 (optional, array[string])
+ contract_pricing_type_codes: SAMPLECODE123 (optional, array[string])
+ set_aside_type_codes: SAMPLECODE123 (optional, array[string])
+ extent_competed_type_codes: SAMPLECODE123 (optional, array[string])

## TimePeriodObject (object)
+ start_date: `2016-10-01` (required, string)
+ end_date: `2017-09-30` (required, string)
+ `date_type`: `action_date` (optional, enum[string])
    + action_date
    + last_modified_date

## LocationObject (object)
+ country: USA (required, string)
+ state: VA (optional, string)
+ county: 059 (optional, string)

## AgencyObject (object)
+ type: awarding (required, enum[string])
    + awarding
    + funding
+ tier: toptier (required, enum[string])
    + `toptier`
    + `subtier`
+ name: `Office of Pizza` (required, string)

## AwardAmounts (object)
+ lower_bound: 5000.50 (optional, number)
+ upper_bound: 6000.50 (optional, number)
