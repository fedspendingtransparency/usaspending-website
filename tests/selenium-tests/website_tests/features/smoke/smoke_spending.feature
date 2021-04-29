@usaspending
Feature:[USASPENDING] Smoke Testing (Spending Explorer)

    @budget
    Scenario: View Budget Function
        Given On the homepage
        When I navigate to Spending Explorer
        Then I see Spending Explorer options
        When I navigate to "Budget Function"
        # waiting for details - As of 4/22 default selection is Quarter 2/Period 5. Not sure how rules work for that to be correct
        # Then I see Spending Explorer for "Budget Fuction" showing current Fiscal Year and quarter
        # When I select previous fy
        # Then I see the previous fy is displayed
        When I select title containing "Health" in grid
        Then I see "Health" in sidebar
        When I select "table" view
        And I select "Consumer and occupational health and safety" row
        Then I see "Consumer and occupational health and safety" in sidebar
        When I start over
        Then I see Spending Explorer options

    @agencies
    Scenario: View the Agencies
        Given On the homepage
        When I navigate to Spending Explorer
        Then I see Spending Explorer options
        When I navigate to "Agency"
        # waiting for details - As of 4/22 default selection is Quarter 2/Period 5. Not sure how rules work for that to be correct
        # Then I see Spending Explorer for "Agency" showing current Fiscal Year and quarter
        # When I select previous fy
        # Then I see the previous fy is displayed
        When I select title containing "Department of Defense" in grid
        Then I see "Department of Defense" in sidebar
        When I select "table" view
        And I select "Operation and Maintenance, Army" row
        Then I see "Operation and Maintenance, Army" in sidebar
        When I start over
        Then I see Spending Explorer options

    @object
    Scenario: View Object class
        Given On the homepage
        When I navigate to Spending Explorer
        Then I see Spending Explorer options
        When I navigate to "Object Class"
        # waiting for details - As of 4/22 default selection is Quarter 2/Period 5. Not sure how rules work for that to be correct
        # Then I see Spending Explorer for "Agency" showing current Fiscal Year and quarter
        # When I select previous fy
        # Then I see the previous fy is displayed
        When I select title containing "Grants and fixed charges" in grid
        Then I see "Grants and fixed charges" in sidebar
        When I select "table" view
        And I select "Social Security Administration" row
        Then I see "Social Security Administration" in sidebar
        When I start over
        Then I see Spending Explorer options
