@usaspending
@Profiles_Agencies
Feature:[USASPENDING] Regression Testing (Profiles Agencies)

    @Agencies_Landing_Items
    @Agencies_Landing_Page
    Scenario: Check for main title descriptions and legends on the agencies landing page
        Given On the homepage
        When I click the top banner for "Profiles" then "Agencies"

        #Grey Header
        Then we see id main-focus has a value of Agency Profiles

        #Top Title and description
        Then we see classname landing-page__title has a value of Find an Agency Profile.
        Then we see classname landing-page__description has a value of Featuring information on each agency’s total obligations, along with obligation breakdowns by Object Class and Federal Accounts, our Agency Profiles help you understand how each agency spends its funding.


    @Agencies_Search
    @Agencies_Landing_Page
    Scenario: Check for the search bar and also check for its functionality
        Given On the homepage
        When I click the top banner for "Profiles" then "Agencies"
        Then we see id main-focus has a value of Agency Profiles

        #Check for bar and buttons
        Then classname search-section__form is displayed
        Then classname search-section__input is displayed
        Then classname search-section__button is displayed
        Then check attribute placeholder of object 1 of classname search-section__input has a value of Start typing to find an agency...

        #Check search functionality and results
        When I type Department of Defense into classname search-section__input
        # And classname search-section__button is clicked
        And I wait 1 seconds
        Then object 1 of classname agency-link-cell has a value of Department of Defense (DOD)
        Then object 1 of classname column-congressional_justification_url has a value of https://www.defense.gov/cj

        #Negative test
        When the text box classname search-section__input is cleared
        And I type does not exist into classname search-section__input
        And I wait 1 seconds
        Then we see classname results-table-message has a value of No results found for “ does not exist ”.


    @Agencies_Table_Check
    @Agencies_Landing_Page
    Scenario: Check the table for titles and sorting
        Given On the homepage
        When I click the top banner for "Profiles" then "Agencies"
        Then we see id main-focus has a value of Agency Profiles

        #Check table titles for presence
        Then classname agency-landing-results-table is displayed
        Then object 1 of classname header-label has a value of Agency Name
        Then object 2 of classname header-label has a value of Congressional Justification of Budget (CJ)
        Then object 3 of classname header-label has a value of Budgetary Resources
        Then object 4 of classname header-label has a value of Percent of Total

        #Check results for presence
        #First page unfiltered will always have a full table of 50 results
        #Checking here for 51 rows present and 204 cells presents
        When I wait 1 seconds
        Then check the number of results is equal to the displayed results count
        # Then classname agency-link-cell has 100 objects present
        # Then classname column-congressional_justification_url has 64 objects present
        # Then classname column-budget_authority_amount has 100 objects present
        # Then classname column-budget_authority_amount has 100 objects present

        #Check sorting buttons for presence
        Then classname sort-icon has 6 objects present
        Then classname usa-da-icon-arrow-up has 3 objects present
        Then classname usa-da-icon-arrow-down has 3 objects present

        #Check sorting button for functionality
        When object 1 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by ascending Agency Name
        When I wait 1 seconds
        When object 2 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by descending Agency Name
        When I wait 1 seconds
        When object 3 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by descending Budgetary Resources
        When I wait 1 seconds
        When object 4 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by ascending Budgetary Resources
        When I wait 1 seconds
        When object 5 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by descending Percent of Total
        When I wait 1 seconds
        When object 6 of classname sort-icon is clicked
        Then object 1 of classname active has a value of Sort table by ascending Percent of Total

        #Recheck results for presence
        Then check the number of results is equal to the displayed results count
        # Then classname agency-link-cell has 100 objects present
        # Then classname column-congressional_justification_url has 64 objects present
        # Then classname column-budget_authority_amount has 100 objects present
        # Then classname column-budget_authority_amount has 100 objects present


    @Agencies_Link_Check
    @Agencies_Landing_Page
    Scenario: Check the table results redirect to the correct page
        Given On the homepage
        When I click the top banner for "Profiles" then "Agencies"
        Then we see id main-focus has a value of Agency Profiles

        # Check results for presence
        Then classname agency-landing-results-table is displayed
        Then object 1 of classname header-label has a value of Agency Name
        Then object 2 of classname header-label has a value of Congressional Justification of Budget (CJ)
        Then object 3 of classname header-label has a value of Budgetary Resources
        Then object 4 of classname header-label has a value of Percent of Total

        # Click on link and check that title matches on the redirect
        Then check that agency page link 2 is clicked the title in the redirected page is correct
        When we click the back button
        When I wait 2 seconds
        Then check that agency page link 3 is clicked the title in the redirected page is correct
        When we click the back button
        When I wait 2 seconds
        Then check that agency page link 4 is clicked the title in the redirected page is correct
        When we click the back button
        When I wait 2 seconds
        Then check that agency page link 5 is clicked the title in the redirected page is correct


    @Agencies_Sidebar
    @Agencies_Profile_Page
    Scenario: Check the sidebar on the agency profile page
        Given On the homepage
        When I click the top banner for "Profiles" then "Agencies"
        Then we see id main-focus has a value of Agency Profiles

        When the tag a of object 1 of classname agency-link-cell is clicked
        And I wait 1 seconds
        Then we see id main-focus has a value of Agency Profile

        # Check for values in the sidebar
        Then object 1 of classname sidebar-link has a value of Overview
        Then object 2 of classname sidebar-link has a value of Obligated Amount
        Then object 3 of classname sidebar-link has a value of Object Classes
        Then object 4 of classname sidebar-link has a value of Federal Accounts

        # check for functionality in the sidebar
        Then we see classname active has a value of Overview
        When object 2 of classname sidebar-link is clicked
        And I wait 1 seconds
        Then we see classname active has a value of Obligated Amount
        When object 3 of classname sidebar-link is clicked
        And I wait 1 seconds
        Then we see classname active has a value of Object Classes
        When object 4 of classname sidebar-link is clicked
        And I wait 1 seconds
        Then we see classname active has a value of Federal Accounts


    @Agencies_Overview
    @Agencies_Profile_Page
    Scenario: Check the overview section of the agency profile page
        Given On the homepage
        When I click the top banner for "Profiles" then "Agencies"
        Then we see id main-focus has a value of Agency Profiles

        When the tag a of object 2 of classname agency-link-cell is clicked
        And I wait 1 seconds
        Then we see id main-focus has a value of Agency Profile

        # Check Title and subtitles with urls
        Then we see classname title has a value of Department of the Treasury
        Then check tag h4 of object 1 of classname agency-details has a value of Agency Mission
        Then check tag h5 of object 1 of classname group has a value of Website
        Then check tag a of object 1 of classname agency-website has a value of https://www.treasury.gov/
        Then check tag h5 of object 2 of classname group has a value of Congressional Justification of Budget (CJ)
        Then check tag a of object 3 of classname agency-website has a value of https://www.treasury.gov/cj

        #Check for right side objects such as titles and bars
        Then classname budget-authority is displayed
        Then classname budget-authority-date is displayed
        Then classname authority-amount is displayed
        Then classname authority-statement is displayed
        Then classname horizontal-bar is displayed


    @Agencies_Obligated_Amount
    @Agencies_Profile_Page
    Scenario: Check the obligated amount section of the agency profile page
        Given On the homepage
        When I click the top banner for "Profiles" then "Agencies"
        Then we see id main-focus has a value of Agency Profiles

        When the tag a of object 1 of classname agency-link-cell is clicked
        And I wait 1 seconds
        Then we see id main-focus has a value of Agency Profile

        # Check Title and desciption
        Then check tag h4 of object 1 of classname agency-section-title has a value of Obligated Amount
        Then classname agency-callout-description is displayed

        # Check text and bars
        Then classname agency-obligated-content is displayed
        Then classname fy-text is displayed
        Then classname against-auth-text is displayed
        Then classname horizontal-bar is displayed
        Then classname outlay-text is displayed


    @Agencies_Object_Classes
    @Agencies_Profile_Page
    Scenario: Check the object classes section of the agency profile page
        Given On the homepage
        When I click the top banner for "Profiles" then "Agencies"
        Then we see id main-focus has a value of Agency Profiles

        When the tag a of object 1 of classname agency-link-cell is clicked
        And I wait 1 seconds
        Then we see id main-focus has a value of Agency Profile

        # Check title and descriptions
        Then check tag h4 of object 2 of classname agency-section-title has a value of Object Classes
        # Then check tag em of object 2 of classname agency-section-title has a value of FY 2019 data reported through March 31, 2019
        # Then object 2 of classname agency-callout-description has a value of This $562.8 billion in obligations is divided among categories, called object classes. These groupings can be helpful for analysis and cross-agency comparison.
        Then classname agency-callout-description is displayed

        # Check for tiles and hover tip
        Then classname tile has 5 objects present
        Then object 1 of classname category has a value of Grants and fixed charges
        When hover over classname tile
        Then classname visualization-tooltip is displayed
        Then we see classname agency-viz-description has a value of This visualization represents obligated amount.

        # Drill in and out of tree map
        When the tag g of object 1 of classname tree-wrapper is clicked
        And I wait 1 seconds
        Then check tag h1 of object 1 of classname function-desc has a value of Grants and fixed charges
        Then classname tile has 4 objects present
        Then we see classname back has a value of Icon Depicting an Arrow Pointed Up Back to Major Object Classes
        When classname back is clicked
        And I wait 1 seconds
        Then classname tile has 5 objects present


    @Agencies_Federal_Accounts
    @Agencies_Profile_Page
    Scenario: Check the federal accounts section of the agency profile page
        Given On the homepage
        When I click the top banner for "Profiles" then "Agencies"
        Then we see id main-focus has a value of Agency Profiles

        When the tag a of object 2 of classname agency-link-cell is clicked
        And I wait 1 seconds
        Then we see id main-focus has a value of Agency Profile

        # Check Title
        Then check tag h4 of object 3 of classname agency-section-title has a value of Federal Accounts

        # Check bar axis and legend. Then check for expected number of bars
        Then classname bar-axis is displayed
        Then classname chart-legend-item is displayed
        Then we see classname key-label has a value of Obligated Amount
        Then classname chart-bar has 10 objects present
        Then classname chart-bar-hitzone has 10 objects present

        # Check bar 1 for y axis title and hover tooltip
        Then check tag title of object 1 of classname chart-group has a value of Interest on the Public Debt (Indefinite), Bureau of the Fiscal Service, Treasury
        When hover over classname chart-bar
        Then classname hover is displayed
        Then we see classname tooltip-title has a value of Interest on the Public Debt (Indefinite), Bureau of the Fiscal Service, Treasury


        ######
        # Revisit the logic. Do you want to check for the text on the bar graphs. When data changes the bar graph rearranges

        # Check rest of the objects for title and presence
        # Then check tag title of object 2 of classname chart-group has a value of Refunding Internal Revenue Collections (Indefinite), Treasury
        # Then check tag title of object 3 of classname chart-group has a value of Payment Where Earned Income Credit Exceeds Liability for Tax, Internal Revenue Service, Treasury
        # Then check tag title of object 4 of classname chart-group has a value of Refundable Premium Assistance Tax Credit, Internal Revenue Service, Treasury
        # Then check tag title of object 5 of classname chart-group has a value of Payment Where Child Tax Credit Exceeds Liability for Tax, Internal Revenue Service, Treasury
        # Then check tag title of object 6 of classname chart-group has a value of Credit Reform: Interest Paid on Uninvested Funds (Indefinite), Bureau of the Fiscal Service, Treasury
        # Then check tag title of object 7 of classname chart-group has a value of Tax Law Enforcement, Internal Revenue Service
        # Then check tag title of object 8 of classname chart-group has a value of Payment Where American Opportunity Credit Exceeds Liability for Tax - Recovery Act, Internal Revenue Service, Treasury
        # Then check tag title of object 9 of classname chart-group has a value of Operations Support,Internal Revenue Service, Treasury
        # Then check tag title of object 10 of classname chart-group has a value of Build America Bond Payments - Recovery Act, Internal Revenue Service, Treasury

        # Check for the footer
        Then we see classname treasury-disclaimer has a value of Note: The numbers on this page might differ from the Statement of Budgetary Resources (SBR) in the Agency Financial Report (AFR) due to certain presentation adjustments that reflect the Department's programmatic mission and component budgetary account activity.


    @Agencies_Foot_Note
    @Agencies_Profile_Page
    Scenario: Check the foot note at the bottom of the agency profile page
        Given On the homepage
        When I click the top banner for "Profiles" then "Agencies"
        Then we see id main-focus has a value of Agency Profiles

        When the tag a of object 1 of classname agency-link-cell is clicked
        And I wait 1 seconds
        Then we see id main-focus has a value of Agency Profile

        # Check for titles descriptions and button
        Then classname agency-footer is displayed
        Then we see classname footer-content has a value of Looking for more insight?Check out the Award Search page for more in-depth analysis on this agency and moreLet's go!
        Then we see classname agency-search-button has a value of Let's go!
