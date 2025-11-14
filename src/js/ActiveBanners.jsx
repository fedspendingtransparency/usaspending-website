// eslint-disable-next-line no-unused-vars
import React from 'react';

/* eslint-disable max-len */
const bannerContent = [
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
    },
    {
        isActive: true,
        title: '',
        content: <>Normal operations have resumed. Some data updates and support services may be delayed as we work to process pending publications. We will return to our normal update schedule as soon as possible.</>,
        page: 'site wide', // use 'site wide' to display a banner across the entire site
        type: 'general' // three options "general", "warning", "warning-resolved"
    }
];

export default bannerContent;
