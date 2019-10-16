/**
 * In the map spendingCategoriesByAwardType:
 * @keys are awardTypes
 * @values are properties on redux.awardV2.overview object which are the
 * spending categories, in ascending order (under normative case), small, bigger, biggest (optional)
 */

// eslint-disable-next-line import/prefer-default-export
export const spendingCategoriesByAwardType = {
    loan: ['_subsidy', '_faceValue'],
    contract: ['_totalObligation', '_baseExercisedOptions', '_baseAndAllOptions'],
    idv: ['_totalObligation', '_baseExercisedOptions', '_baseAndAllOptions']
};
