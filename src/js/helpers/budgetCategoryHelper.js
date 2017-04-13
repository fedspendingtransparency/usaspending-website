/**
 * budgetCategoryHelper.js
 * Created by michaelbray on 3/22/17.
 */

export const formatBudgetFunction = (budgetFunction) =>
    `${budgetFunction.title} | ${budgetFunction.functionType}`;

export const formatFederalAccount = (fed) =>
    `${fed.agency_identifier}-${fed.main_account_code} - ${fed.account_title}`;

// Budget Filters consist of the three elements of Budget Categories filter
// (Budget Functions, Federal Account, and Object Class),
// as well as Fiscal Year filters and Funding Agency
export const budgetFiltersSelected = (params) => {
    let selected = false;
    const budgetFilters = [
        'budgetFunctions',
        'federalAccounts',
        'objectClasses',
        'selectedFundingAgencies',
        'timePeriodFY'
    ];

    Object.keys(params).forEach((key) => {
        if (budgetFilters.includes(key) && params[key] && params[key].size > 0) {
            selected = true;
        }
    });

    return selected;
};

const isTimePeriodKey = (key) => {
    if (key === 'timePeriodStart' || key === 'timePeriodEnd') {
        return true;
    }
    return false;
};

const isValidTimePeriodParam = (param) => {
    if (param !== null && param !== undefined) {
        return true;
    }
    return false;
};

const isDomesticForeignToggleKey = (key) => {
    if (key === 'locationDomesticForeign' || key === 'recipientDomesticForeign') {
        return true;
    }
    return false;
};

const isValidDomesticForeignToggleParam = (param) => {
    if (param !== 'all') {
        return true;
    }
    return false;
};

// Award Filters consist of all non-Budget Filter filters
export const awardFiltersSelected = (params) => {
    let selected = false;
    const awardFilters = [
        'keyword',
        'timePeriodStart',
        'timePeriodEnd',
        'selectedLocations',
        'locationDomesticForeign',
        'selectedAwardingAgencies',
        'selectedRecipients',
        'recipientDomesticForeign',
        'selectedRecipientLocations',
        'awardType',
        'selectedAwardIDs',
        'awardAmounts'
    ];

    Object.keys(params).forEach((key) => {
        if (awardFilters.includes(key) && params[key]) {
            const param = params[key];

            if (typeof param === 'string') {
                if (isTimePeriodKey(key)) {
                    if (isValidTimePeriodParam(param)) {
                        selected = true;
                    }
                }
                else if (isDomesticForeignToggleKey(key)) {
                    if (isValidDomesticForeignToggleParam(param)) {
                        selected = true;
                    }
                }
                else if (param !== '') {
                    selected = true;
                }
            }
            else if (param instanceof Array && param.length > 0) {
                selected = true;
            }
            else if (params[key].size > 0) {
                selected = true;
            }
        }
    });

    return selected;
};
