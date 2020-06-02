import BaseAgencyBudgetaryResources from 'models/v2/agency/BaseAgencyBudgetaryResources';

export const mockBudgetaryResources = {
    fiscal_year: 2020,
    toptier_code: '020',
    agency_budgetary_resources: 2672513718.5,
    prior_year_agency_budgetary_resources: 1444608434.93,
    total_federal_budgetary_resources: 9662634317.75,
    agency_total_obligated: 580584099.03,
    agency_obligation_by_period: [
        {
            period: 3,
            obligated: 227170135.3
        },
        {
            period: 6,
            obligated: 580584099.03
        }
    ],
    messages: []
};

const budgetaryResources = Object.create(BaseAgencyBudgetaryResources);
budgetaryResources.populate(mockBudgetaryResources);

describe('BaseAgencyBudgetaryResources', () => {
    it('should store the raw agency obligated amount', () => {
        expect(budgetaryResources._agencyTotalObligated).toEqual(580584099.03);
    });
    it('should store the formatted agency obligated amount', () => {
        expect(budgetaryResources.agencyTotalObligated).toEqual('$580.6 million');
    });
});
