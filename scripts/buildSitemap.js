const fs = require('fs');
const axios = require('axios');
const path = require('path');

const pages = require('./pages');

const siteUrl = 'https://www.usaspending.gov';
const xmlStart = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
const indexedSitemapXmlStart = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
const sitemapsWritten = [];
const xmlEnd = `</urlset>`;
const indexedSitemapXmlEnd = `</sitemapindex>`;
const forbiddenChars = ['&', "'", '"', '<', '>'];

/**
 * @param {string} xml string of xml, previous xml entries from current sitemap
 * @param {Array.object} pageData data w/ the url param needed to the page
 * @param {object} pageInfo object with 4 properties of interest
    * * @param {string} accessor how to access the url param on the pageData obj
    * * @param {string} clientRoute client side route for page
    * * @param {string} priority how important the page is on scale of 0.1 - 0.9
    * * @param {string} updatedFrequency how frequently google should crawl this page
* @returns {string} looks like this <url><loc>https://www.usaspending.gov/#/award/CONT_IDV_GS35F0045K_4730</loc><changefreq>weekly</changefreq><priority>1</priority></url>
 */
const createSitemapEntry = (xml, pageData, pageInfo) => {
    if (!pageData) return '';
    const { accessor, clientRoute, priority, updatedFrequency } = pageInfo;
    return pageData
        .map((page) => ({ value: page[accessor], name: page.name }))
        .filter((page) => {
            if (typeof page.value === 'string') {
                return page.value
                    .split('')
                    // id inside url can't contain one of these characters cause they have to be entity-escaped
                    .some((letter) => forbiddenChars.indexOf(letter) === -1);
            }
            return true;
        })
        .reduce((str, page) => {
            if (pageInfo.name === 'award') {
                return `${str}<url><loc>${clientRoute}/${encodeURI(page.value)}</loc><changefreq>${updatedFrequency}</changefreq><priority>${priority}</priority></url>`;
            }
            else if (pageInfo.name === 'recipient' || pageInfo.name === 'state') {
                return `${str}<url><loc>${clientRoute}/${page.value}/latest</loc><changefreq>${updatedFrequency}</changefreq><priority>${priority}</priority></url>`;
            }
            return `${str}<url><loc>${clientRoute}/${page.value}</loc><changefreq>${updatedFrequency}</changefreq><priority>${priority}</priority></url>`;
        }, xml);
};

const createRobots = () => {
    fs.writeFile(
        path.resolve(__dirname, `../robots.txt`),
        `User-agent: * \nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml`,
        () => console.log("robots.txt successfully created!")
    );
};

const createIndexedSitemap = (xmlRoutes) => {
    fs.writeFile(
        path.resolve(__dirname, `../sitemap.xml`),
        `${indexedSitemapXmlStart}${xmlRoutes}${indexedSitemapXmlEnd}`,
        () => console.log(`Sitemap sitemap.xml successfully created!`)
    );

    sitemapsWritten.push('sitemap');
}

const createSitemap = (xmlRoutes, siteMapName = 'sitemap') => {
    fs.writeFile(
        path.resolve(__dirname, `../${siteMapName}.xml`),
        `${xmlStart}${xmlRoutes}${xmlEnd}`,
        () => console.log(`Sitemap ${siteMapName}.xml successfully created!`)
    );

    sitemapsWritten.push(siteMapName);
};

const handleApiResponse = (resp) => {
    // flatten massive arrays returned from Promise.all();
    if (Array.isArray(resp)) {
        return resp.reduce((acc, result) => {
            return [
                ...acc,
                ...result.data.results
            ];
        }, []);
    }
    // return array in results/data namespace (res.data is for the states api response :shrug:)
    return resp.data.results || resp.data;
};

const buildIndividualSitemaps = () => {
    // 1. get routes from router
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

    // 2. get routes from api (w/ ids)
    const asyncPages = pages
        .filter((page) => page.isAsync || Array.isArray(page))
        .reduce((previousPromise, page, i, arr) => previousPromise
            .then((resp) => {
                if (resp !== 'first') {
                    let xml = '';
                    // use previous item in array as the source of truth for traversing the previousPromises' response
                    const responseContext = Array.isArray(arr[i - 1]) ? arr[i - 1][0] : arr[i - 1];
                    const results = handleApiResponse(resp);
                    xml = createSitemapEntry(xml, results, responseContext);
                    createSitemap(xml, responseContext.name);
                }
                if (Array.isArray(page)) {
                    const nestedPages = page.map((nestedPage) => axios({
                        method: nestedPage.method,
                        data: nestedPage.requestObject || null,
                        url: nestedPage.url,
                        headers: { 'X-Requested-With': 'USASpendingFrontend' }
                    }));
                    return Promise.all([...nestedPages]);
                }
                return axios({
                    method: page.method,
                    data: page.requestObject || null,
                    url: page.url,
                    headers: { 'X-Requested-With': 'USASpendingFrontend' }
                });
            })
            .catch((e) => console.log("error", e))
            , Promise.resolve('first'));

    return asyncPages
        .then((resp) => {
            // Once the final promise resolves, we can add it to our xml string and then write the file.
            const results = handleApiResponse(resp);
            let xml = '';

            const responseIndex = pages.length - 1;

            const responseContext = Array.isArray(pages[responseIndex])
                ? pages[responseIndex][0]
                : pages[responseIndex];

            xml = createSitemapEntry(xml, results, responseContext);
            createSitemap(xml, responseContext.name);
            return Promise.resolve(sitemapsWritten);
        })
        .catch((e) => {
            console.log(`error on sitemap ${e}`);
            return Promise.resolve(sitemapsWritten);
        });
};

const buildIndexedSitemap = (individualSiteMaps) => {
    const xml = individualSiteMaps
        .reduce((acc, pageName) => (
            `${acc}<sitemap><loc>${siteUrl}/${pageName}.xml</loc></sitemap>`
        ), '');

    createIndexedSitemap(xml);
};

buildIndividualSitemaps()
    .then((individalSiteMaps) => {
        buildIndexedSitemap(individalSiteMaps);
        createRobots();
    })
    .catch((e) => {
        console.log(`error build site maps: ${e}`);
    });
