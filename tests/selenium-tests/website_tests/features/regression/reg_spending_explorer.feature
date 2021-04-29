# Spending Explorer
# Start from Budget Function view, select Health, toggle to table view, select Health research and training, toggle to tree map view, select Patient-Centered
# We want to ensure the percent of total equals obligated amount divided by the FY obligated amount Outcomes Research Trust Fund,
# select Federal Account name at top of page to navigate to Federal Account profile,
# select FY 2017 as Time Period filter and verify charts update,
# select quarter view of Spending Over Time chart.
# We want to perform a search and ensure the graph displays the years in correct order

@usaspending
@Spending_Explorer
Feature:[USASPENDING] Regression Testing (Spending Explorer)

    @Explorer_Buttons
    Scenario: Test interpage navigation
        Given On the homepage
        When I navigate to Spending Explorer
        #TODO intential execption
        Then I see Spending Explorer options
        When I navigate to "Budget Function"
        Then I see Spending Explorer for "Budget Fuction" showing current Fiscal Year and quarter
        When I select previous fy
        Then I see the previous fy is displayed
        When I change to "Agency" report
        Then I see the previous fy is displayed
        When I change to "Object Class" report
        Then I see the previous fy is displayed
        When I start over
        #TODO intential execption
        Then I see Spending Explorer options

    @Quarter_Buttons
    Scenario: Test quarter buttons
        Given On the homepage
        When I navigate to Spending Explorer
        When I navigate to "Budget Function"
        When I select previous fy
        Then I see the previous fy is displayed
        When I select quarter "Q3"
        Then I see "3" quarters selected
        When I select quarter "Q2"
        Then I see "2" quarters selected


    # The different views have same obligated amounts, worth checking all?
    @Percentage
    Scenario: Check table values
        Given On the homepage
        When I navigate to Spending Explorer
        When I navigate to "Budget Function"
        And I select fiscal year "2018"
        And I select quarter "Q3"
        Then I see an obligated amount of "4.9 Trillion"
        And I see Data of date of end of quarter "Q3"
        When I select "table" view
        Then I check the values of "Medicare" record


    @Agency
    @Pagination
    Scenario: Check pagination in the agency table list
        Given On the homepage
        When I navigate to Spending Explorer
        When I navigate to "Agency"
        And I select fiscal year "2018"
        Then we see that spending explorer title has a value of Spending Explorer
        Then I see an obligated amount of "$6.6 trillion"
        When I select "table" view
        Then we check all the pagination buttons are present
        And we see pagination buttons function as expected


    @Unreported_Data
    Scenario Outline: Check the Unreported data info
        Given On the homepage
        When I navigate to Spending Explorer
        And I navigate to "<type>"
        And I select "table" view
        And I select "Unreported Data*" row
        Then I see Unreported info message

    Examples:
        | type              |
        | Budget Function   |
        | Agency            |
        | Object Class      |


    @Tree_Drill_Down
    Scenario: Drill down multiple layers in the explorer
        Given On the homepage
        When I navigate to Spending Explorer
        When I navigate to "Budget Function"
        And I select fiscal year "2018"
        When I select title containing "Health" in grid
        Then I see detail header contains "Health"
        When I select title containing "Health care services" in grid
        Then I see detail header contains "Health care services"
        When I select title containing "Grants to States for Medicaid" in grid
        Then I see detail header contains "Grants to States for Medicaid"
        When I select title containing "MEDICAID VENDOR PAYMENTS" in grid
        Then I see detail header contains "MEDICAID VENDOR PAYMENTS"
        When I select title containing "Grants and fixed charges" in grid
        Then I see detail header contains "Grants and fixed charges"
        And I see No More Awards message
        When I select go back
        Then I see detail header contains "MEDICAID VENDOR PAYMENTS"
        When I select title containing "Grants and fixed charges" in grid
        When I select previous trail item
        Then I see detail header contains "MEDICAID VENDOR PAYMENTS"
        When I select previous trail item
        Then I see detail header contains "Grants to States for Medicaid"
        When I select previous trail item
        Then I see detail header contains "Health care services"
        When I select previous trail item
        Then I see detail header contains "Health"

    @Tree_Drill_Down
    Scenario: Drill down and check values in sidebar
        Given On the homepage
        When I navigate to Spending Explorer
        When I navigate to "Budget Function"
        And I select fiscal year "2018"
        Then I capture amount of "Health" box
        When I select box containing "Health"
        Then I compare sidebar containing "Health" amount against box amount
        And I capture amount of "Health care services" box
        When I select box containing "Health care services"
        Then I compare sidebar containing "Health care services" amount against box amount
        And I capture amount of "Grants to States for Medicaid" box
        When I select box containing "Grants to States for Medicaid"
        Then I compare sidebar containing "Grants to States for Medicaid" amount against box amount
        And I capture amount of "MEDICAID VENDOR PAYMENTS" box
        When I select box containing "MEDICAID VENDOR PAYMENTS"
        Then I compare sidebar containing "MEDICAID VENDOR PAYMENTS" amount against box amount
        And I capture amount of "Grants and fixed charges" box
        When I select box containing "Grants and fixed charges"
        Then I compare sidebar containing "Grants and fixed charges" amount against box amount
        And I see No More Awards message

    @Object
    @Table_Sorting
    Scenario: Check the table view sorting button are working properly
        Given On the homepage
        When I navigate to Spending Explorer
        When I navigate to "Budget Function"
        When I select "table" view
        When I sort table by "name" "ascending"
        Then I see records sorted by Name "ascending"
        When I sort table by "name" "descending"
        Then I see records sorted by Name "descending"

        When I sort table by "amount" "descending"
        Then I see records sorted by Amount "descending"
        When I sort table by "amount" "ascending"
        Then I see records sorted by Amount "ascending"

        When I sort table by "percent" "descending"
        Then I see records sorted by Percent "descending"
        When I sort table by "percent" "ascending"
        Then I see records sorted by Percent "ascending"


    @Find_Award_Page
    Scenario: Check that an award page redirects properly
        Given On the homepage
        When I navigate to Spending Explorer
        When I navigate to "Budget Function"
        And I select fiscal year "2018"
        When I select title containing "Health" in grid
        Then I see detail header contains "Health"
        When I select title containing "Health care services" in grid
        Then I see detail header contains "Health care services"
        When I select title containing "Grants to States for Medicaid" in grid
        Then I see detail header contains "Grants to States for Medicaid"
        When I select the detail header
        Then I am on Federal Account Profile page with title containing "Grants to States for Medicaid"

