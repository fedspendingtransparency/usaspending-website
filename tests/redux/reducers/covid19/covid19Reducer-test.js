/**
 * covid19Reducer-test.js
 * Created by Jonathan Hill 06/11/20
 */

import covid19Reducer from 'redux/reducers/covid19/covid19Reducer';
import { setDEFCodes, setOverview, setLatestSubmissionDate, setTotals } from 'redux/actions/covid19/covid19Actions';
import { defCodes, overview } from './mockData';

describe('Covid 19 Reducer', () => {
    it('should SET_DEF_CODES', () => {
        let state = covid19Reducer(undefined, {});
        state = covid19Reducer(state, setDEFCodes(defCodes));
        expect(state.defCodes).toEqual(defCodes);
    });
    it('should SET_COVID_OVERVIEW', () => {
        let state = covid19Reducer(undefined, {});
        state = covid19Reducer(state, setOverview(overview));
        expect(state.overview).toEqual(overview);
    });
    it('should SET_LATEST_SUBMISSION_DATE', () => {
        let state = covid19Reducer(undefined, {});
        state = covid19Reducer(state, setLatestSubmissionDate('June 01, 1999'));
        expect(state.latestSubmissionDate).toEqual('June 01, 1999');
    });
    it('should SET_COVID_AWARD_AMOUNTS', () => {
        let state = covid19Reducer(undefined, {});
        state = covid19Reducer(state, setTotals('', {
            awardCount: 26742,
            obligation: 13458852480.17,
            outlay: 367346004.33
        }));
        expect(state.allAwardTypeTotals).toEqual({
            awardCount: 26742, obligation: 13458852480.17, outlay: 367346004.33
        });
    });
    it('should SET_COVID_AWARD_AMOUNTS_ASSISTANCE', () => {
        let state = covid19Reducer(undefined, {});
        state = covid19Reducer(state, setTotals('ASSISTANCE', {
            awardCount: 526742,
            faceValueOfLoan: undefined,
            obligation: 213458852480.17,
            outlay: 8367346004.33
        }));
        expect(state.assistanceTotals).toEqual({
            awardCount: 526742, faceValueOfLoan: undefined, obligation: 213458852480.17, outlay: 8367346004.33
        });
    });
    it('should SET_COVID_AWARD_AMOUNTS_SPENDING_BY_AGENCY', () => {
        let state = covid19Reducer(undefined, {});
        state = covid19Reducer(state, setTotals('SPENDING_BY_AGENCY', {
            awardCount: 526742,
            faceValueOfLoan: undefined,
            obligation: 213458852480.17,
            outlay: 8367346004.33
        }));
        expect(state.spendingByAgencyTotals).toEqual({
            awardCount: 526742, faceValueOfLoan: undefined, obligation: 213458852480.17, outlay: 8367346004.33
        });
    });
    it('should SET_COVID_AWARD_AMOUNTS_RECIPIENT', () => {
        let state = covid19Reducer(undefined, {});
        state = covid19Reducer(state, setTotals('RECIPIENT', {
            awardCount: 526742,
            faceValueOfLoan: undefined,
            obligation: 213458852480.17,
            outlay: 8367346004.33
        }));
        expect(state.recipientTotals).toEqual({
            awardCount: 526742, faceValueOfLoan: undefined, obligation: 213458852480.17, outlay: 8367346004.33
        });
    });
});
