/**
 * RecipientOverviewModel.js
 * Created by Lizzie Salita 8/24/17
 */

import { Record } from 'immutable';

const defaultValues = {
    id: '',
    name: '',
    duns: '',
    parentCompany: '',
    parentDuns: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    types: [],
    primaryNaics: '',
    naicsDescription: '',
    awardedAmount: 0,
    historicalAwardedAmount: 0,
    activeAwards: 0,
    historicalAwards: 0
};

const remapData = (data) => {
    const values = {};

    const remap = {
        id: 'recipient_id',
        name: 'recipient_name',
        duns: 'recipient_duns',
        parentCompany: 'parent_company',
        parentDuns: 'recipient_parent_duns',
        street: 'recipient_street',
        city: 'recipient_city',
        state: 'recipient_state',
        zip: 'recipient_zip',
        types: 'recipient_business_types',
        primaryNaics: 'primary_NAICS',
        naicsDescription: 'NAICS_description',
        awardedAmount: 'awarded_amount',
        historicalAwardedAmount: 'historical_awarded_amount',
        activeAwards: 'active_awards',
        historicalAwards: 'historical_awards'
    };

    const remapFuncs = {
        awardedAmount: (raw) => parseFloat(raw),
        historicalAwardedAmount: (raw) => parseFloat(raw),
        activeAwards: (raw) => parseFloat(raw),
        historicalAwards: (raw) => parseFloat(raw)
    };

    for (const modelProp in remap) {
        if (!{}.hasOwnProperty.call(remap, modelProp)) {
            continue;
        }

        const apiProp = remap[modelProp];
        // check if the value exists in the inbound API data
        if (!{}.hasOwnProperty.call(data, apiProp)) {
            // doesn't exist, go to next property
            continue;
        }

        // check if the value needs to be parsed before adding
        if ({}.hasOwnProperty.call(remapFuncs, modelProp)) {
            // it needs to be parsed
            const parseFunc = remapFuncs[modelProp];
            values[modelProp] = parseFunc(data[apiProp]);
        }
        else {
            // it can be added as-is
            values[modelProp] = data[apiProp];
        }
    }

    return values;
};

export default class RecipientOverviewModel extends Record(defaultValues) {
    constructor(data, remapFromApi = false) {
        let values = data;
        if (remapFromApi) {
            // we need to remap the values from the API endpoint to our property names and
            // data formats
            values = remapData(data);
        }

        // create a Record instance with the prepared values
        // as an Immutable JS Record, the instance will be immutable and it will only have the
        // keys defined by default (but they are guaranteed to exist)
        super(values);
    }
}
