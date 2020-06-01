import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import {
    tableTitlesBySpendingCategoryAndAwardType,
    formattedSpendingCategoriesByAwardType,
    awardTableClassMap,
    caresActSpendingCategories
} from "dataMapping/award/awardAmountsSection";

import { AWARD_AMOUNT_TYPE_PROPS } from "../../../../propTypes";

const propTypes = {
    showFileC: PropTypes.bool,
    children: PropTypes.node,
    awardAmountType: AWARD_AMOUNT_TYPE_PROPS,
    awardData: PropTypes.shape({}),
    spendingScenario: PropTypes.string
};

const getSpendingCategoriesByAwardType = (awardAmountType) => {
    if (Object.keys(formattedSpendingCategoriesByAwardType).includes(awardAmountType)) {
        return formattedSpendingCategoriesByAwardType[awardAmountType];
    }
    return formattedSpendingCategoriesByAwardType.asst;
};

const getTableTitleByAwardTypeByCategory = (type) => {
    if (Object.keys(tableTitlesBySpendingCategoryAndAwardType).includes(type)) {
        return tableTitlesBySpendingCategoryAndAwardType[type];
    }
    return tableTitlesBySpendingCategoryAndAwardType.asst;
};

const AwardAmountsTable = ({
    awardData,
    awardAmountType,
    spendingScenario,
    showFileC
}) => {
    /*
     * we have to do this because right now whenever there's any kind of overspending
     * both extremeOverspendingFormatted and overspendingFormatted are defined
     * irrespective of whether the award exceedsPotential or exceedsCurrent
     * so we're relying on the parent in this case because we cant deduce the spending scenario
     **/

    const getOverSpendingRow = (awardAmounts = awardData, scenario = spendingScenario, type = awardAmountType) => {
        switch (scenario) {
            case ('normal'):
                return null;
            case ('exceedsBigger'):
                return (
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_overspending" />{type === 'idv' ? 'Exceeds Combined Current Award Amounts' : 'Exceeds Current Award Amount'}</div>
                        <span>{awardAmounts.overspendingFormatted}</span>
                    </div>
                );
            case ('exceedsBiggest'):
                return (
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_extreme-overspending" />{type === 'idv' ? 'Exceeds Combined Potential Award Amounts' : 'Exceeds Potential Award Amount'}</div>
                        <span>{awardAmounts.extremeOverspendingFormatted}</span>
                    </div>
                );
            default:
                return null;
        }
    };

    // Returns: { titleInTable: AwardCategoryAmount }
    const buildAmountMapByCategoryTitle = (accumulator, category) => ({
        ...accumulator,
        [getTableTitleByAwardTypeByCategory(awardAmountType)[category]]: awardData[category]
    });

    // build a map using the relevant keys for the awardAmountType
    const amountMapByCategoryTitle = getSpendingCategoriesByAwardType(awardAmountType)
        .filter((category) => {
            if (caresActSpendingCategories.includes(category)) {
                return showFileC;
            }
            return true;
        })
        .reduce((acc, category) => buildAmountMapByCategoryTitle(acc, category), {});

    const overspendingRow = getOverSpendingRow(awardData, spendingScenario);

    return (
        <div className="award-amounts__data-wrapper">
            {Object.keys(amountMapByCategoryTitle)
                .map((title) => (
                    <div key={uniqueId(title)} className="award-amounts__data-content">
                        <div><span className={`award-amounts__data-icon ${awardTableClassMap[title]}`} />{title}</div>
                        <span>{amountMapByCategoryTitle[title]}</span>
                    </div>
                ))
            }
            {overspendingRow}
        </div>
    );
};

AwardAmountsTable.propTypes = propTypes;
export default AwardAmountsTable;
