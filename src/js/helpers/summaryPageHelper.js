/**
 * summaryPageHelper.js
 * Created by Kevin Li 3/15/17
 */

import { includes } from 'lodash';
import { awardTypeGroups } from 'dataMapping/search/awardType';


export const awardType = (code) => {
    let type = "unknown";
    if (includes(awardTypeGroups.contracts, code)) {
        type = "contract";
    }
    else if (includes(awardTypeGroups.grants, code)) {
        type = "grant";
    }
    else if (includes(awardTypeGroups.direct_payments, code)) {
        type = "direct payment";
    }
    else if (includes(awardTypeGroups.loans, code)) {
        type = "loan";
    }
    else if (includes(awardTypeGroups.other, code)) {
        type = "other";
    }

    return type;
};

export const maxDescriptionCharacters = 160;

