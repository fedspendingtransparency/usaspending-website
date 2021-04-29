@usaspending
Feature:[USASPENDING] Smoke Testing (Advanced Search):

    @download
    Scenario: Filter by criteria to perform an advanced award search
        Given On the homepage
# these steps use Page Objects
        When I go to "Advanced Search" Award Search page
        Then I get a top header for "Advanced Search"
        When I select FY 2018 filter
        And I filter on Agency FAA
        And I Submit Search

        Then I see visualization title is "Spending by Prime Award"
        When I select "Contracts" table
        Then I see "Table" visualization for "Contracts"
        When I select "Contract IDVs" table
        Then I see "Table" visualization for "Contract IDVs"
        When I select "Grants" table
        Then I see "Table" visualization for "Grants"

        When I switch to view "Sub-Awards"
        Then I see visualization title is "Spending by Sub-Award"

        When I switch to view "Prime Awards"
        Then I see visualization title is "Spending by Prime Award"

# these steps use basic scripting steps.
        When we wait for Download button to have a value of Download
        When we click on Download button
        And we click on Award button
        And we click on Everything button
        Then Download link is provided to copy and the file is being prepared

    @check_results
    Scenario: I want to check that the Advanced Search page visualizations work
        Given On the homepage
# these steps use Page Objects
        When I go to "Advanced Search" Award Search page
        Then I get a top header for "Advanced Search"
        When I select FY 2018 filter
        And I filter on Agency FAA
        And I Submit Search
# these steps use basic scripting steps.
        When we click on Time tab
        Then "Spending Over Time" results are displayed
        #Commenting out Spending by Geography step since this tab displays the mapbox.  Any page with the mapbox will be manually checked.
        #When we click on Map tab
        #Then Geography results are displayed
        When we click on Categories tab
        Then "Spending by: Awarding Agency" dropdown is displayed with a chart
        When we click on Table tab
        And Wait for table to load
        And I click on award
        Then I get a top header for "Contract Summary"
        When Go back
        When we click on Grants search tab
        And Wait for table to load
        And I click on award
        Then I get a top header for "Grant Summary"
        When Go back
        And we click on reset search
        Then Filters are reset


    @keyword
    Scenario: Keyword search
        Given On the homepage
# These steps use Page Objects
        When I go to "Advanced Search" Award Search page
        Then I get a top header for "Advanced Search"
        When I filter on Keyword "Towson"
        And I Submit Search
# these steps use basic scripting steps.
        And we wait for Download button to have a value of Download
        When we click on Download button
        And we click on Transactions button
        And we click on Everything button
        Then Download link is provided to copy and the file is being prepared
