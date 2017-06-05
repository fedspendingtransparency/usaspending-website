/**
 * HomepageStateModel.jsx
 * Created by Kevin Li 5/23/17
 */

import { Record } from 'immutable';

const defaultValues = {
    state: '',
    amount: 0,
    amountRank: 0,
    capita: 0,
    capitaRank: 0
};

class HomepageStateModel extends Record(defaultValues) {
    constructor(values) {
        const convertedValues = {};

        // convert the JSON model keys to those of the JS app data model
        const keyConversion = {
            StateName: 'state',
            TotalAmount: 'amount',
            TotalRank: 'amountRank',
            PerCapitaAmount: 'capita',
            PerCapitaRank: 'capitaRank'
        };

        Object.keys(values).forEach((key) => {
            const modelKey = keyConversion[key];
            if (modelKey) {
                convertedValues[modelKey] = values[key];
            }
        });

        super(convertedValues);
    }
}

export default HomepageStateModel;
