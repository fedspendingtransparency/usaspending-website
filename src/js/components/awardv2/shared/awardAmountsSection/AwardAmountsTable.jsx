import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

const propTypes = {
    children: PropTypes.node,
    awardType: PropTypes.oneOf(['contract', 'idv', 'grant']),
    awardData: PropTypes.shape({})
};

// contractAndIdvCategories + grantCategories live in the awardData props object
const contractAndIdvCategories = ['totalObligationFormatted', 'baseExercisedOptionsFormatted', 'baseAndAllOptionsFormatted'];
const grantCategories = ['totalObligationFormatted', 'nonFederalFundingFormatted', 'totalFundingFormatted'];

const tableTitleByAwardTypeByCategory = {
    idv: {
        baseExercisedOptionsFormatted: 'Combined Current Amounts',
        baseAndAllOptionsFormatted: 'Combined Potential Amounts',
        totalObligationFormatted: 'Combined Obligated Amounts'
    },
    contract: {
        baseExercisedOptionsFormatted: 'Current Amount',
        baseAndAllOptionsFormatted: 'Potential Amount',
        totalObligationFormatted: 'Obligated Amount'
    },
    grant: {
        totalFundingFormatted: 'Total Funding',
        nonFederalFundingFormatted: 'Non-Federal Funding',
        totalObligationFormatted: 'Obligated Amount'
    }
};

const awardTableClassMap = {
    0: "award-amounts__data-icon_blue",
    1: "award-amounts__data-icon_gray",
    2: "award-amounts__data-icon_transparent"
};

const AwardAmountsTable = ({
    awardData,
    awardType,
    children
}) => {
    /*
     * we have to do this because right now whenever there's any kind of overspending
     * both extremeOverspendingFormatted and overspendingFormatted are defined
     * irrespective of whether the award exceedsPotential or exceedsCurrent
     * so we're relying on the parent in this case because we cant deduce the spending scenario
     **/
    const overspendingRow = children;
 
    // Returns: { titleInTable: AwardCategoryAmount }
    const buildAmountMapByCategoryTitle = (accumulator, category) => ({
        ...accumulator,
        [tableTitleByAwardTypeByCategory[awardType][category]]: awardData[category]
    });
 
    // build a map using the relevant keys for the awardType
    const amountMapByCategoryTitle = (awardType === 'idv' || awardType === 'contract')
        ? contractAndIdvCategories.reduce((acc, category) => buildAmountMapByCategoryTitle(acc, category), {})
        : grantCategories.reduce((acc, category) => buildAmountMapByCategoryTitle(acc, category), {});
    return (
        <div className="award-amounts__data-wrapper">
            {Object.keys(amountMapByCategoryTitle)
                .map((title, index) => (
                    <div key={uniqueId(title)} className="award-amounts__data-content">
                        <div><span className={`award-amounts__data-icon ${awardTableClassMap[index]}`} />{title}</div>
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
