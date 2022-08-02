import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, fireEvent } from '@test-utils';
import AggregatedAwardAmountsTableWrapper
    from "../../../src/js/components/award/idv/amounts/AggregatedAwardAmountsTableWrapper";
import { determineSpendingScenarioByAwardType } from 'helpers/awardAmountHelper';
import AwardAmountsTable from "../../../src/js/components/award/shared/awardAmounts/AwardAmountsTable";


const awardObject = {
    showFileC: false,
    awardData: {
        id: "",
        generatedId: "",
        _totalObligation: 82047.3,
        _totalOutlay: 0,
        _baseExercisedOptions: 0,
        _baseAndAllOptions: 517242.8,
        _fileCOutlay: 0,
        _fileCObligated: 0,
        _fileCOutlayInfrastructure: 0,
        _fileCObligatedInfrastructure: 12047.3
    },
    awardAmountType: "idv",
    spendingScenario: "insufficientData"
};


describe('Award Summary Chart Table', () => {
    it('- should show infrastructure spending.', () => {
        const renderComponent = () =>
        render(<AwardAmountsTable
                {...awardObject}
                infrastructureSpending={'infrastructure'} />);

        const {getByTestId} = renderComponent();
        expect(getByTestId('award-amounts__data-wrapper')).toHaveTextContent('Infrastructure Obligated Amount');
    });

    it('- should show overall spending.', () => {
        const renderComponent = () =>
            render(<AwardAmountsTable
                {...awardObject}
                infrastructureSpending={''} />);

        const {getByTestId} = renderComponent();
        expect(getByTestId('award-amounts__data-wrapper')).toHaveTextContent('Obligated Amount');
        expect(getByTestId('award-amounts__data-wrapper')).not.toHaveTextContent('Infrastructure Obligated Amount');
    });
});