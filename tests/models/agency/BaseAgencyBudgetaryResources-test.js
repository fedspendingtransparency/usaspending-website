import BaseAgencyBudgetaryResources from 'models/v2/agency/BaseAgencyBudgetaryResources';

export const mockBudgetaryResources = {
    agency_data_by_year: [
        {
            fiscal_year: 2021,
            agency_budgetary_resources: 341375.97,
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
budgetaryResources.populate(mockBudgetaryResources);

describe('BaseAgencyBudgetaryResources', () => {
    it('should create a map of spending details keyed on fy', () => {
        expect(Object.keys(budgetaryResources.dataByYear)).toEqual([
            '2017',
            '2018',
            '2019',
            '2020',
            '2021'
        ]);
        expect(Object.keys(budgetaryResources.dataByYear['2017'])).toEqual([
            'agencyBudget',
            'agencyObligated',
            'federalBudget',
            'obligationsByPeriod'
        ]);
        expect(budgetaryResources.dataByYear['2021'].federalBudget).toEqual(0);
    });
});
