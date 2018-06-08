FORMAT: 1A
HOST: https://api.usaspending.gov

# Award Profile

These endpoints are used to power USAspending.gov's award profile pages. This data can be used to view details about a specific award. 

# Group Tables

These endpoints support the tables on the individual Award Profile pages.

## SubAwards [/api/v2/subawards/]

This endpoint returns a list of sub-awards, their amount, action date, recipient name, and description.

### SubAwards [POST]

+ Request (application/json)
    + Attributes (object)
        + award_id: 123 (optional, string)
            The internal id of the award to filter on. If not included, all sub-awards are returned.
        + limit: 15 (optional, number)
            The number of results to include per page. 
            + Default: 10
        + page: 1 (optional, number)
            The page of results to return based on the limit. 
            + Default: 1
        + sort: subaward_number (optional, enum[string])
            The field results are sorted by.
            + Default: subaward_number
            + Members
                + subaward_number
                + description
                + action_date
                + amount
                + recipient_name
        + order: desc (optional, string)
            The direction results are sorted by. `asc` for ascending, `desc` for descending.
            + Default: desc
        
+ Response 200 (application/json)
    + Attributes
        + results (array[SubAwardResult], fixed-type)
        + page_metadata (PageMetaDataObject)
        
## Transactions [/api/v2/transactions/]

This endpoint returns a list of transactions, their amount, type, action date, action type, modification number, and description.

### Transactions [POST]

+ Request (application/json)
    + Attributes (object)
        + award_id: 123 (optional, string)
            The internal id of the award to filter on. If not included, all transactions are returned.
        + limit: 15 (optional, number)
            The number of results to include per page. 
            + Default: 10
        + page: 1 (optional, number)
            The page of results to return based on the limit. 
            + Default: 1
        + sort: action_date (optional, enum[string])
            The field results are sorted by.
            + Default: action_date
            + Members
                + modification_number
                + action_date
                + federal_action_obligation
                + face_value_loan_guarantee
                + original_loan_subsidy_cost
                + action_type_description
                + description
        + order: desc (optional, string)
            The direction results are sorted by. `asc` for ascending, `desc` for descending.
            + Default: desc
        
+ Response 200 (application/json)
    + Attributes
        + results (array[TransactionResult], fixed-type)
        + page_metadata (PageMetaDataObject)

        
# Data Structures

## SubAwardResult (object)
+ id: `1` (required, string)
    The internal sub-award id.
+ subaward_number: `2-A` (required, string)
    The sub-award id.
+ description: description (required, string)
+ action_date: `1999-01-15` (required, string) 
    Action date in the format `YYYY-MM-DD`.
+ amount: 1234.56 (required, number)
    Monetary value of the sub-award.
+ recipient_name: Recipient A (required, string)
    
## TransactionResult (object)
+ id: `1` (required, string)
    The internal transaction id.
+ type: A (required, string)
    Award type code
+ type_description: BPA (required, string)
+ action_date: `1999-01-15` (required, string)
    Action date in the format `YYYY-MM-DD`.
+ action_type: C (required, string)
    Action type code
+ action_type_description: description (required, string)
+ modification_number: `0` (required, string)
+ description: MANAGEMENT AND OPERATIONS (required, string)
+ federal_action_obligation: 1234.56 (optional, number)
    Monetary value of the transaction. Included for results with award type codes corresponding to contracts, grants, direct payments, and other financial assistance. 
+ face_value_loan_guarantee: 1234.56 (optional, number)
    Face value of the loan. Included for results with award type codes corresponding to loans.
+ original_loan_subsidy_cost: 234.12 (optional, number)
    Original subsidy cost of the loan. Included for results with award type codes corresponding to loans.

## PageMetaDataObject (object)
+ page: 1 (required, number)
+ hasNext: false (required, boolean)
+ hasPrevious: false (required, boolean)
