Feature:[USASPENDING] Smoke Testing (Glossary)

    Scenario: Search and View Glossary
        Given On the homepage
        When we click on Glossary
        And we type "Award Amount" into "Search for a term..."
        Then we see that "Award Amount" is displayed in glossary search results

        When we click on Award Amount
        Then we see that definition is displayed
        And we see "More Resources" displayed

        When we click on Official Definition
        Then we see that Official Def is displayed

        When we click on X
        And click "Glossary pink button"
        Then we see that Glossary is displayed
