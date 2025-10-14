/* eslint-disable max-len */
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
        banner_title: "What is an Award",
        banner_subtitle: "subtitle lorem ipsum dolor sit amet, consectetur adipiscing elit",
        title: "What is an Award",
        created_date: "09/29/2025",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in dolor nec massa aliquet cursus in vel turpis. Etiam id volutpat ipsum. Sed nibh tellus, ullamcorper ac sagittis vitae, feugiat ac tellus. Vivamus sit amet nulla venenatis, iaculis nibh vitae, efficitur est. Curabitur ac sagittis est, quis condimentum nunc. Vestibulum porttitor lacinia turpis, at volutpat nulla viverra et.",
        mdx_path: "what-is-an-award.mdx",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-violet_vivid.webp",
        tablet_hero: "../../img/featuredContent/banner/tablet/featured_content_banner-tablet-violet_vivid.webp",
        mobile_hero: "../../img/featuredContent/banner/mobile/featured_content_banner-mobile-violet_vivid-25.webp",
        slug: "what-is-an-award",
        thumbnail_path: "../../img/featuredContent/cards/data-definitions.webp",
        fill: contentMap.dataDefinition,
        landing_header_path: "",
        explore_more: [],
        related_terms: []
    },
    {
        content_type: "Exploring America's Finances",
        banner_title: "Exploring America's Finances Has Never Been Easier",
        banner_subtitle: "subtitle lorem ipsum dolor sit amet, consectetur adipiscing elit",
        title: "Exploring America's Finances Has Never Been Easier",
        created_date: "09/29/2025",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in dolor nec massa aliquet cursus in vel turpis. Etiam id volutpat ipsum. Sed nibh tellus, ullamcorper ac sagittis vitae, feugiat ac tellus. Vivamus sit amet nulla venenatis, iaculis nibh vitae, efficitur est. Curabitur ac sagittis est, quis condimentum nunc. Vestibulum porttitor lacinia turpis, at volutpat nulla viverra et.",
        mdx_path: "exploring-americas-finances-the-data-behind-the-dollars.mdx",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-indigo_cool_vivid.webp",
        tablet_hero: "../../img/featuredContent/banner/tablet/featured_content_banner-tablet-indigo_cool_vivid.webp",
        mobile_hero: "../../img/featuredContent/banner/mobile/featured_content_banner-tablet-indigo_cool_vivid.webp",
        slug: "exploring-americas-finances-the-data-behind-the-dollars",
        thumbnail_path: "../../img/featuredContent/cards/exploring-americas-finances.webp",
        fill: contentMap.finances,
        landing_header_path: "",
        explore_more: [],
        related_terms: []
    },
    {
        content_type: "Recently Answered Questions",
        title: "Obligations vs Outlays",
        banner_subtitle: "subtitle lorem ipsum dolor sit amet, consectetur adipiscing elit",
        created_date: "09/29/2025",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in dolor nec massa aliquet cursus in vel turpis. Etiam id volutpat ipsum. Sed nibh tellus, ullamcorper ac sagittis vitae, feugiat ac tellus. Vivamus sit amet nulla venenatis, iaculis nibh vitae, efficitur est. Curabitur ac sagittis est, quis condimentum nunc. Vestibulum porttitor lacinia turpis, at volutpat nulla viverra et.",
        mdx_path: "",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-violet_warm.webp",
        tablet_hero: "../../img/featuredContent/banner/tablet/featured_content_banner-tablet-violet_warm.webp",
        mobile_hero: "../../img/featuredContent/banner/mobile/featured_content_banner-mobile-violet_warm.webp",
        thumbnail_path: "../../img/featuredContent/cards/recently-answered-questions.webp",
        fill: contentMap.questions,
        landing_header_path: "",
        explore_more: [],
        related_terms: []
    },
    {
        content_type: "See 4 Yourself",
        title: "Four Ways to Use Our Data",
        banner_subtitle: "subtitle lorem ipsum dolor sit amet, consectetur adipiscing elit",
        created_date: "09/29/2025",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in dolor nec massa aliquet cursus in vel turpis. Etiam id volutpat ipsum. Sed nibh tellus, ullamcorper ac sagittis vitae, feugiat ac tellus. Vivamus sit amet nulla venenatis, iaculis nibh vitae, efficitur est. Curabitur ac sagittis est, quis condimentum nunc. Vestibulum porttitor lacinia turpis, at volutpat nulla viverra et.",
        mdx_path: "",
        hero: "../../img/featuredContent/banner/desktop/featured_content_banner-desktop-orange_vivid.webp",
        tablet_hero: "../../img/featuredContent/banner/tablet/featured_content_banner-tablet-orange_vivid.webp",
        mobile_hero: "../../img/featuredContent/banner/mobile/featured_content_banner-mobile-orange_vivid.webp",
        thumbnail_path: "../../img/featuredContent/cards/see-4-yourself.webp",
        fill: contentMap.seeforyourself,
        landing_header_path: "",
        explore_more: [],
        related_terms: []
    }
];

export default articles;
