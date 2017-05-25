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

const HomepageStateModel = new Record(defaultValues);

export default HomepageStateModel;
