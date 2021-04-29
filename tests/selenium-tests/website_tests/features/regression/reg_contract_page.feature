Feature:[USASPENDING] Regression Testing - Awards pages

    Scenario: Search for and validated a specific contract
        Given on the "usaspending:foobar234&@staging.usaspending.gov" page 
        When I click the top banner for "Award Search" then "Advanced Search"
        When I click the "Award ID" filter dropdown     
        And we type "DEAC5207NA27344" into "Award ID input"   
        And I hit Submit Search
        And we click on award
        Then I get a top header for "Contract Summary"
        Then we see that ID header has a value of DEAC5207NA27344
        And we see that awarding agency label has a value of Department of Energy
        And we see that recipient label has a value of LAWRENCE LIVERMORE NATIONAL SECURITY LIMITED LIABILITY COMPANY
        And we see that description cell and top transaction description have the same value
        And we see that the contract table headers for Transaction History are correct
        And we see that the table is reverse sorted by column 2
        When we click on Sub-Awards tab
        Then we see that the contract table headers for Sub-Awards are correct

        When we click on Financial Details tab
        Then we see that the contract table headers for Financial System Details are correct
        And we see that the details table is reverse sorted by column 1

        # #check default sorting

        # #check all header sorting
        When we click on Transaction History tab
        And we click on column 1 ascending sort
        Then we see that the table is normal sorted by column 1
        When we click on column 1 descending sort
        Then we see that the table is reverse sorted by column 1
        When we click on column 2 ascending sort
        Then we see that the table is normal sorted by column 2
        When we click on column 2 descending sort
        Then we see that the table is reverse sorted by column 2
        When we click on column 3 ascending sort
        Then we see that the table is normal sorted by column 3
        When we click on column 3 descending sort
        Then we see that the table is reverse sorted by column 3
        When we click on column 4 ascending sort
        Then we see that the table is normal sorted by column 4
        When we click on column 4 descending sort
        Then we see that the table is reverse sorted by column 4
        #  When we click on column 5 ascending sort
        # Then we see that the table is normal sorted by column 5
        # When we click on column 5 descending sort
        # Then we see that the table is reverse sorted by column 5
        
        When we click on Financial Details tab
        Then we see that the contract table headers for Financial System Details are correct
        When we click on details column 1 ascending sort
        Then we see that the details table is normal sorted by column 1
        When we click on details column 1 descending sort
        Then we see that the details table is reverse sorted by column 1
        When we click on details column 2 ascending sort
        Then we see that the details table is normal sorted by column 2
        When we click on details column 2 descending sort
        Then we see that the details table is reverse sorted by column 2
        When we click on details column 3 ascending sort
        Then we see that the details table is normal sorted by column 3
        When we click on details column 3 descending sort
        Then we see that the details table is reverse sorted by column 3
        When we click on details column 4 ascending sort
        Then we see that the details table is normal sorted by column 4
        When we click on details column 4 descending sort
        Then we see that the details table is reverse sorted by column 4
        When we click on details column 5 ascending sort
        Then we see that the details table is normal sorted by column 5
        When we click on details column 5 descending sort
        Then we see that the details table is reverse sorted by column 5
        When we click on details column 6 ascending sort
        Then we see that the details table is normal sorted by column 6
        When we click on details column 6 descending sort
        Then we see that the details table is reverse sorted by column 6

        When we click on Additional Details tab 
        Then We see that Awarding Agency cell is displayed
        When we click on Transaction History tab 
        And we click on Additional Details link 
        Then we see that Awarding Agency cell is displayed 
        And we see that Awarding Agency cell has a value of Department of Energy 
        And we see that Awarding Sub-agency cell has a value of Department of Energy 
        And we see that Awarding office cell has a value of NNSA MO CONTRACTING 
        And we see that Funding agency cell has a value of Department of Defense
        And we see that Funding sub-agency cell has a value of Department of Defense 
        And we see that Funding office cell has a value of MISSILE DEFENSE AGENCY 
        And we see that Solicitation ID has a value of DE-RP52-06NA27344
        And we see that Solicitation procedures has a value of NEGOTIATED PROPOSAL/QUOTE 
        And we see that Offer recieved has a value of 3
        And we see that Extent completed has a value of FULL AND OPEN COMPETITION
        And we see that Set-aside type has a value of NO SET ASIDE USED.
        And we see that Commercial Item Aquisition Procedures has a value of COMMERCIAL ITEM PROCEDURES NOT USED
        And we see that Commercial Item Test Program has a value of NO 
        And we see that Evaluated Preference has a value of NO PREFERENCE USED
        And we see that FedBizOps has a value of YES
        And we see that Product Service Code has a value of AZ11: R&amp;D- OTHER RESEARCH AND DEVELOPMENT (BASIC RESEARCH)
        And we see that NAICS Code has a value of 541710: RESEARCH AND DEVELOPMENT IN THE PHYSICAL, ENGINEERING, AND LIFE SCIENCES 
        And we see that Clinger-Cohen Complient has a value of NO
        And we see that Labor Standards has a value of NO
        And we see that Subject to Materials has a value of NOT APPLICABLE
        And we see that Cost or Pricing Data has a value of YES
        And we see that Foreign Funding has a value of NOT APPLICABLE
        And we see that Interagency Contracting Authority has a value of NOT APPLICABLE
        And we see that Price Evaluation Adjustment Preference has a value of 0.00
        And we see that Subcontracting Plan has a value of PLAN REQUIRED - INCENTIVE NOT INCLUDED
        And we see that Multi Year Contract has a value of YES
        And we see that Purchase Card as Payment Method has a value of NO
        And we see that Consolidated Contract has a value of NO
        And we see that Officer 1 has a value of William H Goldstein - $730,691
        And we see that Officer 2 has a value of Bruce E Warner - $629,924
        And we see that Officer 3 has a value of Paul J Elenbach - $559,748
        And we see that Officer 4 has a value of Peter J Wisoff - $518,971
        And we see that Officer 5 has a value of Patricia K Falcone - $507,637
        When Go back
        And we click on reset search
        Then Filters are reset