export const schema = {
    collections: [
        {
            label: "Data Sources on this Page",
            path: 'content/data-sources/by-page',
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
                    route: "covid-19"
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
            label: "Sitewide Data Source Descriptions",
            path: 'content/data-sources/descriptions',
            fields: [
                {
                    title: "GTAS (Governmentwide Treasury Account Symbol Adjusted Trial Balance System)",
                    slug: "gtas"
                },
                {
                    title: "File A (Account Balances)",
                    slug: "file-a"
                },
                {
                    title: "File B (Account Breakdown by Program Activity & Object Class)",
                    slug: "file-b"
                },
                {
                    title: "File C (Account Breakdown by Award)",
                    slug: "file-c"
                },
                {
                    title: "File D1 (Award and Awardee Attributes (Procurement))",
                    slug: "file-d1"
                },
                {
                    title: "File D2 (Award and Awardee Attributes (Financial Assistance))",
                    slug: "file-d2"
                },
                {
                    title: "File E (Additional Awardee Attributes)",
                    slug: "file-e"
                },
                {
                    title: "File F (Subaward Attributes)",
                    slug: "file-f"
                }
            ]
        },
        {
            label: "Sitewide Data Source Disclosures",
            path: 'content/data-sources/disclosures',
            fields: [
                {
                    title: "Reporting Requirement for Federal Agencies",
                    slug: "reporting-requirement-for-federal-agencies"
                },
                {
                    title: "Start Date for Spending Data on USAspending.gov",
                    slug: "start-date-for-spending-data"
                },
                {
                    title: "Frequency of Updates to Agency Account Data",
                    slug: "frequency-of-updates-to-agency-account-data"
                },
                {
                    title: "Non-Validation of Data from Source Systems",
                    slug: "non-validation-of-data-from-source-systems"
                },
                {
                    title: "Changes in Reporting Requirements",
                    slug: "changes-in-reporting-requirements"
                },
                {
                    title: "Financing Accounts",
                    slug: "financing-accounts"
                }
            ]
        },
        {
            label: "Sitewide Award Data Disclosures",
            path: 'content/data-sources/award-disclosures',
            fields: [
                {
                    title: "Date for Prime Award and Subaward Data on USAspending.gov",
                    slug: "start-date-for-prime-award-and-subaward-data"
                },
                {
                    title: "Definition of Award Recipient (Entity Receiving a Federal Award)",
                    slug: "definition-of-award-recipient"
                },
                {
                    title: "Reporting Threshold for Prime Awards",
                    slug: "reporting-threshold-for-prime-awards"
                },
                {
                    title: "Frequency of Updates to Prime Award Data for Contracts",
                    slug: "frequency-of-updates-to-prime-award-data-for-contracts"
                },
                {
                    title: "Frequency of Updates to Prime Award Data for Financial Assistance",
                    slug: "frequency-of-updates-to-prime-award-data-for-financial-assistance"
                },
                {
                    title: "Reporting Threshold for Subawards",
                    slug: "reporting-threshold-for-subawards"
                },
                {
                    title: "Frequency of Updates to Subaward Data",
                    slug: "frequency-of-updates-to-subaward-data"
                },
                {
                    title: "Subaward Data Quality",
                    slug: "subaward-data-quality"
                },
                {
                    title: "Limited Data for Unlinked Prime Awards",
                    slug: "limited-data-for-unlinked-prime-awards"
                },
                {
                    title: "Award Description Data Quality",
                    slug: "award-description-data-quality"
                },
                {
                    title: "Delay in Department of Defense (DOD) Procurement Data",
                    slug: "delay-in-dod-procurement-data"
                },
                {
                    title: "Medicare Location Data",
                    slug: "medicare-location-data"
                },
                {
                    title: "Personally Identifiable Information (PII) and Aggregate Records",
                    slug: "pii-and-aggregate-records"
                },
                {
                    title: "Personally Identifiable Information (PII) and Redacted Records",
                    slug: "pii-and-redacted-records"
                }
            ]
        },
        {
            label: "Sitewide COVID-19 Spending Data Disclosures",
            path: 'content/data-sources/covid-19-disclosures',
            fields: [
                {
                    title: "Definition of Covered Funds",
                    slug: "definition-of-covered-funds"
                },
                {
                    title: "Disaster Emergency Fund Code (DEFC)",
                    slug: "defc"
                },
                {
                    title: "Start Date for Disaster Emergency Fund Code (DEFC) Tracking",
                    slug: "start-date-for-defc-tracking"
                },
                {
                    title: "Statement from the Department of the Treasury — Economic Impact Payment",
                    slug: "treasury-eip"
                },
                {
                    title: "Statement from the Department of the Treasury — Emergency Rental Assistance (ERA) and State and Local Fiscal Recovery Funds (SLFRF)",
                    slug: "treasury-era-slfrf"
                },
                {
                    title: "Statement from the Department of Labor (DOL) — Federal Unemployment Compensation Program",
                    slug: "dol-unemployment"
                },
                {
                    title: "Statement from the Department of Health and Human Services (HHS) – General and Targeted Distributions",
                    slug: "hhs-general-and-targeted-distributions"
                },
                {
                    title: "Statement from the Department of Health and Human Services (HHS) – Claims Reimbursement to Health Care Providers and Facilities for Testing, Treatment, and Vaccine Administration of the Uninsured",
                    slug: "hhs-uninsured"
                },
                {
                    title: "Statement from the Department of Health and Human Services (HHS) – Rural Health Clinic (RHC) Testing",
                    slug: "treasury-era-slfrf"
                },
                {
                    title: "Statement from the Department of Health and Human Services (HHS) – State Reported Expenditure for Section 6004 and Section 6008 of the Families First Coronavirus Response Act (FFCRA)",
                    slug: "hhs-ffcra-6004-6008"
                },
                {
                    title: "Statement from Department of Agriculture (USDA)",
                    slug: "usda-outlays"
                }
            ]
        }
    ]
};
