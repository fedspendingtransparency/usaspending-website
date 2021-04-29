Feature: I want to verfiy that the filters on the advanced search page work properly
    @keyword_filter
    Scenario: I want to verify the Keyword search filter works properly
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        Then I get a top header for "Advanced Search"
        When I click the "Keyword" filter dropdown
        Then we see that Keyword filter tooltip is displayed
        And we see that Keyword input is displayed
        When we hover over Keyword filter tooltip
        Then we see that Keyword filter info is displayed
        When we type "soda" into "Keyword input"
        Then we see that shown filter button has a value of Close iconsoda
        When I hit Submit Search
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Keyword
        And we see that filter item 1 has a value of soda
        When Wait for table to load
        When we click on reset search
        Then Filters are reset

    @time_period
    Scenario: I want to verfiy they Time Period filter works properly
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        Then I get a top header for "Advanced Search"
        When I select the FY checkbox for "2016"
        When I hit Submit Search
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Time Period
        And we see that filter item 1 has a value of FY 2016
        When Wait for table to load
        Then we see that award is displayed
        When we click on reset search
        Then Filters are reset

        When we click on Date range
        And we click on start date icon
        And we click on calendar previous
        And we click on calendar day 1
        And we click on end date icon
        And we click on calendar next
        And we click on calendar today
        And we click on date submit
        Then we see that shown filter button is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Time Period
        And we see that filter item 1 is displayed
        When Wait for table to load
        # Then we see that award is displayed
        When we click on reset search
        Then Filters are reset

        When we click on Date range
        And we click on start date icon
        And we click on calendar today selected
        And we click on end date icon
        And we click on calendar 2 previous
        Then we see that calendar body is disabled
        When we click on date submit
        And we click on reset search

        When we click on Date range
        When I type "01/01/2013" into "start date input"
        And we type "01/01/2012" into "end date input"
        Then we see that date error message is displayed
        And we see that date error message has a value of Exclamation Mark IconInvalid DatesThe end date cannot be earlier than the start date.
        When we click on reset search
        Then Filters are reset


    @award_type_contracts
    Scenario: I want to verify that the Award Type filter behaves as expected when searching contracts
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Award Type" filter dropdown
        When we click on Contract toggle
        Then we see that BPAs is displayed
        And we see that Purchase orders is displayed
        And we see that Delivery orders is displayed
        And we see that Definitive contracts is displayed
        When we click on Contracts check
        Then we see that "Contracts check" is checked
        And we see that "BPAs" is checked
        And we see that "Purchase orders" is checked
        And we see that "Delivery orders" is checked
        And we see that "Definitive contracts" is checked
        When Uncheck the "BPAs"
        Then we see that "BPAs" isn't checked
        And we see that "Contracts check" isn't checked
        When we click on Contracts check
        Then we see that "Contracts check" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of All Contracts
        And we see that award is displayed
        When we click on reset search
        Then Filters are reset
        When Click toggle Contract toggle
        When we click on BPAs
        And wait
        Then we see that "BPAs" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Blanket Purchase Agreements (BPA) Calls
        When we click on BPAs
        Then we see that "BPAs" isn't checked
        When we click on reset search
        Then Filters are reset
        When we click on Purchase orders
        Then we see that "Purchase orders" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Purchase Orders (PO)
        When we click on Purchase orders
        Then we see that "Purchase orders" isn't checked
        When we click on Delivery orders
        Then we see that "Delivery orders" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Delivery Orders (DO)
        When we click on Delivery orders
        Then we see that "Delivery orders" isn't checked
        When we click on Definitive contracts
        Then we see that "Definitive contracts" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Definitive Contracts
        When we click on reset search
        Then Filters are reset

    @award_type_IDVs
    Scenario: I want to verify that the Award Type filter behaves as expected when searching Contract IDVs
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Award Type" filter dropdown
        And we click on Contract IDVs toggle
        Then we see that GWAC is displayed
        And we see that IDC multi agency contract is displayed
        And we see that IDC requirements is displayed
        And we see that IDC indefinite quantity is displayed
        And we see that IDC definite quantity is displayed
        And we see that FSS is displayed
        And we see that BOA is displayed
        And we see that BPA IDVs is displayed
        When we click on Contract IDVs checkbox
        Then we see that "Contract IDVs checkbox" is checked
        And we see that "GWAC" is checked
        And we see that "IDC multi agency contract" is checked
        And we see that "IDC requirements" is checked
        And we see that "IDC indefinite quantity" is checked
        And we see that "IDC definite quantity" is checked
        And we see that "FSS" is checked
        And we see that "BOA" is checked
        And we see that "BPA IDVs" is checked
        When we click on GWAC
        Then we see that "GWAC" isn't checked
        And we see that "Contract IDVs checkbox" isn't checked
        When we click on Contract IDVs checkbox
        Then we see that "Contract IDVs checkbox" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of All Indefinite Delivery Vehicles
        And we see that award is displayed
        When we click on reset search
        Then Filters are reset
        When Uncheck the "Contract IDVs checkbox"
        Then we see that "Contract IDVs checkbox" isn't checked
        When Click toggle Contract IDVs toggle
        Then we see that "GWAC" isn't checked
        And we see that "IDC multi agency contract" isn't checked
        And we see that "IDC requirements" isn't checked
        And we see that "IDC indefinite quantity" isn't checked
        And we see that "IDC definite quantity" isn't checked
        And we see that "FSS" isn't checked
        And we see that "BOA" isn't checked
        And we see that "BPA IDVs" isn't checked
        When we click on GWAC
        Then we see that "GWAC" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Government-Wide Acquisition Contract (GWAC)
        When we click on GWAC
        Then we see that "GWAC" isn't checked
        # When we click on IDC multi agency contract
        # Then we see that "IDC multi agency contract" is checked
        # When I hit Submit Search
        # And Wait for table to load
        # Then we see that Active filter label has a value of 1 Active Filter:
        # And we see that filter group 1 title has a value of Award Type
        # And we see that filter item 1 has a value of Multi-Agency Contract, Other Indefinite Delivery Contract (IDC)
        # When we click on IDC multi agency contract
        # Then we see that "IDC multi agency contract" isn't checked
        When we click on IDC requirements
        Then we see that "IDC requirements" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of IDC Indefinite Delivery Contract / Requirements
        When we click on IDC requirements
        Then we see that "IDC requirements" isn't checked
        When we click on IDC indefinite quantity
        Then we see that "IDC indefinite quantity" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of IDC Indefinite Delivery Contract / Indefinite Quantity
        When we click on IDC indefinite quantity
        Then we see that "IDC indefinite quantity" isn't checked
        When we click on IDC definite quantity
        Then we see that "IDC definite quantity" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of IDC Indefinite Delivery Contract / Definite Quantity
        When we click on IDC definite quantity
        Then we see that "IDC definite quantity" isn't checked
        When we click on FSS
        Then we see that "FSS" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Federal Supply Schedule (FSS)
        When we click on FSS
        Then we see that "FSS" isn't checked
        When we click on BOA
        Then we see that "BOA" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Basic Ordering Agreement (BOA)
        When we click on BOA
        Then we see that "BOA" isn't checked
         When we click on BPA IDVs
        Then we see that "BPA IDVs" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Blanket Purchase Agreements (BPA) Calls
        When we click on reset search
        Then Filters are reset

    @award_type_grants
    Scenario: I want to verify that the Award Type filter behaves as expected when searching Grants
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Award Type" filter dropdown
        And we click on Grants toggle
        Then we see that Block grant is displayed
        And we see that Formula grant is displayed
        And we see that Project grant is displayed
        And we see that Cooperative agreement is displayed
        When we click on Grants checkbox
        Then we see that "Grants checkbox" is checked
        And we see that "Block grant" is checked
        And we see that "Formula grant" is checked
        And we see that "Project grant" is checked
        And we see that "Cooperative agreement" is checked
        When we click on Block grant
        Then we see that "Block grant" isn't checked
        And we see that "Grants checkbox" isn't checked
        When we click on Block grant
        Then we see that "Block grant" is checked
        And we see that "Grants checkbox" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of All Grants
        When we click on reset search
        Then Filters are reset
        When Uncheck the "Grants checkbox"
        When Click toggle Grants toggle
        When we click on Block grant
        Then we see that "Block grant" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Block Grant
        When we click on Block grant
        Then we see that "Block grant" isn't checked
        When we click on Formula grant
        Then we see that "Formula grant" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Formula Grant
        When we click on Formula grant
        Then we see that "Formula grant" isn't checked
        When we click on Project grant
        Then we see that "Project grant" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Project Grant
        When we click on Project grant
        Then we see that "Project grant" isn't checked
        When we click on Cooperative agreement
        Then we see that "Cooperative agreement" isn checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Cooperative Agreement
        When we click on reset search
        Then Filters are reset

    @award_type_direct
    Scenario: I want to verify that the Award Type filter behaves as expected when searching Direct Payments
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Award Type" filter dropdown
        And we click on Direct Payments toggle
        Then we see that Direct Payment unrestricted use is displayed
        And we see that Direct Payment specified use is displayed
        When we click on Direct Payments checkbox
        Then we see that "Direct Payments checkbox" is checked
        And we see that "Direct Payment unrestricted use" is checked
        And we see that "Direct Payment specified use" is checked
        When we click on Direct Payment unrestricted use
        Then we see that "Direct Payment unrestricted use" isn't checked
        And we see that "Direct Payments checkbox" isn't checked
        When we click on Direct Payments checkbox
        Then we see that "Direct Payments checkbox" is checked
        And we see that "Direct Payment unrestricted use" is checked
        And we see that "Direct Payment specified use" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of All Direct Payments
        When we click on reset search
        Then Filters are reset
        When Uncheck the "Direct Payments checkbox"
        When Click toggle Direct Payments toggle
        When we click on Direct Payment unrestricted use
        Then we see that "Direct Payment unrestricted use" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Direct Payment with Unrestricted Use
        When we click on Direct Payment unrestricted use
        Then we see that "Direct Payment unrestricted use" isn't checked
        When we click on Direct Payment specified use
        Then we see that "Direct Payment specified use" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Direct Payment for Specified Use
        When we click on reset search
        Then Filters are reset

    @award_type_loans
    Scenario: I want to verify that the Award Type filter behaves as expected when searching Loans
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Award Type" filter dropdown
        When we click on Loans toggle
        Then we see that Loans checkbox is displayed
        And we see that Direct loans is displayed
        And we see that Guaranteed/Insured loans is displayed
        When we click on Loans checkbox
        Then we see that "Loans checkbox" is checked
        And we see that "Direct loans" is checked
        And we see that "Guaranteed/Insured loans" is checked
        When we click on Direct loans
        Then we see that "Direct loans" isn't checked
        And we see that "Loans checkbox" isn't checked
        When we click on Loans checkbox
        Then we see that "Loans checkbox" is checked
        And we see that "Direct loans" is checked
        And we see that "Guaranteed/Insured loans" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of All Loans
        When we click on reset search
        Then Filters are reset
        When Uncheck the "Loans checkbox"
        When Click toggle Loans toggle
        When we click on Direct loans
        Then we see that "Direct loans" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Direct Loans
        When we click on Direct loans
        Then we see that "Direct loans" isn't checked
        When we click on Guaranteed/Insured loans
        Then we see that "Guaranteed/Insured loans" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Guaranteed/Insured Loans
        When we click on reset search
        Then Filters are reset

    @award_type_other
    Scenario: I want to verify that the Award Type filter behaves as expected when searching Other
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Award Type" filter dropdown
        And we click on Other toggle
        Then we see that Other checkbox is displayed
        And we see that Insurance is displayed
        And we see that Other financial assistance is displayed
        When we click on Other checkbox
        Then we see that "Other checkbox" is checked
        And we see that "Insurance" is checked
        And we see that "Other financial assistance" is checked
        When we click on Insurance
        Then we see that "Insurance" isn't checked
        And we see that "Other checkbox" isn't checked
        When we click on Other checkbox
        Then we see that "Other checkbox" is checked
        And we see that "Insurance" is checked
        And we see that "Other financial assistance" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of All Other
        When we click on reset search
        Then Filters are reset
        When Uncheck the "Other checkbox"
        When Click toggle Other toggle
        When we click on Insurance
        Then we see that "Insurance" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Insurance
        When we click on Insurance
        Then we see that "Insurance" isn't checked
        When we click on Other financial assistance
        Then we see that "Other financial assistance" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Type
        And we see that filter item 1 has a value of Other Financial Assistance
        When we click on reset search
        Then Filters are reset

    @agency
    Scenario: I want to verify that the Agency Filter behaves as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        Then I get a top header for "Advanced Search"
        When I click the "Agency" filter dropdown
        Then we see that Awarding Agency is displayed
        And we see that Funding Agency is displayed
        When we type "OPM" into "Awarding Agency"
        And I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Awarding Agency
        And we see that filter item 1 has a value of Office of Personnel Management (OPM)
        When we click on reset search
        Then Filters are reset
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        Then I get a top header for "Advanced Search"
        When I click the "Agency" filter dropdown
        When we type "Office of Personnel Management" into "Funding Agency"
        And I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Funding Agency
        And we see that filter item 1 has a value of Office of Personnel Management (OPM)
        When we click on reset search
        Then Filters are reset

    @negative_agency
    Scenario: I want run negative tests on the award filter
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        Then I get a top header for "Advanced Search"
        When I click the "Agency" filter dropdown
        Then we see that Awarding Agency is displayed
        And we see that Funding Agency is displayed
        When we type "Invalid Name" into "Awarding Agency"
        And we click on Funding Agency
        Then we see that Awarding Agency does not have a value
        When we type "Invalid Name" into "Awarding Agency"
        And we click on Awarding Agency
        Then we see that Funding Agency does not have a value

    @dropdown_autocomplete_agency
    Scenario: Check the autocomplete on the agency dropdown is working properly
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        Then I get a top header for "Advanced Search"
        When I click the "Agency" filter dropdown
        When we start to type "Agriculture" into "Awarding Agency"
        Then we see that Agency Autocomplete Option 1 has a value of Department of Agriculture (USDA)
        And we see that Agency Autocomplete Option 2 has a value of Food and Agriculture Organization  (FAO)Sub-Agency of Department of State (DOS)
        When we start to type "Agriculture" into "Funding Agency"
        Then we see that Agency Autocomplete Option 1 has a value of Department of Agriculture (USDA)
        And we see that Agency Autocomplete Option 2 has a value of Food and Agriculture Organization  (FAO)Sub-Agency of Department of State (DOS)

    @negative_award_amount
    Scenario: Check when a user enters invalid price ranges that functionality performs as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        Then I get a top header for "Advanced Search"
        When I click the "Award Amount" filter dropdown
        When we type "Invalid Min" into "min amount input"
        And we type "Invalid Max" into "max amount input"
        When we click on amount search
        Then we see that amount checkbox label is displayed
        And we see that amount checkbox label has a value of $0 & Above
        Then we see that amount checkbox is displayed
        And we see that "amount checkbox" is checked

    @recipient
    Scenario: I want to verify that the Recipient filter behaves as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient" filter dropdown
        And we type "Towson" into "Recipient input"
        Then we see that shown filter button is displayed
        And we see that shown filter button has a value of x RECIPIENT | Towson
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient
        And we see that filter item 1 has a value of RECIPIENT | Towson
        When we click on reset search
        Then Filters are reset
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient" filter dropdown
        When we type "626611685" into "Recipient input"
        Then we see that shown filter button is displayed
        And we see that shown filter button has a value of x RECIPIENT | 626611685
        When we click on reset search
        Then Filters are reset

    @recipient_type_business
    Scenario: I want to verify that the Recipient Type filter behaves as expected when searching business
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient Type" filter dropdown
        And we click on Business toggle
        Then we see that Business checkbox is displayed
        And we see that Small business is displayed
        And we see that Other than small business is displayed
        And we see that Corporate tax exempt is displayed
        And we see that Corporate not tax exempt is displayed
        And we see that Partnership is displayed
        And we see that Sole proprietorship is displayed
        And we see that Manufacturer is displayed
        And we see that Sub-chapter is displayed
        And we see that LLC is displayed
        When we click on Business checkbox
        Then we see that "Business checkbox" is checked
        And we see that "Small business" is checked
        And we see that "Other than small business" is checked
        And we see that "Corporate tax exempt" is checked
        And we see that "Corporate not tax exempt" is checked
        And we see that "Partnership" is checked
        And we see that "Sole proprietorship" is checked
        And we see that "Manufacturer" is checked
        And we see that "Sub-chapter" is checked
        And we see that "LLC" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of All Business
        When we click on reset search
        Then Filters are reset
        When Uncheck the "Business checkbox"
        When Click toggle Business toggle
        Then we see that "Business checkbox" isn't checked
        And we see that "Small business" isn't checked
        And we see that "Other than small business" isn't checked
        And we see that "Corporate tax exempt" isn't checked
        And we see that "Corporate not tax exempt" isn't checked
        And we see that "Partnership" isn't checked
        And we see that "Sole proprietorship" isn't checked
        And we see that "Manufacturer" isn't checked
        And we see that "Sub-chapter" isn't checked
        And we see that "LLC" isn't checked
        When we click on Small business
        Then we see that "Small business" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Small Business
        When we click on Small business
        Then we see that "Small business" isn't checked
        When we click on Other than small business
        Then we see that "Other than small business" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Other Than Small Business
        When we click on Other than small business
        Then we see that "Other than small business" isn't checked
        When we click on Corporate tax exempt
        Then we see that "Corporate tax exempt" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Corporate Entity Tax Exempt
        When we click on Corporate tax exempt
        Then we see that "Corporate tax exempt" isn't checked
        When we click on Corporate not tax exempt
        Then we see that "Corporate not tax exempt" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Corporate Entity Not Tax Exempt
        When we click on Corporate not tax exempt
        Then we see that "Corporate not tax exempt" isn't checked
        When we click on Partnership
        Then we see that "Partnership" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Partnership or Limited Liability Partnership
        When we click on Partnership
        Then we see that "Partnership" isn't checked
        When we click on Sole proprietorship
        Then we see that "Sole proprietorship" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Sole Proprietorship
        When we click on Sole proprietorship
        Then we see that "Sole proprietorship" isn't checked
        When we click on Manufacturer
        Then we see that "Manufacturer" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Manufacturer of Goods
        When we click on Manufacturer
        Then we see that "Manufacturer" isn't checked
        When we click on Sub-chapter
        Then we see that "Sub-chapter" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Sub-Chapter S Corporation
        When we click on Sub-chapter
        Then we see that "Sub-chapter" isn't checked
        When we click on LLC
        Then we see that "LLC" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Limited Liability Corporation (LLC)
        When we click on reset search
        Then Filters are reset

    @recipient_type_minority
    Scenario: I want to verify that the Recipient Type filter behaves as expected when searching minority-owned business
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient Type" filter dropdown
        And I click on Minority owned business toggle
        Then we see that Minority owned business checkbox is displayed
        And we see that Alaskan Native is displayed
        And we see that American Indian is displayed
        And we see that Asian Pacific is displayed
        And we see that Black is displayed
        And we see that Hispanic is displayed
        And we see that Native American is displayed
        And we see that Native Hawaiian is displayed
        And we see that Subcontinent Asian Indian is displayed
        And we see that Tribally Owned is displayed
        And we see that Other Minority is displayed
        When we click on Minority owned business checkbox
        Then we see that "Minority owned business checkbox" is checked
        And we see that "Alaskan Native" is checked
        And we see that "American Indian" is checked
        And we see that "Asian Pacific" is checked
        And we see that "Black" is checked
        And we see that "Hispanic" is checked
        And we see that "Native American" is checked
        And we see that "Native Hawaiian" is checked
        And we see that "Subcontinent Asian Indian" is checked
        And we see that "Tribally Owned" is checked
        And we see that "Other Minority" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of All Minority Owned Business
        When we click on reset search
        Then Filters are reset
        When Uncheck the "Minority owned business checkbox"
        When Click toggle Minority owned business toggle
        Then we see that "Minority owned business checkbox" isn't checked
        And we see that "Alaskan Native" isn't checked
        And we see that "American Indian" isn't checked
        And we see that "Asian Pacific" isn't checked
        And we see that "Black" isn't checked
        And we see that "Hispanic" isn't checked
        And we see that "Native American" isn't checked
        And we see that "Native Hawaiian" isn't checked
        And we see that "Subcontinent Asian Indian" isn't checked
        And we see that "Tribally Owned" isn't checked
        And we see that "Other Minority" isn't checked
        When we click on Alaskan Native
        Then we see that "Alaskan Native" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Alaskan Native Owned Business
        When we click on Alaskan Native
        Then we see that "Alaskan Native" isn't checked
        When we click on American Indian
        Then we see that "American Indian" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of American Indian Owned Business
        When we click on American Indian
        Then we see that "American Indian" isn't checked
        When we click on Asian Pacific
        Then we see that "Asian Pacific" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Asian Pacific American Owned Business
        When we click on Asian Pacific
        Then we see that "Asian Pacific" isn't checked
        When we click on Black
        Then we see that "Black" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Black American Owned Business
        When we click on Black
        Then we see that "Black" isn't checked
        When we click on Hispanic
        Then we see that "Hispanic" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Hispanic American Owned Business
        When we click on Hispanic
        Then we see that "Hispanic" isn't checked
        When we click on Native American
        Then we see that "Native American" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Native American Owned Business
        When we click on Native American
        Then we see that "Native American" isn't checked
        When we click on Native Hawaiian
        Then we see that "Native Hawaiian" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Native Hawaiian Owned Business
        When we click on Native Hawaiian
        Then we see that "Native Hawaiian" isn't checked
        When we click on Subcontinent Asian Indian
        Then we see that "Subcontinent Asian Indian" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Subcontinent Asian Indian American Owned Business
        When we click on Subcontinent Asian Indian
        Then we see that "Subcontinent Asian Indian" isn't checked
        When we click on Tribally Owned
        Then we see that "Tribally Owned" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Tribally Owned Business
        When we click on Tribally Owned
        Then we see that "Tribally Owned" isn't checked
        When we click on Other Minority
        Then we see that "Other Minority" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Other Minority Owned Business
        When we click on reset search
        Then Filters are reset

    @recipient_type_women
    Scenario: I want to verify that the Recipient Type filter behaves as expected when searching women owned business
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient Type" filter dropdown
        And we click on Women owned business toggle
        Then we see that Women owned business checkbox is displayed
        And we see that Women owned small business is displayed
        And we see that Economically disadvantages is displayed
        And we see that Joint venture is displayed
        And we see that Joint venture disadvantaged is displayed
        When we click on Women owned business checkbox
        Then we see that "Women owned business checkbox" is checked
        And we see that "Women owned small business" is checked
        And we see that "Economically disadvantages" is checked
        And we see that "Joint venture" is checked
        And we see that "Joint venture disadvantaged" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of All Women Owned Business
        When Uncheck the "Women owned business checkbox"
        When Click toggle Women owned business toggle
        Then we see that "Women owned small business" isn't checked
        And we see that "Economically disadvantages" isn't checked
        And we see that "Joint venture" isn't checked
        And we see that "Joint venture disadvantaged" isn't checked
        When we click on Women owned small business
        Then we see that "Women owned small business" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Women Owned Small Business
        When we click on Women owned small business
        Then we see that "Women owned small business" isn't checked
        When we click on Economically disadvantages
        Then we see that "Economically disadvantages" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Economically Disadvantaged Women Owned Small Business
        When we click on Economically disadvantages
        Then we see that "Economically disadvantages" isn't checked
        When we click on Joint venture
        Then we see that "Joint venture" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Joint Venture Women Owned Small Business
        When we click on Joint venture
        Then we see that "Joint venture" isn't checked
        When we click on Joint venture disadvantaged
        Then we see that "Joint venture disadvantaged" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Joint Venture Economically Disadvantaged Women Owned Small Business
        When we click on reset search
        Then Filters are reset

    @recipient_type_veteran
    Scenario: I want to verify that the Recipient Type filter behaves as expected when searching veteran owned business
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient Type" filter dropdown
        And we click on Veteran owned business toggle
        Then we see that Veteran owned business checkbox is displayed
        And we see that Service disabled veteran owned is displayed
        When we click on Veteran owned business checkbox
        Then we see that "Veteran owned business checkbox" is checked
        And we see that "Service disabled veteran owned" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of All Veteran Owned Business
        When Uncheck the "Veteran owned business checkbox"
        When Click toggle Veteran owned business toggle
        Then we see that "Service disabled veteran owned" isn't checked
        When we click on Service disabled veteran owned
        Then we see that "Service disabled veteran owned" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Service Disabled Veteran Owned Business
        When we click on reset search
        Then Filters are reset

    @recipient_type_special
    Scenario: I want to verify that the Recipient Type filter behaves as expected when searching special designations
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient Type" filter dropdown
        And we click on Special designation toggle
        Then we see that Special designation checkbox is displayed
        And we see that 8a is displayed
        And we see that Ability One is displayed
        And we see that DoT Certified is displayed
        And we see that Emerging Small Business is displayed
        And we see that Federally Funded R&D is displayed
        And we see that HUBZone Firm is displayed
        And we see that Labor Surplus Firm is displayed
        And we see that SBA 8a is displayed
        And we see that Self-Certified Small Business is displayed
        And we see that Small Agricultural Coop is displayed
        And we see that Small Disadvantaged Business is displayed
        And we see that Community Developed is displayed
        And we see that US Owned Business is displayed
        And we see that Foreign-Owned US Business is displayed
        And we see that Foreign-Owned & Located Business is displayed
        And we see that Foreign Government is displayed
        And we see that International Organization is displayed
        And we see that Domestic Shelter is displayed
        And we see that Hospital is displayed
        And we see that Veterinary Hospital is displayed

        When we click on Special designation checkbox
        Then we see that "Special designation checkbox" is checked
        And we see that "8a" is checked
        And we see that "Ability One" is checked
        And we see that "DoT Certified" is checked
        And we see that "Emerging Small Business" is checked
        And we see that "Federally Funded R&D" is checked
        And we see that "HUBZone Firm" is checked
        And we see that "Labor Surplus Firm" is checked
        And we see that "SBA 8a" is checked
        And we see that "Self-Certified Small Business" is checked
        And we see that "Small Agricultural Coop" is checked
        And we see that "Small Disadvantaged Business" is checked
        And we see that "Community Developed" is checked
        And we see that "US Owned Business" is checked
        And we see that "Foreign-Owned US Business" is checked
        And we see that "Foreign-Owned & Located Business" is checked
        And we see that "Foreign Government" is checked
        And we see that "International Organization" is checked
        And we see that "Domestic Shelter" is checked
        And we see that "Hospital" is checked
        And we see that "Veterinary Hospital" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of All Special Designations
        When Uncheck the "Special designation checkbox"
        When Click toggle Special designation toggle

        Then we see that "8a" isn't checked
        And we see that "Ability One" isn't checked
        And we see that "DoT Certified" isn't checked
        And we see that "Emerging Small Business" isn't checked
        And we see that "Federally Funded R&D" isn't checked
        And we see that "HUBZone Firm" isn't checked
        And we see that "Labor Surplus Firm" isn't checked
        And we see that "SBA 8a" isn't checked
        And we see that "Self-Certified Small Business" isn't checked
        And we see that "Small Agricultural Coop" isn't checked
        And we see that "Small Disadvantaged Business" isn't checked
        And we see that "Community Developed" isn't checked
        And we see that "US Owned Business" isn't checked
        And we see that "Foreign-Owned US Business" isn't checked
        And we see that "Foreign-Owned & Located Business" isn't checked
        And we see that "Foreign Government" isn't checked
        And we see that "International Organization" isn't checked
        And we see that "Domestic Shelter" isn't checked
        And we see that "Hospital" isn't checked
        And we see that "Veterinary Hospital" isn't checked

        When we click on 8a
        Then we see that "8a" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of 8a Program Participant
        When we click on 8a
        Then we see that "8a" isn't checked
        When we click on Ability One
        Then we see that "Ability One" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Ability One Program
        When we click on Ability One
        Then we see that "Ability One" isn't checked
        When we click on DoT Certified
        Then we see that "DoT Certified" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of DoT Certified Disadvantaged Business Enterprise
        When we click on DoT Certified
        Then we see that "DoT Certified" isn't checked
        When we click on Emerging Small Business
        Then we see that "Emerging Small Business" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Emerging Small Business
        When we click on Emerging Small Business
        Then we see that "Emerging Small Business" isn't checked
        When we click on Federally Funded R&D
        Then we see that "Federally Funded R&D" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Federally Funded Research and Development Corp
        When we click on Federally Funded R&D
        Then we see that "Federally Funded R&D" isn't checked
        When we click on HUBZone Firm
        Then we see that "HUBZone Firm" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Historically Underutilized Business (HUBZone) Firm
        When we click on HUBZone Firm
        Then we see that "HUBZone Firm" isn't checked
        When we click on Labor Surplus Firm
        Then we see that "Labor Surplus Firm" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Labor Surplus Area Firm
        When we click on Labor Surplus Firm
        Then we see that "Labor Surplus Firm" isn't checked
        When we click on SBA 8a
        Then we see that "SBA 8a" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of SBA Certified 8a Joint Venture
        When we click on SBA 8a
        Then we see that "SBA 8a" isn't checked
        When we click on Self-Certified Small Business
        Then we see that "Self-Certified Small Business" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Self-Certified Small Disadvanted Business
        When we click on Self-Certified Small Business
        Then we see that "Self-Certified Small Business" isn't checked
        When we click on Small Agricultural Coop
        Then we see that "Small Agricultural Coop" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Small Agricultural Cooperative
        When we click on Small Agricultural Coop
        Then we see that "Small Agricultural Coop" isn't checked
        When we click on Small Disadvantaged Business
        Then we see that "Small Disadvantaged Business" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Small Disadvantaged Business
        When we click on Small Disadvantaged Business
        Then we see that "Small Disadvantaged Business" isn't checked
        When we click on Community Developed
        Then we see that "Community Developed" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Community Developed Corporation Owned Firm
        When we click on Community Developed
        Then we see that "Community Developed" isn't checked
        When we click on US Owned Business
        Then we see that "US Owned Business" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of U.S. Owned Business
        When we click on US Owned Business
        Then we see that "US Owned Business" isn't checked
        When we click on Foreign-Owned US Business
        Then we see that "Foreign-Owned US Business" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Foreign-Owned and U.S. Located Business
        When we click on Foreign-Owned US Business
        Then we see that "Foreign-Owned US Business" isn't checked
        When we click on Foreign Government
        Then we see that "Foreign Government" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Foreign Government
        When we click on Foreign Government
        Then we see that "Foreign Government" isn't checked
        When we click on International Organization
        Then we see that "International Organization" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of International Organization
        When we click on International Organization
        Then we see that "International Organization" isn't checked
        When we click on Domestic Shelter
        Then we see that "Domestic Shelter" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Domestic Shelter
        When we click on Domestic Shelter
        Then we see that "Domestic Shelter" isn't checked
        When we click on Hospital
        Then we see that "Hospital" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Hospital
        When we click on Hospital
        Then we see that "Hospital" isn't checked
        When we click on Veterinary Hospital
        Then we see that "Veterinary Hospital" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Veterinary Hospital
        When we click on reset search
        Then Filters are reset

    @recipient_type_nonprofit
    Scenario: I want to verify that the Recipient Type filter behaves as expected when searching nonprofits
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient Type" filter dropdown
        And we click on Nonprofit toggle
        Then we see that Nonprofit checkbox is displayed
        And we see that Foundation is displayed
        And we see that Community Development Corporations is displayed
        When we click on Nonprofit checkbox
        Then we see that "Nonprofit checkbox" is checked
        And we see that "Foundation" is checked
        And we see that "Community Development Corporations" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of All Nonprofit
        When Uncheck the "Nonprofit checkbox"
        When Click toggle Nonprofit toggle
        Then we see that "Foundation" isn't checked
        And we see that "Community Development Corporations" isn't checked
        When we click on Foundation
        Then we see that "Foundation" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Foundation
        When we click on Foundation
        Then we see that "Foundation" isn't checked
        When we click on Community Development Corporations
        Then we see that "Community Development Corporations" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Community Development Corporations
        When we click on reset search
        Then Filters are reset

    @recipient_type_ed
    Scenario: I want to verify that the Recipient Type filter behaves as expected when searching education
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient Type" filter dropdown
        And we click on Higher Education toggle
        Then we see that Higher Education checkbox is displayed
        And we see that Public Institution is displayed
        And we see that Private Institution is displayed
        And we see that Minority-Serving is displayed
        And we see that School of Forestry is displayed
        And we see that Veterinary College is displayed
        When we click on Higher Education checkbox
        Then we see that "Higher Education checkbox" is checked
        And we see that "Public Institution" is checked
        And we see that "Private Institution" is checked
        And we see that "Minority-Serving" is checked
        And we see that "School of Forestry" is checked
        And we see that "Veterinary College" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of All Higher Education
        When Uncheck the "Higher Education checkbox"
        When Click toggle Higher Education toggle
        When we click on Public Institution
        Then we see that "Public Institution" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Public Institution of Higher Education
        When we click on Public Institution
        Then we see that "Public Institution" isn't checked
        When we click on Private Institution
        Then we see that "Private Institution" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Private Institution of Higher Education
        When we click on Private Institution
        Then we see that "Private Institution" isn't checked
        When we click on Minority-Serving
        Then we see that "Minority-Serving" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Minority-Serving Institution of Higher Education
        When we click on Minority-Serving
        Then we see that "Minority-Serving" isn't checked
        When we click on School of Forestry
        Then we see that "School of Forestry" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of School of Forestry
        When we click on School of Forestry
        Then we see that "School of Forestry" isn't checked
        When we click on Veterinary College
        Then we see that "Veterinary College" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Veterinary College
        When we click on reset search
        Then Filters are reset

    @recipient_type_gov
    Scenario: I want to verify that the Recipient Type filter behaves as expected when searching governments
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient Type" filter dropdown
        When we click on Government toggle
        Then we see that Government checkbox is displayed
        And we see that National Government is displayed
        And we see that Interstate Entity is displayed
        And we see that Regional and State is displayed
        And we see that Regional Organization is displayed
        And we see that US Territory is displayed
        And we see that Council of Government is displayed
        And we see that Local Government is displayed
        And we see that Indian Native American Tribal Government is displayed
        And we see that Authorities and Commissions is displayed
        When we click on Government checkbox
        Then we see that "Government checkbox" is checked
        And we see that "National Government" is checked
        And we see that "Interstate Entity" is checked
        And we see that "Regional and State" is checked
        And we see that "Regional Organization" is checked
        And we see that "US Territory" is checked
        And we see that "Council of Government" is checked
        And we see that "Local Government" is checked
        And we see that "Indian Native American Tribal Government" is checked
        And we see that "Authorities and Commissions" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of All Government
        When Uncheck the "Government checkbox"
        When Click toggle Government toggle
        Then we see that "National Government" isn't checked
        And we see that "Interstate Entity" isn't checked
        And we see that "Regional and State" isn't checked
        And we see that "Regional Organization" isn't checked
        And we see that "US Territory" isn't checked
        And we see that "Council of Government" isn't checked
        And we see that "Local Government" isn't checked
        And we see that "Indian Native American Tribal Government" isn't checked
        And we see that "Authorities and Commissions" isn't checked
        When we click on National Government
        Then we see that "National Government" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of National Government
        When we click on National Government
        Then we see that "National Government" isn't checked
        When we click on Interstate Entity
        Then we see that "Interstate Entity" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Interstate Entity
        When we click on Interstate Entity
        Then we see that "Interstate Entity" isn't checked
        When we click on Regional and State
        Then we see that "Regional and State" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Regional and State Government
        When we click on Regional and State
        Then we see that "Regional and State" isn't checked
        When we click on Regional Organization
        Then we see that "Regional Organization" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Regional Organization
        When we click on Regional Organization
        Then we see that "Regional Organization" isn't checked
        When we click on US Territory
        Then we see that "US Territory" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of U.S. Territory or Possession
        When we click on US Territory
        Then we see that "US Territory" isn't checked
        When we click on Council of Government
        Then we see that "Council of Government" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Council of Governments
        When we click on Council of Government
        Then we see that "Council of Government" isn't checked
        When we click on Local Government
        Then we see that "Local Government" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Local Government
        When we click on Local Government
        Then we see that "Local Government" isn't checked
        When we click on Indian Native American Tribal Government
        Then we see that "Indian Native American Tribal Government" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Indian Native American Tribal Government
        When we click on Indian Native American Tribal Government
        Then we see that "Indian Native American Tribal Government" isn't checked
        When we click on Authorities and Commissions
        Then we see that "Authorities and Commissions" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of Authorities and Commissions
        When we click on reset search
        Then Filters are reset

    @recipient_type_individual
    Scenario: I want to verify that the Recipient Type filter behaves as expected when searching individuals
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient Type" filter dropdown
        Then we see that Individuals checkbox is displayed
        When we click on Individuals checkbox
        Then we see that "Individuals checkbox" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Type
        And we see that filter item 1 has a value of All Individuals
        When we click on reset search
        Then Filters are reset

    @award_amount
    Scenario: I want to verify that the Recipient Type filter behaves as expected when searching individuals
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Award Amount" filter dropdown
        Then we see that Under $1m checkbox is displayed
        And we see that $1m-$25m checkbox is displayed
        And we see that $25m-$100m checkbox is displayed
        And we see that $100m-$500m checkbox is displayed
        And we see that $500m & Above is displayed
        And we see that min amount input is displayed
        And we see that max amount input is displayed
        And we see that amount search is displayed
        When we click on Under $1m checkbox
        Then we see that "Under $1m checkbox" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Amounts
        And we see that filter item 1 has a value of Under $1M
        When we click on Under $1m checkbox
        Then we see that "Under $1m checkbox" isn't checked
        When we click on $1m-$25m checkbox
        Then we see that "$1m-$25m checkbox" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Amounts
        And we see that filter item 1 has a value of $1M - $25M
        When we click on $1m-$25m checkbox
        Then we see that "$1m-$25m checkbox" isn't checked
        When we click on $25m-$100m checkbox
        Then we see that "$25m-$100m checkbox" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Amounts
        And we see that filter item 1 has a value of $25M - $100M
        When we click on $25m-$100m checkbox
        Then we see that "$25m-$100m checkbox" isn't checked
        When we click on $100m-$500m checkbox
        Then we see that "$100m-$500m checkbox" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Amounts
        And we see that filter item 1 has a value of $100M - $500M
        When we click on $100m-$500m checkbox
        Then we see that "$100m-$500m checkbox" isn't checked
        When we click on $500m & Above
        Then we see that "$500m & Above" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Amounts
        And we see that filter item 1 has a value of $500M & Above
        When we click on reset search
        Then Filters are reset

        When I type "100000" into "min amount input"
        And I type "500000" into "max amount input"
        And we click on amount search
        Then we see that amount checkbox is displayed
        And we see that "amount checkbox" is checked
        And we see that amount checkbox label has a value of $100k - $500k
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award Amounts
        And we see that filter item 1 has a value of $100k - $500k
        When we click on reset search
        Then Filters are reset


    @award_id
    Scenario: I want to verify that the Award ID filter behaves as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Award ID" filter dropdown
        And we type "DEAC5207NA27344" into "Award ID input"
        Then we see that shown filter button has a value of Close icon DEAC5207NA27344 | Award ID
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award ID
        And we see that filter item 1 has a value of DEAC5207NA27344 | Award ID
        When we click on reset search
        Then Filters are reset

        When we type "HSHQDC08C00129" into "Award ID input"
        Then we see that shown filter button has a value of Close icon HSHQDC08C00129 | Award ID
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award ID
        And we see that filter item 1 has a value of HSHQDC08C00129 | Award ID
        When we click on reset search
        Then Filters are reset

        When we type "DEEE0004561" into "Award ID input"
        Then we see that shown filter button has a value of Close icon DEEE0004561 | Award ID
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award ID
        And we see that filter item 1 has a value of DEEE0004561 | Award ID
        When we click on reset search
        Then Filters are reset

        When we type "6410920161113793" into "Award ID input"
        Then we see that shown filter button has a value of Close icon 6410920161113793 | Award ID
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award ID
        And we see that filter item 1 has a value of 6410920161113793 | Award ID
        When we click on reset search
        Then Filters are reset

        When we type "P268K112333" into "Award ID input"
        Then we see that shown filter button has a value of Close icon P268K112333 | Award ID
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award ID
        And we see that filter item 1 has a value of P268K112333 | Award ID
        When we click on reset search
        Then Filters are reset

        When we type "SINLEC16VC0243" into "Award ID input"
        Then we see that shown filter button has a value of Close icon SINLEC16VC0243 | Award ID
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Award ID
        And we see that filter item 1 has a value of SINLEC16VC0243 | Award ID
        When we click on reset search
        Then Filters are reset

    @cfda
    Scenario: I want to verify that the CFDA filter behaves as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "CFDA Program" filter dropdown
        When we type "93.778" into "CFDA"
        Then we see that shown filter button has a value of Close icon 93.778 | Medical Assistance Program
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of CFDA
        And we see that filter item 1 has a value of 93.778 | Medical Assistance Program
        When we click on reset search
        Then Filters are reset

        When Click toggle CFDA filter
        When we type "64.012" into "CFDA"
        Then we see that shown filter button has a value of Close icon 64.012 | Veterans Prescription Service
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of CFDA
        And we see that filter item 1 has a value of 64.012 | Veterans Prescription Service
        When we click on reset search
        Then Filters are reset

        When Click toggle CFDA filter
        When we type "10.320" into "CFDA"
        Then we see that shown filter button has a value of Close icon 10.320 | Sun Grant Program
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of CFDA
        And we see that filter item 1 has a value of 10.320 | Sun Grant Program
        When we click on reset search
        Then Filters are reset

    @naics
    Scenario: I want to verify that the NAICS filter behaves as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "NAICS" filter dropdown
        And we enter "336411" into "NAICS" search
        And we select "336411"
        Then we see the filter tag for "33 - Manufacturing"
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of NAICS
        And we see that filter item 1 has a value of 33 - Manufacturing (1)
        When we click on reset search
        Then Filters are reset

    @psc
    Scenario: I want to verify that the PSC filter behaves as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "PSC" filter dropdown
        When we enter "1510" into "PSC" search
        And we select "1510"
        Then we see the filter tag for "Product"
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of PSC
        And we see that filter item 1 has a value of Product (1)
        When we click on reset search
        Then Filters are reset


    @tas
    Scenario: I want to verify that the TAS filter behaves as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "TAS" filter dropdown
        And we enter "097-011-X-8242-000" into "TAS" search
        And we select "097-011-X-8242-000"
        Then we see the filter tag for "Department of Defense (DOD)"
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Treasury Account
        And we see that filter item 1 has a value of Department of Defense (DOD) (1)
        When we click on reset search
        Then Filters are reset


    @contract_pricing
    Scenario: I want to verify that the Contract Pricing filter behaves as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When we click on Contract pricing toggle
        Then we see that Combination is displayed
        And we see that Cost No Fee is displayed
        And we see that Cost Plus Award Fee is displayed
        And we see that Cost Plus Fixed Fee is displayed
        And we see that Cost Plus Incentive Fee is displayed
        When we click on See more toggle
        Then we see that Cost Sharing is displayed
        And we see that Firm Fixed Price is displayed
        And we see that Fixed Price Incentive is displayed
        And we see that Fixed Price Level of Effort is displayed
        And we see that Fixed Price Redetermination is displayed
        And we see that Fixed Price with Economic Price Adjustment is displayed
        And we see that Labor Hours is displayed
        And we see that Order Department is displayed
        And we see that Other is displayed
        And we see that Time and Materials is displayed
        When we click on Combination
        Then we see that "Combination" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Combination
        When we click on Combination
        Then we see that "Combination" isn't checked
        When we click on Cost No Fee
        Then we see that "Cost No Fee" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Cost No Fee
        When we click on Cost No Fee
        Then we see that "Cost No Fee" isn't checked
        When we click on Cost Plus Award Fee
        Then we see that "Cost Plus Award Fee" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Cost Plus Award Fee
        When we click on Cost Plus Award Fee
        Then we see that "Cost Plus Award Fee" isn't checked
        When we click on Cost Plus Fixed Fee
        Then we see that "Cost Plus Fixed Fee" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Cost Plus Fixed Fee
        When we click on Cost Plus Fixed Fee
        Then we see that "Cost Plus Fixed Fee" isn't checked
        When we click on Cost Plus Incentive Fee
        Then we see that "Cost Plus Incentive Fee" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Cost Plus Incentive Fee
        When we click on Cost Plus Incentive Fee
        Then we see that "Cost Plus Incentive Fee" isn't checked
        When Click toggle See more toggle
        When we click on Cost Sharing
        Then we see that "Cost Sharing" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Cost Sharing
        When we click on Cost Sharing
        Then we see that "Cost Sharing" isn't checked
        When we click on Firm Fixed Price
        Then we see that "Firm Fixed Price" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Firm Fixed Price
        When we click on Firm Fixed Price
        Then we see that "Firm Fixed Price" isn't checked
        When we click on Fixed Price Award Fee
        Then we see that "Fixed Price Award Fee" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Fixed Price Award Fee
        When we click on Fixed Price Award Fee
        Then we see that "Fixed Price Award Fee" isn't checked
        When we click on Fixed Price Incentive
        Then we see that "Fixed Price Incentive" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Fixed Price Incentive
        When we click on Fixed Price Incentive
        Then we see that "Fixed Price Incentive" isn't checked
        When we click on Fixed Price Level of Effort
        Then we see that "Fixed Price Level of Effort" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Fixed Price Level of Effort
        When we click on Fixed Price Level of Effort
        Then we see that "Fixed Price Level of Effort" isn't checked
        When we click on Fixed Price Redetermination
        Then we see that "Fixed Price Redetermination" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Fixed Price Redetermination
        When we click on Fixed Price Redetermination
        Then we see that "Fixed Price Redetermination" isn't checked
        When we click on Fixed Price with Economic Price Adjustment
        Then we see that "Fixed Price with Economic Price Adjustment" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Fixed Price with Economic Price Adjustment
        When we click on Fixed Price with Economic Price Adjustment
        Then we see that "Fixed Price with Economic Price Adjustment" isn't checked
        When we click on Labor Hours
        Then we see that "Labor Hours" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Labor Hours
        When we click on Labor Hours
        Then we see that "Labor Hours" isn't checked
        When we click on Order Department
        Then we see that "Order Department" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Order Dependent
        When we click on Order Department
        Then we see that "Order Department" isn't checked
        When we click on Other
        Then we see that "Other" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Other
        When we click on Other
        Then we see that "Other" isn't checked
        When we click on Time and Materials
        Then we see that "Time and Materials" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Contract Pricing
        And we see that filter item 1 has a value of Time and Materials
        When we click on reset search
        Then Filters are reset

    @set_aside
    Scenario: I want to verify that the Type of set aside filter behaves as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When we click on Set aside toggle
        Then we see that 8a sole source is displayed
        And we see that 8a HUBZone is displayed
        And we see that 8a Competed is displayed
        And we see that Buy Indian is displayed
        And we see that Combination HUBZONE 8a is displayed
        When we click on Set aside see more toggle
        Then we see that Econ-disadvantaged women-owned small is displayed
        And we see that Emerging small business set aside is displayed
        And we see that HBCU or MI Partial is displayed
        And we see that HBCU or MI Total is displayed
        And we see that HUBZone Set aside is displayed
        And we see that HUBZone Sole Source is displayed
        And we see that Indian Economic Enterprise is displayed
        And we see that Indian Small Business is displayed
        And we see that No Set Aside Used is displayed
        And we see that Reserved for small business is displayed
        And we see that SDB Set-Aside is displayed
        And we see that SDVOSB Sole Source is displayed
        And we see that Service-Disabled Veteran Set Aside is displayed
        And we see that Small Business Set-Aside Partial is displayed
        And we see that Small Business Set-Aside Total is displayed
        And we see that Very Small Business Set-Aside is displayed
        And we see that Veteran Set-Aside is displayed
        And we see that Veteran Sole Source is displayed
        And we see that Women-Owned small business set aside is displayed

        When we click on 8a sole source
        Then we see that "8a sole source" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of 8(a) Sole Source

        When we click on 8a sole source
        Then we see that "8a sole source" isn't checked
        When we click on 8a HUBZone
        Then we see that "8a HUBZone" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of 8(a) with HUBZone Preference

        When we click on 8a HUBZone
        Then we see that "8a HUBZone" isn't checked
        When we click on 8a Competed
        Then we see that "8a Competed" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of 8A Competed

        When we click on 8a Competed
        Then we see that "8a Competed" isn't checked
        When we click on Buy Indian
        Then we see that "Buy Indian" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of Buy Indian

        When we click on Buy Indian
        Then we see that "Buy Indian" isn't checked
        When we click on Combination HUBZONE 8a
        Then we see that "Combination HUBZONE 8a" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of Combination HUBZone and 8(a)

        When Click toggle Set aside see more toggle

        When we click on Combination HUBZONE 8a
        Then we see that "Combination HUBZONE 8a" isn't checked
        When we click on Econ-disadvantaged women-owned small
        Then we see that "Econ-disadvantaged women-owned small" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of Economically-Disadvantaged Women-Owned Small Business

        When we click on Econ-disadvantaged women-owned small
        Then we see that "Econ-disadvantaged women-owned small" isn't checked
        When we click on Emerging small business set aside
        Then we see that "Emerging small business set aside" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of Emerging Small Business Set-Aside

        When we click on Emerging small business set aside
        Then we see that "Emerging small business set aside" isn't checked
        When we click on HBCU or MI Partial
        Then we see that "HBCU or MI Partial" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of HBCU or MI Set-Aside - Partial

        When we click on HBCU or MI Partial
        Then we see that "HBCU or MI Partial" isn't checked
        When we click on HBCU or MI Total
        Then we see that "HBCU or MI Total" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of HBCU or MI Set-Aside - Total

        When we click on HBCU or MI Total
        Then we see that "HBCU or MI Total" isn't checked
        When we click on HUBZone Set aside
        Then we see that "HUBZone Set aside" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of HUBZone Set-Aside

        When we click on HUBZone Set aside
        Then we see that "HUBZone Set aside" isn't checked
        When we click on HUBZone Sole Source
        Then we see that "HUBZone Sole Source" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of HUBZone Sole Source


        When we click on HUBZone Sole Source
        Then we see that "HUBZone Sole Source" isn't checked
        When we click on Indian Economic Enterprise
        Then we see that "Indian Economic Enterprise" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of Indian Economic Enterprise

        When we click on Indian Economic Enterprise
        Then we see that "Indian Economic Enterprise" isn't checked
        When we click on Indian Small Business
        Then we see that "Indian Small Business" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of Indian Small Business Economic Enterprise

        When we click on Indian Small Business
        Then we see that "Indian Small Business" isn't checked
        When we click on No Set Aside Used
        Then we see that "No Set Aside Used" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of No Set Aside Used

        When we click on No Set Aside Used
        Then we see that "No Set Aside Used" isn't checked
        When we click on Reserved for small business
        Then we see that "Reserved for small business" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of Reserved for Small Business $2,501 to $100K

        When we click on Reserved for small business
        Then we see that "Reserved for small business" isn't checked
        When we click on SDB Set-Aside
        Then we see that "SDB Set-Aside" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of SDB Set-Aside 8(a)

        When we click on SDB Set-Aside
        Then we see that "SDB Set-Aside" isn't checked
        When we click on SDVOSB Sole Source
        Then we see that "SDVOSB Sole Source" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of SDVOSB Sole Source

        When we click on SDVOSB Sole Source
        Then we see that "SDVOSB Sole Source" isn't checked
        When we click on Service-Disabled Veteran Set Aside
        Then we see that "Service-Disabled Veteran Set Aside" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of Service-Disabled Veteran-Owned Small Business Set-Aside

        When we click on Service-Disabled Veteran Set Aside
        Then we see that "Service-Disabled Veteran Set Aside" isn't checked

    #typo in 'business', commented out until fixed

        # When we click on Small Business Set-Aside Partial
        # Then we see that "Small Business Set-Aside Partial" is checked
        # When I hit Submit Search
        # And Wait for table to load
        # Then we see that Active filter label has a value of 1 Active Filter:
        # And we see that filter group 1 title has a value of Type of Set Aside
        # And we see that filter item 1 has a value of Small Business Set-Aside - Partial

        # When we click on Small Business Set-Aside Partial
        # Then we see that "Small Business Set-Aside Partial" isn't checked
        # When we click on Small Business Set-Aside Total
        # Then we see that "Small Business Set-Aside Total" is checked
        # When I hit Submit Search
        # And Wait for table to load
        # Then we see that Active filter label has a value of 1 Active Filter:
        # And we see that filter group 1 title has a value of Type of Set Aside
        # And we see that filter item 1 has a value of Small Business Set-Aside - Total

        # When we click on Small Business Set-Aside Total
        # Then we see that "Small Business Set-Aside Total" isn't checked
        When we click on Very Small Business Set-Aside
        Then we see that "Very Small Business Set-Aside" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of Very Small Business Set-Aside

        When we click on Very Small Business Set-Aside
        Then we see that "Very Small Business Set-Aside" isn't checked
        When we click on Veteran Set-Aside
        Then we see that "Veteran Set-Aside" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of Veteran Set-Aside

        When we click on Veteran Set-Aside
        Then we see that "Veteran Set-Aside" isn't checked
        When we click on Veteran Sole Source
        Then we see that "Veteran Sole Source" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of Veteran Sole Source

        When we click on Veteran Sole Source
        Then we see that "Veteran Sole Source" isn't checked
        When we click on Women-Owned small business set aside
        Then we see that "Women-Owned small business set aside" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Type of Set Aside
        And we see that filter item 1 has a value of Women-Owned Small Business
        When we click on reset search
        Then Filters are reset

    @extent_completed
    Scenario: I want to verify that the Extent Completed filter behaves as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When we click on Extent competed filter toggle
        Then we see that Competed under SAP is displayed
        And we see that Competitive Delivery Order is displayed
        And we see that Follow On to Competed Action is displayed
        And we see that Full and Open Competition is displayed
        And we see that Full and Open Competition after exclusion is displayed
        When we click on extent competed see more toggle
        Then we see that Non-Competitive Delivery Order is displayed
        And we see that Not Available for Competition is displayed
        And we see that Not Competed is displayed
        And we see that Not Competed under SAP is displayed
        When we click on Competed under SAP
        Then we see that "Competed under SAP" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Extent Competed
        And we see that filter item 1 has a value of Competed under SAP
        When we click on Competed under SAP
        Then we see that "Competed under SAP" isn't checked
        When we click on Competitive Delivery Order
        Then we see that "Competitive Delivery Order" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Extent Competed
        And we see that filter item 1 has a value of Competitive Delivery Order
        When we click on Competitive Delivery Order
        Then we see that "Competitive Delivery Order" isn't checked
        When we click on Follow On to Competed Action
        Then we see that "Follow On to Competed Action" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Extent Competed
        And we see that filter item 1 has a value of Follow On to Competed Action
        When we click on Follow On to Competed Action
        Then we see that "Follow On to Competed Action" isn't checked
        When we click on Full and Open Competition
        Then we see that "Full and Open Competition" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Extent Competed
        And we see that filter item 1 has a value of Full and Open Competition
        When we click on Full and Open Competition
        Then we see that "Full and Open Competition" isn't checked
        #commented out due to typo in "competition"
        # When we click on Full and Open Competition after exclusion
        # Then we see that "Full and Open Competition after exclusion" is checked
        # When I hit Submit Search
        # And Wait for table to load
        # Then we see that Active filter label has a value of 1 Active Filter:
        # And we see that filter group 1 title has a value of Extent Competed
        # And we see that filter item 1 has a value of Full and Open Competition after exclusion of sources
        # When we click on Full and Open Competition after exclusion
        # Then we see that "Full and Open Competition after exclusion" isn't checked
        When Click toggle extent competed see more toggle
        When we click on Non-Competitive Delivery Order
        Then we see that "Non-Competitive Delivery Order" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Extent Competed
        And we see that filter item 1 has a value of Non-Competitive Delivery Order
        When we click on Non-Competitive Delivery Order
        Then we see that "Non-Competitive Delivery Order" isn't checked
        When we click on Not Available for Competition
        Then we see that "Not Available for Competition" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Extent Competed
        And we see that filter item 1 has a value of Not Available for Competition
        When we click on Not Available for Competition
        Then we see that "Not Available for Competition" isn't checked
        When we click on Not Competed
        Then we see that "Not Competed" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Extent Competed
        And we see that filter item 1 has a value of Not Competed
        When we click on Not Competed
        Then we see that "Not Competed" isn't checked
        When we click on Not Competed under SAP
        Then we see that "Not Competed under SAP" is checked
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Extent Competed
        And we see that filter item 1 has a value of Not Competed under SAP
        When we click on reset search
        Then Filters are reset

    @foreign_countries
    @performance
    Scenario: check foreign countries dropdown selection under the location filter
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Location" filter dropdown
        Then we see that Place of performance tab is displayed
        And we see that Recipient location tab is displayed
        And we see that Country dropdown is displayed
        And we see that State dropdown is displayed
        And we see that County dropdown is displayed
        And we see that District dropdown is displayed
        And we see that Add filter button is displayed
        And we see that zip code input is displayed
        And we see that zip search button is displayed
        When we click on Country dropdown
        And we click on All Foreign Countries
        # Then we see that Invalid County dropdown is displayed
        Then we see that State dropdown is disabled
        Then we see that County dropdown is disabled
        Then we see that District dropdown is disabled

    @foreign_countries
    @recipient
    Scenario: check foreign countries dropdown selection under the location filter
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Location" filter dropdown
        Then we see that Place of performance tab is displayed
        And we see that Recipient location tab is displayed
        And we see that Country dropdown is displayed
        And we see that State dropdown is displayed
        And we see that County dropdown is displayed
        And we see that District dropdown is displayed
        And we see that Add filter button is displayed
        And we see that zip code input is displayed
        And we see that zip search button is displayed
        When we click on Recipient location tab
        When we click on Country dropdown
        And we click on All Foreign Countries
        # Then we see that Invalid County dropdown is displayed
        Then we see that State dropdown is disabled
        Then we see that County dropdown is disabled
        Then we see that District dropdown is disabled

    @zips
    @performance
    Scenario: check zip code input box under location filter
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Location" filter dropdown
        Then we see that zip code input is displayed
        And we see that zip search button is displayed
        When I type "20176" into "zip code input"
        And we click on zip search button
        Then we see that zip result is displayed
        When we click on zip result
        Then we see that zip result is NOT displayed
        When I type "20176" into "zip code input"
        And we click on zip search button
        Then we see that zip result is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Place of Performance
        And we see that filter item 1 has a value of ZIP CODE | 20176

    @zips
    @recipient
    Scenario: check zip code input box under location filter
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Location" filter dropdown
        Then we see that zip code input is displayed
        And we see that zip search button is displayed
        When we click on Recipient location tab
        When I type "20176" into "zip code input"
        And we click on zip search button
        Then we see that zip result is displayed
        When we click on zip result
        Then we see that zip result is NOT displayed
        When I type "20176" into "zip code input"
        And we click on zip search button
        Then we see that zip result is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Location
        And we see that filter item 1 has a value of ZIP CODE | 20176

    @location
    @performance
    Scenario: I want to verify that the Location filter behaves as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Location" filter dropdown
        Then we see that Place of performance tab is displayed
        And we see that Recipient location tab is displayed
        And we see that Country dropdown is displayed
        And we see that State dropdown is displayed
        And we see that County dropdown is displayed
        And we see that District dropdown is displayed
        And we see that Add filter button is displayed
        And we see that zip code input is displayed
        And we see that zip search button is displayed
        When we click on Country dropdown
        And we click on United states
        And we click on State dropdown
        And we click on Colorado
        And we click on Add filter button
        Then we see that Location filter is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Place of Performance
        And we see that filter item 1 has a value of STATE | Colorado
        When we click on reset search
        Then Filters are reset
        When we click on Country dropdown
        And we click on United states
        And we click on State dropdown
        And we click on Colorado
        And we click on County dropdown
        And we click on Cheyenne County
        And we click on Add filter button
        Then we see that Location filter is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Place of Performance
        And we see that filter item 1 has a value of COUNTY | Cheyenne County, CO
        When we click on reset search
        Then Filters are reset
        When we click on Country dropdown
        And we click on United states
        And we click on State dropdown
        And we click on Colorado
        And we click on County dropdown
        And we click on All counties
        And we click on District dropdown
        And we click on CO-01
        And we click on Add filter button
        Then we see that Location filter is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Place of Performance
        And we see that filter item 1 has a value of CONGRESSIONAL DISTRICT | CO-01
        When we click on reset search
        Then Filters are reset
        When we click on District dropdown
        And we click on All districts
        When we click on State dropdown
        And we click on All states
        When we click on Country dropdown
        And we click on Andorra
        And we click on Add filter button
        Then we see that Location filter is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Place of Performance
        And we see that filter item 1 has a value of COUNTRY | ANDORRA
        When we click on reset search
        Then Filters are reset

    @location
    @recipient
    Scenario: I want to verify that the Location filter behaves as expected
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Location" filter dropdown
        When we click on Recipient location tab
        Then we see that Place of performance tab is displayed
        And we see that Recipient location tab is displayed
        And we see that Country dropdown is displayed
        And we see that State dropdown is displayed
        And we see that County dropdown is displayed
        And we see that District dropdown is displayed
        And we see that Add filter button is displayed
        And we see that zip code input is displayed
        And we see that zip search button is displayed
        When we click on Country dropdown
        And we click on United states
        And we click on State dropdown
        And we click on Colorado
        And we click on Add filter button
        Then we see that Location filter is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Location
        And we see that filter item 1 has a value of STATE | Colorado
        When we click on reset search
        Then Filters are reset
        When we click on Country dropdown
        And we click on United states
        And we click on State dropdown
        And we click on Colorado
        And we click on County dropdown
        And we click on Cheyenne County
        And we click on Add filter button
        Then we see that Location filter is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Location
        And we see that filter item 1 has a value of COUNTY | Cheyenne County, CO
        When we click on reset search
        Then Filters are reset
        When we click on Country dropdown
        And we click on United states
        And we click on State dropdown
        And we click on Colorado
        And we click on County dropdown
        And we click on All counties
        And we click on District dropdown
        And we click on CO-01
        And we click on Add filter button
        Then we see that Location filter is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Location
        And we see that filter item 1 has a value of CONGRESSIONAL DISTRICT | CO-01
        When we click on reset search
        Then Filters are reset
        When we click on District dropdown
        And we click on All districts
        When we click on State dropdown
        And we click on All states
        When we click on Country dropdown
        And we click on Andorra
        And we click on Add filter button
        Then we see that Location filter is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient Location
        And we see that filter item 1 has a value of COUNTRY | ANDORRA
        When we click on sub awards button
        And Wait for table to load
        And we wait for Active row badge to appear
        Then we see that Award button label has a value of Sub-Awards
        And we see that Visualization title has a value of Spending by Sub-Award
        Then we see that Table error message has a value of No results found.

    @DUNS
    @Parent
    Scenario: check the duns filter
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient" filter dropdown
        When I type "040249091" into "Recipient Input"
        And I click on Recipient Search
        Then we see that Recipient Result is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient
        And we see that filter item 1 has a value of RECIPIENT | 040249091
        When we click on DUNS Link
        Then we see that DUNS Result has a value of 040249091
        And we see that DUNS Parent Result has a value of 040249091

    @DUNS
    @Child
    Scenario: check the duns filter
        Given On the homepage
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Recipient" filter dropdown
        When I type "032987476" into "Recipient Input"
        And I click on Recipient Search
        Then we see that Recipient Result is displayed
        When I hit Submit Search
        And Wait for table to load
        Then we see that Active filter label has a value of 1 Active Filter:
        And we see that filter group 1 title has a value of Recipient
        And we see that filter item 1 has a value of RECIPIENT | 032987476
        When we click on DUNS Link
        Then we see that DUNS Result has a value of 032987476
        And we see that DUNS Parent Result has a value of 007901598
