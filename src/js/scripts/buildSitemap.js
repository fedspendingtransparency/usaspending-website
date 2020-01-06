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
 */
const createSitemapEntry = (xml, pageData, pageInfo) => {
    if (!pageData) return '';
    const { accessor, clientRoute } = pageInfo;
    return pageData.reduce((str, item) => {
        if (item.name === 'award') {
            return `${str}<url><loc>${clientRoute}/${encodeURI(item[accessor])}</loc></url>`;    
        }
        return `${str}<url><loc>${clientRoute}/${item[accessor]}</loc></url>`;
    }, xml);
};

const createSitemap = (xmlRoutes, siteMapName = 'sitemap') => {
    fs.writeFile(
        path.resolve(__dirname, `../../../sitemaps/${siteMapName}.xml`),
        `${xmlStart}${xmlRoutes}${xmlEnd}`,
        () => {
            console.log(`Sitemap ${siteMapName}.xml successfully created!`);
        });
};

const buildIndividualSitemaps = () => {
    // write the static sitemap
    let staticRoutesXml = '';
    pages
        .find((page) => page.name === 'static-routes').routes
        .filter((route) => route.addToSitemap)
        .map((route) => ({
            ...route,
            clientRoute: `https://www.usaspending.gov/#${route.path}`,
            accessor: ''
        }))
        .forEach((route) => {
            staticRoutesXml = `${staticRoutesXml}<url><loc>${route.clientRoute}</loc></url>`;
        });

    createSitemap(staticRoutesXml, 'static');

    // write the async site maps
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

const hostNameByEnv = {
    prod: 'https://www.usaspending.gov',
    dev: 'https://www.dev.usaspending.gov'
};

const buildIndexedSitemap = () => {
    const env = process.argv[2];
    const xml = pages
        .reduce((acc, page) => `${acc}<sitemap>
                <loc>${hostNameByEnv[env]}/${page.name}.xml</loc>
            </sitemap>
        `, '');

    createSitemap(xml);
};

buildIndexedSitemap();
buildIndividualSitemaps();
