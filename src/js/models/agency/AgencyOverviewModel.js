/**
 * AgencyOverviewModel.js
 * Created by Kevin Li 6/8/17
 */

import { Record } from 'immutable';

const defaultValues = {
    id: '',
    name: '',
    mission: '',
    website: '',
    congressionalJustificationUrl: null,
    logo: '',
    activeFY: '',
    activeFQ: '',
    federalBudget: 0,
    obligatedAmount: 0,
    budgetAuthority: 0
};

const remapData = (data) => {
    const values = {};

    const remap = {
        id: 'agency_id',
        name: 'agency_name',
        mission: 'mission',
        website: 'website',
        congressionalJustificationUrl: 'congressional_justification_url',
        logo: 'icon_filename',
        activeFY: 'active_fy',
        activeFQ: 'active_fq',
        budgetAuthority: 'budget_authority_amount',
        obligatedAmount: 'obligated_amount',
        federalBudget: 'current_total_budget_authority_amount'
    };

    const remapFuncs = {
        budgetAuthority: (raw) => parseFloat(raw),
        federalBudget: (raw) => parseFloat(raw),
        obligatedAmount: (raw) => parseFloat(raw),
        congressionalJustificationUrl: (raw) => {
            if (!raw) return 'Not Available';
            return raw;
        }
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

export default class AgencyOverviewModel extends Record(defaultValues) {
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
