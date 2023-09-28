/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from 'test-utils';
import AmountsVisualization from 'components/covid19/amountsVisualization/AmountsVisualization';
import { rectangleMapping } from 'dataMapping/covid19/amountsVisualization';
import { mockProps } from '../../mockData/components/covid19/amountsVisualization';

describe('COVID-19 Amounts Visualization', () => {
    it('should render labels and values', () => {
        render(<AmountsVisualization {...mockProps} />);
        expect(screen.queryAllByText(rectangleMapping._totalBudgetAuthorityForBar.text.label).length).toEqual(5);
        expect(screen.queryAllByText(rectangleMapping._totalObligationsForBar.text.label).length).toEqual(4);
        expect(screen.queryAllByText(rectangleMapping._totalOutlaysForBar.text.label).length).toEqual(3);
        expect(screen.queryAllByText('$3.0 Trillion').length).toEqual(0);
        expect(screen.queryAllByText('$2.1 Trillion').length).toEqual(0);
        expect(screen.queryAllByText('$2.4 Trillion').length).toEqual(0);
    });
    it('should render all (4) rectangles', () => {
        render(<AmountsVisualization {...mockProps} />);
        expect(screen.getAllByText(/A rectangle with width representative of/i).length).toEqual(9);
    });
    it('should render all (4) lines', () => {
        render(<AmountsVisualization {...mockProps} />);
        expect(screen.getAllByText(/A line linking/i).length).toEqual(9);
    });
});
