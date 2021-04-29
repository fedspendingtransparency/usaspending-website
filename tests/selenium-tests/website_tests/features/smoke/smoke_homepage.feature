@usaspending
Feature:[USASPENDING] Smoke Testing (Homepage)

    @1
    Scenario: Find Spending Explorer in Homepage
        Given On the homepage
        Then we see that three pane is displayed
        When we click on arrow
        Then we see that Spending explorer content is displayed
        When we click on Try our Spending Explorer
        Then I get a top header for "Spending Explorer"


    @2
    Scenario: Find Award Search
        Given On the homepage
        Then we see that Awards content is displayed
        Then we see that homepage dropdown is displayed
        Then we see that advanced screenshot is displayed
        Then we see that keyword screenshot is displayed

    @3
    Scenario: Advanced Search Test
        Given On the homepage
        When I go to "Advanced Search" Award Search page
        Then I get a top header for "Advanced Search"

    @4
    Scenario: Keyword Search Test
        Given On the homepage
        When I go to "Keyword Search" Award Search page
        Then check keyword header


    @5
    Scenario: Download Section on homepage
        Given On the homepage
        Then we see that Award Data Archive is displayed
        Then we see that Custom Award Data is displayed
        Then we see that Custom Account Data is displayed
        Then we see that Agency Submission Files is displayed
        Then we see that Database Download is displayed
        Then we see that API is displayed
        Then we see that Join the conversation is displayed

    @comm
    Scenario: Community page
        Given On the homepage
        When we click on Visit our community page button
        And switch tab
        Then I see the URL displays "/community/topics"
# Known issue with headless Chrome hangs after switching to a new window
#   following works in non-headless mode.
        # And we see that community header is displayed
        # And we see that community footer is displayed
        # And we see that community navigation is displayed
        When we close tab
        Then we are on home tab
