/**
 * OverviewModel-test.js
 * Created by Jonathan Hill 06/18/20
 */

import { formatMoney } from 'helpers/moneyFormatter';
import { OverviewModel } from 'models/covid19/OverviewModel';
import mockData from './mockData';

const OverviewModel = Object.create(OverviewModel);
OverviewModel.populate(mockData);

const _otherObligations = mockData.spending.total_obligations - mockData.spending.award_obligations;
const _awardObligationsNotOutlayed = mockData.spending.award_obligations - mockData.spending.award_outlays;
const _remainingBalance = mockData.total_budget_authority - mockData.spending.total_obligations;
const nonAwardOutLays = mockData.spending.total_outlays - mockData.spending.award_outlays;
const _nonAwardNotOutlayed = (mockData.spending.total_obligations - mockData.spending.award_obligations) - (mockData.spending.total_outlays - mockData.spending.award_outlays);

describe(' COVID-19 OverviewModel Model', () => {
    describe('Private Variables', () => {
        it('should calculate otherObligations', () => {
            expect(OverviewModel._otherObligations).toEqual(_otherObligations);
        });
        it('should calculate awardObligationsNotOutlayed', () => {
            expect(OverviewModel._awardObligationsNotOutlayed).toEqual(_awardObligationsNotOutlayed);
        });
        it('should calculate remainingBalance', () => {
            expect(OverviewModel._remainingBalance).toEqual(_remainingBalance);
        });
        it('should calculate nonAwardOutLays', () => {
            expect(OverviewModel._nonAwardOutLays).toEqual(nonAwardOutLays);
        });
        it('should calculate nonAwardNotOutlayed', () => {
            expect(OverviewModel._nonAwardNotOutlayed).toEqual(_nonAwardNotOutlayed);
        });
    });
    describe('Public Variables', () => {
        it('should format totalBudgetAuthority', () => {
            expect(OverviewModel.totalBudgetAuthority).toEqual(formatMoney(OverviewModel._totalBudgetAuthority));
        });
        it('should format awardObligations', () => {
            expect(OverviewModel.awardObligations).toEqual(formatMoney(OverviewModel._awardObligations));
        });
        it('should format awardOutlays', () => {
            expect(OverviewModel.awardOutlays).toEqual(formatMoney(OverviewModel._awardOutlays));
        });
        it('should format totalObligations', () => {
            expect(OverviewModel.totalObligations).toEqual(formatMoney(OverviewModel._totalObligations));
        });
        it('should format totalOutlays', () => {
            expect(OverviewModel.totalOutlays).toEqual(formatMoney(OverviewModel._totalOutlays));
        });
        it('should format otherObligations', () => {
            expect(OverviewModel.otherObligations).toEqual(formatMoney(OverviewModel._otherObligations));
        });
        it('should format awardObligationsNotOutlayed', () => {
            expect(OverviewModel.awardObligationsNotOutlayed).toEqual(formatMoney(OverviewModel._awardObligationsNotOutlayed));
        });
        it('should format remainingBalance', () => {
            expect(OverviewModel.remainingBalance).toEqual(formatMoney(OverviewModel._remainingBalance));
        });
        it('should format nonAwardOutLays', () => {
            expect(OverviewModel.nonAwardOutLays).toEqual(formatMoney(OverviewModel._nonAwardOutLays));
        });
        it('should format nonAwardNotOutlayed', () => {
            expect(OverviewModel.nonAwardNotOutlayed).toEqual(formatMoney(OverviewModel._nonAwardNotOutlayed));
        });
    });
});
