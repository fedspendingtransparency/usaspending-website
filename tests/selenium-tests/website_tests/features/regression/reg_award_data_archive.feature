@usaspending
@Award_Data_Archive
Feature:[USASPENDING] Regression Testing (Award Data Archive)

    @Award_Data_Archive_Items
    Scenario: Check for main title descriptions and sidebar on the award data archive page
        Given On the homepage
        When I click the top banner for "Download Center" then "Award Data Archive"

        #Grey Header
        Then we see id main-focus has a value of Download Center

        Then check tag h2 of object 1 of classname award-data-archive-content has a value of Award Data Archive

        #check table for titles
        Then we see classname form-title has a value of Filter by
        Then object 1 of classname select-label has a value of Agency
        Then object 2 of classname select-label has a value of Award Type
        Then object 3 of classname select-label has a value of Fiscal Year

        #check for buttons
        Then object 1 of classname selected-button has a value of AllPick an agency
        Then object 2 of classname selected-button has a value of ContractsPick an award type
        Then object 3 of classname selected-button has a value of 2019Pick a fiscal year

        #check apply button
        Then classname form__button is displayed

        #check for table
        Then classname award-data-archive-table is displayed
        Then check tag thead of object 1 of classname award-data-archive-table has a value of Agency Archive File Fiscal Year Data As Of

    @Award_Data_Archive_Table_Select
    Scenario: Check that the dropdown filters and then the apply button make the correct changes to the table
        Given On the homepage
        When I click the top banner for "Download Center" then "Award Data Archive"

        #Grey Header
        Then we see id main-focus has a value of Download Center

        # select Department of Defense from agency dropdown list and make sure it appears
        When object 1 of classname selected-button is clicked
        And I wait 0.5 seconds
        When object 5 of classname field-item is clicked
        And I wait 0.5 seconds
        Then object 1 of classname selected-button has a value of Department of DefensePick an agency

        # select FY 2018 from year dropdown list and make sure it appears
        When object 3 of classname selected-button is clicked
        And I wait 0.5 seconds
        Then find 2018 button
        When I wait 0.5 seconds
        Then object 3 of classname selected-button has a value of 2018Pick a fiscal year

        #click apply and make sure active selections appear in table
        When classname form__button is clicked
        And I wait 1 seconds
        Then object 1 of classname row-odd has a value of Department of Defense (DOD)
        Then object 3 of classname row-odd has a value of FY 2018

    @Award_Data_Archive_Date
    Scenario: Check for main title descriptions and sidebar on the award data archive page
        Given On the homepage
        When I click the top banner for "Download Center" then "Award Data Archive"

        #Grey Header
        Then we see id main-focus has a value of Download Center
        Then check dates on award data archive download

# This is the download section that is having issues with the headless driver.
# There is a known bug with selenium and chrome driver where it is having trouble finding the download link/object therefore,
# the file cannot be downloaded and saved to the folder directory to view the data.

    # @Award_Data_Archive_Table_Download
    # Scenario: Download zip file and check headers and data for accuracy
    #     Given On the homepage
    #     When I click the top banner for "Download Center" then "Award Data Archive"
    #
    #     #Grey Header
    #     Then we see id main-focus has a value of Download Center
    #
    #     When find and select Executive Office of the President from Agency dropdown
    #
    #     When classname form__button is clicked
    #     And I wait 1 seconds
    #     Then object 1 of classname row-odd has a value of Executive Office of the President (EOP)
    #     When classname form__button is clicked
    #
    #     When I wait 1 seconds
    #     Then object 2 of classname row-odd has a value of 2019_1100_Contracts_Full_20190708.zip
    #     When object 2 of classname row-odd is clicked
    #     When we wait for file to download
    #     Then we check that the contracts file has correct headers
