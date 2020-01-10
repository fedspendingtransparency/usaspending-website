const fs = require('fs');
const axios = require('axios');
const path = require('path');
const lodash = require('lodash');

const pages = require('./pages');

// 1. get routes from router
// 2. get routes from api (w/ ids)
// 2a. all agencies
// 2b. all federal accounts
// 2c. all states
// 2d. x # of recipients?
// 2e. x # of awards?

const hostNameByEnv = {
    prod: 'https://www.usaspending.gov',
    dev: 'https://www.dev.usaspending.gov'
};

const xmlStart = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

const xmlEnd = `</urlset>`;

const forbiddenChars = ['&', "'", '"', '<', '>'];

/**
 * @param xml string: of xml, previous xml entries from current sitemap
 * @param pageData array of objects: data w/ the url param needed to the page
 * @param pageInfo object: context for pageData; (a) how to access the url param & (b) what client route the page is associated with
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
            if (page.name === 'award') {
                return `${str}<url><loc>${clientRoute}/${encodeURI(page.value)}</loc><changefreq>${updatedFrequency}</changefreq><priority>${priority}</priority></url>`;
            }
            return `${str}<url><loc>${clientRoute}/${page.value}</loc><changefreq>${updatedFrequency}</changefreq><priority>${priority}</priority></url>`;
        }, xml);
};

const createRobots = () => {
    const env = hostNameByEnv[process.argv[2]];
    fs.writeFile(
        path.resolve(__dirname, `../robots.txt`),
        `User-agent: * \nAllow: /\n\nSitemap: ${env}/sitemap.xml`,
        () => console.log("robots.txt successfully created!")
    );
};

const createSitemap = (xmlRoutes, siteMapName = 'sitemap') => {
    fs.writeFile(
        path.resolve(__dirname, `../${siteMapName}.xml`),
        `${xmlStart}${xmlRoutes}${xmlEnd}`,
        () => console.log(`Sitemap ${siteMapName}.xml successfully created!`)
    );
};

const handleApiResponse = (resp) => {
    // flatten massive arrays returned from Promise.all();
    if (lodash.isArray(resp)) {
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
        .filter((page) => page.isAsync || lodash.isArray(page))
        .reduce((previousPromise, page, i, arr) => previousPromise
            .then((resp) => {
                if (resp !== 'first') {
                    let xml = '';
                    // use previous item in array as the source of truth for traversing the previousPromises' response
                    const responseContext = lodash.isArray(arr[i - 1]) ? arr[i - 1][0] : arr[i - 1];
                    const results = handleApiResponse(resp);
                    xml = createSitemapEntry(xml, results, responseContext);
                    createSitemap(xml, responseContext.name);
                }
                if (lodash.isArray(page)) {
                    const nestedPages = page.map((nestedPage) => axios({
                        method: nestedPage.method,
                        data: nestedPage.requestObject || null,
                        url: nestedPage.url
                    }));
                    return Promise.all([...nestedPages]);
                }
                return axios({
                    method: page.method,
                    data: page.requestObject || null,
                    url: page.url
                });
            })
            .catch((e) => console.log("error", e))
            , Promise.resolve('first'));

    asyncPages
        .then((resp) => {
            // Once the final promise resolves, we can add it to our xml string and then write the file.
            const results = handleApiResponse(resp);
            let xml = '';

            const responseIndex = pages.length - 1;

            const responseContext = lodash.isArray(pages[responseIndex])
                ? pages[responseIndex][0]
                : pages[responseIndex];

            xml = createSitemapEntry(xml, results, responseContext);
            createSitemap(xml, responseContext.name);
        })
        .catch((e) => {
            console.log(`error on sitemap ${e}`);
        });
};

const buildIndexedSitemap = () => {
    const env = process.argv[2];
    const xml = pages
        .reduce((acc, page) => {
            const pageName = lodash.isArray(page) ? page[0].name : page.name;
            return (
                `${acc}<sitemap><loc>${hostNameByEnv[env]}/${pageName}.xml</loc></sitemap>`
            );
        }, '');

    createSitemap(xml);
};

buildIndexedSitemap();
buildIndividualSitemaps();
createRobots();
