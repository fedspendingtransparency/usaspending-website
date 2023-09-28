/**
 * @jest-environment jsdom
 */
import BaseAgencyBudgetaryResources from 'models/v2/agency/BaseAgencyBudgetaryResources';

export const mockBudgetaryResources = {
    agency_data_by_year: [
        {
            fiscal_year: 2021,
            agency_budgetary_resources: 34137500000.97,
            agency_total_obligated: 0.0,
            total_budgetary_resources: null,
            obligationsByPeriod: [
                { period: 3, obligated: 227170135560.3 },
                { period: 6, obligated: 580584099932.03 },
                { period: 7, obligated: 1040324359196.91 },
                { period: 8, obligated: 1206879124227.15 },
                { period: 9, obligated: 1312092059535.05 },
                { period: 10, obligated: 1403807719870.61 },
                { period: 11, obligated: 1480577769439.92 },
                { period: 12, obligated: 1566561954994.18 }
            ]
        },
        {
            fiscal_year: 2020,
            agency_budgetary_resources: 322370908923.19,
            agency_total_obligated: 239791172810.38,
            total_budgetary_resources: 11461083881445.67,
            obligationsByPeriod: [
                { period: 3, obligated: 227170135560.3 },
                { period: 6, obligated: 580584099932.03 },
                { period: 7, obligated: 1040324359196.91 },
                { period: 8, obligated: 1206879124227.15 },
                { period: 9, obligated: 1312092059535.05 },
                { period: 10, obligated: 1403807719870.61 },
                { period: 11, obligated: 1480577769439.92 },
                { period: 12, obligated: 1566561954994.18 }
            ]
        },
        {
            fiscal_year: 2019,
            agency_budgetary_resources: 242451803717.47,
            agency_total_obligated: 170898908395.86,
            total_budgetary_resources: 7985747377194.5,
            obligationsByPeriod: [
                { period: 3, obligated: 227170135560.3 },
                { period: 6, obligated: 580584099932.03 },
                { period: 7, obligated: 1040324359196.91 },
                { period: 8, obligated: 1206879124227.15 },
                { period: 9, obligated: 1312092059535.05 },
                { period: 10, obligated: 1403807719870.61 },
                { period: 11, obligated: 1480577769439.92 },
                { period: 12, obligated: 1566561954994.18 }
            ]
        },
        {
            fiscal_year: 2018,
            agency_budgetary_resources: 224372520297.27,
            agency_total_obligated: 157671655471.61,
            total_budgetary_resources: 7593801808266.06,
            obligationsByPeriod: [
                { period: 3, obligated: 227170135560.3 },
                { period: 6, obligated: 580584099932.03 },
                { period: 7, obligated: 1040324359196.91 },
                { period: 8, obligated: 1206879124227.15 },
                { period: 9, obligated: 1312092059535.05 },
                { period: 10, obligated: 1403807719870.61 },
                { period: 11, obligated: 1480577769439.92 },
                { period: 12, obligated: 1566561954994.18 }
            ]
        },
        {
            fiscal_year: 2017,
            agency_budgetary_resources: 220459743630.97,
            agency_total_obligated: 163075192516.58,
            total_budgetary_resources: 7157959573120.1,
            obligationsByPeriod: [
                { period: 3, obligated: 227170135560.3 },
                { period: 6, obligated: 580584099932.03 },
                { period: 7, obligated: 1040324359196.91 },
                { period: 8, obligated: 1206879124227.15 },
                { period: 9, obligated: 1312092059535.05 },
                { period: 10, obligated: 1403807719870.61 },
                { period: 11, obligated: 1480577769439.92 },
                { period: 12, obligated: 1566561954994.18 }
            ]
        }
    ]
};

const budgetaryResources = Object.create(BaseAgencyBudgetaryResources);
budgetaryResources.populate(mockBudgetaryResources.agency_data_by_year[0]);

const budgetaryResources20 = Object.create(BaseAgencyBudgetaryResources);
budgetaryResources20.populate(mockBudgetaryResources.agency_data_by_year[1]);

describe('BaseAgencyBudgetaryResources', () => {
    it('should store the foramatted agency budget', () => {
        expect(budgetaryResources.agencyBudget).toEqual('$34.14 Billion');
    });
    it('should store the agency budget with abbreviated label', () => {
        expect(budgetaryResources.agencyBudgetShort).toEqual('$34.14B');
    });
    it('should store the raw agency budget', () => {
        expect(budgetaryResources._agencyBudget).toEqual(34137500000.97);
    });
    it('should handle a null value for the federal budget', () => {
        expect(budgetaryResources.percentOfFederalBudget).toEqual('--');
    });
    it('should store the (formatted) agency budget as a percent of the federal buget', () => {
        expect(budgetaryResources20.percentOfFederalBudget).toEqual('2.8%');
    });
    it('should store the foramatted agency obligations', () => {
        expect(budgetaryResources20.agencyObligated).toEqual('$239.79 Billion');
    });
    it('should store the agency obligations with abbreviated label', () => {
        expect(budgetaryResources20.agencyObligatedShort).toEqual('$239.79B');
    });
    it('should store the raw agency obligations', () => {
        expect(budgetaryResources20._agencyObligated).toEqual(239791172810.38);
    });
    it('should store the (formatted) agency obligations as a percent of the agency buget', () => {
        expect(budgetaryResources20.percentOfAgencyBudget).toEqual('74.4%');
    });
});
