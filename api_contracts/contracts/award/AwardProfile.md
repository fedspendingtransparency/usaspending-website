FORMAT: 1A
HOST: https://api.usaspending.gov

# Award Profile

These endpoints are used to power USAspending.gov's award profile pages. This data can be used to view details
about a specific award. 

# Group Tables

These endpoints support the tables on the individual Award Profile pages.

## Subawards [/api/v2/subawards/]

### Subawards [POST]

+ Request (application/json)
    + Attributes (object)
        + award_id: 123 (optional, string)
            The internal id of the award to filter on. If not included, all sub-awards are returned.
        + limit: 15 (optional, number)
            The number of results to include per page. Defaults to 10.
        + page: 1 (optional, number)
            The page of results to return based on the limit. Defaults to 1.
        + sort (optional, SortObject)
            Describes how the results are sorted. Defaults to descending by sub-award id (`subaward_number`).
        
+ Response 200 (application/json)
    + Attributes
        + results (array[SubAwardResult], fixed-type)
        + page_metadata (PageMetaDataObject)
        
# Data Structures

## SubAwardResult (object)
+ id: `1` (required, string)
    The internal sub-award id.
+ subaward_number: 2-A (required, string)
    The sub-award id.
+ description: description (required, string)
+ action_date: 1999-01-15 (required, string) Action date in the format `YYYY-MM-DD`.
+ amount: 1234.56 (required, number)
    Monetary value of the sub-award.
+ recipient_name: Recipient A (required, string)

## SortObject (object)
+ field subaward_number (required, string)
    One of `subaward_number`, `description`, `action_date`, `amount`, `recipient_name`.
+ direction desc (required, string)
    `asc` for ascending order or `desc` for descending order.

## PageMetaDataObject (object)
+ page: 1 (required, number)
+ hasNext: false (required, boolean)
+ hasPrevious: false (required, boolean)
