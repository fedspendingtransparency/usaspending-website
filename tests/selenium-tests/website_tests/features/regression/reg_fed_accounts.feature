@usaspending
@Profiles_Fed_Accounts
Feature:[USASPENDING] Regression Testing (Profiles Fed Accounts)

    @Fed_Accounts_Landing_Items
    @Fed_Accounts_Landing_Page
    Scenario: Check for main title descriptions and legends on the federal accounts landing page
        Given On the homepage
        When I click the top banner for "Profiles" then "Federal Accounts"

        #Grey Header
        Then we see id main-focus has a value of Federal Account Profiles

        #Top Title and description
        Then we see classname landing-page__title has a value of Find a Federal Account Profile.
        Then we see classname landing-page__description has a value of The government has more than 2,000 unique Federal Accounts, which are similar to bank accounts. Use our Federal Account Profiles to get a better understanding of how agencies receive and spend congressional funding to carry out their programs, projects, and activities.
        Then we see classname landing-page__tagline has a value of Curious to see how these accounts are organized? Check out the Data Lab’s Federal Account Explorer

    @Fed_Accounts_Search
    @Fed_Accounts_Landing_Page
    Scenario: Check for the search bar and also check for its functionality
        Given On the homepage
        When I click the top banner for "Profiles" then "Federal Accounts"
        Then we see id main-focus has a value of Federal Account Profiles

        #Check for bar and buttons
        Then classname search-section__input is displayed
        Then classname search-section__button is displayed
        Then check attribute placeholder of object 1 of classname search-section__input has a value of Search by Account Number, Account Name, or Agency...

        #Check search functionality and results
        When I type 020-0500 into classname search-section__input
        And classname search-section__button is clicked
        And I wait 1 seconds
        Then object 1 of classname results-table__data_even has a value of 020-0500
        Then object 2 of classname results-table__data_even has a value of Public Debt Principal (Indefinite), Treasury
        Then object 3 of classname results-table__data_even has a value of Department of the Treasury (TREAS)
        # Then object 4 of classname results-table__data_even has a value of $2,290,031,093,197

        When the text box classname search-section__input is cleared
        And I type does not exist into classname search-section__input
        And classname search-section__button is clicked
        And I wait 1 seconds
        Then we see classname results-table__message_highlight has a value of does not exist


    @Fed_Accounts_Table_Check
    @Fed_Accounts_Landing_Page
    Scenario: Check the table for titles sorting and pagination
        Given On the homepage
        When I click the top banner for "Profiles" then "Federal Accounts"
        Then we see id main-focus has a value of Federal Account Profiles

        #Check table titles for presence
        Then classname results-table is displayed
        Then object 1 of classname header-label has a value of Account Number
        Then object 2 of classname header-label has a value of Account Name
        Then object 3 of classname header-label has a value of Managing Agency
        Then object 4 of classname header-label has a value of 2019 Budgetary Resources

        #Check results for presence
        #First page unfiltered will always have a full table of 50 results
        #Checking here for 51 rows present and 204 cells presents
        When I wait 1 seconds
        Then classname results-table__row has 51 objects present
        Then classname results-table__data has 204 objects present

        #Check sorting buttons for presence
        Then classname sort-icon has 8 objects present
        Then classname usa-da-icon-arrow-up has 4 objects present
        Then classname usa-da-icon-arrow-down has 4 objects present

        #Check sorting button for functionality
        When object 1 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by descending Account Number
        When I wait 1 seconds
        When object 2 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by ascending Account Number
        When I wait 1 seconds
        When object 3 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by ascending Account Name
        When I wait 1 seconds
        When object 4 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by descending Account Name
        When I wait 1 seconds
        When object 5 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by ascending Managing Agency
        When I wait 1 seconds
        When object 6 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by descending Managing Agency
        When I wait 1 seconds
        When object 7 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by descending 2019 Budgetary Resources
        When I wait 1 seconds
        When object 8 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by ascending 2019 Budgetary Resources

        #Recheck results for presence
        Then classname results-table__row has 51 objects present
        Then classname results-table__data has 204 objects present

        #Check pagination buttons and title for presence
        Then classname pager__button has 12 objects present
        Then classname pager__ellipsis has 2 objects present
        Then classname pagination__totals has 2 objects present

        #Check pagination buttons for functionality
        Then we see classname pager__button_active has a value of 1
        Then object 1 of classname pager__button_disabled has a value of <
        Then object 2 of classname pager__button_disabled has a value of <
        When object 3 of classname pager__button is clicked
        Then object 1 of classname pager__button_active has a value of 2
        Then object 2 of classname pager__button_active has a value of 2
        When object 4 of classname pager__button is clicked
        Then object 1 of classname pager__button_active has a value of 3
        Then object 2 of classname pager__button_active has a value of 3
        Then classname pager__button has 14 objects present
        When object 1 of classname pager__button is clicked
        Then object 1 of classname pager__button_active has a value of 2
        Then object 2 of classname pager__button_active has a value of 2
        Then classname pager__button has 12 objects present
        When object 6 of classname pager__button is clicked
        Then object 1 of classname pager__button_active has a value of 3
        Then object 2 of classname pager__button_active has a value of 3
        When object 6 of classname pager__button is clicked
        Then object 1 of classname pager__button_disabled has a value of >
        Then object 2 of classname pager__button_disabled has a value of >
        When object 8 of classname pager__button is clicked
        Then object 1 of classname pager__button_active has a value of 1
        Then object 2 of classname pager__button_active has a value of 1

        #Recheck results for presence
        When I wait 1 seconds
        Then classname results-table__row has 51 objects present
        Then classname results-table__data has 204 objects present


    @Fed_Accounts_Link_Check
    @Fed_Accounts_Landing_Page
    Scenario: Check the table results redirect to the correct page
        Given On the homepage
        When I click the top banner for "Profiles" then "Federal Accounts"
        Then we see id main-focus has a value of Federal Account Profiles

        #Check results for presence
        Then classname results-table is displayed
        Then classname results-table__row has 51 objects present
        Then classname results-table__data has 204 objects present

        #Click on link and check that title matches on the redirect
        Then check when fed accounts link 1 is clicked the title in the redirected page is correct
        When we click the back button
        When I wait 1 seconds
        Then check when fed accounts link 2 is clicked the title in the redirected page is correct
        When we click the back button
        When I wait 1 seconds
        Then check when fed accounts link 3 is clicked the title in the redirected page is correct
        When we click the back button
        When I wait 1 seconds
        Then check when fed accounts link 4 is clicked the title in the redirected page is correct


    @Fed_Accounts_Profile_Overview
    @Fed_Accounts_Profile_Page
    Scenario: Check the individual federal account profile page's overview section
        Given On the homepage
        When I click the top banner for "Profiles" then "Federal Accounts"
        Then we see id main-focus has a value of Federal Account Profiles

        When I type 020-0500 into classname search-section__input
        And classname search-section__button is clicked
        And I wait 1 seconds
        When fed accounts link 1 is clicked
        When I wait 1 seconds

        #Grey header
        Then we see id main-focus has a value of Federal Account Profile
        Then we see classname item-label has a value of Federal Account Symbol

        #Title
        Then check tag h3 of object 1 of classname account-overview has a value of Public Debt Principal (Indefinite), Treasury
        #Sub titles and descriptions
        Then check tag h4 of object 1 of classname overview-section has a value of Account Description
        Then object 1 of classname section-content has a value of Not available
        Then check tag h4 of object 2 of classname overview-section has a value of Fiscal Year Summary
        # Then object 2 of classname section-content has a value of For this current fiscal year, this agency has been granted authority to spend $2T out of this federal account. They carried over a balance of $0 from last year, were given $2T in new appropriations, and have authority to use $0 of other budgetary resources.To date, 0% ($0) of the total $2T has been obligated.

        #Snapshot section
        Then I find the fed accounts snapshot title
        Then classname sankey is displayed
        # Then we see classname left-flows has a value of Flow of money into total budget authority from new appropriations

        # Then we see classname left-col has a value of New Appropriations$2,290,031,093,197 (100%)New Appropriations: $2,290,031,093,197
        # Then we see classname right-flows has a value of Flow of money out of total budget authority to unobligated balance
        # Then we see classname right-col has a value of Unobligated Balance$2,290,031,093,197 (100%)Unobligated Balance: $2,290,031,093,197
        Then object 1 of classname direction-label has a value of MONEY IN
        Then object 2 of classname direction-label has a value of MONEY OUT
        # Then we see classname center-col has a value of Total Budget Authority$2,290,031,093,197 (100%)Total Budget Authority: $2,290,031,093,197
        # Then we see classname center-col has a value of Total Budget Authority$2,290,031,093,197 (100%)Total Budget Authority: $2,290,031,093,197


    @Fed_Accounts_Profile_Filter
    @Fed_Accounts_Profile_Page
    Scenario: Check the individual federal account profile page's sidebar filter
        Given On the homepage
        When I click the top banner for "Profiles" then "Federal Accounts"
        Then we see id main-focus has a value of Federal Account Profiles

        When I type 028-8007 into classname search-section__input
        And classname search-section__button is clicked
        And I wait 1 seconds
        When fed accounts link 1 is clicked
        When I wait 1 seconds

        #Grey header
        Then we see id main-focus has a value of Federal Account Profile
        Then we see classname item-label has a value of Federal Account Symbol

        Then classname usa-da-icon-filter is displayed
        Then check tag h6 of object 1 of classname sidebar-header has a value of Filter by:

        Then we see classname filter-toggle__button has a value of Arrow Pointing Down IconTime Period
        Then object 1 of classname filter-toggle__name has a value of Time Period
        Then we see classname tab-toggle  has a value of Fiscal Year
        When object 2 of classname fy-option-checkbox is clicked
        When object 3 of classname fy-option-checkbox is clicked
        And I wait 1 seconds
        Then object 1 of classname filter-item-title has a value of FY 2020
        When object 1 of classname filter-item is clicked
        # And I wait 3 seconds
        # Then object 1 of classname fitler-item-title has a value of FY 2018

        Then object 2 of classname filter-toggle__name has a value of Object Class


        Then object 3 of classname filter-toggle__name has a value of Program Activity
        Then object 4 of classname filter-toggle__name has a value of Treasury Account Symbol (TAS)


    @Fed_Accounts_Profile_Spending_Over_Time
    @Fed_Accounts_Profile_Page
    Scenario: Check the individual federal account profile page's Spending Over Time section
        Given On the homepage
        When I click the top banner for "Profiles" then "Federal Accounts"
        Then we see id main-focus has a value of Federal Account Profiles

        When I type 028-8007 into classname search-section__input
        And classname search-section__button is clicked
        And I wait 1 seconds
        When fed accounts link 1 is clicked
        When I wait 1 seconds

        #Grey header
        Then we see id main-focus has a value of Federal Account Profile
        Then we see classname item-label has a value of Federal Account Symbol

        Then check tag h3 of object 1 of classname results-visualization-time-section has a value of Spending Over Time
        Then classname bar-graph is displayed
        Then classname y-axis is displayed
        Then classname x-axis is displayed
        Then classname chart-legend is displayed

        Then object 1 of classname active has a value of Years
        When object 3 of classname fy-option-checkbox is clicked
        And I wait 1 seconds
        Then check number of bars in the graph classname hit-zone is 1
        When object 2 of classname period-button is clicked
        And I wait 1 seconds
        Then object 1 of classname active has a value of Quarters
        Then check number of bars in the graph classname hit-zone is 4


    @Fed_Accounts_Profile_Spending_By_Category
    @Fed_Accounts_Profile_Page
    Scenario: Check the individual federal account profile page's Spending by Category section
        Given On the homepage
        When I click the top banner for "Profiles" then "Federal Accounts"
        Then we see id main-focus has a value of Federal Account Profiles

        When I type 028-8007 into classname search-section__input
        And classname search-section__button is clicked
        And I wait 1 seconds
        When fed accounts link 1 is clicked
        When I wait 1 seconds

        #Grey header
        Then we see id main-focus has a value of Federal Account Profile
        Then we see classname item-label has a value of Federal Account Symbol
        Then we see classname item-value has a value of 028-8007

        Then check tag h3 of object 1 of classname results-visualization-rank-section has a value of Spending by Category
        Then classname visualization-legend is displayed

        Then object 2 of classname active has a value of Program Activity
        Then check number of bars in the graph classname chart-bar-group is 2

        When object 2 of classname visualization-scope__button is clicked
        And I wait 1 seconds
        Then object 2 of classname active has a value of Object Class
        Then check number of bars in the graph classname chart-bar-group is 5
        # Then check attribute disabled of object 2 of classname visualization-pager has a value of true
        # When object 2 of classname visualization-pager is clicked
        # And I wait 1 seconds
        # Then check attribute disabled of object 1 of classname visualization-pager has a value of true

        When object 3 of classname visualization-scope__button is clicked
        And I wait 1 seconds
        Then object 2 of classname active has a value of Treasury Account Symbol (TAS)
        Then check number of bars in the graph classname chart-bar-group is 2



    @Fed_Accounts_Profile_Spending_By_Award
    @Fed_Accounts_Profile_Page
    Scenario Outline: Check the individual federal account profile page's Spending by Award section
        Given On the homepage
        When I click the top banner for "Profiles" then "Federal Accounts"
        Then we see id main-focus has a value of Federal Account Profiles

        When I type 028-8007 into classname search-section__input
        And classname search-section__button is clicked
        And I wait 1 seconds
        When fed accounts link 1 is clicked
        When I wait 1 seconds

        #Grey header
        Then we see id main-focus has a value of Federal Account Profile
        Then we see classname item-label has a value of Federal Account Symbol


        Then check tag h2 of object 1 of classname table-section-header has a value of Spending by Prime Award

        When object <tab_num> of classname table-type-toggle is clicked

        Then object 1 of classname tab-label has a value of Contracts
        Then object 2 of classname tab-label has a value of Grants
        Then object 3 of classname tab-label has a value of Direct Payments
        Then object 4 of classname tab-label has a value of Loans
        Then object 5 of classname tab-label has a value of Other

        # When I wait for table to load
        Then classname ibt-table-row has <row_amount> objects present
        Then classname cell-content has <cell_amount> objects present

    Examples:
        | tab_num | row_amount | cell_amount |
        | 1       | 9          | 80          |
        # | 2       | 0          | 0           |
        # | 3       | 0          | 0           |
        # | 4       | 0          | 0           |
        # | 5       | 0          | 0           |
