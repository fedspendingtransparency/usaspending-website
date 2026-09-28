/* eslint-disable max-len */
const bannerContent = [
    {
        isActive: true,
        content:'USAspending daily data refreshes will be paused temporarily starting Tuesday September 29, 2026 for planned maintenance. Daily updates are estimated to resume on October 14, 2026 at which time the data will be made current. Please contact the Service Desk at usaspending.help@fiscal.treasury.gov with any questions.',
        page:'site wide',
        type:'general'
    },
    {
        isActive: true,
        title: 'Warning',
        content: 'This is a warning notice.',
        page: '/temp-page', // use 'site wide' to display a banner across the entire site
        type: 'general' // three options "general", "warning", "warning-resolved"
    },
    {
        isActive: true,
        title: 'Resolved',
        content: 'This is a warning resolved notice',
        page: '/temp-page', // use 'site wide' to display a banner across the entire site
        type: 'warning-resolved' // three options "general", "warning", "warning-resolved"
    },
    {
        isActive: false,
        title: 'Site Wide Notice',
        content: 'This is a notice across the entire site',
        page: 'site wide', // use 'site wide' to display a banner across the entire site
        type: 'warning-resolved' // three options "general", "warning", "warning-resolved"
    }
];

export default bannerContent;
