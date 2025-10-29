import React from 'react';

export const bannerContent = [
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
        content: <>Due to the lapse in funding, there may be a delay in the release of data and support for this website.
            We will resume our normal data publication schedule and support operations once funding is restored.
            There is additional information at <a href="https://home.treasury.gov/">https://home.treasury.gov/</a></>,
        page: 'site wide', // use 'site wide' to display a banner across the entire site
        type: 'general' // three options "general", "warning", "warning-resolved"
    }
];

