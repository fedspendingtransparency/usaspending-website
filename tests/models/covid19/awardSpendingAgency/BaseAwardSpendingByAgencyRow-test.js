import BaseAwardSpendingByAgencyRow from "models/covid19/awardSpendingAgency/BaseAwardSpendingByAgencyRow";

export const mockBaseAwardSpendingByAgencyRow = {
    id: 41,
    description: "Description text of 012, for humans",
    children: [],
    count: 2,
    obligation: 50.12,
    outlay: 10.13
};

describe('BaseAwardSpendingByAgencyRow', () => {
    const BaseAwardSpendingRow = Object.create(BaseAwardSpendingByAgencyRow);
    BaseAwardSpendingRow.populate(mockBaseAwardSpendingByAgencyRow);

    it('should store the name', () => {
        expect(BaseAwardSpendingRow.name).toEqual("Description text of 012, for humans");
    });
    it('should store the raw obligation', () => {
        expect(BaseAwardSpendingRow._obligation).toEqual(50.12);
    });
    it('should store the raw outlay', () => {
        expect(BaseAwardSpendingRow._outlay).toEqual(10.13);
    });
    it('should store the raw count', () => {
        expect(BaseAwardSpendingRow._count).toEqual(2);
    });
    it('should store the formatted obligation amount', () => {
        expect(BaseAwardSpendingRow.obligation).toEqual('$50');
    });
    it('should store the formatted outlay amount', () => {
        expect(BaseAwardSpendingRow.outlay).toEqual('$10');
    });
    it('should store the formatted count', () => {
        expect(BaseAwardSpendingRow.count).toEqual('2');
    });
});
