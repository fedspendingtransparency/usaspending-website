import { addSubmissionEndDatesToBudgetaryResources } from 'helpers/agencyV2/visualizations/TotalObligationsOverTimeVisualizationHelper';
import { mockSubmissions } from '../../../mockData/helpers/aboutTheDataHelper';

const mockBudgetaryResources = [
    {
        period: 3,
        obligated: 100689245470.66
    },
    {
        period: 4,
        obligated: 110898908395.86
    },
    {
        period: 5,
        obligated: 120898908395.86
    },
    {
        period: 6,
        obligated: 10689245470.86
    }
];

describe('Total Obligations Over Time Visualization Helper', () => {
    it('should return an object with endDate, period, and obligated properties', () => {
        const data = addSubmissionEndDatesToBudgetaryResources(mockBudgetaryResources, mockSubmissions, '2020');
        expect(data[0]).toHaveProperty('period', 3);
        expect(typeof data[0].obligated === 'number').toBeTruthy();
        expect(typeof data[0].endDate === 'number').toBeTruthy();
        expect(data[1]).toHaveProperty('period', 6);
        expect(typeof data[1].obligated === 'number').toBeTruthy();
        expect(typeof data[1].endDate === 'number').toBeTruthy();
    });
});
