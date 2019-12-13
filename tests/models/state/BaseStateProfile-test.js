/**
 * BaseStateProfile-test.js
 * Created by Lizzie Salita 5/7/18
 */

import BaseStateProfile from 'models/state/BaseStateProfile';
import { mockStateApi } from './mockStateApi';
import kGlobalConstants from 'GlobalConstants';

const state = Object.create(BaseStateProfile);
state.populate(mockStateApi);

describe('BaseStateProfile', () => {
    it('should format the award total', () => {
        expect(state.totalAmount).toEqual('$300.2 billion');
    });
    it('should format the total awards', () => {
        expect(state.totalAwards).toEqual('555,555');
    });
    describe('Census data', () => {
        it('should format the population', () => {
            expect(state.population).toEqual('1,234,567');
        });
        it('should return -- if population is falsey', () => {
            const modifiedApi = Object.assign({}, mockStateApi, {
                population: null
            });
            const modifiedState = Object.create(BaseStateProfile);
            modifiedState.populate(modifiedApi);

            expect(modifiedState.population).toEqual('--');
        });
        it('should format the award amount per capita', () => {
            expect(state.awardAmountPerCapita).toEqual('$900,000');
        });
        it('should return -- if award amount per capita is falsey', () => {
            const modifiedApi = Object.assign({}, mockStateApi, {
                award_amount_per_capita: null
            });
            const modifiedState = Object.create(BaseStateProfile);
            modifiedState.populate(modifiedApi);

            expect(modifiedState.awardAmountPerCapita).toEqual('--');
        });
        it('should format the median household income', () => {
            expect(state.medianHouseholdIncome).toEqual('$68,000');
        });
        it('should return -- if median household income is falsey', () => {
            const modifiedApi = Object.assign({}, mockStateApi, {
                median_household_income: null
            });
            const modifiedState = Object.create(BaseStateProfile);
            modifiedState.populate(modifiedApi);

            expect(modifiedState.medianHouseholdIncome).toEqual('--');
        });
        it('should store the population data source year as a string', () => {
            expect(state.populationSourceYear).toEqual('1992');
        });
        it('should store the median household income data source year as a string', () => {
            expect(state.incomeSourceYear).toEqual('1993');
        });
    });
    describe('State flag image', () => {
        it('should determine the filename based on FIPS', () => {
            expect(state.flag).toEqual(`https://files${kGlobalConstants.DEV ? '-nonprod' : ''}.usaspending.gov/state_flags/06.png`);
        });
    });
});
