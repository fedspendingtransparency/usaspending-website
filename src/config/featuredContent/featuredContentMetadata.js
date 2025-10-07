const contentMap = {
    dataDefinition: '#783cb9',
    search: '#cf4900',
    seeforyourself: '#fa9441',
    questions: '#93348c',
    finances: '#1b2b85',
    trust: '#73B3E7',
    stories: '#2378c3',
    difference: '#5abf95'
};
// the first entry has what is necessary for a full article
const articles = [
    {
        content_type: "Data Definitions",
        banner_title: "Location Filters",
        banner_subtitle: "What makes up a location filter and how does it behave when applied?",
        title: "Title for impressive article",
        alt_title: "Four ways to use our data",
        created_date: "10/1/2025",
        description: "If you want to understand how you’re spending your own money, reviewing your bank statements and budget are a great place to start. If you want to understand how stuff when things happen and other stuff happens you should learn how stuff does work when happens happen",
        mdx_path: "exploring-americas-finances-the-data-behind-the-dollars.mdx",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-violet_vivid.webp",
        tablet_hero: "../../img/featuredContent/banner/tablet/featured_content_banner-tablet-violet_vivid.webp",
        mobile_hero: "../../img/featuredContent/banner/mobile/featured_content_banner-mobile-violet_vivid-25.webp",
        slug: "testing-article",
        thumbnail_path: "../../img/featuredContent/cards/data-definitions.webp",
        fill: contentMap.dataDefinition,
        landing_header_path: "",
        explore_more: [],
        related_terms: []
    },
    {
        content_type: "What's the difference",
        title: "Second Title for impressive article",
        alt_title: "Exploring America’s Finances: The Data Behind the Dollars",
        created_date: "5/8/2025",
        description: "If you want to understand how you’re spending your own money, reviewing your bank statements and budget are a great place to start. If you want to understand how stuff when things happen and other stuff happens you should learn how stuff does work when happens happen",
        mdx_path: "",
        thumbnail_path: "../../img/featuredContent/cards/whats-the-difference.webp",
        fill: contentMap.difference,
        landing_header_path: "",
        explore_more: [],
        related_terms: []
    },
    {
        content_type: "Recently Answered Questions",
        title: "Other Title for impressive article",
        alt_title: "Exploring America’s Finances: The Data Behind the Dollars",
        created_date: "4/7/2025",
        description: "If you want to understand how you’re spending your own money, reviewing your bank statements and budget are a great place to start. If you want to understand how stuff when things happen and other stuff happens you should learn how stuff does work when happens happen",
        mdx_path: "",
        thumbnail_path: "../../img/featuredContent/cards/recently-answered-questions.webp",
        fill: contentMap.questions,
        landing_header_path: "",
        explore_more: [],
        related_terms: []
    },
    {
        content_type: "See 4 yourself",
        title: "New Title for impressive article",
        alt_title: "Exploring America’s Finances: The Data Behind the Dollars",
        created_date: "1/1/2025",
        description: "If you want to understand how you’re spending your own money, reviewing your bank statements and budget are a great place to start. If you want to understand how stuff when things happen and other stuff happens you should learn how stuff does work when happens happen",
        mdx_path: "",
        thumbnail_path: "../../img/featuredContent/cards/see-4-yourself.webp",
        fill: contentMap.seeforyourself,
        landing_header_path: "",
        explore_more: [],
        related_terms: []
    },
    {
        content_type: "What's the difference",
        title: "Yet another Title for impressive article",
        alt_title: "Exploring America’s Finances: The Data Behind the Dollars",
        created_date: "4/7/2025",
        description: "If you want to understand how you’re spending your own money, reviewing your bank statements and budget are a great place to start. If you want to understand how stuff when things happen and other stuff happens you should learn how stuff does work when happens happen",
        mdx_path: "",
        thumbnail_path: "../../img/featuredContent/cards/whats-the-difference.webp",
        fill: contentMap.difference,
        landing_header_path: "",
        explore_more: [],
        related_terms: []
    },
    {
        content_type: "Data Definitions",
        title: "Running out of Titles for impressive article",
        alt_title: "Four ways to use our data",
        created_date: "2/3/2025",
        description: "If you want to understand how you’re spending your own money, reviewing your bank statements and budget are a great place to start. If you want to understand how stuff when things happen and other stuff happens you should learn how stuff does work when happens happen",
        mdx_path: "",
        thumbnail_path: "../../img/featuredContent/cards/data-definitions.webp",
        fill: contentMap.dataDefinition,
        landing_header_path: "",
        explore_more: [],
        related_terms: []
    },
    {
        content_type: "Recently Answered Questions",
        title: "Testing Title for impressive article",
        alt_title: "Exploring America’s Finances: The Data Behind the Dollars",
        created_date: "6/2/2025",
        description: "If you want to understand how you’re spending your own money, reviewing your bank statements and budget are a great place to start. If you want to understand how stuff when things happen and other stuff happens you should learn how stuff does work when happens happen",
        mdx_path: "",
        thumbnail_path: "../../img/featuredContent/cards/recently-answered-questions.webp",
        fill: contentMap.questions,
        landing_header_path: "",
        explore_more: [],
        related_terms: []
    },
    {
        content_type: "See 4 yourself",
        title: "See for yourself title",
        alt_title: "Exploring America’s Finances: The Data Behind the Dollars",
        created_date: "7/4/2025",
        description: "If you want to understand how you’re spending your own money, reviewing your bank statements and budget are a great place to start. If you want to understand how stuff when things happen and other stuff happens you should learn how stuff does work when happens happen",
        mdx_path: "",
        thumbnail_path: "../../img/featuredContent/cards/see-4-yourself.webp",
        fill: contentMap.seeforyourself,
        landing_header_path: "",
        explore_more: [],
        related_terms: []
    }
];

export default articles;
