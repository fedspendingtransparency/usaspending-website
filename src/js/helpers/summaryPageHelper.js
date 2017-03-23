/**
 * summaryPageHelper.js
 * Created by Kevin Li 3/15/17
 */

import _ from 'lodash';
import { awardTypeGroups } from 'dataMapping/search/awardType';


export const awardType = (code) => {
    let type = "unknown";
    if (_.includes(awardTypeGroups.contracts, code)) {
        type = "contract";
    }
    else if (_.includes(awardTypeGroups.grants, code)) {
        type = "grant";
    }
    else if (_.includes(awardTypeGroups.direct_payments, code)) {
        type = "direct payment";
    }
    else if (_.includes(awardTypeGroups.loans, code)) {
        type = "loan";
    }
    else if (_.includes(awardTypeGroups.insurance, code)) {
        type = "insurance";
    }

    return type;
};

