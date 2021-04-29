u@usaspending
@Custom_Award_Data
Feature:[USASPENDING] Regression Testing (Custom Award Data)

    @Award_Data_Archive_Items
    Scenario: Check for main title descriptions and sidebar on the award data archive page
        Given On the homepage
        When I click the top banner for "Download Center" then "Custom Award Data"

        #Grey Header
        Then we see id main-focus has a value of Download Center
        Then we see classname download-center__title has a value of Custom Award Data

        Then object 1 of classname download-filter__title has a value of Exclamation Mark Icon Select the award level to include.
        When id primeAwards is clicked
        Then object 1 of classname download-filter__title has a value of Checkmark or Successful Icon Select the award level to include.

        Then object 2 of classname download-filter__title has a value of Exclamation Mark Icon Select the award types to include.
        When id contracts is clicked
        Then object 2 of classname download-filter__title has a value of Checkmark or Successful Icon Select the award types to include.

        Then we see classname download-user-selections__title has a value of Your selected options are...

    @Award_Data_Archive_Downloads
    Scenario: Check for main title descriptions and sidebar on the award data archive page
        Given On the homepage
        When I click the top banner for "Download Center" then "Custom Award Data"

        #Grey Header
        Then we see id main-focus has a value of Download Center

        When id primeAwards is clicked
        When id contracts is clicked

        When classname selected-button is clicked
        And I wait 1 seconds
        When object 43 of classname field-item is clicked
        Then we see classname selected-button has a value of Consumer Product Safety CommissionPick an agency

        When object 1 of classname time-period-button is clicked

        When I wait 1 seconds

        # Check options table and ensure it is updated correctly.
        # Classes with the title section__content contain the values selected above
        Then object 1 of classname selection__content has a value of Prime Awards
        Then object 2 of classname selection__content has a value of Consumer Product Safety Commission
        Then object 6 of classname selection__content has a value of Contracts
        Then object 8 of classname selection__content has a value of 10/01/2019 - 09/30/2020

        When classname submit-button is clicked
        Then Download link is provided to copy and the file is being prepared
        When Wait for download to complete
        When Click on the downloaded zip file
        Then Files are extracted and displays correct files
            |   filename                        |   extension   |
            |   Assistance_PrimeTransactions    |   csv         |
            |   Contracts_PrimeTransactions     |   csv         |
        When classname download-center__reset is clicked
        Then object 1 of classname selection__content has a value of required
