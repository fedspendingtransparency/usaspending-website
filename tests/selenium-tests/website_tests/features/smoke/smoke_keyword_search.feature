@usaspending
Feature:[USASPENDING] Smoke Testing (Keyword Search)

    Scenario: Perform Keyword Search
        Given On the homepage
        When I click the top banner for "Award Search" then "Keyword Search"
        Then check keyword header
        When we type "Towson" into "keyword field"
        And Wait for table to load
        And we see the number of rows
        When we click on keyword download button
        Then Download link is provided to copy and the file is being prepared
        When Wait for download to complete
        When Click on the downloaded zip file
        Then Files are extracted and displays correct files
            |   filename                        |   extension   |
            |   Assistance_PrimeTransactions    |   csv         |
            |   Contracts_PrimeTransactions     |   csv         |
        Then Files contain the correct number of rows
