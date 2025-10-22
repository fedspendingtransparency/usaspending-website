import React from 'react';
import { Link } from 'react-router';
import GlobalConstants from './GlobalConstants';

export const bannerContent = [
    {
        isActive: true,
        title: 'Notice: This page is currently in beta mode.',
        content: <>For Advanced Search features, please visit <Link to={GlobalConstants.SEARCH_LEGACY_PATH}>https://usaspending.gov/search</Link>. If you have any questions, please reach out to:{` `}
            <a href="mailto:usaspending.help@fiscal.treasury.gov?subject=Advanced%20Search%20Questions">
                usaspending.help@fiscal.treasury.gov
            </a></>,
        page: GlobalConstants.SEARCH_V2_PATH, // use 'site wide' to display a banner across the entire site
        type: 'warning' // three options "general", "warning", "warning-resolved"
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

