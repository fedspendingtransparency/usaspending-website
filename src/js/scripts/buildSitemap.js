const fs = require('fs');
const axios = require('axios');
const path = require('path');

const pages = require('./pages');

// 1. get routes from router
// 2. get routes from api (w/ ids)
// 2a. all agencies
// 2b. all federal accounts
// 2c. all states
// 2d. x # of recipients?
// 2e. x # of awards?

const xmlStart = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

const xmlEnd = `</urlset>`;
/**
 * @param xml string: of xml, previous xml entries from current sitemap
 * @param pageData array of objects: data w/ the url param needed to the page
 * @param pageInfo object: context for pageData; (a) how to access the url param & (b) what client route the page is associated with
 * @param isGrandDaddy boolean: whether to create <url> or <sitemap>
 */
const createSitemapEntry = (xml, pageData, pageInfo) => {
    if (!pageData) return '';
    const { accessor, clientRoute } = pageInfo;
    return pageData.reduce((str, item) => {
        return `${str}<url><loc>${clientRoute}/${item[accessor]}</loc></url>`;
    }, xml);
};

const createSitemap = (xmlRoutes, siteMapName = 'sitemap') => {
    fs.writeFile(
        path.resolve(__dirname, `../../../sitemaps/${siteMapName}.xml`),
        `${xmlStart}${xmlRoutes}${xmlEnd}`,
        () => {
            console.log("Sitemap successfully created!");
        });
};

const buildUrlXml = () => {
    // write indexed sitemap
    let grandDaddyXml = '';
    pages
        .find((url) => url.name === 'routes_from_router').routes
        .filter((route) => route.addToSitemap)
        .map((route) => ({
            ...route,
            clientRoute: `https://www.usaspending.gov/#${route.path}`,
            accessor: ''
        }))
        .forEach((route) => {
            grandDaddyXml = `${grandDaddyXml}<sitemap><loc>${route.clientRoute}</loc></sitemap>`;
        });

    createSitemap(grandDaddyXml, 'static');

    // write async site maps
    const asyncPages = pages
        .filter((url) => url.isAsync)
        .reduce((previousPromise, url, i, arr) => {
            return previousPromise
                .then((resp) => {
                    if (resp !== 'first') {
                        let xml = '';
                        // use previous item in array as the source of truth for traversing the previousPromises' response
                        const previousPage = arr[i - 1];
                        const results = resp.data.results || resp.data;
                        xml = createSitemapEntry(xml, results, previousPage);
                        createSitemap(xml, previousPage.name);
                    }
                    return axios({
                        method: url.method,
                        data: url.requestObject || null,
                        url: url.url
                    });
                })
                .catch((e) => console.log("error", e));
        }, Promise.resolve('first'));

    asyncPages.then((resp) => {
        let xml = '';
        // Once the final promise resolves, we can add it to our xml string and then write the file.
        const previousPage = pages[pages.length - 1];
        const { results } = resp.data;

        xml = createSitemapEntry(xml, results, previousPage);
        createSitemap(xml, previousPage.name);
    });
};

buildUrlXml();
