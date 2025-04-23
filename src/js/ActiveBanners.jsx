import React from 'react';
import ExternalLink from "./components/sharedComponents/ExternalLink";

export const bannerContent = [
    {
        isActive: true,
        title: 'Updates to the Advanced Search experience',
        content: <>Results can now be viewed individually by Prime Award, Transaction, and Subaward using the filter at the top of the page. Additionally, filters are now grouped by category in a collapsible module, allowing you to expand tables and visualizations. For a more detailed breakdown of the filter updates, please visit the <ExternalLink url="https://github.com/fedspendingtransparency/usaspending-website/wiki">release notes</ExternalLink>.</>,
        page: '/searchv2', // use 'site wide' to display a banner across the entire site
        type: 'general' // three options "general", "warning", "warning-resolved"
    },
    {
        isActive: false,
        title: 'Updates to the Advanced Search experience',
        content: <>Results can now be viewed individually by Prime Award, Transaction, and Subaward using the filter at the top of the page. Additionally, filters are now grouped by category in a collapsible module, allowing you to expand tables and visualizations. For a more detailed breakdown of the filter updates, please visit the <ExternalLink url="https://github.com/fedspendingtransparency/usaspending-website/wiki">release notes</ExternalLink>.</>,
        page: '/search', // use 'site wide' to display a banner across the entire site
        type: 'general' // three options "general", "warning", "warning-resolved"
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

