const fs = require('fs');
const axios = require('axios');
const path = require('path');

const pages = require('./pages');

const siteUrlByEnv = {
    prod: 'https://www.usaspending.gov',
    dev: 'https://www.dev.usaspending.gov'
};

const xmlStart = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

const sitemapsWritten = [];

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
    const env = siteUrlByEnv[process.argv[2]];
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
    const env = process.argv[2];
    const xml = individualSiteMaps
        .reduce((acc, pageName) => {
            return (
                `${acc}<sitemap><loc>${siteUrlByEnv[env]}/${pageName}.xml</loc></sitemap>`
            );
        }, '');

    createSitemap(xml);
};

buildIndividualSitemaps()
    .then((individalSiteMaps) => {
        buildIndexedSitemap(individalSiteMaps);
        createRobots();
    })
    .catch((e) => {
        console.log(`error build site maps: ${e}`);
    });
