FORMAT: 1A
HOST: https://api.usaspending.gov

# Custom Account Download

These endpoints are used to power USAspending.gov's custom download pages. This data can be used to create account data files. 

# Custom Account Page

These endpoints generate files using the filters on the custom account.

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
        /    The file format that should be returned. 
            + Default: `csv`
        + filters: (required, FilterObject)
            The filters used to filter the data

+ Response 200 (application/json)
    + Attributes
        + results (array[CustomDataResult], fixed-type)

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
+ status: `finished` (required, string)
+ seconds_elapsed `10.061132` (required, string)
    
## FilterObject (object)
+ agency: `all` (optional, string)
    The agency to filter by
    + Default: `all`
    + submission_type: `award_financial` (required, enum[string])
    + Members
        + account_balances
        + object_class_program_activity
        + award_financial
+ fy: `2017` (required, string)
    The fiscal year to filter by in the format `YYYY`
+ quarter: 1 (required, enum[string])
    + `1`
    + `2`
    + `3`
    + `4`