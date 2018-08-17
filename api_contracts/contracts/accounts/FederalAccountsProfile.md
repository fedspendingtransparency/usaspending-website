FORMAT: 1A
HOST: https://api.usaspending.gov


# Federal Accounts Landing Page

This endpoint supports the recipient landing page, which provides a list of all federal accounts for which individual federal accounts pages are available on USAspending.gov.

## List Federal Accounts [/api/v2/federal_accounts/]

This endpoint returns a list of federal accounts, their number, name, managing agency, and budgetary resources.

+ Parameters
    + filters (optional, TimeFilterObject)
        The filter takes a fiscal year, but if one is not provided, it defaults to the last certified fiscal year.
    + sort (optional, SortObject)
    + limit: 50 (optional, number)
        The number of results to include per page.
        + Default: 50
    + page: 1 (optional, number)
        The page of results to return based on the limit.
        + Default: 1
    + keyword: `test` (optional, string)
        The keyword that you want to search on. Can be used to search by name, number, managing agency, and budgetary resources.

### List Federal Accounts [POST]

+ Response 200 (application/json)
    + Attributes (FederalAccountsListResponse)


# Data Structures

## FederalAccountsListResponse (object)
+ previous: null (optional, number, nullable)
+ count: 1 (required, number)
+ limit: 50 (required, number)
+ hasNext: false (boolean, required)
+ page: 1 (number, required)
+ hasPrevious: false (boolean, required)
+ next: 2 (number, required)
+ fy: `2018` (string, required)
+ results (array[FederalAccountListing], fixed-type)

## FederalAccountListing (object)
+ account_name: `Public Debt Principal (Indefinite), Treasury` (required, string, nullable)
    Name of the federal account. `null` when the name is not provided.
+ account_number: `023-2342` (required, string, nullable)
    The number for the federal account. `null` when no DUNS is provided.
+ account_id: `5354` (required, string)
    A unique identifier for the federal account
+ managing_agency_acronym: `BEM` (required, string)
+ agency_identifier: `032` (required, string)
+ budgetary_resources: 03423.23 (required, number)
+ managing_agency: `CIA` (required, string)

## TimeFilterObject (object)
+ fy: `2018` (required, string)

## SortObject (object)
+ field: `budgetary_resources` (optional, string)
    The field that you want to sort on.
    + Default: `budgetary_resources`
        + Members
            + `budgetary_resources`
            + `account_name`
            + `account_number`
            + `managing_agency`
    + direction: `desc` (optional, string)
        The direction results are sorted by. `asc` for ascending, `desc` for descending.
        + Default: `desc`