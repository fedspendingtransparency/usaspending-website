// using PropTypes.shape({}) to define precise properties of commonly used props
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
    _dateSigned: PropTypes.string,
    parentAward: PropTypes.string,
    parentId: PropTypes.string,
});