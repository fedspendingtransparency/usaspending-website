@usaspending
@Profiles_Recipients
Feature:[USASPENDING] Regression Testing (Profiles Recipients)

    @Recipients_Landing_Items
    @Recipients_Landing_Page
    Scenario: Check for main title descriptions and legends on the recipient landing page
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"

        #Grey Header
        Then we see id main-focus has a value of Recipient Profiles

        #Top Title and description
        Then we see classname landing-page__title has a value of Find a Recipient Profile.
        Then we see classname landing-page__description has a value of Recipients are any entity that has received federal money in the form of contracts, grants, loans, or other financial assistance.  Our Recipient Profiles offer insights into a specific recipient, including award trends over time and top 5 rankings from a variety of categories.

        #Legend Icons and Modals
        Then object 1 of classname recipient-labels__text has a value of Parent Recipient
        Then we see classname recipient-landing__icon_parent has a value of P
        Then we see id recipient-labels__icon-parent has a value of PParent RecipientInformation
        Then find and verify pointer 1 on recipients page has a value of One or more recipients listed this entity as their parent organization.

        Then object 2 of classname recipient-labels__text has a value of Child Recipient
        Then we see classname recipient-landing__icon_child has a value of C
        Then we see id recipient-labels__icon-child has a value of CChild RecipientInformation
        Then find and verify pointer 2 on recipients page has a value of This recipient has a parent organization listed.

        Then object 3 of classname recipient-labels__text has a value of Recipient
        Then we see classname recipient-landing__icon_recipient has a value of R
        Then we see id recipient-labels__icon-recipient has a value of RRecipientInformation
        Then find and verify pointer 3 on recipients page has a value of This recipient does not have a parent organization listed.

        #Note at bottom
        Then we see classname landing-page__disclaimer has a value of Note: Profiles are not included for the following recipient names because they would represent aggregations of many individuals instead of specific legal entities:  Multiple Recipients, Multiple Foreign Recipients, Miscellaneous Foreign Awardees, Private Individual, Individual Recipient, and Redacted Due to PII.

    @Recipients_Search
    @Recipients_Landing_Page
    Scenario: Check for the search bar and also check for its functionality
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"
        Then we see id main-focus has a value of Recipient Profiles

        #Check for bar and buttons
        Then classname search-section__form is displayed
        Then classname search-section__input is displayed
        Then classname search-section__button is displayed
        Then we see classname usa-da-icon-search has a value of Search Recipients or DUNS

        Then classname recipient-landing__results is displayed

        #Check search functionality and results
        When I type Texas A&M AGRILIFE RESEARCH into classname search-section__input
        And classname search-section__button is clicked
        And I wait 1 seconds
        Then object 1 of classname recipient-list__body-cell has a value of CTEXAS A&M AGRILIFE RESEARCH
        Then object 2 of classname recipient-list__body-cell has a value of 847205713
        # Then object 3 of classname recipient-list__body-cell has a value of $130,332,178

        When the text box classname search-section__input is cleared
        And I type does not exist into classname search-section__input
        And classname search-section__button is clicked
        And I wait 1 seconds
        Then we see classname recipient-list__message_highlight has a value of does not exist


    @Recipients_Table_Check
    @Recipients_Landing_Page
    Scenario Outline: Check the table for titles sorting and pagination for each of the 6 tabs
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"
        Then we see id main-focus has a value of Recipient Profiles

        #Check for presence of tabs and click and run remaining checks for all 6 of them
        Then classname recipient-landing__tabs is displayed
        Then object <Num> of classname table-type-toggle has a value of <Tab>
        When object <Num> of classname table-type-toggle is clicked
        Then we see classname active has a value of <Tab>

        #Check table titles for presence
        Then classname recipient-landing__results is displayed
        Then object 1 of classname header-cell__title has a value of Recipient Name
        Then object 2 of classname header-cell__title has a value of Duns
        Then object 3 of classname header-cell__title has a value of Awarded Amount(from trailing 12 months of transactions)

        #Check results for presence
        #First page unfiltered will always have a full table of 50 results
        #Checking here for 50 rows present and 150 cells presents
        Then classname recipient-list__body-row has 50 objects present
        Then classname recipient-list__body-cell has 150 objects present

        #Check sorting buttons for presence
        Then classname header-sorter__button has 6 objects present
        Then classname usa-da-icon-arrow-up has 3 objects present
        Then classname usa-da-icon-arrow-down has 3 objects present

        #Check sorting button for functionality
        When object 1 of classname header-sorter__button is clicked
        Then object 1 of classname header-sorter__button has a value of Sort table by ascending recipient
        When I wait 1 seconds
        When object 2 of classname header-sorter__button is clicked
        Then object 2 of classname header-sorter__button has a value of Sort table by descending recipient
        When I wait 1 seconds
        When object 3 of classname header-sorter__button is clicked
        Then object 3 of classname header-sorter__button has a value of Sort table by ascending duns
        When I wait 1 seconds
        When object 4 of classname header-sorter__button is clicked
        Then object 4 of classname header-sorter__button has a value of Sort table by descending duns
        When I wait 1 seconds
        When object 5 of classname header-sorter__button is clicked
        Then object 5 of classname header-sorter__button has a value of Sort table by ascending awarded amount
        When I wait 1 seconds
        When object 6 of classname header-sorter__button is clicked
        Then object 6 of classname header-sorter__button has a value of Sort table by descending awarded amount

        #Recheck results for presence
        Then classname recipient-list__body-row has 50 objects present
        Then classname recipient-list__body-cell has 150 objects present

        #Check pagination buttons and title for presence
        Then classname pager__button has 18 objects present
        Then classname pager__ellipsis has 3 objects present
        Then classname pagination__totals has 3 objects present

        #Check pagination buttons for functionality
        #18 pager buttons present as 6 mobile pagination buttons are set to hidden
        #Then 6 buttons at the top and 6 buttons at the bottom in desktop view
        Then we see classname pager__button_active has a value of 1
        Then object 2 of classname pager__button_disabled has a value of <
        Then object 3 of classname pager__button_disabled has a value of <
        When object 9 of classname pager__button is clicked
        Then object 2 of classname pager__button_active has a value of 2
        Then object 3 of classname pager__button_active has a value of 2
        When object 10 of classname pager__button is clicked
        Then object 2 of classname pager__button_active has a value of 3
        Then object 3 of classname pager__button_active has a value of 3
        Then classname pager__button has 21 objects present
        When object 8 of classname pager__button is clicked
        Then object 2 of classname pager__button_active has a value of 2
        Then object 3 of classname pager__button_active has a value of 2
        Then classname pager__button has 18 objects present
        When object 12 of classname pager__button is clicked
        Then object 2 of classname pager__button_active has a value of 3
        Then object 3 of classname pager__button_active has a value of 3
        When object 13 of classname pager__button is clicked
        Then object 2 of classname pager__button_disabled has a value of >
        Then object 3 of classname pager__button_disabled has a value of >
        When object 8 of classname pager__button is clicked
        Then object 2 of classname pager__button_active has a value of 1
        Then object 3 of classname pager__button_active has a value of 1

        #Recheck results for presence
        When I wait 1 seconds
        Then classname recipient-list__body-row has 50 objects present
        Then classname recipient-list__body-cell has 150 objects present

        Examples:
            | Tab                        | Num |
            | All Awards                 | 1   |
            | Contracts                  | 2   |
            | Grants                     | 3   |
            | Direct Payments            | 4   |
            | Loans                      | 5   |
            | Other Financial Assistance | 6   |


    @Recipients_Link_Check
    @Recipients_Landing_Page
    Scenario: Check the table results redirect to the correct page
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"
        Then we see id main-focus has a value of Recipient Profiles

        #Check results for presence
        Then classname recipient-landing__results is displayed
        Then classname recipient-list__body-row has 50 objects present
        Then classname recipient-list__body-cell has 150 objects present

        #Click on link and check that title matches on the redirect
        Then check when recipient link 1 is clicked the title in the redirected page is correct
        When we click the back button
        Then check when recipient link 2 is clicked the title in the redirected page is correct
        When we click the back button
        Then check when recipient link 3 is clicked the title in the redirected page is correct
        When we click the back button
        Then check when recipient link 4 is clicked the title in the redirected page is correct


    @Recipients_Profile_Items
    @Recipients_Profile_Page
    Scenario: Check the individual recipient profile page for presence of basic features
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"
        Then we see id main-focus has a value of Recipient Profiles
        Then classname recipient-landing__results is displayed
        When recipient link 1 is clicked
        And I wait 1 seconds

        #Grey header
        Then we see id main-focus has a value of Recipient Profile

        #Check for presence of the side bar
        Then classname recipient-sidebar-content is displayed
        Then classname usa-da-icon-calendar is displayed
        Then classname fy-picker__button is displayed
        Then classname fy-picker__button-icon is displayed
        Then we see classname fy-picker__button-text has a value of Trailing 12 Months
        Then object 1 of classname sidebar-link has a value of Overview
        Then object 2 of classname sidebar-link has a value of Transactions Over Time
        Then object 3 of classname sidebar-link has a value of Top 5

        #Check for dropdown list items
        When classname fy-picker__button is clicked
        Then object 1 of classname fy-picker__item has a value of Trailing 12 Months
        Then object 2 of classname fy-picker__item has a value of All Fiscal Years
        # Then object 3 of classname fy-picker__item has a value of —
        # Then we see classname fy-picker__item_disabled has a value of —
        Then object 3 of classname fy-picker__item has a value of FY 2019
        Then object 4 of classname fy-picker__item has a value of FY 2018
        Then object 5 of classname fy-picker__item has a value of FY 2017
        Then object 6 of classname fy-picker__item has a value of FY 2016
        Then object 7 of classname fy-picker__item has a value of FY 2015
        Then object 8 of classname fy-picker__item has a value of FY 2014
        Then object 9 of classname fy-picker__item has a value of FY 2013
        Then object 10 of classname fy-picker__item has a value of FY 2012
        Then object 11 of classname fy-picker__item has a value of FY 2011
        Then object 12 of classname fy-picker__item has a value of FY 2010
        Then object 13 of classname fy-picker__item has a value of FY 2009
        Then object 14 of classname fy-picker__item has a value of FY 2008

        #Check the dropdown functionality when clicked
        When object 2 of classname fy-picker__item is clicked
        Then we see classname fy-picker__button-text has a value of All Fiscal Years
        When classname fy-picker__button is clicked
        When object 4 of classname fy-picker__item is clicked
        Then we see classname fy-picker__button-text has a value of FY 2018

        #Check for functionality of sidebar
        Then we see classname active has a value of Overview
        When object 2 of classname sidebar-link is clicked
        And I wait 1 seconds
        Then we see classname active has a value of Transactions Over Time
        # When I wait 2 seconds
        # When object 1 of classname sidebar-link is clicked
        # And I wait 2 seconds
        # Then we see classname active has a value of Top 5
        # When object 1 of classname sidebar-link is clicked
        # And I wait 1 seconds
        # Then we see classname active has a value of Overview


    @Recipients_Profile_Modal
    @Recipients_Profile_Page
    Scenario: Check the child recipients modal button
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"
        Then we see id main-focus has a value of Recipient Profiles
        Then classname recipient-landing__results is displayed
        When I type California, State of into classname search-section__input
        And classname search-section__button is clicked
        And I wait 1 seconds
        When object 6 of classname header-sorter__button is clicked
        And I wait 1 seconds
        When recipient link 1 is clicked
        And I wait 1 seconds
        Then we see id main-focus has a value of Recipient Profile

        #Click on child recipients modal
        When classname recipient-overview__children-button is clicked
        Then we see classname recipients-modal__title has a value of Child Recipients
        Then classname usa-da-icon-close is displayed

        #Check table titles for presence
        Then classname recipients-list is displayed
        Then object 1 of classname header-cell__title has a value of Recipient Name
        Then object 2 of classname header-cell__title has a value of DUNS
        Then object 3 of classname header-cell__title has a value of State
        Then object 4 of classname header-cell__title has a value of Transaction Amount(Last 12 Months)
        Then object 5 of classname header-cell__title has a value of Percent

        #Check for presence of rows and cells
        Then classname recipients-list__body-row is displayed
        Then classname recipients-list__body-cell is displayed

        #Check sorting buttons for presence
        Then classname header-sorter__button has 10 objects present
        Then classname usa-da-icon-arrow-up has 5 objects present
        Then classname usa-da-icon-arrow-down has 5 objects present

        #Check sorting button for functionality
        When object 1 of classname header-sorter__button is clicked
        Then object 1 of classname header-sorter__button has a value of Sort table by ascending recipient name
        When I wait 1 seconds
        When object 2 of classname header-sorter__button is clicked
        Then object 2 of classname header-sorter__button has a value of Sort table by descending recipient name
        When I wait 1 seconds
        When object 3 of classname header-sorter__button is clicked
        Then object 3 of classname header-sorter__button has a value of Sort table by ascending DUNS
        When I wait 1 seconds
        When object 4 of classname header-sorter__button is clicked
        Then object 4 of classname header-sorter__button has a value of Sort table by descending DUNS
        When I wait 1 seconds
        When object 5 of classname header-sorter__button is clicked
        Then object 5 of classname header-sorter__button has a value of Sort table by ascending state
        When I wait 1 seconds
        When object 6 of classname header-sorter__button is clicked
        Then object 6 of classname header-sorter__button has a value of Sort table by descending state
        When object 7 of classname header-sorter__button is clicked
        Then object 7 of classname header-sorter__button has a value of Sort table by ascending awarded amount
        When I wait 1 seconds
        When object 8 of classname header-sorter__button is clicked
        Then object 8 of classname header-sorter__button has a value of Sort table by descending awarded amount
        When object 9 of classname header-sorter__button is clicked
        Then object 9 of classname header-sorter__button has a value of Sort table by ascending percent of total
        When I wait 1 seconds
        When object 10 of classname header-sorter__button is clicked
        Then object 10 of classname header-sorter__button has a value of Sort table by descending percent of total

        #Close modal and return
        When classname usa-da-icon-close is clicked
        Then we see id main-focus has a value of Recipient Profile
        Then classname recipient-overview__title is displayed

    @Recipients_Profile_Overview
    @Recipients_Profile_Page
    Scenario: Check the overview section for presence of key items including total transactions and details sections
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"
        Then we see id main-focus has a value of Recipient Profiles
        Then classname recipient-landing__results is displayed
        When I type California, State of into classname search-section__input
        And classname search-section__button is clicked
        And I wait 1 seconds
        When object 6 of classname header-sorter__button is clicked
        And I wait 1 seconds
        When recipient link 1 is clicked
        And I wait 1 seconds
        Then we see id main-focus has a value of Recipient Profile

        #Check presence of box and title
        Then classname recipient-overview is displayed
        Then we see classname recipient-overview__title has a value of CALIFORNIA, STATE OF

        #Check presence of Parent Recipient Tag and Child Recipient modal button
        Then we see classname recipient-overview__label_parent has a value of Parent Recipient
        Then classname recipient-overview__children-button is displayed

        #Check presence of transaction section
        Then object 1 of classname recipient-overview__heading has a value of Total Transactions
        Then classname totals__amount is displayed
        Then classname totals__awards is displayed

        #Check presence of details section
        Then object 2 of classname recipient-overview__heading has a value of Details
        Then classname details__table is displayed
        Then check recipient overview details table row titles


    @Recipients_Profile_Transactions
    @Recipients_Profile_Page
    Scenario: Check the transactions over time section for presence of graph and toggle through years, quarters, months buttons
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"
        Then we see id main-focus has a value of Recipient Profiles
        Then classname recipient-landing__results is displayed
        When I type California, State of into classname search-section__input
        And classname search-section__button is clicked
        And I wait 1 seconds
        When object 6 of classname header-sorter__button is clicked
        And I wait 1 seconds
        When recipient link 1 is clicked
        And I wait 1 seconds
        Then we see id main-focus has a value of Recipient Profile

        #Check for box title and descriptions
        Then classname transactions-over-time is displayed
        Then we see classname recipient-section__title has a value of Transactions Over Time
        Then we see classname recipient-section__description has a value of This graph shows trends over time for all transactions to this recipient. Hover over the bars for more detailed information.

        #Check for buttons
        Then object 1 of classname period-button has a value of Years
        Then object 2 of classname period-button has a value of Quarter
        Then object 3 of classname period-button has a value of Month

        #Check for graph
        Then classname bar-graph is displayed

        #Check for axes and gridlines
        Then classname x-axis is displayed
        Then classname y-axis is displayed
        Then classname grid-line is displayed

        #Check for legends
        Then object 1 of classname chart-legend-item has a value of All Transactions
        Then object 2 of classname chart-legend-item has a value of Count of New Awards
        Then classname key-color has 2 objects present

        #Check bars and trend lines and points
        Then check recipient page graph has the correct amount of bars present
        Then check amount of trend lines and points
        When object 2 of classname period-button is clicked
        Then check recipient page graph has the correct amount of bars present
        Then check amount of trend lines and points
        When object 3 of classname period-button is clicked
        Then check recipient page graph has the correct amount of bars present
        Then check amount of trend lines and points
        When object 1 of classname period-button is clicked
        Then check recipient page graph has the correct amount of bars present
        Then check amount of trend lines and points

        #Check hover boxes
        When hover over classname bar-item
        Then classname hover is displayed
        Then classname visualization-tooltip is displayed
        Then classname tooltip-title is displayed
        Then classname tooltip-value is displayed
        Then classname tooltip-label is displayed


    @Recipients_Profile_Top5
    @Recipients_Profile_Page
    Scenario: Check the Top 5 section for tables and correct formatting of the tables
        Given On the homepage
        When I click the top banner for "Profiles" then "Recipients"
        Then we see id main-focus has a value of Recipient Profiles
        Then classname recipient-landing__results is displayed
        When I type California, State of into classname search-section__input
        And classname search-section__button is clicked
        And I wait 2 seconds
        When object 6 of classname header-sorter__button is clicked
        And I wait 1 seconds
        When recipient link 1 is clicked
        And I wait 1 seconds
        Then we see id main-focus has a value of Recipient Profile

        #Check for title and description
        Then we see classname state-section__title has a value of Top 5
        Then we see classname state-section__description has a value of The set of tables below provide a summary of awards to this recipient through multiple angles. To see more than the top 5, you can visit our Advanced Search page.

        Then check attribute alt of object 1 of classname category-table__title-icon has a value of Awarding Agencies
        Then object 1 of classname category-table__title-name has a value of Awarding Agencies
        Then object 1 of classname category-table__table-head has a value of NameAwarded Amount% of Total
        Then check recipient table 1 has 5 by 3 rows

        Then check attribute alt of object 2 of classname category-table__title-icon has a value of Awarding Sub-Agencies
        Then object 2 of classname category-table__title-name has a value of Awarding Sub-Agencies
        Then object 2 of classname category-table__table-head has a value of NameAwarded Amount% of Total
        Then check recipient table 2 has 5 by 3 rows

        Then check attribute alt of object 3 of classname category-table__title-icon has a value of Federal Accounts
        Then object 3 of classname category-table__title-name has a value of Federal Accounts

        Then check attribute alt of object 4 of classname category-table__title-icon has a value of CFDA Programs
        Then object 4 of classname category-table__title-name has a value of CFDA Programs
        Then object 3 of classname category-table__table-head has a value of NameAwarded Amount% of Total
        Then check recipient table 3 has 5 by 3 rows

        Then check attribute alt of object 5 of classname category-table__title-icon has a value of NAICS Codes
        Then object 5 of classname category-table__title-name has a value of NAICS Codes
        Then object 4 of classname category-table__table-head has a value of NameAwarded Amount% of Total
        Then check recipient table 4 has 5 by 3 rows

        Then check attribute alt of object 6 of classname category-table__title-icon has a value of Product Service Codes
        Then object 6 of classname category-table__title-name has a value of Product Service Codes
        Then object 5 of classname category-table__table-head has a value of NameAwarded Amount% of Total
        Then check recipient table 5 has 5 by 3 rows

        Then check attribute alt of object 7 of classname category-table__title-icon has a value of Countries
        Then object 7 of classname category-table__title-name has a value of Countries
        Then object 6 of classname category-table__table-head has a value of NameAwarded Amount% of Total
        Then check recipient table 6 has 5 by 3 rows

        Then check attribute alt of object 8 of classname category-table__title-icon has a value of U.S. States or Territories
        Then object 8 of classname category-table__title-name has a value of U.S. States or Territories
        Then object 7 of classname category-table__table-head has a value of NameAwarded Amount% of Total
        Then check recipient table 7 has 5 by 3 rows
