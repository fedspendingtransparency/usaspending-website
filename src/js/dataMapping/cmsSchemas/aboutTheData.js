export const schema = {
    collections: [
        {
            label: "Data Sources on this Page",
            path: 'content/data-sources/page',
            fields: [
                {
                    pageName: "Spending Explorer",
                    route: "explorer"
                },
                {
                    pageName: "Advanced Search",
                    route: "search"
                },
                {
                    pageName: "Keyword Search",
                    route: "keyword_search"
                },
                {
                    pageName: "Award Profile",
                    route: "award"
                },
                {
                    pageName: "Agency Profile",
                    route: "agency"
                },
                {
                    pageName: "Federal Account Profile",
                    route: "federal_account"
                },
                {
                    pageName: "State Profile",
                    route: "state"
                },
                {
                    pageName: "Recipient Profile",
                    route: "recipient"
                },
                {
                    pageName: "COVID-19 Spending Profile",
                    route: "disaster/covid-19"
                },
                {
                    pageName: "Award Data Archive Download",
                    route: "award_data_archive"
                },
                {
                    pageName: "Custom Award Data Download",
                    route: "custom_award_data"
                },
                {
                    pageName: "Custom Account Data Download",
                    route: "custom_account_data"
                },
                {
                    pageName: "Agency Submission Statistics",
                    route: "submission-statistics"
                }
            ]
        },
        {
            label: "Sitewide Data Sources",
            path: 'content/data-sources/sitewide',
            fields: [
                {
                    title: "File A (Account Balances)",
                    slug: "file-a"
                }
            ]
        },
        {
            label: "Sitewide Data Disclosures",
            path: 'content/data-sources/disclosures',
            fields: [
                {
                    title: "File A (Account Balances)",
                    slug: "file-a"
                }
            ]
        }
    ]
};
