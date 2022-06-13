import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

import {
    tableTitlesBySpendingCategoryAndAwardType,
    formattedSpendingCategoriesByAwardType,
    awardTableClassMap,
    caresActSpendingCategories,
    orderedTableTitles
} from "dataMapping/award/awardAmountsSection";

import { AWARD_AMOUNT_TYPE_PROPS } from "../../../../propTypes";

const propTypes = {
    showFileC: PropTypes.bool,
    children: PropTypes.node,
    awardAmountType: AWARD_AMOUNT_TYPE_PROPS,
    awardData: PropTypes.shape({}),
    spendingScenario: PropTypes.string,
    infrastructureSpending: PropTypes.string
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
    showFileC,
    infrastructureSpending
}) => {
    /*
     * we have to do this because right now whenever there's any kind of overspending
     * both extremeOverspendingFormatted and overspendingFormatted are defined
     * irrespective of whether the award exceedsPotential or exceedsCurrent
     * so we're relying on the parent in this case because we cant deduce the spending scenario
     **/

    const [infrastructure, setInfrastructure] = useState(infrastructureSpending === "infrastructure");

    useEffect(() => {
        setInfrastructure(infrastructureSpending === "infrastructure");
    }, [infrastructureSpending]);

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

    const sortTableTitles = (a, b) => orderedTableTitles.indexOf(a) - orderedTableTitles.indexOf(b);

    const hideRow = (title) => {
        const exclusions = ['Outlayed Amount', 'Combined Outlayed Amounts'];
        const exclusionsFromInfrastructure = ['Combined Outlayed Amounts', 'Combined Obligated Amounts', 'Outlayed Amount', 'Obligated Amount'];
        let hide = false;

        if (infrastructure) {
            exclusionsFromInfrastructure.forEach((item) => {
                if (title === item) {
                    hide = true;
                }
            });
        } else {
            exclusions.forEach((item) => {
                if (title.indexOf(item) > -1 && amountMapByCategoryTitle[title] === '$0.00') {
                    hide = true;
                }
            });

            if (!infrastructure && title.includes('Infrastructure')) {
                hide = true;
            }
        }

        return hide;
    };

    return (
        <div className={`award-amounts__data-wrapper ${awardAmountType}`}>
            {Object.keys(amountMapByCategoryTitle).sort(sortTableTitles)
                .map((title) => (
                    hideRow(title)
                        ? null
                        :
                        <div key={uniqueId(title)} className="award-amounts__data-content">
                            <div className="hanging">
                                <span className={`award-amounts__data-icon ${awardTableClassMap[title]}`} />
                                {title}
                            </div>
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
