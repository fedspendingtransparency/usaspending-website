/**
  * ResultsParserWorker.js
  * Created by Kevin Li 11/26/16
  **/

import _ from 'lodash';
import TableSearchFields from 'dataMapping/search/tableSearchFields';

const workerLogic = (data) => {
    const results = [];

    const relevantKeys = TableSearchFields[data.type]._order;

    for (const awardKey of Object.keys(data.results)) {
        const row = _.pick(data.results[awardKey], relevantKeys);
        results.push(row);
    }

    return results;
};

if (typeof Worker) {
    onmessage = (event) => {
        const data = event.data;
        const results = workerLogic(data);
        // send back the parsed data
        postMessage(results);
    };
}

export default workerLogic;
