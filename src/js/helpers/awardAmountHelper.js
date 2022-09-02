/**
 * awardAmountHelper.js
 * Created by michaelbray on 3/7/17.
 */

import { formatMoneyWithPrecision } from 'helpers/moneyFormatter';
import {
    spendingCategoriesByAwardType,
    asstAwardTypesWithSimilarAwardAmountData,
    infrastructureSpendingCategoriesByAwardType,
    defcTypes
} from '../dataMapping/award/awardAmountsSection';

// formats the specific checkboxes
// options are NPM accounting package options
export const formatAwardAmountRange = (range, options = 2) => {
    const minLabel = formatMoneyWithPrecision(range[0], options);
    const maxLabel = formatMoneyWithPrecision(range[1], options);
    let label = `${minLabel} - ${maxLabel}`;
    if (!range[0] && (range[0] !== 0)) {
        label = `${maxLabel} & Under`;
    }
    if (!range[1] && (range[1] !== 0)) {
        label = `${minLabel} & Above`;
    }
    return label;
};

/**
 * This fn & map together are designed to return the appropriate parameters for each award type
 * for the determineSpendingScenario fn.

* In the fn getAscendingSpendingCategoriesByAwardType:
 * @awardType is one of grant, loan, other, contract, idv
 * @awardAmountObj is the object from the api, parsed by our models, keyed by spending-category w/ integer values.
*/

export const getAscendingSpendingCategoriesByAwardType = (awardType, awardAmountObj) => {
    if (Object.keys(spendingCategoriesByAwardType).includes(awardType)) {
        return spendingCategoriesByAwardType[awardType]
            .map((category) => awardAmountObj[category]);
    }
    return [];
};

export const getInfrastructureAscendingSpendingCategoriesByAwardType = (awardType, awardAmountObj) => {
    if (Object.keys(infrastructureSpendingCategoriesByAwardType).includes(awardType)) {
        return infrastructureSpendingCategoriesByAwardType[awardType]
            .map((category) => awardAmountObj[category]);
    }
    return [];
};

// includes logic for grant, loan, insurance, and other award types
export const determineSpendingScenarioAsstAwards = (awardAmountObj) => {
    const { _totalObligation, _nonFederalFunding, _totalFunding } = awardAmountObj;
    // if any of the values are negative, return insufficient data
    if (_totalObligation < 0 || _nonFederalFunding < 0 || _totalFunding < 0) {
        return 'insufficientData';
    }
    else if (_totalObligation === 0 && _nonFederalFunding === 0 && _totalFunding === 0) {
        return 'insufficientData';
    }
    // if total funding is sum of obligation and non federal funding, return normal
    else if ((_totalObligation + _nonFederalFunding) === _totalFunding) {
        return 'normal';
    }
    // if totalObligation equals totalFunding or is less than total funding while nonFederalFunding is null or zero
    else if ((_totalObligation <= _totalFunding) && !_nonFederalFunding) {
        return 'normal';
    }
    return 'insufficientData';
};

// includes logic for idvs, contracts, loan award types
export const determineSpendingScenario = (small = 0, bigger = 0, biggest = null) => {
    const allCategoriesAreInPlay = (small && bigger && biggest);

    if (small === 0 && bigger === 0 && biggest === 0) {
        return 'insufficientData';
    }
    else if (small < 0 || bigger < 0 || biggest < 0) {
        return 'insufficientData';
    }
    else if (allCategoriesAreInPlay) {
        if (small <= bigger && bigger <= biggest) {
            return 'normal';
        }
        else if (bigger <= small && small <= biggest) {
            return 'exceedsBigger';
        }
        else if (bigger <= biggest && biggest <= small) {
            return 'exceedsBiggest';
        }
    }
    else if (small >= 0) {
        if (small <= bigger && bigger > 0) {
            return 'normal';
        }
    }

    return 'insufficientData';
};

export const determineFileCSpendingScenario = (awardType, awardAmountObj) => {
    const { _fileCOutlay, _fileCObligated } = awardAmountObj;
    if (_fileCObligated === 0 && _fileCOutlay === 0) return 'normal';
    const spendingCategoriesToConsider = getAscendingSpendingCategoriesByAwardType(awardType, awardAmountObj);
    const fileCScenario = spendingCategoriesToConsider
        .reduce((scenario, spendingCategory) => {
            if (scenario !== 'normal') return scenario;
            return determineSpendingScenario(_fileCOutlay, _fileCObligated, spendingCategory);
        }, 'normal');
    return (fileCScenario === 'normal') ? 'normal' : 'insufficientData';
};

export const determineLoanSpendingScenario = (awardAmountObj) => {
    const {
        _totalOutlay, _totalObligation, _subsidy, _faceValue
    } = awardAmountObj;

    if (_subsidy === 0 && _faceValue === 0) return 'insufficientData';
    if (_subsidy < 0 || _faceValue < 0) return 'insufficientData';
    if (_totalOutlay > _totalObligation || _totalOutlay > _subsidy || _totalOutlay > _faceValue || _totalObligation > _subsidy || _totalObligation > _faceValue || _subsidy > _faceValue) return 'insufficientData';

    if (_totalObligation === 0 && _totalOutlay === 0) {
        if (_subsidy <= _faceValue) return 'normal';
        return 'insufficientData';
    }

    if (_totalOutlay <= _totalObligation <= _subsidy <= _faceValue) return 'normal';
    return 'insufficientData';
};

export const determineInfrastructureSpendingScenario = (awardType, awardAmountObj) => {
    const { _fileCOutlayInfrastructure, _fileCObligatedInfrastructure } = awardAmountObj;
    if (_fileCObligatedInfrastructure === 0 && _fileCOutlayInfrastructure === 0) return 'normal';
    const spendingCategoriesToConsider = getInfrastructureAscendingSpendingCategoriesByAwardType(awardType, awardAmountObj);
    const fileCScenario = spendingCategoriesToConsider
        .reduce((scenario) => {
            if (scenario !== 'normal') return scenario;
            return determineSpendingScenario(_fileCOutlayInfrastructure, _fileCObligatedInfrastructure);
        }, 'normal');

    return (fileCScenario === 'normal') ? 'normal' : 'insufficientData';
};

export const determineSpendingScenarioByAwardType = (awardType, awardAmountObj, infrastructure) => {
    if (infrastructure) {
        if (determineInfrastructureSpendingScenario(awardType, awardAmountObj) !== 'normal') return 'insufficientData';
    }

    if (determineFileCSpendingScenario(awardType, awardAmountObj) !== 'normal') return 'insufficientData';
    if (asstAwardTypesWithSimilarAwardAmountData.includes(awardType)) {
        return determineSpendingScenarioAsstAwards(awardAmountObj);
    }

    if (awardType === 'loan') {
        return (determineLoanSpendingScenario(awardAmountObj));
    }

    // Small, bigger, and biggest define the expected ratio between spending categories
    const [small, bigger, biggest] = getAscendingSpendingCategoriesByAwardType(awardType, awardAmountObj);
    return determineSpendingScenario(small, bigger, biggest);
};

export const generatePercentage = (value) => `${(value * 100).toFixed(2)}%`;

export const generateDefcTabs = (awardData) => {
    const keysInData = [];

    defcTypes.forEach((item) => {
        if (awardData[item.keys.outlay] > 0 || awardData[item.keys.obligated] > 0) {
            keysInData.push(item.codeType);
        }
    });

    if (keysInData.length === 0) {
        return [];
    }

    const tabs = [{
        internal: 'overall',
        label: 'Overall Spending'
    }];

    defcTypes.forEach((item) => {
        if (keysInData.indexOf(item.codeType) > -1) {
            tabs.push({
                internal: item.codeType,
                label: item.label
            });
        }
    });

    return tabs;
};
