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
        banner_title: "What is an Award?",
        banner_subtitle: "Award Has a Very Specific Meaning in Government Spending",
        title: "What is an Award?",
        created_date: "09/29/2025",
        description: "When you think of the word “award,” you might picture an actor receiving an Oscar, an athlete earning a medal at the Olympics, or even yourself earning a gold.",
        feature_sprint: 1,
        feature_week: 1,
        mdx_path: "what-is-an-award.mdx",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-data_definitions.webp",
        thumbnail_path: "../../img/featuredContent/cards/data-definitions.webp",
        fill: contentMap.dataDefinition,
        secondary: secondary.dataDefinition,
        landing_header_path: "",
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
        banner_title: "Exploring America's Finances",
        banner_subtitle: "Learning About Government Spending Has Never Been Easier",
        title: "Exploring America's Finances",
        created_date: "09/29/2025",
        description: "Behind every dollar the U.S. government spends, there is a story. But how can you discover that story? What tools do you need to understand it?",
        mdx_path: "exploring-americas-finances-the-data-behind-the-dollars.mdx",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-exploring_americas_finances.webp",
        feature_sprint: 1,
        feature_week: 1,
        thumbnail_path: "../../img/featuredContent/cards/exploring-americas-finances.webp",
        fill: contentMap.finances,
        secondary: secondary.finances,
        landing_header_path: "",
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
        banner_title: "Obligations vs. Outlays",
        banner_subtitle: "How are Obligations and Outlays Different?",
        title: "Obligations vs. Outlays",
        created_date: "09/29/2025",
        description: "For this series, we asked our Transparency Experience Desk to answer the most commonly-asked questions about USAspending.gov’s open data.",
        feature_sprint: 1,
        feature_week: 2,
        mdx_path: "obligations-vs-outlays.mdx",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-recently_answered_questions.webp",
        thumbnail_path: "../../img/featuredContent/cards/recently-answered-questions.webp",
        fill: contentMap.questions,
        secondary: secondary.questions,
        landing_header_path: "",
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
        banner_title: "Ways to Use Our Data",
        banner_subtitle: "How People Use USAspending.gov Data",
        title: "Ways to Use Our Data",
        created_date: "09/29/2025",
        feature_sprint: 1,
        feature_week: 3,
        description: "If you want to understand how you’re spending your own money, reviewing your bank statements and budget are a great place to start. If you want to understand",
        mdx_path: "four-ways-to-use-our-data.mdx",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-see_4_yourself.webp",
        thumbnail_path: "../../img/featuredContent/cards/see-4-yourself.webp",
        fill: contentMap.seeforyourself,
        secondary: secondary.seeforyourself,
        black_text: true,
        landing_header_path: "",
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
        taxonomy: "See 4 Yourself",
        isLongForm: true,
        content_type: 'Featured Content',
        banner_title: "Ways to Use Our Data",
        banner_subtitle: "How People Use USAspending.gov Data",
        title: "Ways to Use Our Data",
        created_date: "09/29/2025",
        feature_sprint: 1,
        feature_week: 3,
        description: "If you want to understand how you’re spending your own money, reviewing your bank statements and budget are a great place to start. If you want to understand",
        mdx_path: "four-ways-to-use-our-data.mdx",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-see_4_yourself.webp",
        thumbnail_path: "../../img/featuredContent/cards/see-4-yourself.webp",
        fill: contentMap.seeforyourself,
        secondary: secondary.seeforyourself,
        black_text: true,
        landing_header_path: "",
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
    }
];

export default articles;
