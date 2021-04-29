@usaspending
Feature:[USASPENDING] Smoke Testing (Profiles)

    #Agency Profile
    @agency
    Scenario: Search for Agency Profile
        Given On the homepage
        When I click the top banner for "Profiles" then "Agencies"
        Then I get a top header for "Agency Profiles"
        When Enter "tre" into the search field
        And we wait for table load message to vanish
        And we click on top agency name
        Then I get a top header for "Agency Profile"
        And we see that Treasury agency profile is displayed
        And we see that Overview is displayed
        And we see that Obligated Amount is displayed
        And we see that Object Classes is displayed
        And we see that Federal Accounts is displayed

    @agency
    Scenario: Navigate and view sections of Agency Profile
        When we click on Overview
        Then we see that Agency Mission section is displayed
        When we click on Obligated Amount
        Then we see that Obligated Amount section is displayed
        When we click on Object Classes
        Then we see that Object Classes section is displayed
        When we click on Federal Accounts
        Then we see that Federal Accounts section is displayed

    @fed
    #Federal Accounts Profile
    Scenario: Search and view the Federal Accounts Profile
        Given On the homepage
        When I click the top banner for "Profiles" then "Federal Accounts"
        And we type "045" into "profile search field"
        And we wait for table load message to vanish
        And we click on top fed result
        Then I get a top header for "Federal Account Profile"
        When go back
        Then I get a top header for "Federal Account Profiles"
        When we type "Federal" into "profile search field"
        And we wait for table load message to vanish
        And we click on top fed result
        Then I get a top header for "Federal Account Profile"
        Then we see that Account Description is displayed
        And we see that Fiscal Year Summary is displayed
        And we see that FY Snapshot is displayed
        And we see that Filter by: is displayed
        And we see that Spending Over Time is displayed
        And we see that Spending by Category is displayed
        And we see that Spending by Award is displayed
        When go back
        And we type "Transportation" into "profile search field"
        And we wait for table load message to vanish
        And we click on top fed result
        Then I get a top header for "Federal Account Profile"
        Then we see that Account Description is displayed
        And we see that Fiscal Year Summary is displayed
        And we see that FY Snapshot is displayed
        And we see that Filter by: is displayed
        And we see that Spending Over Time is displayed
        And we see that Spending by Category is displayed
        And we see that Spending by Award is displayed

    # @states
    # #States Profile
    # Scenario: Search and view the States Profile
    #     Given On the homepage
    #     When I click the top banner for "Profiles" then "States"
    #     Then I get a top header for "State Profiles"
    #     When we wait for table load message to vanish
    #     When Enter "T" into state search
    #     When we click on texas
    #     Then I get a top header for "State Profile"
    #     Then we see that state header is displayed
    #     Then we see that state header has a value of Texas
    #     # Then I see the Texas profile page

    @recipients
    #Recipients Profile
    Scenario: Navigate and view the Recipients Profile
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"
        Then we see that recipients search is displayed
        Then we see that Parent Recipient button is displayed
        # When we hover over Parent Recipient button
        # Then we see that Parent Recipient tooltip is displayed
        Then we see that Child Recipient button is displayed
        # When we hover over Child Recipient button
        # Then we see that Child Recipient tooltip is displayed
        Then we see that Recipient button is displayed
        # When we hover over Recipient button
        # Then we see that Recipient tooltip is displayed
        Then we see that All Awards tab is displayed
        Then we see that Contracts tab is displayed
        Then we see that Grants tab is displayed
        Then we see that Direct Payments tab is displayed
        Then we see that Loans tab is displayed
        Then we see that Other tab is displayed
        # Then I see the headers in the table with the labels "Recipient Name," "DUNS," "Awarded Amount"
        # Then I see Awarded Amount is sorted by default
        # Then I see the list of recipients with the Recipient Names linked

    # @recipients
    Scenario: View the list of Recipients for each tab
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"
        When we click on Contracts tab
        And we wait for table load message to vanish
        Then I see the Recipients list
        When we click on Grants tab
        And we wait for table load message to vanish
        Then I see the Recipients list
        When we click on Direct Payments tab
        And we wait for table load message to vanish
        Then I see the Recipients list
        When we click on Loans tab
        And we wait for table load message to vanish
        Then I see the Recipients list
        When we click on Other tab
        And we wait for table load message to vanish
        Then I see the Recipients list
        When we click on All Awards tab
        And we wait for table load message to vanish
        Then I see the Recipients list

    # @recipients
    Scenario: View the Recipients Profile
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"
        And we wait for table load message to vanish
        When we click on recipient link
        Then I get a top header for "Recipient Profile"
        And we see that time dropdown is displayed
        And we see that Overview is displayed
        And we see that Transactions is displayed
        And we see that Top 5 is displayed
        When we click on time dropdown
        Then I see dropdown contents
        When I see the Total Transaction amount
        When we click on latest fiscal year
        Then I see the Total Transaction amount updated
        When we click on Transactions
        Then we see that Transactions Over Time is displayed
        When we click on Top 5
        Then we see that Top 5 section is displayed
        And we see that Awarding Agencies top 5 is displayed
        And we see that Awarding Sub-Agencies top 5 is displayed
        And we see that Federal Accounts top 5 is displayed
        And we see that CFDA Programs top 5 is displayed
        And we see that NAICS Codes top 5 is displayed
        And we see that Product Services Codes top 5 is displayed
        And we see that Countries top 5 is displayed
        And we see that U.S. States or Territories top 5 is displayed
        When go back

    # @recipients
    Scenario: View the Child Recipient from the Recipients Profile page
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"
        And we wait for table load message to vanish
        When we click on recipient link
        When we click on View child recipients
        Then we see that Child recipients is displayed
        And we see that list of child recipients is displayed
        And we see that Recipient Name is displayed
        And we see that DUNS is displayed
        And we see that State is displayed
        And we see that Transaction Amount is displayed
        And we see that Percent is displayed
        And we see that Sort table by descending awarded amount is displayed
        And we see that Sort table by descending percent of total is displayed
