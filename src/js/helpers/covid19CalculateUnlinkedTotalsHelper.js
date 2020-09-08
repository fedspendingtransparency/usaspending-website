/* eslint-disable camelcase */
export const calculateUnlinkedTotals = (overviewTotal, aggregatedTotal) => {
    const unlinkedObligation = overviewTotal?.obligation - aggregatedTotal?.obligation;
    const unlinkedOutlay = overviewTotal?.outlay - aggregatedTotal?.outlay;
    const unlinkedAwardCount = overviewTotal?.awardCount - aggregatedTotal?.award_count;
    const unlinkedFaceValueOfLoans = overviewTotal?.faceValueOfLoan - aggregatedTotal?.face_value_of_loan;
    const unlinkedBudgetaryResources = overviewTotal?.totalBudgetaryResources - aggregatedTotal?.total_budgetary_resources;

    return {
        obligation: unlinkedObligation,
        outlay: unlinkedOutlay,
        award_count: unlinkedAwardCount,
        face_value_of_loan: unlinkedFaceValueOfLoans,
        total_budgetary_resources: unlinkedBudgetaryResources
    };
};
