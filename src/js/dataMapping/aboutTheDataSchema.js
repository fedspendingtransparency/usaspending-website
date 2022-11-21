const schema = {
    "by-page": {
        label: "Data Sources on this Page",
        path: 'content/about-the-data/by-page',
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
    descriptions: {
        heading: "Sitewide Data Source Descriptions",
        path: 'content/about-the-data/descriptions',
        fields: [
            {
                name: "GTAS (Governmentwide Treasury Account Symbol Adjusted Trial Balance System)",
                slug: "gtas"
            },
            {
                name: "File A (Account Balances)",
                slug: "file-a"
            },
            {
                name: "File B (Account Breakdown by Program Activity & Object Class)",
                slug: "file-b"
            },
            {
                name: "File C (Account Breakdown by Award)",
                slug: "file-c"
            },
            {
                name: "File D1 (Award and Awardee Attributes (Procurement))",
                slug: "file-d1"
            },
            {
                name: "File D2 (Award and Awardee Attributes (Financial Assistance))",
                slug: "file-d2"
            },
            {
                name: "File E (Additional Awardee Attributes)",
                slug: "file-e"
            },
            {
                name: "File F (Subaward Attributes)",
                slug: "file-f"
            }
        ]
    },
    disclosures: {
        heading: "Sitewide Data Source Disclosures",
        path: 'content/about-the-data/disclosures',
        fields: [
            {
                name: "Reporting Requirement for Federal Agencies",
                slug: "reporting-requirement-for-federal-agencies"
            },
            {
                name: "Start Date for Spending Data on USAspending.gov",
                slug: "start-date-for-spending-data"
            },
            {
                name: "Frequency of Updates to Agency Account Data",
                slug: "frequency-of-updates-to-agency-account-data"
            },
            {
                name: "Non-Validation of Data from Source Systems",
                slug: "non-validation-of-data-from-source-systems"
            },
            {
                name: "Changes in Reporting Requirements",
                slug: "changes-in-reporting-requirements"
            },
            {
                name: "Financing Accounts",
                slug: "financing-accounts"
            }
        ]
    },
    "award-disclosures": {
        heading: "Sitewide Award Data Disclosures",
        path: 'content/about-the-data/award-disclosures',
        fields: [
            {
                name: "Date for Prime Award and Subaward Data on USAspending.gov",
                slug: "start-date-for-prime-award-and-subaward-data"
            },
            {
                name: "Definition of Award Recipient (Entity Receiving a Federal Award)",
                slug: "definition-of-award-recipient"
            },
            {
                name: "Reporting Threshold for Prime Awards",
                slug: "reporting-threshold-for-prime-awards"
            },
            {
                name: "Frequency of Updates to Prime Award Data for Contracts",
                slug: "frequency-of-updates-to-prime-award-data-for-contracts"
            },
            {
                name: "Frequency of Updates to Prime Award Data for Financial Assistance",
                slug: "frequency-of-updates-to-prime-award-data-for-financial-assistance"
            },
            {
                name: "Reporting Threshold for Subawards",
                slug: "reporting-threshold-for-subawards"
            },
            {
                name: "Frequency of Updates to Subaward Data",
                slug: "frequency-of-updates-to-subaward-data"
            },
            {
                name: "Subaward Data Quality",
                slug: "subaward-data-quality"
            },
            {
                name: "Limited Data for Unlinked Prime Awards",
                slug: "limited-data-for-unlinked-prime-awards"
            },
            {
                name: "Award Description Data Quality",
                slug: "award-description-data-quality"
            },
            {
                name: "Delay in Department of Defense (DOD) Procurement Data",
                slug: "delay-in-dod-procurement-data"
            },
            {
                name: "Medicare Location Data",
                slug: "medicare-location-data"
            },
            {
                name: "Personally Identifiable Information (PII) and Aggregate Records",
                slug: "pii-and-aggregate-records"
            },
            {
                name: "Personally Identifiable Information (PII) and Redacted Records",
                slug: "pii-and-redacted-records"
            }
        ]
    },
    "covid-disclosures": {
        heading: "Sitewide COVID-19 Spending Data Disclosures",
        path: 'content/about-the-data/covid-disclosures',
        fields: [
            {
                name: "Definition of Covered Funds",
                slug: "definition-of-covered-funds"
            },
            {
                name: "Disaster Emergency Fund Code (DEFC)",
                slug: "defc"
            },
            {
                name: "Start Date for Disaster Emergency Fund Code (DEFC) Tracking",
                slug: "start-date-for-defc-tracking"
            },
            {
                name: "Statement from the Department of the Treasury — Economic Impact Payment",
                slug: "treasury-eip"
            },
            {
                name: "Statement from the Department of the Treasury — Emergency Rental Assistance (ERA) and State and Local Fiscal Recovery Funds (SLFRF)",
                slug: "treasury-era-slfrf"
            },
            {
                name: "Statement from the Department of Labor (DOL) — Federal Unemployment Compensation Program",
                slug: "dol-unemployment"
            },
            {
                name: "Statement from the Department of Health and Human Services (HHS) – General and Targeted Distributions",
                slug: "hhs-general-and-targeted-distributions"
            },
            {
                name: "Statement from the Department of Health and Human Services (HHS) – Claims Reimbursement to Health Care Providers and Facilities for Testing, Treatment, and Vaccine Administration of the Uninsured",
                slug: "hhs-uninsured"
            },
            {
                name: "Statement from the Department of Health and Human Services (HHS) – Rural Health Clinic (RHC) Testing",
                slug: "treasury-era-slfrf"
            },
            {
                name: "Statement from the Department of Health and Human Services (HHS) – State Reported Expenditure for Section 6004 and Section 6008 of the Families First Coronavirus Response Act (FFCRA)",
                slug: "hhs-ffcra-6004-6008"
            },
            {
                name: "Statement from Department of Agriculture (USDA)",
                slug: "usda-outlays"
            }
        ]
    }
};

export default schema;
