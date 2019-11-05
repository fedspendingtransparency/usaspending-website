
import PropTypes from 'prop-types';

export const AWARD_V2_OVERVIEW_PROPS = PropTypes.shape({
    _category: PropTypes.string,
    id: PropTypes.string,
    generatedId: PropTypes.string,
    type: PropTypes.string,
    typeDescription: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    _subawardTotal: PropTypes.number,
    subawardCount: PropTypes.number,
    _totalObligation: PropTypes.number,
    _baseExercisedOptions: PropTypes.number,
    _baseAndAllOptions: PropTypes.number,
    _dateSigned: PropTypes.object, // moment
    parentAward: PropTypes.string,
    parentId: PropTypes.string
});

export const AWARD_V2_COUNTS_PROPS = PropTypes.shape({
    child_awards: PropTypes.number,
    child_idvs: PropTypes.number,
    grandchild_awards: PropTypes.number,
    total: PropTypes.number
});


export const AWARD_TYPE_PROPS = PropTypes.oneOf([
    'idv', 'contract', 'grant', 'loan', 'direct payment', 'insurance', 'other'
]);

export const TOOLTIP_PROPS = PropTypes.shape({
    isControlled: PropTypes.bool,
    isVisible: PropTypes.bool,
    closeTooltip: PropTypes.func,
    showTooltip: PropTypes.func
});

export const AWARD_SECTION_PROPS = {
    type: PropTypes.oneOf(["row", "column"]),
    id: PropTypes.string,
    children: PropTypes.node
};

export const AWARD_PAGE_WRAPPER_PROPS = {
    awardType: AWARD_TYPE_PROPS,
    awardTypeDescription: PropTypes.string,
    glossaryLink: PropTypes.string,
    overviewType: PropTypes.string,
    identifier: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
    children: PropTypes.node
};

export const AWARD_SECTION_HEADER_PROPS = {
    icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    title: PropTypes.string,
    tooltip: PropTypes.node,
    tooltipWide: PropTypes.bool
};
const awardOverviewAwardAmountsSectionBase = {
    _baseAndAllOptions: PropTypes.number,
    _baseExercisedOptions: PropTypes.number,
    _totalObligation: PropTypes.number,
    baseAndAllOptionsAbbreviated: PropTypes.string,
    baseAndAllOptionsFormatted: PropTypes.string,
    baseExercisedOptionsAbbreviated: PropTypes.string,
    baseExercisedOptionsFormatted: PropTypes.string,
    extremeOverspendingAbbreviated: PropTypes.string,
    extremeOverspendingFormatted: PropTypes.string,
    generatedId: PropTypes.string,
    id: PropTypes.string,
    nonFederalFundingAbbreviated: PropTypes.string,
    nonFederalFundingFormatted: PropTypes.string,
    overspendingAbbreviated: PropTypes.string,
    overspendingFormatted: PropTypes.string,
    totalFundingAbbreviated: PropTypes.string,
    totalFundingFormatted: PropTypes.string,
    totalObligationAbbreviated: PropTypes.string,
    totalObligationFormatted: PropTypes.string
};

const contract = {
    _category: PropTypes.string,
    _dateSigned: PropTypes.shape({}),
    _subawardTotal: PropTypes.number,
    _totalObligation: PropTypes.number,
    additionalDetails: PropTypes.shape({}),
    awardingAgency: PropTypes.shape({}),
    category: PropTypes.string,
    dateSigned: PropTypes.string,
    description: PropTypes.string,
    executiveDetails: PropTypes.shape({}),
    fundingAgency: PropTypes.shape({}),
    longTypeDescription: PropTypes.string,
    parentAward: PropTypes.string,
    periodOfPerformance: PropTypes.shape({}),
    placeOfPerformance: PropTypes.shape({}),
    pricing: PropTypes.shape({}),
    recipient: PropTypes.shape({}),
    subawardCount: PropTypes.number,
    subawardTotal: PropTypes.string,
    type: PropTypes.string,
    typeDescription: PropTypes.string,
    ...awardOverviewAwardAmountsSectionBase
};

export const AWARD_OVERVIEW_AWARD_AMOUNTS_SECTION_PROPS = PropTypes.shape({ ...contract });

export const AWARD_V2_AGGREGATED_AMOUNTS_PROPS = PropTypes.shape({
    contractCount: PropTypes.number,
    childAwardCount: PropTypes.number,
    childIDVCount: PropTypes.number,
    grandchildAwardCount: PropTypes.number,
    idvCount: PropTypes.number,
    ...awardOverviewAwardAmountsSectionBase
});
