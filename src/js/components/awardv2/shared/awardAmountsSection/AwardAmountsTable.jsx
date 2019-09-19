import React from 'react';
import PropTypes from 'prop-types';
import { uniqueId } from 'lodash';

const propTypes = {
    children: PropTypes.node,
    awardType: PropTypes.oneOf(['contract', 'idv', 'grant', 'loan']),
    awardData: PropTypes.shape({}),
    spendingScenario: PropTypes.string
};

// contractAndIdvCategories + grantCategories live in the awardData props object
const contractAndIdvCategories = ['totalObligationFormatted', 'baseExercisedOptionsFormatted', 'baseAndAllOptionsFormatted'];
const grantCategories = ['totalObligationFormatted', 'nonFederalFundingFormatted', 'totalFundingFormatted'];
const loanCategories = ['subsidyFormatted', 'faceValueFormatted'];

const getSpendingCategories = (awardType) => {
    const map = {
        grant: grantCategories,
        loan: loanCategories
    };
    if (Object.keys(map).includes(awardType)) {
        return map[awardType];
    }
    return contractAndIdvCategories;
};

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
    },
    loan: {
        subsidyFormatted: 'Original Subsidy Cost',
        faceValueFormatted: 'Face Value of Direct Loan'
    }
};

const awardTableClassMap = {
    "Combined Obligated Amounts": "award-amounts__data-icon_blue",
    "Combined Current Amounts": "award-amounts__data-icon_gray",
    "Combined Potential Amounts": "award-amounts__data-icon_transparent",
    "Obligated Amount": "award-amounts__data-icon_blue",
    "Current Amount": "award-amounts__data-icon_gray",
    "Potential Amount": "award-amounts__data-icon_transparent",
    "Non-Federal Funding": "award-amounts__data-icon_green",
    "Total Funding": "award-amounts__data-icon_gray",
    "Face Value of Direct Loan": "award-amounts__data-icon_transparent",
    "Original Subsidy Cost": "award-amounts__data-icon_yellow"
};

const AwardAmountsTable = ({
    awardData,
    awardType,
    spendingScenario
}) => {
    /*
     * we have to do this because right now whenever there's any kind of overspending
     * both extremeOverspendingFormatted and overspendingFormatted are defined
     * irrespective of whether the award exceedsPotential or exceedsCurrent
     * so we're relying on the parent in this case because we cant deduce the spending scenario
     **/

    const getOverSpendingRow = (awardAmounts = awardData, scenario = spendingScenario, type = awardType) => {
        switch (scenario) {
            case ('normal'):
                return null;
            case ('exceedsCurrent'):
                return (
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_overspending" />{type === 'idv' ? 'Exceeds Combined Current Award Amounts' : 'Exceeds Combined Current Award Amount'}</div>
                        <span>{awardAmounts.overspendingFormatted}</span>
                    </div>
                );
            case ('exceedsPotential'):
                return (
                    <div className="award-amounts__data-content">
                        <div><span className="award-amounts__data-icon award-amounts__data-icon_extreme-overspending" />{type === 'idv' ? 'Exceeds Combined Potential Award Amounts' : 'Exceeds Combined Potential Award Amount'}</div>
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
        [tableTitleByAwardTypeByCategory[awardType][category]]: awardData[category]
    });

    // build a map using the relevant keys for the awardType
    const amountMapByCategoryTitle = getSpendingCategories(awardType)
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
