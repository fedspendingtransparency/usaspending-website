FORMAT: 1A
HOST: https://api.usaspending.gov

# Download Center

These endpoints are used to power USAspending.gov's download center. This data can be used to create account data files.

# Group Custom Account Data

These endpoints power the generation of custom account data files.

## Custom Account Data [/api/v2/download/accounts/]

This endpoint returns the generated file's metadata.

### Custom Account Data [POST]

+ Request (application/json)
    + Attributes (object)
        + account_level: `treasury_account` (required, enum[string])
            The account level is used to filter for a specific type of file.
            + Members
                + treasury_account
                + federal_account
        + file_format: `csv` (optional, string)
            The file format that should be returned.
            + Default: `csv`
        + filters: (required, FilterObject)
            The filters used to filter the data

+ Response 200 (application/json)
    + Attributes
        + results (array[CustomDataResult], fixed-type)

## Budget Function [/api/v2/budget_functions/list_budget_functions/]

This endpoint returns a list of budget functions with their associated title and code

### Budget Function [GET]

+ Parameters
    + agency: `all` (optional, string)
    + federal_account: `212` (optional, string)

+ Response 200 (application/json)
    + Attributes
        + results (required, array[BudgetFunction], fixed-type)

## Budget Subfunction [/api/v2/budget_functions/list_budget_subfunctions]

This endpoint returns a list of budget subfunctions with their associated title and code

+ Parameters
    + budget_function: `050` (required, string)

### Budget Subfunction [POST]

+ Response 200 (application/json)
    + Attributes
        + results (required, array[BudgetSubfunction], fixed-type)

## Agency Function [/api/v2/bulk_download/list_agencies/]

This endpoint returns a list of agencies with their associated id and name

### Agency Function [POST]

+ Parameters
    + agency: 0 (required, number)

+ Response 200 (application/json)
    + Attributes
        + agencies (required, AgencyData, fixed-type)

## Federal Account Function [/api/v1/federal_accounts/]

This endpoint returns a list of federal accounts associated to a specific agency

### Federal Account Function [POST]

+ Parameters
    + filters: (required, array[AgencyCFO], fixed-type)

+ Response 200 (application/json)
    + Attributes
        + results (required, array[AgencyFederalAccountData], fixed-type)

# Data Structures

## CustomDataResult (object)
+ total_size: 35.055 (required, number)
    The total size of the file being returned
+ file_name: `012_account_balances_20180613140845.zip` (required, string)
+ total_rows: 652 (required, number)
+ total_columns: 27 (required, number)
+ url: `S3/path_to/bucket/012_account_balances_20180613140845.zip` (required, string)
    Where the file lives in S3
+ message (optional, nullable)
+ status: `finished` (required, enum[string])
    + Members
        + ready
        + running
        + finished
        + failed
+ seconds_elapsed `10.061132` (required, string)

## FilterObject (object)
+ budget_function: `050` (optional, string)
+ budget_subfunction: `053` (optional, string)
+ agency: `all` (optional, string)
    The agency to filter by. This field is an internal id.
    + Default: `all`
+ federal_account: `212` (optional, string)
    This field is an internal id.
+ submission_type: `award_financial` (required, enum[string])
    + Members
        + account_balances
        + object_class_program_activity
        + award_financial
+ fy: `2017` (required, string)
    The fiscal year to filter by in the format `YYYY`
+ quarter: `1` (required, enum[string])
    + `1`
    + `2`
    + `3`
    + `4`

## AgencyData
+ cfo_agencies: (required, array[AgencyCFO])
+ other_agencies: (required, array[AgencyOtherAgencies])
+ federal_accounts: (required, array)
+ sub_agencies: (required, array)

## AgencyCFO
+ name: `Department of Agriculture`
+ cgac_code: `012`
+ toptier_agency_id: `14`

## AgencyOtherAgencies
+ cgac_code: `310`
+ name: `Access Board`
+ toptier_agency_id: `102`

## AgencyFederalAccountData
+ account_title: `Salaries and Expenses, Departmental Management, Commerce`
+ id: `3656`

## BudgetFunction (object)
+ budget_function_code: `050` (required, string)
+ budget_function_title: `National Defense` (required, string)

## BudgetSubfunction(object)
+ budget_subfunction_code: `051` (required, string)
+ budget_subfunction_title: `Department of Defense-Military` (required, string)
