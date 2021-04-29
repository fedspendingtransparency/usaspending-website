# Recipient Profile
# Search, “Deloitte”, 
#select Parent Deloitte LLP from the top, 
#verify that components of page load, 
#select “View child recipients” to see list of children, 
#filter list by Recipient Name to see alphabetical list, 
#close out of Child Recipients box, change time filter to FY 2017, 
#scroll down to Top 5 section, 
#verify all boxes loaded with data in under 15 seconds

Feature:[USASPENDING] Regression Testing (Recipient Profile)

    Scenario: Navigate and view the Recipients Profile page
        Given on the "www.usaspending.gov" page
        When I click the top banner for "Profiles" then "Recipients"
        Then I see the search field with a placeholder labeled "Search by Recipient Name or DUNS"

    Scenario: Search for a Recipient Profile
        Given On the Recipients landing page
        When I type "Deloitte" into "recipients search"
        Then I see the Recipients list

    Scenario: View the Recipients Profile
        Given on the Recipients landing page
        When I click on the Parent Recipient Name link
        Then I see the Recipient Profile page
        And I see the "Deloitte LLP" title is displayed
        And I see in the sidebar "Trailing 12 Months," "Overview," "Transactions," "Top 5"
        And I see the "Parent Recipient" label
        And I see the "View child recipients" button
        And I see the "Transaction Amount" header
        And I see the "Details" section
        And I see the "Transactions Over Time" section
        And I see the "Top 5" section

        When I click "View child recipients"
        Then I see the "Child Recipients" modal display
        And I see the list of child recipients
        And I see the "Recipient Name" header
        And I see the "DUNS" header
        And I see the "State" header
        And I see the "Transaction Amount" header
        And I see the "Percent" header
        And I see the "Sort table by descending awarded amount"
        And I see the "Sort table by descending percent of total"

        When I filter list by Recipient name in ascending order
        Then I see the Recipient names in alphabetical order 

        When I click the "X" to close out of Child Recipients
        Then the Child Recipients box is closed

        When I click on "FY 2019"
        Then I see the "Total Transaction" amount updated
        
        When I click on "Top 5"
        And I click on "FY 2017"
        Then I see the "Top 5 data" updated in under 15 seconds