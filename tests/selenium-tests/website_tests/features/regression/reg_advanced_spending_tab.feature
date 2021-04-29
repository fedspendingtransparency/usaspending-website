Feature: [USASPENDING] Regression Testing (Advanced Search Spending by Category Tab)
    @prime
    Scenario: I want to verify the spending by category tab functions as expected when searching prime awards
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I select the FY checkbox for "2008"
        And I hit Submit Search
        And Wait for table to load
        When we click on Categories tab
        Then "Spending by: Awarding Agency" dropdown is displayed with a chart
        Then we see that category description has a value of View a list of the top Agencies from highest to lowest. View your results by Awarding Agency, Sub Agency, or Office, and hover over the bars for more detailed information.
        And we see that visualization legend is displayed
        And we see that visualization legend has a value of Amount Obligated
        And we see that Agencies graph tab has a value of Agencies
        And we see that Sub-agencies graph tab has a value of Sub-Agencies
        And we see that categories x axis is displayed
        And we see that categories y axis is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of Department of Health and Human Services (HHS)
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When we click on Show next ten button
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of Department of Veterans Affairs (VA)
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When we click on Sub-agencies graph tab
        Then we see that visualization legend is displayed
        And we see that visualization legend has a value of Amount Obligated
        And we see that category chart hitzone is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of Social Security Administration (SSA)
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When we click on Show next ten button
        Then we see that bar 1 is displayed
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of Student Financial Assistance Programs
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed

        When we click on Category field picker
        And we click on recipient drop
        Then "Spending by: Recipient" dropdown is displayed with a chart
        Then we see that category description has a value of View a list of the top Recipients from highest to lowest. View your results by Parent Recipient or Recipient, and hover over the bars for more detailed information.
        And we see that visualization legend is displayed
        And we see that visualization legend has a value of Amount Obligated
        And we see that category chart hitzone is displayed
        And we see that categories x axis is displayed
        And we see that categories y axis is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of MULTIPLE RECIPIENTS
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When we click on Show next ten button
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of SOCIAL SERVICES, CALIFORNIA DEPARTMENT OF (613673185)
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed

        When we click on Category field picker
        And we click on CFDA program drop
        Then "Spending by: CFDA Program" dropdown is displayed with a chart
        And we see that categories x axis is displayed
        And we see that categories y axis is displayed
        Then we see that category description has a value of View a list of the top CFDA Programs from highest to lowest, and hover over the bars for more detailed information.
        And we see that visualization legend is displayed
        And we see that visualization legend has a value of Amount Obligated
        And we see that category chart hitzone is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed

        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of 96.002 - Social Security Retirement Insurance
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When we click on Show next ten button
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of 14.871 - Section 8 Housing Choice Vouchers
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed

        When we click on Category field picker
        And we click on Industry code drop
        Then "Spending by: Industry Code" dropdown is displayed with a chart
        Then we see that category description has a value of View a list of the top Industry Codes from highest to lowest. View your results by NAICS Code or PSC Code, and hover over the bars for more detailed information.
        And we see that visualization legend is displayed
        And we see that visualization legend has a value of Amount Obligated
        And we see that category chart hitzone is displayed
        And we see that PSC button has a value of PSC
        And we see that NAICS button has a value of NAICS
        And we see that categories x axis is displayed
        And we see that categories y axis is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of Y199 - CONSTRUCT/MISC BLDGS
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When we click on Show next ten button
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of Q201 - GENERAL HEALTH CARE SERVICES
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When we click on NAICS button
        Then we see that category description has a value of View a list of the top Industry Codes from highest to lowest. View your results by NAICS Code or PSC Code, and hover over the bars for more detailed information.
        And we see that visualization legend is displayed
        And we see that visualization legend has a value of Amount Obligated
        And we see that category chart hitzone is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of 236220 - Commercial and Institutional Building Construction
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When we click on Show next ten button
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of 541519 - Other Computer Related Services
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed


    @subawards
    Scenario: I want to verify the spending by category tab functions as expected when searching sub-awards
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I select the FY checkbox for "2008"
        And I hit Submit Search
        And Wait for table to load
        And we click on sub awards button
        When we click on Categories tab
        Then "Spending by: Awarding Agency" dropdown is displayed with a chart
        Then we see that category description has a value of View a list of the top Agencies from highest to lowest. View your results by Awarding Agency, Sub Agency, or Office, and hover over the bars for more detailed information.
        And we see that visualization legend is displayed
        And we see that visualization legend has a value of Amount Obligated
        And we see that category chart hitzone is displayed
        And we see that Agencies graph tab has a value of Agencies
        And we see that Sub-agencies graph tab has a value of Sub-Agencies
        And we see that categories x axis is displayed
        And we see that categories y axis is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of Department of Health and Human Services (HHS)
        Then classname visualization-tooltip is displayed
        When we click on Show next ten button
        And scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of Department of State (DOS)
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        When we click on Sub-agencies graph tab
        Then we see that visualization legend is displayed
        And we see that visualization legend has a value of Amount Obligated
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of Centers for Medicare and Medicaid Services (CMS)
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When we click on Show next ten button
        And scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of Defense Logistics Agency (DLA)
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed

        When we click on Category field picker
        And we click on recipient drop
        Then "Spending by: Recipient" dropdown is displayed with a chart
        Then we see that category description has a value of View a list of the top Recipients from highest to lowest. View your results by Parent Recipient or Recipient, and hover over the bars for more detailed information.
        And we see that visualization legend is displayed
        And we see that visualization legend has a value of Amount Obligated
        And we see that category chart hitzone is displayed
        And we see that categories x axis is displayed
        And we see that categories y axis is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of JOHN DEERE HEALTH CARE, INC (148710858)
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When we click on Show next ten button
        And scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of SRA INTERNATIONAL, INC. (097779698)
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed

        When we click on Category field picker
        And we click on CFDA program drop
        Then "Spending by: CFDA Program" dropdown is displayed with a chart
        And we see that categories x axis is displayed
        And we see that categories y axis is displayed
        Then we see that category description has a value of View a list of the top CFDA Programs from highest to lowest, and hover over the bars for more detailed information.
        And we see that visualization legend is displayed
        And we see that visualization legend has a value of Amount Obligated
        And we see that category chart hitzone is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of 93.778 - Medical Assistance Program
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
        When we click on Show next ten button
        And scroll to top
        When I click on bar 1
        # Then we see that tooltip title has a value of 97.089 - Driver's License Security Grant Program
        Then classname visualization-tooltip is displayed
        And we see that bar 1 is displayed
        And we see that bar 2 is displayed
        And we see that bar 3 is displayed
        And we see that bar 4 is displayed
        And we see that bar 5 is displayed
        And we see that bar 6 is displayed
        And we see that bar 7 is displayed
        And we see that bar 8 is displayed
        And we see that bar 9 is displayed
        And we see that bar 10 is displayed
