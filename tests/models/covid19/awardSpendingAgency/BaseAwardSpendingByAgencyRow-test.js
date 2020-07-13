import BaseAwardSpendingByAgencyRow from "models/covid19/awardSpendingAgency/BaseAwardSpendingByAgencyRow";

export const mockBaseAwardSpendingByAgencyRow = {
    id: 41,
    description: "Description text of 012, for humans",
    children: [],
    count: 1000,
    obligation: 50.12,
    outlay: 10.13,
    face_value_of_loan: 1000.00
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
        expect(BaseAwardSpendingRow._count).toEqual(1000);
    });
    it('should store the raw face value of loan', () => {
        expect(BaseAwardSpendingRow._face_value_of_loan).toEqual(1000.00);
    });
    it('should store the formatted obligation amount', () => {
        expect(BaseAwardSpendingRow.obligation).toEqual('$50');
    });
    it('should store the formatted outlay amount', () => {
        expect(BaseAwardSpendingRow.outlay).toEqual('$10');
    });
    it('should store the formatted count', () => {
        expect(BaseAwardSpendingRow.count).toEqual('1,000');
    });
    it('should store the formatted face value of loan', () => {
        expect(BaseAwardSpendingRow.faceValueOfLoan).toEqual('$1,000');
    });
});
