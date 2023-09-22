/**
 * @jest-environment jsdom
 * 
 * BaseOverview-test.js
 * Created by Jonathan Hill 06/18/20
 */

import { formatMoney } from 'helpers/moneyFormatter';
import BaseOverview from 'models/v2/covid19/BaseOverview';
import { overviewAPIResponse, overviewAPIResponseWithAdditional } from './mockData';

const overview = Object.create(BaseOverview);
overview.populate(overviewAPIResponse);
const _otherObligations = overviewAPIResponse.spending.total_obligations - overviewAPIResponse.spending.award_obligations;
const _awardObligationsNotOutlayed = overviewAPIResponse.spending.award_obligations - overviewAPIResponse.spending.award_outlays;
const _remainingBalance = overviewAPIResponse.total_budget_authority - overviewAPIResponse.spending.total_obligations;
const nonAwardOutLays = overviewAPIResponse.spending.total_outlays - overviewAPIResponse.spending.award_outlays;
const _nonAwardNotOutlayed = (overviewAPIResponse.spending.total_obligations - overviewAPIResponse.spending.award_obligations) - (overviewAPIResponse.spending.total_outlays - overviewAPIResponse.spending.award_outlays);

const overviewWithAdditional = Object.create(BaseOverview);
overviewWithAdditional.populate(overviewAPIResponseWithAdditional);
const _totalBudgetAuthorityForBar = overviewAPIResponseWithAdditional.total_budget_authority + overviewAPIResponseWithAdditional.additional.total_budget_authority;
const _totalObligationsForBar = overviewAPIResponseWithAdditional.spending.total_obligations + overviewAPIResponseWithAdditional.additional.spending.total_obligations;
const _totalOutlaysForBar = overviewAPIResponseWithAdditional.spending.total_outlays + overviewAPIResponseWithAdditional.additional.spending.total_outlays;

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
    describe('Additional Private Variables', () => {
        it('should calculate totalBudgetAuthorityForBar', () => {
            expect(overview._totalBudgetAuthorityForBar).toEqual(overview._totalBudgetAuthority);
        });
        it('should calculate totalBudgetAuthorityForBar (with additional data)', () => {
            expect(overviewWithAdditional._totalBudgetAuthorityForBar).toEqual(_totalBudgetAuthorityForBar);
        });
        it('should calculate totalObligationsForBar', () => {
            expect(overview._totalObligationsForBar).toEqual(overview._totalObligations);
        });
        it('should calculate totalObligationsForBar (with additional data)', () => {
            expect(overviewWithAdditional._totalObligationsForBar).toEqual(_totalObligationsForBar);
        });
        it('should calculate totalOutlaysForBar', () => {
            expect(overview._totalOutlaysForBar).toEqual(overview._totalOutlays);
        });
        it('should calculate _totalOutlaysForBar (with additional data)', () => {
            expect(overviewWithAdditional._totalOutlaysForBar).toEqual(_totalOutlaysForBar);
        });
    });
    describe('Public Variables', () => {
        it('should format totalBudgetAuthority', () => {
            expect(overview.totalBudgetAuthority).toEqual(formatMoney(overview._totalBudgetAuthority));
        });
        it('should format totalBudgetAuthorityForBar', () => {
            expect(overview.totalBudgetAuthority).toEqual(formatMoney(overview._totalBudgetAuthorityForBar));
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
        it('should format totalObligationsForBar', () => {
            expect(overview.totalObligations).toEqual(formatMoney(overview._totalObligationsForBar));
        });
        it('should format totalOutlays', () => {
            expect(overview.totalOutlays).toEqual(formatMoney(overview._totalOutlays));
        });
        it('should format totalOutlaysForBar', () => {
            expect(overview.totalOutlays).toEqual(formatMoney(overview._totalOutlaysForBar));
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
