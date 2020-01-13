const axios = require('axios');
const pages = require('./pages');

describe('Array used for building sitemaps', () => {
    it(`each page with a site map reliant on an api end point returns a 200 status`, () => {
        pages
            .filter((route) => route.isAsync)
            .forEach((route) => {
                axios({
                    method: route.method,
                    data: route.data,
                    url: route.url,
                    headers: { 'X-Requested-With': 'USASpendingFrontend' }
                }).then((resp) => {
                    expect(resp.status).toEqual(200);
                });
            });
    });
});
