module.exports = {
    ci: {
        upload: {
            target: 'temporary-public-storage'
        },
        collect: {
            staticDistDir: './public', // location of static files for lighthouse CI to serve
            url: [ // the urls to run lighthouse against
                'http://localhost/'
                // 'http://localhost/search',
                // 'http://localhost/disaster/covid-19'
            ]
        }
    }
};
