/**
 * BaseStateProfile-test.js
 * Created by Lizzie Salita 5/7/18
 */
import BaseStateProfile from "../../../src/js/models/v2/state/BaseStateProfile";
import {mockStateApi} from "./mockStateApi";

const state = Object.create(BaseStateProfile);
state.populate(mockStateApi);

describe('BaseStateProfile', () => {
    describe('Census data', () => {
        it('should format the population', () => {
            expect(state.population).toEqual('1,234,567');
        });
        it('should format the award amount per capita', () => {
            expect(state.awardAmountPerCapita).toEqual('$900,000');
        });
        it('should format the median household income', () => {
            expect(state.medianHouseholdIncome).toEqual('$68,000');
        });
    });
});
