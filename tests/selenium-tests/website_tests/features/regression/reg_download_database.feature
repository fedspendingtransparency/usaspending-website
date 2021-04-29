@usaspending
@Database_Download
Feature:[USASPENDING] Regression Testing (Database Download)

    @Database_Download_Items
    Scenario: Check for main title descriptions and sidebar on the database download page
        Given On the homepage
        When I click the top banner for "Download Center" then "Database Download"
        When switch to tab number 2

        # Then check tag h2 of object 1 of classname container has a value of USAspending.gov Database Download
        Then check tag h2 of object 1 of classname container has a value of SQL Database Downloads

        # Then check tag a of object 1 of classname container has a value of usaspending-db-setup.pdf (69.8 KB)
        Then check tag a of object 1 of classname container has a value of usaspending-db-setup.pdf

        Then the url has a value of https://files.usaspending.gov/database_download/
        When click on database download link 1
        And I wait 1 seconds
        # Then the url has a value of https://files.usaspending.gov/database_download/usaspending-db-setup.pdf

        When we click the back button
        Then the url has a value of https://files.usaspending.gov/database_download/
        Then check dates on download database file
        When click on database download link 2
        Then Download link is provided to copy and the file is being prepared
        When we close tab
        Then we are on home tab
