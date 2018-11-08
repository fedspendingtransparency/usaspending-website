FORMAT: 1A
HOST: https://api.usaspending.gov

# Advanced Search

These endpoints support the advanced search page and allow for complex filtering for specific subsets of spending data.

# Group Visualizations

These endpoints return data that is grouped in preset units to support the various data visualizations on USAspending.gov's Advanced Search page.

## Spending by Award Count [/api/v2/search/spending_by_award_count/]

This endpoint takes award filters and fields, and returns the fields of the filtered awards.

### Spending by Award Count [POST]

+ Request (application/json)
    + Attributes (object)
        + filters (required, FilterObject)
        + subawards: false (optional, boolean)
            True when you want to group by Subawards instead of Awards. Defaulted to False.

+ Response 200 (application/json)
    + Attributes
        + results (AwardTypeResult)

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
            + `federal_account`
            + `country`
            + `state_territory`
        + filters (required, FilterObject)
            The filters to find with said category
        + limit: 5 (optional, number)
            The number of results to include per page
        + page: 1 (optional, number)
            The page of results to return based on the limit

+ Response 200 (application/json)
    + Attributes
        + category: `awarding_agency` (required, string)
        + results (array[CategoryResult], fixed-type)
        + limit: 10 (required, number)
        + page_metadata (PageMetadataObject)

## Spending Over Time [/api/v2/search/spending_over_time/]

This endpoint returns a list of aggregated award amounts grouped by time period in ascending order (earliest to most recent).

### Spending Over Time [POST]

+ Request (application/json)
    + Attributes (object)
        + group: `quarter` (required, enum[string])
            + `fiscal_year`
            + `quarter`
            + `month`
        + filters (required, FilterObject)
        + subawards (optional, boolean)
            True to group by sub-awards instead of prime awards. Defaults to false.
            + Default: false

+ Response 200 (application/json)
    + Attributes
        + group: `quarter` (required, enum[string])
            + `fiscal_year`
            + `quarter`
            + `month`
        + results (array[TimeResult], fixed-type)

# Data Structures

## AwardTypeResult (object)
+ grants : 200, (required, number)
+ loans : 100, (required, number)
+ contracts : 150, (required, number)
+ direct_payments : 100, (required, number)
+ other : 50, (required, number)
+ idv : 50, (required, number)

## CategoryResult (object)
+ id: 1 (required, number)
    The `id` is the database key.
+ name: Aircraft Manufacturing (required, string)
+ code: 336411 (optional, string)
    `code` is a user-displayable code (such as a program activity or NAICS code, but **not** a database ID). When no such code is relevant, return a `null`.
+ amount: 591230394.12 (required, number)

## TimeResult (object)
+ time_period (required, TimePeriodGroup)
+ aggregated_amount: 200000000 (required, number)
    The aggregate award amount for this time period and the given filters.

## PageMetadataObject (object)
+ page: 1 (required, number)
+ hasNext: false (required, boolean)
+ hasPrevious: false (required, boolean)

## FilterObject (object)
+ keywords: pizza (optional, array[string])
+ time_period (optional, array[TimePeriodObject], fixed-type)
+ place_of_performance_scope: domestic (optional, enum[string])
    + domestic
    + foreign
+ place_of_performance_locations (optional, array[LocationObject], fixed-type)
+ agencies (optional, array[AgencyObject])
+ recipient_search_text: Hampton (optional, array[string])
+ recipient_id (optional, string)
    A hash of recipient DUNS, name, and level. A unique identifier for recipients, used for profile page urls.
+ recipient_scope: domestic (optional, enum[string])
    + domestic
    + foreign
+ recipient_locations (optional, array[LocationObject])
+ recipient_type_names: `category_business` (optional, array[string])
    See options at https://github.com/fedspendingtransparency/usaspending-api/wiki/Recipient-Business-Types
+ award_type_codes: 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, A, B, C, D, E, F, G, S, T, IDV_A, IDV_B, IDV_C, IDV_D, IDV_E (optional, array[string])
    See use at
    https://github.com/fedspendingtransparency/usaspending-api/wiki/Search-Filters-v2-Documentation#award-type
+ award_ids: SPE30018FLGFZ, SPE30018FLJFN (optional, array[string])
+ award_amounts (optional, array[AwardAmounts])
+ program_numbers: 10.331 (optional, array[string])
+ naics_codes: 311812 (optional, array[string])
+ psc_codes: 8940, 8910 (optional, array[string])
+ contract_pricing_type_codes: J (optional, array[string])
+ set_aside_type_codes: NONE (optional, array[string])
+ extent_competed_type_codes: A (optional, array[string])

## TimePeriodObject (object)
+ start_date: `2017-10-01` (required, string)
+ end_date: `2018-09-30` (required, string)
+ `date_type`: `action_date` (optional, enum[string])
    + action_date
    + last_modified_date

## TimePeriodGroup (object)
+ fiscal_year: `2018` (required, string)
+ quarter: `1` (optional, string)
    Excluded when grouping by `fiscal_year` or `month`.
+ month: `1` (optional, string)
    Excluded when grouping by `fiscal_year` or `quarter`.

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
+ name: `Department of Defense` (required, string)

## AwardAmounts (object)
+ lower_bound (optional, number)
+ upper_bound: 1000000 (optional, number)
