/* eslint-disable max-len */
const contentMap = {
    dataDefinition: '#783CB9',
    search: '#D54309',
    seeforyourself: '#E66F0E',
    questions: '#864381',
    finances: '#1B2B85',
    trust: '#73B3E7',
    stories: '#2378C3',
    difference: '#5ABF95'
};

const secondary = {
    dataDefinition: '#D5BFFF',
    search: '#F6BD9C',
    seeforyourself: '#FFBC78',
    questions: '#E2BEE4',
    finances: '#628EF4',
    trust: '#D9E8F6',
    stories: '#73B3E7',
    difference: '#DBF6ED'
};

// the first entry has what is necessary for a full article

/**
 *             <AboutTheDataLink slug="subaward-data-quality">
                subaward data quality
            </AboutTheDataLink>,
            <GlossaryLink term="prime-award" label="prime award" displayIcon={false} />
 */

// example for links
// explore_more: [
//     { label: "about", slug: "/about", type: "internal" },
//     { label: "treasury", slug: "https://home.treasury.gov/", type: "government" },
//     { label: "this link goes to google but i am making the text long to ellipsize itgaertgwergwerthgrthsrthedrthedrthdrth", slug: "https://google.com", type: "external" }
// ],
//     related_terms: [
//     { term: "prime-award", type: "glossary", label: "prime award" },
//     { term: "subaward-data-quality", type: "atd", label: "subaward data quality" }
// ]

const articles = [
    {
        taxonomy: "Data Definitions",
        content_type: 'Featured Content',
        banner_subtitle: "Award Has a Very Specific Meaning in Government Spending",
        title: "What is an Award?",
        created_date: "09/29/2025",
        description: "When you think of the word “award,” you might picture an actor receiving an Oscar, an athlete earning a medal at the Olympics, or even yourself earning a gold.",
        feature_sprint: 1,
        feature_week: 1,
        slug: "what-is-an-award",
        thumbnail_path: "../../img/featuredContent/cards/data-definitions.webp",
        explore_more: [
            {
                label: "Federal Spending Guide",
                slug: "/federal-spending-guide",
                type: "internal"
            },
            {
                label: "Advanced Search",
                slug: "/search",
                type: "internal"
            }
        ],
        related_terms: [
            {
                term: "award",
                type: "glossary",
                label: "Award"
            },
            {
                term: "obligation",
                type: "glossary",
                label: "Obligation"
            },
            {
                term: "recipient",
                type: "glossary",
                label: "Recipient"
            }
        ]
    },
    {
        content_type: 'Marketing',
        taxonomy: "Exploring America's Finances",
        banner_subtitle: "Learning About Government Spending Has Never Been Easier",
        title: "Exploring America's Finances",
        created_date: "09/29/2025",
        description: "Behind every dollar the U.S. government spends, there is a story. But how can you discover that story? What tools do you need to understand it?",
        slug: "exploring-americas-finances",
        feature_sprint: 1,
        feature_week: 1,
        related_terms: [],
        explore_more: [
            {
                label: "Fiscal Data",
                slug: "https://fiscaldata.treasury.gov/",
                type: "government"
            },
            {
                label: "YouTube: Exploring America's Finances",
                slug: "https://youtu.be/pRGY0VfQ4II",
                type: "external"
            },
            {
                label: "Advanced Search",
                slug: "/search",
                type: "internal"
            }
        ]
    },
    {
        content_type: 'Featured Content',
        taxonomy: "Recently Answered Questions",
        banner_subtitle: "How are Obligations and Outlays Different?",
        title: "Obligations vs. Outlays",
        created_date: "09/29/2025",
        description: "For this series, we asked our Transparency Experience Desk to answer the most commonly-asked questions about USAspending.gov’s open data.",
        feature_sprint: 1,
        feature_week: 2,
        slug: "obligations-vs-outlays",
        thumbnail_path: "../../img/featuredContent/cards/recently-answered-questions.webp",
        explore_more: [
            {
                label: "USAspending Community",
                slug: "https://onevoicecrm.my.site.com/usaspending/s/",
                type: "external"
            },
            {
                label: "Advanced Search",
                slug: "/search",
                type: "internal"
            },
            {
                label: "Data Sources",
                slug: "/data-sources",
                type: "internal"
            }
        ],
        related_terms: [
            {
                term: "loan-subsidy-cost",
                type: "glossary",
                label: "Loan Subsidy Cost"
            },
            {
                term: "obligation",
                type: "glossary",
                label: "Obligation"
            },
            {
                term: "outlay",
                type: "glossary",
                label: "Outlay"
            }
        ]
    },
    {
        taxonomy: "See 4 Yourself",
        content_type: 'Featured Content',
        banner_subtitle: "How People Use USAspending.gov Data",
        title: "Ways to Use Our Data",
        created_date: "09/29/2025",
        feature_sprint: 1,
        feature_week: 3,
        description: "If you want to understand how you’re spending your own money, reviewing your bank statements and budget are a great place to start. If you want to understand",
        slug: "ways-to-use-our-data",
        black_text: true,
        explore_more: [
            {
                label: "Advanced Search",
                slug: "/search",
                type: "internal"
            },
            {
                label: "Data Sources",
                slug: "/data-sources",
                type: "internal"
            }
        ],
        related_terms: []
    },
    {
        taxonomy: "Data You Can Trust",
        content_type: 'Marketing',
        banner_subtitle: "What makes our data different, where does it come from, and what makes it trustworthy?",
        title: "Understanding Our Trusted Data",
        created_date: "12/04/25",
        feature_sprint: 2,
        feature_week: 1,
        description: "USAspending.gov is the official source for tracking federal government spending—but what makes our data different, where does it come from, and what makes it",
        slug: "understanding-our-trusted-data",
        black_text: true,
        explore_more: [
            {
                label: "USAspending Community",
                slug: "https://onevoicecrm.my.site.com/usaspending/s/",
                type: "external"
            },
            {
                label: "Data Sources",
                slug: "/data-sources",
                type: "internal"
            }
        ],
        related_terms: []
    },
    {
        taxonomy: "Data Definitions",
        content_type: 'Featured Content',
        banner_subtitle: "How Does USAspending.gov Define Recipients?",
        title: "What Is a Recipient",
        created_date: "12/04/25",
        feature_sprint: 2,
        feature_week: 1,
        description: "When searching for government spending data on USAspending.gov, you’re very likely to see the word “recipient. Whether you’re using our filters to refine your",
        slug: "what-is-a-recipient",
        explore_more: [
            {
                label: "Advanced Search",
                slug: "/search",
                type: "internal"
            },
            {
                label: "Federal Spending Guide",
                slug: "/federal-spending-guide",
                type: "internal"
            }
        ],
        related_terms: [
            {
                term: "recipient",
                type: "glossary",
                label: "Recipient"
            },
            {
                term: "outlay",
                type: "glossary",
                label: "Outlay"
            }
        ]
    },
    {
        taxonomy: "What's the Difference?",
        content_type: 'Featured Content',
        title: "Grants vs. Contracts",
        banner_subtitle: "What’s the Difference Between Grants and Contracts?",
        created_date: "12/25/25",
        feature_sprint: 3,
        feature_week: 1,
        description: "If you want to build a house, you must know what kind of material to use. Lest you end up like two of the three little pigs, building a house out of straw or",
        slug: "grants-vs-contracts",
        explore_more: [
            {
                label: "Advanced Search",
                slug: "/search",
                type: "internal"
            }
        ],
        related_terms: [
            {
                term: "contract",
                type: "glossary",
                label: "Contract"
            },
            {
                term: "grant",
                type: "glossary",
                label: "Grant"
            },
            {
                term: "contract-pricing-type",
                type: "glossary",
                label: "Contract Pricing Type"
            }
        ]
    },
    {
        taxonomy: "Spending Stories",
        content_type: 'Marketing',
        title: "Discover How Government Spending Supports Causes You Care About",
        banner_subtitle: "Explore How the Federal Government Spends Money on a Particular Topic",
        created_date: "12/25/25",
        feature_sprint: 3,
        feature_week: 1,
        description: "If you’re passionate about a cause—whether it’s education, environmental protection, public health, or national security—you can use Advanced Search to explore",
        slug: "discover-how-government-spending-supports-causes-you-care-about",
        explore_more: [
            {
                label: "Advanced Search",
                slug: "/search",
                type: "internal"
            },
            {
                label: "What is a Recipient",
                slug: "/featured-content/data-definitions/what-is-a-recipient",
                type: "internal"
            },
            {
                label: "Spending by Agency",
                slug: "/explorer/agency",
                type: "internal"
            }
        ],
        related_terms: [
            {
                term: "fiscal-year-fy",
                type: "glossary",
                label: "Fiscal Year"
            },
            {
                term: "agency",
                type: "glossary",
                label: "Agency"
            },
            {
                term: "recipient-location",
                type: "glossary",
                label: "Recipient Location"
            }
        ]
    }
    // {
    //     taxonomy: "My USAspending Search",
    //     content_type: 'Featured Content',
    //     banner_subtitle: "Follow the Money Using USAspending.gov’s Spending Explorer",
    //     title: "John’s USAspending Search",
    //     created_date: "12/25/25",
    //     feature_sprint: 3,
    //     feature_week: 1,
    //     description: "The reasons for visiting USAspending.gov are as unique and varied as the users themselves. Many of our users have specific, personalized searches",
    //     slug: "johns-usaspending-search",
    //     explore_more: [
    //         {
    //             label: "Advanced Search",
    //             slug: "/search",
    //             type: "internal"
    //         },
    //         {
    //             label: "Federal Spending Guide",
    //             slug: "/federal-spending-guide",
    //             type: "internal"
    //         }
    //     ],
    //     related_terms: [
    //         {
    //             term: "recipient",
    //             type: "glossary",
    //             label: "Recipient"
    //         },
    //         {
    //             term: "outlay",
    //             type: "glossary",
    //             label: "Outlay"
    //         }
    //     ]
    // }
];

export default articles;
