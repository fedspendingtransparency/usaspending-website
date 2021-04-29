# Custom Account Data
# Select “Health” as the Budget Function,
# select “Account Breakdown by Program Activity & Object Class,
# select FY 2018 Q1 as the time period,
# select “Download”.
# Verify that spreadsheet is populated (not sure what level of detail we want in verifying that the data is actually populated correctly)

Feature:[USASPENDING] Regression Testing (Download Center)

    # # Custom Account Data
    # Scenario: Verify Custom Account Data can be downloaded and is populated with data
    #     Given on the "www.usaspending.gov" page
    #     When I click the top banner for "Download Center" then "Custom Account Data"
    #     And I select "Health" from the "Budget Function" dropdown
    #     And I select "Account Breakdown by Program Activity & Object Class"
    #     And I select "FY 2018"
    #     And I click on "Q1"
    #     And I click on the "Download" button
    #     Then I see "Download Data" window
    #     And I see the downloaded zip file

    #     When I click on the downloaded zip file
    #     And I open the spreadsheet
    #     Then I see data is populated in the spreadsheet

    # # Custom Award Data
    # Scenario: Verify Custom Award Data can be downloaded and is populated with data
    #     Given on "www.usaspending.gov" page
    #     When I click the top banner for "Download Center" then "Custom Award Data"
    #     And I click on "Prime Awards" checkbox
    #     And I click on "Contracts" checkbox
    #     And I select "Small Business Administration" from the Agency dropdown
    #     And I click on "FY 2017"
    #     And I click on the "Download" button
    #     Then I see "Download Data" window
    #     And I see the download zip file

    #AgencySubmissionFiles
    Scenario: Validate Agency Submission Files have correct dates
        Given On the homepage
        When I click the top banner for "Download Center" then "Agency Submission Files"
        And switch tab
        And I navigate to the Raw Quarterly DATA Act to find most recent files for agency
        When we close tab
        Then we are on home tab
