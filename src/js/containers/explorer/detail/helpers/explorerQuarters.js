/**
 * explorerQuarters.js
 * Created by Kevin Li 2/12/18
 */

import moment from 'moment';
import * as FiscalYearHelper from 'helpers/fiscalYearHelper';

export const currentQuarter = () => {
    // determine the current quarter we are in
    const todayAdjusted = moment().subtract(FiscalYearHelper.quarterCloseWindow, 'days');
    const quarter = FiscalYearHelper.convertDateToQuarter(todayAdjusted);
    const year = FiscalYearHelper.defaultFiscalYear();

    return {
        quarter,
        year
    };
};
