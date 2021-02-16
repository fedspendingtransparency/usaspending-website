import fs from 'fs';
import path from 'path';
import { stateNameByFipsId } from '../src/js/dataMapping/state/stateNames';
import { URLifyStateName } from '../src/js/helpers/stateHelper';

const legacyRedirects = {
    "^/Pages/Default.aspx/": "/",
    "^/Pages/AdvancedSearch.aspx/": "/search",
    "^/DownloadCenter/Pages/DataDownload.aspx/": "/download_center/custom_award_data",
    "^/DownloadCenter/Pages/dataarchives.aspx/": "/download_center/award_data_archive",
    "^/covid-19/": "/disaster/covid-19"
};

const buildPageRedirectByUrlRegex = () => {
    const stateRedirects = Object.entries(stateNameByFipsId)
        .reduce((acc, [fipsId, stateName]) => {
            return {
                ...acc,
                [`^/state/${fipsId}`]: `/state/${URLifyStateName(stateName)}`
            };
        }, legacyRedirects);

    const file = fs.createWriteStream(path.resolve(__dirname, "../redirect-config.json"));
    file.write(JSON.stringify(stateRedirects));
    file.on('error', (e) => {
        console.log('Error writing redirect-config.json:', e);
        throw e;
    });
    file.on('finish', () => {
        console.log('redirect-config.json successfully written!');
    });
    file.end();
};

buildPageRedirectByUrlRegex();
