
import PropTypes from 'prop-types';

export const AWARD_V2_OVERVIEW_PROPS = PropTypes.shape({
    _category: PropTypes.string,
    id: PropTypes.string,
    generatedId: PropTypes.string,
    type: PropTypes.string,
    typeDescription: PropTypes.string,
    longTypeDescription: PropTypes.string,
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

export const AWARD_V2_AGGREGATED_AMOUNTS_PROPS = PropTypes.shape({
    id: PropTypes.string,
    generatedId: PropTypes.string,
    idvCount: PropTypes.number,
    contractCount: PropTypes.number,
    _combinedPotentialAwardAmounts: PropTypes.number,
    _obligation: PropTypes.number,
    _combinedCurrentAwardAmounts: PropTypes.number
});

export const TOOLTIP_PROPS = PropTypes.shape({
    isControlled: PropTypes.bool,
    isVisible: PropTypes.bool,
    closeCurrentTooltip: PropTypes.func,
    showTooltip: PropTypes.func
});

export const AWARD_SECTION_PROPS = {
    type: PropTypes.oneOf(["row", "column"]),
    id: PropTypes.string,
    children: PropTypes.node
};

export const AWARD_PAGE_WRAPPER_PROPS = {
    awardType: PropTypes.oneOf(["idv", "contract", "grant"]),
    awardTypeDescription: PropTypes.string,
    glossaryLink: PropTypes.string,
    identifier: PropTypes.string,
    children: PropTypes.node
};

export const AWARD_SECTION_HEADER_PROPS = {
    icon: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
    title: PropTypes.string
};
