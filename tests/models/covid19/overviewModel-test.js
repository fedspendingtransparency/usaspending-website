/**
 * overview-test.js
 * Created by Jonathan Hill 06/18/20
 */

import { formatMoney } from 'helpers/moneyFormatter';
import OverviewModel from 'models/covid19/OverviewModel';
import { overviewAPIResponse } from './mockData';

const overview = Object.create(OverviewModel);
overview.populate(overviewAPIResponse);

const _otherObligations = overviewAPIResponse.spending.total_obligations - overviewAPIResponse.spending.award_obligations;
const _awardObligationsNotOutlayed = overviewAPIResponse.spending.award_obligations - overviewAPIResponse.spending.award_outlays;
const _remainingBalance = overviewAPIResponse.total_budget_authority - overviewAPIResponse.spending.total_obligations;
const nonAwardOutLays = overviewAPIResponse.spending.total_outlays - overviewAPIResponse.spending.award_outlays;
const _nonAwardNotOutlayed = (overviewAPIResponse.spending.total_obligations - overviewAPIResponse.spending.award_obligations) - (overviewAPIResponse.spending.total_outlays - overviewAPIResponse.spending.award_outlays);

describe(' COVID-19 overview Model', () => {
    describe('Private Variables', () => {
        it('should calculate otherObligations', () => {
            expect(overview._otherObligations).toEqual(_otherObligations);
        });
        it('should calculate awardObligationsNotOutlayed', () => {
            expect(overview._awardObligationsNotOutlayed).toEqual(_awardObligationsNotOutlayed);
        });
        it('should calculate remainingBalance', () => {
            expect(overview._remainingBalance).toEqual(_remainingBalance);
        });
        it('should calculate nonAwardOutLays', () => {
            expect(overview._nonAwardOutLays).toEqual(nonAwardOutLays);
        });
        it('should calculate nonAwardNotOutlayed', () => {
            expect(overview._nonAwardNotOutlayed).toEqual(_nonAwardNotOutlayed);
        });
    });
    describe('Public Variables', () => {
        it('should format totalBudgetAuthority', () => {
            expect(overview.totalBudgetAuthority).toEqual(formatMoney(overview._totalBudgetAuthority));
        });
        it('should format awardObligations', () => {
            expect(overview.awardObligations).toEqual(formatMoney(overview._awardObligations));
        });
        it('should format awardOutlays', () => {
            expect(overview.awardOutlays).toEqual(formatMoney(overview._awardOutlays));
        });
        it('should format totalObligations', () => {
            expect(overview.totalObligations).toEqual(formatMoney(overview._totalObligations));
        });
        it('should format totalOutlays', () => {
            expect(overview.totalOutlays).toEqual(formatMoney(overview._totalOutlays));
        });
        it('should format otherObligations', () => {
            expect(overview.otherObligations).toEqual(formatMoney(overview._otherObligations));
        });
        it('should format awardObligationsNotOutlayed', () => {
            expect(overview.awardObligationsNotOutlayed).toEqual(formatMoney(overview._awardObligationsNotOutlayed));
        });
        it('should format remainingBalance', () => {
            expect(overview.remainingBalance).toEqual(formatMoney(overview._remainingBalance));
        });
        it('should format nonAwardOutLays', () => {
            expect(overview.nonAwardOutLays).toEqual(formatMoney(overview._nonAwardOutLays));
        });
        it('should format nonAwardNotOutlayed', () => {
            expect(overview.nonAwardNotOutlayed).toEqual(formatMoney(overview._nonAwardNotOutlayed));
        });
    });
});
