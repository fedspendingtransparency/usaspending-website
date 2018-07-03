FORMAT: 1A
HOST: https://api.usaspending.gov

# Recipient Profile

These endpoints are used to power USAspending.gov's recipient profile pages. This data can be used to visualize the government spending that pertains to a specific recipient.

# Group Landing Page

This endpoint supports the recipient landing page, which provides a list of all recipients for which individual profile pages are available on USAspending.gov.

## List Recipients [/api/v2/recipient/duns/]

This endpoint returns a list of recipients, their level, DUNS, and amount.

+ Parameters
    + order: desc (optional, string)
        The direction results are sorted by. `asc` for ascending, `desc` for descending.
        + Default: desc
    + sort: amount (optional, string)
        The field results are sorted by.
        + Default: amount
        + Members
            + name
            + duns
            + amount
    + limit: 50 (optional, number)
        The number of results to include per page. 
        + Default: 50
    + page: 1 (optional, number)
        The page of results to return based on the limit. 
        + Default: 1
    + keyword: (optional, string)
        The keyword results are filtered by. Searches on name and DUNS.
    + award_type: all (optional, string)
        The award type results are filtered by. 
        + Default: all
        + Members
            + all
            + contracts
            + grants
            + loans
            + direct_payments
            + other_financial_assistance

### List Recipients [POST]

+ Response 200 (application/json)
    + Attributes (RecipientsListResponse)

# Group Profile Page

These endpoints support the individual Recipient Profile pages that display data for a specific DUNS.

## Recipient Overview [/api/v2/recipient/duns/{duns}/{?year}]

This endpoint returns a high-level overview of a specific recipient, given its DUNS.

+ Parameters
    + duns: 0123456 (required, string)
        Recipient's DUNS (Data Universal Numbering System) number. A unique identifier for business entities. 
    + year: 2017 (optional, string)
        The fiscal year you would like data for. Use `all` to view all time or `latest` to view the latest 12 months.

### Get Recipient Overview [GET]

+ Response 200 (application/json)
    + Attributes (RecipientOverview)
    
## Recipient Children [/api/v2/recipient/children/{duns}/{?year}]

This endpoint returns a list of child recipients belonging to the given parent recipient DUNS.

+ Parameters
    + duns: 0123456 (required, string)
        Recipient's DUNS (Data Universal Numbering System) number. A unique identifier for business entities. 
    + year: 2017 (optional, string)
        The fiscal year you would like data for. Use `all` to view all time or `latest` to view the latest 12 months.

### Get Recipient Children [GET]

+ Response 200 (application/json)
    + Attributes (array[ChildRecipient], fixed-type)

# Data Structures

## RecipientsListResponse (object)
+ page_metadata (PageMetaDataObject)
+ results (array[RecipientListing], fixed-type)

## RecipientListing (object)
+ name: The ABC Corporation (required, string)
    Name of the recipient.
+ duns: 0123456 (required, string)
    Recipient's DUNS (Data Universal Numbering System) number. A unique identifier for business entities. 
+ amount: 30020000000 (required, number)
    The aggregate monetary value of all transactions associated with this recipient for the trailing 12 months.
+ recipient_level: R (required, string)
    A letter representing the recipient level. `R` for neither parent nor child, `P` for Parent Recipient, or `C` for child recipient. 
    + Members
        + R
        + P
        + C

## PageMetaDataObject (object)
+ page: 1 (required, number)
    The page number. 
+ limit: 50 (required, number)
    The number of results per page. 
+ total: 101 (required, number)
    The total number of results (all pages).

## RecipientOverview (object)
+ name: The ABC Corporation (required, string)
    Name of the recipient.
+ duns: 0123456 (required, string)
    Recipient's DUNS (Data Universal Numbering System) number. A unique identifier for business entities. 
+ parent_name: The XYZ Corporation (required, string, nullable)
    Parent recipient's name. Null if the recipient does not have a parent recipient.
+ parent_duns: 0987654 (required, string, nullable)
    Parent recipient's DUNS number. Null if the recipient does not have a parent recipient.
+ location: (required, RecipientLocation, fixed-type)
+ business_types: Corporate Entity, For Profit Organization (required, array[string], fixed-type)
    An array of business types used to categorize recipients.
+ total_transaction_amount: 30020000000 (required, number)
    The aggregate monetary value of all transactions associated with this recipient for the given time period.
+ total_transactions: 327721 (required, number)
    The number of transactions associated with this recipient for the given time period.
+ recipient_level: P (required, string)
    A letter representing the recipient level. `R` for neither parent nor child, `P` for Parent Recipient, or `C` for child recipient. 
    + Members
        + R
        + P
        + C

## RecipientLocation (object)
+ address_line1: 123 Sesame St (required, string, nullable)
    The first line of the recipient's street address. 
+ address_line2: (optional, string)
    Second line of the recipient's street address. 
+ address_line3: (optional, string)
    Third line of the recipient's street address. 
+ foreign_province: (optional, string)
    Name of the province in which the recipient is located, if it is outside the United States.
+ city_name: McLean (required, string, nullable)
    Name of the city in which the recipient is located.
+ county_name: (optional, string)
    Name of the county in which the recipient is located.
+ state_code: VA (optional, string)
    Code for the state in which the recipient is located. 
+ zip: 22102 (optional, string)
    Recipient's zip code (5 digits)
+ zip4: (optional, string)
    Recipient's zip code (4 digits)
+ foreign_postal_code: (optional, string)
    Recipient's postal code, if it is outside the United States.
+ country_name: (required, string, nullable)
     Name of the country in which the recipient is located.
+ country_code: USA (required, string, nullable)
     Code for the country in which the recipient is located.
+ congressional_code: 05 (optional, string)
    Number for the recipient's congressional district. 
 
## ChildRecipient (object)
+ name: Child of ABC Corporation (required, string)
    Name of the child recipient.
+ duns: 345678 (required, string)
    Child recipient's DUNS.
+ state_province: New Jersey (required, string)
    The state or province in which the child recipient is located.
+ amount: 300200000 (required, number)
    The aggregate monetary value of transactions associated with this child recipient for the selected time period.
