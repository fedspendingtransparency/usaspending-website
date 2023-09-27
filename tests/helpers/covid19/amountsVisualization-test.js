/**
 * @jest-environment jsdom
 */
import { scaleLinear } from 'd3-scale';
import { defaultTextState, lineXPosition } from 'helpers/covid19/amountsVisualization';
import { rectangleMapping } from 'dataMapping/covid19/amountsVisualization';

describe('Amounts Visualization', () => {
    it('should return default state for text elements', () => {
        expect(defaultTextState('_totalBudgetAuthorityForBar', 'description')).toEqual({
            y: 0,
            x: 0,
            height: 0,
            text: rectangleMapping._totalBudgetAuthorityForBar.text.description,
            className: 'amounts-text__description white'
        });
    });
    it('should return a number for the x position of a line element', () => {
        const overviewData = { _totalBudgetAuthority: 0 };
        const scale = scaleLinear().domain([0, 1]).range([0, 1]);
        expect(typeof lineXPosition(overviewData, scale, '_totalBudgetAuthorityForBar') === 'number').toBeTruthy();
    });
});
