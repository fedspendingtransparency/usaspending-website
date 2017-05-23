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

const UnderlyingModel = new Record(defaultValues);

class HomepageStateModel {
    constructor(values) {
        // create a Record instance that will populate any missing fields
        const recordModel = new UnderlyingModel(values);
        // conver the Record to a standard JS object
        const jsModel = recordModel.toJS();

        // iterate through the object and set each key in our new object
        Object.keys(jsModel).forEach((key) => {
            this[key] = jsModel[key];
        });
    }
}

export default HomepageStateModel;
