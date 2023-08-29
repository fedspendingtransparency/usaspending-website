import axios from 'axios';

const pages = require('./pages');

const fs = require('fs');

const path = require('path');
const tunnel = require('tunnel');

const siteUrl = process.env.SITE_URL || 'https://www.usaspending.gov';
const xmlStart = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
const indexedSitemapXmlStart = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
const sitemapsWritten = [];
const xmlEnd = `</urlset>`;
const indexedSitemapXmlEnd = `</sitemapindex>`;
const forbiddenChars = ['&', "'", '"', '<', '>'];

const agent = (process.env.PROXY_HOST && process.env.PROXY_PORT) ?
    tunnel.httpsOverHttp({
        proxy: {
            host: process.env.PROXY_HOST,
            port: process.env.PROXY_PORT
        }
    }) : null;

/**
 * @param {string} xml string of xml, previous xml entries from current sitemap
 * @param {Array.object} pageData data w/ the url param needed to the page
 * @param {object} pageInfo object with 4 properties of interest
    * * @param {string} accessor how to access the url param on the pageData obj
    * * @param {string} clientRoute client side route for page
    * * @param {string} priority how important the page is on scale of 0.1 - 0.9
    * * @param {string} updatedFrequency how frequently google should crawl this page
* @returns {string} looks like this <url><loc>https://www.usaspending.gov/award/CONT_IDV_GS35F0045K_4730</loc><changefreq>weekly</changefreq><priority>1</priority></url>
 */
const createSitemapEntry = (xml, pageData, pageInfo) => {
    if (!pageData) return '';
    const {
        accessor,
        clientRoute,
        priority,
        updatedFrequency
    } = pageInfo;
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
                return `${str}<url><loc>${clientRoute}/${encodeURIComponent(page.value)}</loc><changefreq>${updatedFrequency}</changefreq><priority>${priority}</priority></url>`;
            }
            else if (pageInfo.name === 'recipient' || pageInfo.name === 'state') {
                return `${str}<url><loc>${clientRoute}/${page.value}/latest</loc><changefreq>${updatedFrequency}</changefreq><priority>${priority}</priority></url>`;
            }
            return `${str}<url><loc>${clientRoute}/${page.value}</loc><changefreq>${updatedFrequency}</changefreq><priority>${priority}</priority></url>`;
        }, xml);
};

const createRobots = () => {
    fs.writeFile(
        path.resolve(__dirname, `./sitemapFiles/robots.txt`),
        `User-agent: * \nDisallow: /*.php*\nDisallow: /*?*\n\nSitemap: ${siteUrl}/sitemap.xml`,
        (e) => {
            if (e) {
                console.error(' Error : ', e);
                throw e.message;
            }
            console.log("robots.txt successfully created!");
        }
    );
};

const createIndexedSitemap = (xmlRoutes) => {
    fs.writeFile(
        path.resolve(__dirname, `./sitemapFiles/sitemap.xml`),
        `${indexedSitemapXmlStart}${xmlRoutes}${indexedSitemapXmlEnd}`,
        (e) => {
            if (e) {
                console.log(' Error : ', e);
                throw e.message;
            }
            console.log("Sitemap sitemap.xml successfully created!");
        }
    );

    sitemapsWritten.push('sitemap');
};

const createSitemap = (xmlRoutes, siteMapName = 'sitemap') => {
    fs.writeFile(
        path.resolve(__dirname, `./sitemapFiles/${siteMapName}.xml`),
        `${xmlStart}${xmlRoutes}${xmlEnd}`,
        (e) => {
            if (e) {
                console.log(' Error : ', e);
                throw e.message;
            }
            console.log(`Sitemap ${siteMapName}.xml successfully created!`);
        }
    );

    sitemapsWritten.push(siteMapName);
};

const handleApiResponse = (resp) => {
    // flatten massive arrays returned from Promise.all();
    if (Array.isArray(resp)) {
        return resp.reduce((acc, result) => (
            [
                ...acc,
                ...result.data.results
            ]
        ), []);
    }
    // return array in results/data namespace (res.data is for the states api response :shrug:)
    return resp.data.results || resp.data;
};

const buildIndividualSitemaps = () => {
    // 1. get routes from router
    let staticRoutesXml = '';
    pages
        .find((page) => page.name === 'static-routes').routes
        .map((route) => ({
            ...route,
            clientRoute: `https://www.usaspending.gov${route}`,
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
                        httpsAgent: agent,
                        proxy: false,
                        method: nestedPage.method,
                        data: nestedPage.requestObject || null,
                        url: nestedPage.url,
                        headers: { 'X-Requested-With': 'USASpendingFrontend' }
                    }));
                    return Promise.all([...nestedPages]);
                }
                return axios({
                    httpsAgent: agent,
                    proxy: false,
                    method: page.method,
                    data: page.requestObject || null,
                    url: page.url,
                    headers: { 'X-Requested-With': 'USASpendingFrontend' }
                });
            })
            .catch((e) => {
                console.log("error", e);
                throw e.message;
            })
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
            throw e.message;
        });
};

const buildIndexedSitemap = (individualSiteMaps) => {
    const xml = individualSiteMaps
        .reduce((acc, pageName) => (
            `${acc}<sitemap><loc>${siteUrl}/${pageName}.xml</loc></sitemap>`
        ), '');

    createIndexedSitemap(xml);
};

const createSitemapDirectory = () => new Promise(
    (resolve, reject) => fs.mkdir(
        path.resolve('./sitemapFiles'), {}, (e) => {
            if (e) {
                reject(e);
            }
            resolve();
        })
);

createSitemapDirectory()
    .then(() => buildIndividualSitemaps())
    .then((individalSiteMaps) => {
        buildIndexedSitemap(individalSiteMaps);
        createRobots();
    })
    .catch((e) => {
        console.log(`error build site maps: ${e}`);
        throw e.message;
    });
