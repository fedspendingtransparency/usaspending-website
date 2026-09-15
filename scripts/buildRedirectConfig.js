import fs from 'fs';
import path from 'path';
import { fetchStateList } from "../src/js/hooks/useStateData";
import { URLifyStateName } from '../src/js/features/state/stateHelper';
import agencyIdsToSlugs from '../src/js/dataMapping/agency/agencyIdsToSlugs';

const legacyRedirects = {
    "^/Pages/Default.aspx/": "/",
    "^/index.html": "/",
    "^/Pages/AdvancedSearch.aspx/": "/search",
    "^/DownloadCenter/Pages/DataDownload.aspx/": "/download_center/custom_award_data",
    "^/DownloadCenter/Pages/dataarchives.aspx/": "/download_center/award_data_archive",
    "^/covid-19/": "/disaster/covid-19",
    "^/covid-19": "/disaster/covid-19",
    "^/analyst-guide": "/federal-spending-guide",
    "^/analyst-guide/": "/federal-spending-guide"
};

const buildPageRedirectByUrlRegex = async () => {
    const { data } = await fetchStateList().promise;

    const stateRedirects = data.results
        .reduce((acc, { fips, name }) => ({
            ...acc,
            [`^/state/${fips}`]: `/state/${URLifyStateName(name)}`
        }), legacyRedirects);

    const agencyRedirects = {};
    agencyIdsToSlugs.forEach((a) => {
        agencyRedirects[`^/agency/${a.agency_id}`] = `/agency/${a.agency_slug}`;
    });

    const file = fs.createWriteStream(path.resolve(__dirname, "../redirect-config.json"));
    file.write(JSON.stringify(Object.assign(stateRedirects, agencyRedirects)));
    file.on('error', (e) => {
        console.error('Error writing redirect-config.json:', e);
        throw e;
    });
    file.on('finish', () => {
        console.log('redirect-config.json successfully written!');
    });
    file.end();
};

buildPageRedirectByUrlRegex();
