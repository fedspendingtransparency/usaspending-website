import BaseAccountSpendingRow from 'models/v2/agencyV2/BaseAccountSpendingRow';

export const mockAccountSpendingRow = {
    name: "Net Interest",
    children: [
        {
            name: "Interest on Treasury debt securities (gross)",
            obligated_amount: 269452391857.85,
            gross_outlay_amount: 269452391857.85,
            total_obligated_amount: 999999999999.99
        },
        {
            name: "Other interest",
            obligated_amount: 6298412029.12,
            gross_outlay_amount: 3415362152.38,
            total_obligated_amount: 999999999999.99
        }
    ],
    obligated_amount: 275750803886.97,
    gross_outlay_amount: 272867754010.23,
    total_obligated_amount: 999999999999.99
};


const accountSpendingRow = Object.create(BaseAccountSpendingRow);
accountSpendingRow.populate(mockAccountSpendingRow);

describe('BaseAccountSpendingRow', () => {
    it('should store the raw obligated amount', () => {
        expect(accountSpendingRow._obligatedAmount).toEqual(275750803886.97);
    });
    it('should store the raw gross outlay amount', () => {
        expect(accountSpendingRow._grossOutlayAmount).toEqual(272867754010.23);
    });
    it('should store the raw total obligated amount', () => {
        expect(accountSpendingRow._totalObligatedAmount).toEqual(999999999999.99);
    });
    it('should store the name', () => {
        expect(accountSpendingRow.name).toEqual('Net Interest');
    });
    it('should store the formatted gross outlay amount', () => {
        expect(accountSpendingRow.grossOutlayAmount).toEqual('$272,867,754,010');
    });
    it('should store the formatted obligated amount', () => {
        expect(accountSpendingRow.obligatedAmount).toEqual('$275,750,803,887');
    });
    it('should store the formatted percent of total obligations', () => {
        expect(accountSpendingRow.percentOfTotalObligations).toEqual('27.58%');
    });
});
