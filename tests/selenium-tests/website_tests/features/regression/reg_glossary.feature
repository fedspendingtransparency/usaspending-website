@usaspending
@Glossary
Feature:[USASPENDING] Regression Testing (Glossary)

    @Glossary_Negative
    @Glossary_No_Results
    Scenario: Check negative tests in the glossary
        Given On the homepage
        When we click on glossary button
        Then we see that Actual glossary is displayed
        When I type "Invalid Search" into "Search for a term..."
        Then classname glossary-no-results is displayed
        And we see that Glossary No Results Title has a value of No Results Found

    @Glossary_Found_Result
    Scenario: Check Results search is working
        Given On the homepage
        When we click on glossary button
        Then we see that Actual glossary is displayed
        When I type "Award Amount" into "Search for a term..."
        Then classname glossary-result-group is displayed
        When we click on Glossary Result 1
        Then we see that Plain Language is displayed
        Then we see that Official Definition is displayed
        Then we see that Plain Language is displayed
        Then we see that Back is displayed
        Then we see that Glossary Selected Item Title has a value of Award Amount
        When we click on Official Definition
        Then we see that Glossary Selected Item Title has a value of Amount of Award
        When we click on Plain Language
        Then we see that Glossary Selected Item Title has a value of Award Amount
        When we click on Back
        Then we see that Glossary Result 1 has a value of Award Amount
        When we click on Glossary Result 1
        Then we see that Glossary Selected Item Title has a value of Award Amount
        Then we see that Glossary See Also Result 1 has a value of Federal Action Obligation
        When we click on Glossary See Also Result 1
        Then we see that Glossary Selected Item Title has a value of Federal Action Obligation

    @Glossary_Found_Result_No_Official_Definition
    Scenario: Check results search is working for a definition with no official definition option
        Given On the homepage
        When we click on glossary button
        Then we see that Actual glossary is displayed
        When I type "Budgetary Resources" into "Search for a term..."
        And I wait for glossary-link to load
        When we click on Glossary Result 1
        Then we see that Plain Language is displayed
        Then we see that Back is displayed
        Then we see that Official Definition is NOT displayed
        Then we see that Glossary Selected Item Title has a value of Budgetary Resources

    @Glossary_Read_More
    Scenario: Check the read more button redirects to github
        Given On the homepage
        When we click on glossary button
        Then we see that Actual glossary is displayed
        When I type "Award Type" into "Search for a term..."
        And I wait for glossary-link to load
        When we click on Glossary Result 1
        Then we see that Glossary Selected Item Title has a value of Award Type
        Then we see that Glossary See Also Result 2 has a value of Read more about Award Type
        When we click on Glossary See Also Result 2
        Then then we check element Glossary See Also Result 2 has a url redirect of http://fedspendingtransparency.github.io/whitepapers/types/

    Scenario: Check each link in glossary
        Given On the homepage
        When we click on glossary button
        Then we validate each glossary link