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
        content_type: "Data Definitions",
        banner_title: "What is an Award?",
        banner_subtitle: "subtitle lorem ipsum dolor sit amet, consectetur adipiscing elit",
        title: "What is an Award?",
        created_date: "09/29/2025",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in dolor nec massa aliquet cursus in vel turpis. Etiam id volutpat ipsum. Sed nibh tellus, ullamcorper ac sagittis vitae, feugiat ac tellus. Vivamus sit amet nulla venenatis, iaculis nibh vitae, efficitur est. Curabitur ac sagittis est, quis condimentum nunc. Vestibulum porttitor lacinia turpis, at volutpat nulla viverra et.",
        mdx_path: "what-is-an-award.mdx",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-data_definitions.webp",
        tablet_hero: "../../img/featuredContent/banner/tablet/featured_content_banner-tablet-violet_vivid.webp",
        mobile_hero: "../../img/featuredContent/banner/mobile/featured_content_banner-mobile-violet_vivid-25.webp",
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
        content_type: "Exploring America's Finances",
        banner_title: "Exploring America's Finances Has Never Been Easier",
        banner_subtitle: "subtitle lorem ipsum dolor sit amet, consectetur adipiscing elit",
        title: "Exploring America's Finances Has Never Been Easier",
        created_date: "09/29/2025",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in dolor nec massa aliquet cursus in vel turpis. Etiam id volutpat ipsum. Sed nibh tellus, ullamcorper ac sagittis vitae, feugiat ac tellus. Vivamus sit amet nulla venenatis, iaculis nibh vitae, efficitur est. Curabitur ac sagittis est, quis condimentum nunc. Vestibulum porttitor lacinia turpis, at volutpat nulla viverra et.",
        mdx_path: "exploring-americas-finances-the-data-behind-the-dollars.mdx",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-data_definitions.webp",
        tablet_hero: "../../img/featuredContent/banner/tablet/featured_content_banner-tablet-indigo_cool_vivid.webp",
        mobile_hero: "../../img/featuredContent/banner/mobile/featured_content_banner-tablet-indigo_cool_vivid.webp",
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
                label: "Exploring America's Finances with USAspending.gov and FiscalData.Treasury.gov",
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
        content_type: "Recently Answered Questions",
        banner_title: "Obligations vs. Outlays",
        banner_subtitle: "subtitle lorem ipsum dolor sit amet, consectetur adipiscing elit",
        title: "Obligations vs. Outlays",
        created_date: "09/29/2025",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in dolor nec massa aliquet cursus in vel turpis. Etiam id volutpat ipsum. Sed nibh tellus, ullamcorper ac sagittis vitae, feugiat ac tellus. Vivamus sit amet nulla venenatis, iaculis nibh vitae, efficitur est. Curabitur ac sagittis est, quis condimentum nunc. Vestibulum porttitor lacinia turpis, at volutpat nulla viverra et.",
        mdx_path: "obligations-vs-outlays.mdx",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-recently_answered_questions.webp",
        tablet_hero: "../../img/featuredContent/banner/tablet/featured_content_banner-tablet-violet_warm.webp",
        mobile_hero: "../../img/featuredContent/banner/mobile/featured_content_banner-mobile-violet_warm.webp",
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
        content_type: "See 4 Yourself",
        banner_title: "Exploring America’s Finances Has Never Been Easier",
        banner_subtitle: "What makes up a location filter and how does it behave when applied?",
        title: "Four Ways to Use Our Data",
        created_date: "09/29/2025",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in dolor nec massa aliquet cursus in vel turpis. Etiam id volutpat ipsum. Sed nibh tellus, ullamcorper ac sagittis vitae, feugiat ac tellus. Vivamus sit amet nulla venenatis, iaculis nibh vitae, efficitur est. Curabitur ac sagittis est, quis condimentum nunc. Vestibulum porttitor lacinia turpis, at volutpat nulla viverra et.",
        mdx_path: "four-ways-to-use-our-data.mdx",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-see_4_yourself.webp",
        tablet_hero: "../../img/featuredContent/banner/tablet/featured_content_banner-tablet-orange_vivid.webp",
        mobile_hero: "../../img/featuredContent/banner/mobile/featured_content_banner-mobile-orange_vivid.webp",
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
