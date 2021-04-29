# Advanced Search
# Search for an award ID in advanced search, download transaction data – compare these numbers to what is shown in the Advanced search visualizations and on the award summary page to verify that the values are the same across the site.
# Search by Agency + FY in advanced search, download transaction data – compare these numbers to what is shown in the Advanced search visualizations and on the award summary page to verify that the values are the same across the site.
# Prime and Sub-awards
# Perform a search to ensure the sub-awards count in the results match the download as well as the award summary page

Feature: [USASPENDING] Regression Testing (Advanced Search)
    @id_search
    Scenario: Search for award ID and download transaction data
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Award ID" filter dropdown
        And we type "DEAC5207NA27344" into "Award ID input"
        And I hit Submit Search
        And Wait for table to load
        And we see the number of rows
        And we click on sub awards button
        Then we see the sub awards rows
        When we click on sub awards button
        When we click on Download button
        And we click on Award button
        And we click on Everything button
        Then Download link is provided to copy and the file is being prepared
        When Wait for download to complete
        When Click on the downloaded zip file
        Then Files are extracted and displays correct files
            |   filename                        |   extension   |
            |   Assistance_PrimeAwardSummaries  |   csv         |
            |   Assistance_Subawards            |   csv         |
            |   Contracts_PrimeAwardSummaries   |   csv         |
            |   Contracts_Subawards             |   csv         |
        And Files contain the correct number of rows and sub rows

        When I click on award
        Then I get a top header for "Contract Summary"

        When Go back
        And we click on reset search
        Then Filters are reset

    @prime_awards_default
    Scenario: Prime Award Advanced Search
        Given On the homepage
        When I go to "Advanced Search" Award Search page
        When I select FY 2018 filter
        And I Submit Search

        When I select "Contracts" table
        Then I see "Table" visualization for "Contracts"
        And I see visualization title is "Spending by Prime Award"
        And I validate "Contracts" table column names
        And I see "Contracts" table is sorted in "descending" order by "Award Amount"

        When I select "Contract IDVs" table
        Then I see "Table" visualization for "Contract IDVs"
        And I see visualization title is "Spending by Prime Award"
        And I validate "Contract IDVs" table column names
        And I see "Contracts" table is sorted in "descending" order by "Award Amount"

        When I select "Grants" table
        Then I see "Table" visualization for "Grants"
        And I see visualization title is "Spending by Prime Award"
        And I validate "Grants" table column names
        And I see "Contracts" table is sorted in "descending" order by "Award Amount"

        When I select "Direct Payments" table
        Then I see "Table" visualization for "Direct Payments"
        And I see visualization title is "Spending by Prime Award"
        And I validate "Direct Payments" table column names
        And I see "Contracts" table is sorted in "descending" order by "Award Amount"

        When I select "Other" table
        Then I see "Table" visualization for "Other"
        And I see visualization title is "Spending by Prime Award"
        And I validate "Other" table column names
        And I see "Contracts" table is sorted in "descending" order by "Award Amount"


    @TAS_Account_filter
    Scenario: Advanced Search TAS Treasury Account filter
        Given On the homepage
        When I go to "Advanced Search" Award Search page
        And I filter on Treasury Accounts "012-X-5268-000"
        And I Submit Search
        Then I see Awarding Agency is "Department of Agriculture" in results


    @TAS_Component_filter
    Scenario: Advanced Search TAS Treasury Components filter
        Given On the homepage
        When I go to "Advanced Search" Award Search page
        And I filter on Treasury Components "012-X-5268-000"
        And I Submit Search
        Then I see Awarding Agency is "Department of Agriculture" in results


    @NAICS_filter
    Scenario: Scenario: Advanced Search NAICS North American Industry Classification System Filter
        Given On the homepage
        When I go to "Advanced Search" Award Search page
        And I filter on NAICS by "111150"
        And I Submit Search
        Then I see results contain records



    @blank_search
    Scenario: I want to perform a search that returns no results
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        Then I get a top header for "Advanced Search"
        When I select date range of Today to Today
        And I click the "Agency" filter dropdown
        And we type "animal and plant" into "Awarding Agency"
        And I hit Submit Search
        And Wait for table to load
        And we wait for Active row badge to appear
        Then we see that Award button label has a value of Prime Awards
        And we see that Visualization title has a value of Spending by Prime Award
        Then we see that Table error message has a value of No results found.

    @sub_award
    Scenario: I want to view Sub Award table in advanced search
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        Then I get a top header for "Advanced Search"
        When I select the FY checkbox for "2018"
        And I click the "Recipient" filter dropdown
        And we type "Carnegie Mellon" into "Recipient input"
        And I hit Submit Search
        And Wait for table to load
        When we click on sub awards button
        And Wait for table to load
        Then we see that Award button label has a value of Sub-Awards
        And we see that Visualization title has a value of Spending by Sub-Award
        Then we see the table headers for Sub-Contracts
        And we see that the awards table is reverse sorted by column 4
        When we click on Sub-Grants tab
        And Wait for table to load
        Then we see the table headers for Sub-Grants
        And we see that the awards table is reverse sorted by column 4

    @sub_contract_sort
    Scenario: I want to search the table by Sub-Contract columns
        When we click on Sub-Contracts tab
        And Wait for table to load
        When we click on the sort in column 1
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 1
        When we click on the sort in column 2
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 2
        When we click on the sort in column 3
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 3
        When we click on the sort in column 4
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 4
        When we click on the sort in column 5
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 5
        When we click on the sort in column 6
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 6
        When we scroll table to the left
        When we click on the sort in column 7
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 7
        When we click on the sort in column 8

    @sub_grant_sort
    Scenario: I want to search the table by Sub-Grants columns
        When we click on Sub-Grants tab
        And Wait for table to load
        When we click on the sort in column 1
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 1
        When we click on the sort in column 2
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 2
        When we click on the sort in column 3
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 3
        When we click on the sort in column 4
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 4
        When we click on the sort in column 5
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 5
        When we click on the sort in column 6
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 6
        When we scroll table to the left
        When we click on the sort in column 7
        And Wait for table to load
        Then we see that the awards table is reverse sorted by column 7
        When we click on the sort in column 8

    @time_search
    Scenario: Check that the spending over time graph is populating correctly and all associated buttons are working
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        Then I get a top header for "Advanced Search"
        When I select the FY checkbox for "2018"
        And we click on Recipient filter
        And we type "Virginia Polytechnic" into "Recipient input"
        And I hit Submit Search
        And Wait for table to load
        When I click on Time tab
        Then we see that Years Option is displayed
        Then we see that Bar Graph is displayed
        Then we see that Time Heading is displayed
        Then we see that Time Circle is displayed
        Then we see that Time Legend is displayed
        Then we see that Graph Y Axis is displayed
        Then we see that Graph X Axis is displayed
        When we hover over Result Bar
        Then we see that Hover Box is displayed
        When we click on Quarters Option
        Then we see that Quarters Result is displayed
        When we click on Months Option
        Then we see that Months Result is displayed
        When we click on Awards Switch
        Then we see that Bar Graph is displayed
        Then we see that Time Heading is displayed
        Then we see that Time Circle is displayed
        Then we see that Time Legend is displayed
        Then we see that Graph Y Axis is displayed
        Then we see that Graph X Axis is displayed
        When we hover over Result Bar
        Then we see that Hover Box is displayed
        When we click on Quarters Option
        Then we see that Quarters Result is displayed
        When we click on Months Option
        Then we see that Months Result is displayed

    @url_hash
    Scenario: Validate that loading a saved search via url hash loads the Advanced Search screen with the corresponding filters pre-populated
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        Then I get a top header for "Advanced Search"
        When I select the FY checkbox for "2018"
        And we click on Recipient filter
        And we type "Virginia Polytechnic" into "Recipient input"
        And I hit Submit Search
        And Wait for table to load
        Then copy url and go to new tab
        When I wait 2 seconds
        Then object 1 of classname filter-item-title has a value of FY 2018
        Then object 2 of classname filter-item-title has a value of RECIPIENT | Virginia Polytechnic
        Then close tab number 2
