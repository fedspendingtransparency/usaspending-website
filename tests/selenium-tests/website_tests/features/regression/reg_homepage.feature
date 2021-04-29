Feature:[USASPENDING] Regression Testing (Homepage)

@footer
    Scenario: Verify footer links
        Given On the homepage
        When we click on accessibility link
        Then I see the URL displays "/about/accessibility"
        And we see that about section title has a value of Accessibility
        When we click on Privacy sidebar link
        Then I see the URL displays "/about/privacy"
        And we see that about section title has a value of Privacy Policy
        When we click on FOIA sidebar link
        Then I see the URL displays "/about/foia"
        And we see that about section title has a value of Freedom of Information Act
        When we click on Accessibility sidebar link
        Then I see the URL displays "/about/accessibility"
        And we see that about section title has a value of Accessibility
        When we click on footer logo
        Then I see the URL displays "usaspending.gov/#/"
        When we click on privacy policy link
        Then I see the URL displays "/about/privacy"
        And we see that about section title has a value of Privacy Policy
        When we click on FOIA link
        Then I see the URL displays "/about/foia"
        And we see that about section title has a value of Freedom of Information Act
        When we click on about link
        Then I see the URL displays "/about"
        And I get a top header for "About"
        And we see that about section title has a value of Mission

    @help
    Scenario: Verify Help Header
        Given On the homepage
        Then we see that link in Contact us link displays "mailto:usaspending.help@fiscal.treasury.gov?subject=Contact%20Us"
        When we click on FAQs link
        And switch tab
        Then I see the URL displays "Frequently-Ask-Questions"
        When we close tab
        Given On the homepage
        When we click on Visit our community page button
        And switch tab
        Then I see the URL displays "/community/topics"
        When we close tab
        # Then we see that community header is displayed
        # And we see that community footer is displayed
        # And we see that community navigation is displayed

    @resources
    Scenario: Verify Resources Header
        Given On the homepage
        When we click on data model link
        When switch tab
        Then I see the URL displays "https://fiscal.treasury.gov/data-transparency/DAIMS-current.html"
        And we see that DAIMS page header contains "DATA Act Information Model Schema (DAIMS)"
        When we close tab
        Given On the homepage
        When we click on data lab link
        When switch tab
        Then I see the URL displays "https://datalab.usaspending.gov/"
        # And we see that data lab header has a value of Experiment, Analyze, and Discover.
        When we close tab


    @dev
    Scenario: Verify Developers Headers
        Given On the homepage
        When we click on api link
        And switch tab
        Then I see the URL displays "api.usaspending.gov"
        And we see that API header has a value of The USAspending Application Programming Interface (API)
        When we close tab
        Given On the homepage
        When we click on Explore the code link
        And switch tab
        Then I see the URL displays "github.com/fedspendingtransparency/usaspending-website/tree/master"
        When we close tab
