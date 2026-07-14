/**
 * @jest-environment jsdom
 */
import {
    addSubmissionEndDatesToBudgetaryResources,
    determineScenario,
    exceedsMinStoppingPoints,
    exceedsMaxStoppingPoints,
    exceedsMaxAndMinStoppingPoints,
    exceedsMaxPercentDifference,
    exceedsMinPercentDifference,
    pathDefinition
} from 'helpers/agency/visualizations/TotalObligationsOverTimeVisualizationHelper';
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

const agencyBudget = 10;
const maxAndMinStoppingPoints = [{ obligated: 50 }, { obligated: -10 }, { obligated: 1 }];
const maxStoppingPoints = [{ obligated: 50 }, { obligated: 20 }, { obligated: 1 }];
const minStoppingPoints = [{ obligated: 9 }, { obligated: -10 }, { obligated: 1 }];
const normalStoppingPoints = [{ obligated: 5 }, { obligated: 6 }];

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

describe('DetermineScenario', () => {
    it.each([
        ['exceedsMaxAndMin', agencyBudget, maxAndMinStoppingPoints],
        ['exceedsMax', agencyBudget, maxStoppingPoints],
        ['exceedsMin', agencyBudget, minStoppingPoints],
        ['normal', agencyBudget, normalStoppingPoints]
    ])('should return the scenario when data %s', (scenario, agencyBudget, data) => {
        expect(determineScenario(agencyBudget, data)).toEqual(scenario);
    });
});

describe('Stopping Points', () => {
    it('should return correct properties and order of colors for exceedsMinStoppingPoints', () => {
        const stoppingPoints = exceedsMinStoppingPoints(agencyBudget, minStoppingPoints);
        expect(stoppingPoints[0].offset).toEqual('0%');
        expect(stoppingPoints[0].stopColor).toEqual('blue');
        expect(stoppingPoints[1].stopColor).toEqual('blue');
        expect(stoppingPoints[2].stopColor).toEqual('red');
        expect(stoppingPoints[3].offset).toEqual('100%');
        expect(stoppingPoints[3].stopColor).toEqual('red');
    });
    it('should return correct properties and order of colors for exceedsMaxStoppingPoints', () => {
        const stoppingPoints = exceedsMaxStoppingPoints(agencyBudget, maxStoppingPoints);
        expect(stoppingPoints[0].offset).toEqual('0%');
        expect(stoppingPoints[0].stopColor).toEqual('red');
        expect(stoppingPoints[1].stopColor).toEqual('red');
        expect(stoppingPoints[2].stopColor).toEqual('blue');
        expect(stoppingPoints[3].offset).toEqual('100%');
        expect(stoppingPoints[3].stopColor).toEqual('blue');
    });
    it('should return correct properties and order of colors for exceedsMaxAndMinStoppingPoints', () => {
        const stoppingPoints = exceedsMaxAndMinStoppingPoints(agencyBudget, maxAndMinStoppingPoints);
        expect(stoppingPoints[0].offset).toEqual('0%');
        expect(stoppingPoints[0].stopColor).toEqual('red');
        expect(stoppingPoints[1].stopColor).toEqual('red');
        expect(stoppingPoints[2].stopColor).toEqual('blue');
        expect(stoppingPoints[3].stopColor).toEqual('blue');
        expect(stoppingPoints[4].stopColor).toEqual('red');
        expect(stoppingPoints[5].offset).toEqual('100%');
        expect(stoppingPoints[5].stopColor).toEqual('red');
    });
});

describe('Percent Differences', () => {
    it('should return the percent difference for exceedsMin', () => {
        expect(exceedsMinPercentDifference(agencyBudget, minStoppingPoints).substring(0, 4)).toEqual('47.3');
    });
    it('should return the percent difference for exceedsMax', () => {
        expect(exceedsMaxPercentDifference(agencyBudget, maxStoppingPoints).substring(0, 4)).toEqual('80%');
    });
    it('should return the percent difference for exceedsMaxAndMin', () => {
        expect(exceedsMaxPercentDifference(agencyBudget, maxAndMinStoppingPoints, true).substring(0, 4)).toEqual('66.6');
    });
});

describe('Path Definition', () => {
    it('should draw a normal path', () => {
        const path = pathDefinition(normalStoppingPoints, () => {}, 'obligated', {
            left: 0, right: 0, top: 0, bottom: 0
        }, () => {}, 'obligated', 100);
        expect(path[path.length - 1] === 'Z').toBeFalsy();
    });
    it('should draw an area path', () => {
        const path = pathDefinition(normalStoppingPoints, () => {}, 'obligated', {
            left: 0, right: 0, top: 0, bottom: 0
        }, () => {}, 'obligated', 100, null, true);
        expect(path.substring(path.length - 4, path.length)).toEqual('100Z');
    });
    it('should draw an area path and close at 10', () => {
        const path = pathDefinition(normalStoppingPoints, () => {}, 'obligated', {
            left: 0, right: 0, top: 0, bottom: 0
        }, (x) => x, 'obligated', 100, 10, true);
        expect(path.substring(path.length - 3, path.length)).toEqual('90Z');
    });
});
