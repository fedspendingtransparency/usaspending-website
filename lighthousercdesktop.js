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
                'http://localhost/', 'http://localhost/search', 'http://localhost/search/?hash=31005574f6843059b2718797d2a3a8f9'
            ],
            settings: {
                preset: "desktop"
            }
        }
    }
};
