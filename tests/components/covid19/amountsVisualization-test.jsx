import React from 'react';
import { render, screen } from 'test-utils';
import AmountsVisualization from 'components/covid19/amountsVisualization/AmountsVisualization';
import { rectangleMapping } from 'dataMapping/covid19/amountsVisualization';
import { mockProps } from '../../mockData/components/covid19/amountsVisualization';


describe('COVID-19 Amounts Visualization', () => {
    it('should render labels and descriptions and values', () => {
        render(<AmountsVisualization {...mockProps} />);
        expect(screen.queryByText(rectangleMapping._totalBudgetAuthority.text.description)).toBeTruthy();
        expect(screen.queryByText(rectangleMapping._totalBudgetAuthority.text.label)).toBeTruthy();
        expect(screen.queryByText(rectangleMapping._totalObligations.text.description)).toBeTruthy();
        expect(screen.queryByText(rectangleMapping._totalObligations.text.label)).toBeTruthy();
        expect(screen.queryByText(rectangleMapping._totalOutlays.text.description)).toBeTruthy();
        expect(screen.queryByText(rectangleMapping._totalOutlays.text.label)).toBeTruthy();
        expect(screen.queryByText(rectangleMapping._remainingBalance.text.description)).toBeTruthy();
        expect(screen.queryByText(rectangleMapping._remainingBalance.text.label)).toBeTruthy();
        expect(screen.queryByText('$3.0 Trillion')).toBeTruthy();
        expect(screen.queryByText('$2.1 Trillion')).toBeTruthy();
        expect(screen.queryByText('$2.4 Trillion')).toBeTruthy();
        expect(screen.queryByText('$542.0 Billion')).toBeTruthy();
    });
    it('should render all (4) rectangles', () => {
        render(<AmountsVisualization {...mockProps} />);
        expect(screen.getAllByText(/A rectangle with width representative of/i).length).toEqual(4);
    });
    it('should render all (9) lines', () => {
        render(<AmountsVisualization {...mockProps} />);
        expect(screen.getAllByText(/A line linking/i).length).toEqual(9);
    });
});
