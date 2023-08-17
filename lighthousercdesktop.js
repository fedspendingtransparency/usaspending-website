module.exports = {
    ci: {
        upload: {
            target: 'temporary-public-storage',
            settings: {
                preset: "desktop"
            }
        },
        collect: {
            staticDistDir: './public', // location of static files for lighthouse CI to serve
            additive: true,
            isSinglePageApplication: true,
            url: [ // the urls to run lighthouse against
                'http://localhost/'
            ],
            settings: {
                preset: "desktop"
            }
        }
    }
};
