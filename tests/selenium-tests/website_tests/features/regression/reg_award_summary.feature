Feature: [USASPENDING] Regression Testing (Award Summary Pages)

    Scenario: Verify Award Details Page
        Given On the homepage
        When I go to "Advanced Search" Award Search page

        # need to update these steps after implementing Advanced Search Page
        And I select FY2019 filter
        And I Submit Search
        And I select first record - Lockheed Martin
        # end
        Then I see Award detail for Lockheed Martin

    Scenario: Awarding Agency Profile link
        Given On the homepage
        When I go to "Advanced Search" Award Search page

        # need to update these steps after implementing Advanced Search Page
        And I select FY2019 filter
        And I Submit Search
        And I select first record - Lockheed Martin
        # end
        When I select Awarding Agency link
        Then I see awarding Agency Profile
        And I see "Department of Defense" page


    Scenario: Recipient Profile link
        Given On the homepage
        When I go to "Advanced Search" Award Search page

        # need to update these steps after implementing Advanced Search Page
        And I select FY2019 filter
        And I Submit Search
        And I select first record - Lockheed Martin
        # end
        When I select Recipient link
        Then I see Recipient Profile
        And I see "Lockheed Martin Corporation" page


    Scenario: Tool tips
        Given On the homepage
        When I go to "Advanced Search" Award Search page

        # need to update these steps after implementing Advanced Search Page
        And I select FY2019 filter
        And I Submit Search
        And I select first record - Lockheed Martin
        # end

        Then I validate tooltips
            | name                      |
            | Related Awards            |
            | Dates                     |
            | Award Amounts             |
            | Description               |
            | Contract Activity         |
            | Federal Accounts          |
            | Award History             |
            | Transaction History       |
            | Sub-Awards                |
            | Federal Account Funding   |


    Scenario: Award History Sorting
        Given On the homepage
        When I go to "Advanced Search" Award Search page

        # need to update these steps after implementing Advanced Search Page
        And I select FY2019 filter
        And I Submit Search
        And I select first record - Lockheed Martin
        # end

        # Transaction History
        # ascending
        When I sort "Transaction History" by "Modification Number" "ascending"
        Then I see "Transaction History" records are sorted by "Modification Number" "ascending"

        When I sort "Transaction History" by "Action Date" "ascending"
        Then I see "Transaction History" records are sorted by "Action Date" "ascending"

        When I sort "Transaction History" by "Amount" "ascending"
        Then I see "Transaction History" records are sorted by "Amount" "ascending"

        When I sort "Transaction History" by "Reason for Modification" "ascending"
        Then I see "Transaction History" records are sorted by "Reason for Modification" "ascending"

        When I sort "Transaction History" by "Description" "ascending"
        Then I see "Transaction History" records are sorted by "Description" "ascending"

        # descendings
        When I sort "Transaction History" by "Modification Number" "descending"
        Then I see "Transaction History" records are sorted by "Modification Number" "descending"

        When I sort "Transaction History" by "Action Date" "descending"
        Then I see "Transaction History" records are sorted by "Action Date" "descending"

        When I sort "Transaction History" by "Amount" "descending"
        Then I see "Transaction History" records are sorted by "Amount" "descending"

        When I sort "Transaction History" by "Reason for Modification" "descending"
        Then I see "Transaction History" records are sorted by "Reason for Modification" "descending"

        When I sort "Transaction History" by "Description" "descending"
        Then I see "Transaction History" records are sorted by "Description" "descending"

        # SubAwards
        # ascending
        When I sort "SubAwards" by "Sub Award ID" "ascending"
        Then I see "SubAwards" records are sorted by "Sub Award ID" "ascending"

        When I sort "SubAwards" by "Recipient Name" "ascending"
        Then I see "SubAwards" records are sorted by "Recipient Name" "ascending"

        When I sort "SubAwards" by "Action Date" "ascending"
        Then I see "SubAwards" records are sorted by "Action Date" "ascending"

        When I sort "SubAwards" by "Amount" "ascending"
        Then I see "SubAwards" records are sorted by "Amount" "ascending"

        When I sort "SubAwards" by "Description" "ascending"
        Then I see "SubAwards" records are sorted by "Description" "ascending"

        # descending
        When I sort "SubAwards" by "Sub Award ID" "descending"
        Then I see "SubAwards" records are sorted by "Sub Award ID" "descending"

        When I sort "SubAwards" by "Recipient Name" "descending"
        Then I see "SubAwards" records are sorted by "Recipient Name" "descending"

        When I sort "SubAwards" by "Action Date" "descending"
        Then I see "SubAwards" records are sorted by "Action Date" "descending"

        When I sort "SubAwards" by "Amount" "descending"
        Then I see "SubAwards" records are sorted by "Amount" "descending"

        # ISSUE HERE due to period (.)
        # When I sort "SubAwards" by "Description" "descending"
        # Then I see "SubAwards" records are sorted by "Description" "descending"

        # Federal Account Funding
        # ascending
        When I sort "Federal Account Funding" by "Submission Date" "ascending"
        Then I see "Federal Account Funding" records are sorted by "Submission Date" "ascending"

        When I sort "Federal Account Funding" by "Federal Account" "ascending"
        Then I see "Federal Account Funding" records are sorted by "Federal Account" "ascending"

        When I sort "Federal Account Funding" by "Funding Agency" "ascending"
        Then I see "Federal Account Funding" records are sorted by "Funding Agency" "ascending"

        When I sort "Federal Account Funding" by "Awarding Agency" "ascending"
        Then I see "Federal Account Funding" records are sorted by "Awarding Agency" "ascending"

        When I sort "Federal Account Funding" by "Program Activity" "ascending"
        Then I see "Federal Account Funding" records are sorted by "Program Activity" "ascending"

        When I sort "Federal Account Funding" by "Object Class" "ascending"
        Then I see "Federal Account Funding" records are sorted by "Object Class" "ascending"

        When I sort "Federal Account Funding" by "Funding Obligated" "ascending"
        Then I see "Federal Account Funding" records are sorted by "Funding Obligated" "ascending"

        #descending
        When I sort "Federal Account Funding" by "Submission Date" "descending"
        Then I see "Federal Account Funding" records are sorted by "Submission Date" "descending"

        When I sort "Federal Account Funding" by "Federal Account" "descending"
        Then I see "Federal Account Funding" records are sorted by "Federal Account" "descending"

        When I sort "Federal Account Funding" by "Funding Agency" "descending"
        Then I see "Federal Account Funding" records are sorted by "Funding Agency" "descending"

        When I sort "Federal Account Funding" by "Awarding Agency" "descending"
        Then I see "Federal Account Funding" records are sorted by "Awarding Agency" "descending"

        When I sort "Federal Account Funding" by "Program Activity" "descending"
        Then I see "Federal Account Funding" records are sorted by "Program Activity" "descending"

        When I sort "Federal Account Funding" by "Object Class" "descending"
        Then I see "Federal Account Funding" records are sorted by "Object Class" "descending"

        When I sort "Federal Account Funding" by "Funding Obligated" "descending"
        Then I see "Federal Account Funding" records are sorted by "Funding Obligated" "descending"


    # Scenario: Candidate steps
    #     Given Additional Information
    #     When I expand "[Section]"
    #     Then I see "[Section]" details.
