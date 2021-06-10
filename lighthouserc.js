module.exports = {
    ci: {
        upload: {
            // target: 'temporary-public-storage'
            target: 'lhci',
            serverBaseURl: 'http://localhost:9001',
            token: 'e4f41236-8dad-48f2-af21-38124c251441'
        },
        collect: {
            staticDistDir: './public', // location of static files for lighthouse CI to serve
            isSinglePageApplication: true,
            url: [ // the urls to run lighthouse against
                'http://localhost/'
                // 'http://localhost/search',
                // 'http://localhost/disaster/covid-19',
                // 'http://localhost/agency/456'
            ]
        }
    }
};
