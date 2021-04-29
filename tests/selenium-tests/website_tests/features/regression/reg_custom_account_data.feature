# python start.py --usaspending_url dev.usaspending.gov  --test_harness usaspending

@usaspending
@Download_Center_Custom_Account_Data
Feature:[USASPENDING] Regression Testing (Download Center Custom Account Data)

    @States_Navigation
    Scenario: regression tests for the Custom Account Data tab
        Given On the homepage
        When I go to "Custom Account Data" Download Center page
        Then I see I am on Custom Account Download Center page
        When I select "Transportation", "Air transportation - 402" Budget Function
        And I select "Treasury" Account level
                # account levels
                # Federal
                # Treasury
        And I select the "Account Breakdown by Program Activity And Object Class" file type
                # file types
                # Account Balances
                # Account Breakdown by Program Activity And Object Class
                # Account Breakdown by Award
        And I select Quarter "2" of FY "2018"
        Then the selected options displays correct options selected
