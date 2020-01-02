const fs = require('fs');
const axios = require('axios');
const path = require('path');

const Routes = require('../containers/router/RouterRoutes.js').routes;

// 1. get routes from router
// 2. get routes from api (w/ ids)
// 2a. all agencies
// 2b. all federal accounts
// 2c. all states
// 2d. x # of recipients?
// 2e. x # of awards?

const xmlStart = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url>`;

const testRoutes = [
    'google.com/test'
];

const xmlEnd = `</url></urlset>`;

const buildRouteString = () => {
    return testRoutes.reduce((acc, route) => {
        return `${acc}<url><loc>${route}</loc></url>`;
    }, '');
};

const writeXMLFile = () => {
    fs.writeFile(path.resolve(__dirname, '../../../sitemap.xml'), `${xmlStart}${buildRouteString()}${xmlEnd}`, () => {
        console.log("Sitemap successfully created!");
    });
};

writeXMLFile();
