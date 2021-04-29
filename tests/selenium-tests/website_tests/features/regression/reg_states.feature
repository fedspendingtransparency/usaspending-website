@usaspending
@Profiles_States
Feature:[USASPENDING] Regression Testing (Profiles States)

    @States_Navigation
    Scenario: Navigate to States located under the Profiles Tab
        Given On the homepage
        When I click the top banner for "Profiles" then "States"
        Then I get a top header for "State Profiles"
        Then we see classname landing-page__title has a value of Find a State Profile.
        Then classname landing-page__title is displayed
        Then classname state-landing__results is displayed
        Then we see that State Name Header has a value of State or Territory Name
        Then we see that State Amount Header has a value of Awarded Amountfrom trailing 12 months
        Then we see that State Percent Header has a value of Percent of Totalbased on all state profiles

    @States_Search_Bar
    Scenario: Test the search bar on states landing page
        Given On the homepage
        When I click the top banner for "Profiles" then "States"
        Then I get a top header for "State Profiles"
        When I type AL into classname search-section__input
        Then we see that State Table Value 1 has a value of Alabama (AL)
        Then we see that State Table Value 2 has a value of Alaska (AK)
        When the text box classname search-section__input is cleared
        When I type Does not exist into classname search-section__input
        Then we see classname state-list__message_highlight has a value of Does not exist

    @States_Sorting
    Scenario: Check sorting on the states page
        Given On the homepage
        When I click the top banner for "Profiles" then "States"
        Then I get a top header for "State Profiles"
        When we click on State Awarded Sort Ascending
        # Then we see that State Table Value 1 has a value of American Samoa (AS)
        Then we see that State Table Value 1 has a value of Northern Mariana Islands (MP)
        When we click on State Name Sort Ascending
        Then we see that State Table Value 1 has a value of Alabama (AL)
        When we click on State Percent Sort Ascending
        # Then we see that State Table Value 1 has a value of American Samoa (AS)
        Then we see that State Table Value 1 has a value of Northern Mariana Islands (MP)
        When we click on State Awarded Sort Descending
        Then we see that State Table Value 1 has a value of California (CA)
        When we click on State Name Sort Descending
        Then we see that State Table Value 1 has a value of U.S. Virgin Islands (VI)
        When we click on State Percent Sort Descending
        Then we see that State Table Value 1 has a value of California (CA)

    @States_Check_Link_Titles
    Scenario Outline: Check the name of the link matches the title of the award page
        Given On the homepage
        When I click the top banner for "Profiles" then "States"
        Then I get a top header for "State Profiles"
        When I wait 1 seconds
        When state <State_Title> is clicked
        Then we see classname state-overview__title has a value of <State>

    Examples:
        | State_Title     | State      |
        | Alabama (AL)    | Alabama    |
        | California (CA) | California |
        | Florida (FL)    | Florida    |
        | Michigan (MI)   | Michigan   |

    @States_Side_Bar
    Scenario Outline: Test the side bar on the indiviudal state profile landing pages
        Given On the homepage
        When I click the top banner for "Profiles" then "States"
        Then I get a top header for "State Profiles"
        When I wait 1 seconds
        When state <State> is clicked
        Then classname fy-picker__button is displayed
        Then classname sidebar-link is displayed
        Then classname active is displayed
        Then we see classname active has a value of Overview
        When classname fy-picker__button is clicked
        And the sidebar dropdown filter 2018 is selected
        Then we see classname fy-picker__button-text has a value of FY 2018
        When classname fy-picker__button is clicked
        And the sidebar dropdown filter 2019 is selected
        Then we see classname fy-picker__button-text has a value of FY 2019
        When classname fy-picker__button is clicked
        And the sidebar dropdown filter all is selected
        Then we see classname fy-picker__button-text has a value of All Fiscal Years
        When we click on State Transactions
        And I wait 1 seconds
        Then we see classname active has a value of Transactions Over Time
        When we click on State Top 5
        And I wait 1 seconds
        Then we see classname active has a value of Top 5
        When we click on State Overview
        And I wait 1 seconds
        Then we see classname active has a value of Overview

    Examples:
        | State         |
        | Arizona (AZ)  |
        | Kentucky (KY) |
        | Michigan (MI) |

    @States_Overview
    Scenario Outline: Test for presence of items in the overview section of the state profile page
        Given On the homepage
        When I click the top banner for "Profiles" then "States"
        Then I get a top header for "State Profiles"
        When I wait 1 seconds
        When state <State> is clicked

        Then check overview title names

        Then classname totals is displayed
        Then classname totals__amount is displayed
        Then classname totals__awards is displayed
        Then classname totals is displayed

        Then classname details is displayed
        Then classname details__table is displayed

        Then classname award-breakdown is displayed
        Then classname tree-wrapper is displayed
        Then classname award-breakdown-table is displayed

        Then classname geo is displayed
        Then classname mapboxgl-map is displayed
        Then classname map-layer-toggle is displayed

        Then check table headers and column names in breakdown section
        Then check the award breakdown tree map for presence of boxes and hover boxes
        When hover over classname tile
        Then classname visualization-tooltip is displayed

        Then check names in details table

    Examples:
        | State        |
        | Alabama (AL) |


    @States_Top5
    Scenario Outline: Test the top 5 section for presence of table over all of the available tabs
        Given On the homepage
        When I click the top banner for "Profiles" then "States"
        Then I get a top header for "State Profiles"
        When I wait 1 seconds
        When state <State> is clicked
        Then classname topfive is displayed
        Then check table names in top5
        Then check all tables are present and have the correct amount of rows and properly labeled headers for each tab

    Examples:
        | State        |
        | Colorado (CO) |


    @States_Transactions
    Scenario Outline:
        Given On the homepage
        When I click the top banner for "Profiles" then "States"
        Then I get a top header for "State Profiles"
        When I wait 1 seconds
        When state <State> is clicked
        Then classname transactions-over-time is displayed
        Then classname bar-graph is displayed
        Then classname bar-graph-body is displayed
        Then classname bar-axis is displayed
        Then classname bar-data is displayed
        Then classname legend-container is displayed
        Then we see classname key-label has a value of Amount Obligated
        Then check bars for presence and formatting
        When hover over classname bar-item
        Then classname hover is displayed

    Examples:
        | State        |
        | Alabama (AL) |
