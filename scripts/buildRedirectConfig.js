import fs from 'fs';
import path from 'path';
import { stateNameByFipsId } from '../src/js/dataMapping/state/stateNames';
import { URLifyStateName } from '../src/js/helpers/stateHelper';
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

const stateRedirects = Object.entries(stateNameByFipsId)
    .reduce((acc, [fipsId, stateName]) => ({
        ...acc,
        [`^/state/${fipsId}`]: `/state/${URLifyStateName(stateName)}`
    }), legacyRedirects);

const agencyRedirects = {};
agencyIdsToSlugs.forEach((a) => {
    agencyRedirects[`^/agency/${a.agency_id}`] = `/agency/${a.agency_slug}`;
});

const buildPageRedirectByUrlRegex = () => {
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
