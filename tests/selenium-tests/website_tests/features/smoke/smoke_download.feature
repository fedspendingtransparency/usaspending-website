@usaspending
Feature:[USASPENDING] Smoke Testing (Download Center)

    @submission
    Scenario: Access the Agency Submission Files
        Given On the homepage
        When I click the top banner for "Download Center" then "Agency Submission Files"
        And switch tab
        Then we see that Raw files header is displayed
        And we see that Raw files header has a value of USAspending.gov Raw Agency Submission Files
        Then we see that financial assistance files is displayed
        And we see that quarterly act files is displayed
        When we close tab
        Then we are on home tab

    @dictionary
    Scenario: Access the Data Dictionary
        Given On the homepage
        When I click the top banner for "Download Center" then "Data Dictionary"
        Then we see that data dictionary table is displayed
        And we see headers in table
        And we see that data dictionary search is displayed
        And we see that data dictionary download is displayed
        When we search on "College"
        Then we see results filtered to contain "College"
        When we download dictionary
        Then we see valid headers

    @database
    Scenario: Access the Download Database
        Given On the homepage
        When I click the top banner for "Download Center" then "Database Download"
        When switch tab
        Then we see that database download link is displayed
        And we see that setup guide link is displayed
        When we click on setup guide link
        Then We confirm the PDF URL
        When we close tab
        Then we are on home tab

    @award
    Scenario: Access the Award Data Archive
        Given On the homepage
        When I click the top banner for "Download Center" then "Award Data Archive"
        When we click on Agency dropdown
        And we click on Department of Education
        And we click on Fiscal year dropdown
        And we click on previous year
        And we click on Apply
        And we wait for Agency column to have a value of Department of Education (ED)
        Then we see that Agency column has a value of Department of Education (ED)
        Then I see two records one for Full and one for Delta
        And we see that Fiscal year column has a value of FY 2020
        And I see the dates under the Date As Of column
        When Follow download link in first download link
        When Wait for download to complete
        When Click on the downloaded zip file
        Then File is extracted and displays the correct file
        When Follow download link in second download link
        When Wait for download to complete
        When Click on the downloaded zip file
        Then File is extracted and displays the correct file

    @custom_account
    Scenario: Access the Custom Account Data
        Given On the homepage
        When I click the top banner for "Download Center" then "Custom Account Data"
        And we click on agency dropdown
        And we click on Federal Trade Commission
        And we click on the Download button
        Then Download link is provided to copy and the file is being prepared
        When Wait for download to complete
        When Click on the downloaded zip file
        Then Files are extracted and displays correct files
            |   filename                        |   extension   |
            |   FA_AccountBalances              |   csv         |


    @custom_award
    Scenario: Access the Custom Award Data
        Given On the homepage
        When I go to "Custom Award Data" Download Center page
        And we click on Contracts checkbox
        And we click on Agency select
        And we click on Department of Treasury
        And we click on last 30 days
        And we click on the Download button
        Then Download link is provided to copy and the file is being prepared
        When Wait for download to complete
        When Click on the downloaded zip file
        Then Files are extracted and displays correct files
            |   filename                            |   extension   |
            |   All_Contracts_PrimeTransactions     |   csv         |
