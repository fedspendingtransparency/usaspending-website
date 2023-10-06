/**
 * @jest-environment jsdom
 * 
 * Covid19Container-test.jsx
 * Created by Lizzie Salita 4/27/21
 */

import { expect } from '@jest/globals';
import * as apis from 'apis/disaster';
import * as actions from 'redux/actions/covid19/covid19Actions';
import React from 'react';
import { render } from "../../testResources/test-utils";
import { useQueryParams } from "../../../src/js/helpers/queryParams";
import { mockDefCodes } from '../../mockData/helpers/disasterHelper';
import Covid19Container from '../../../src/js/containers/covid19/Covid19Container';

// Mock the child component so we can isolate functionality of the container
jest.mock('components/covid19/Covid19Page', () =>
    jest.fn(() => null));

// Mock the custom hook useQueryParams
jest.mock('helpers/queryParams', () => ({
    useQueryParams: jest.fn()
}));

// Mock history.replace()
const mockHistoryReplace = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        replace: mockHistoryReplace
    })
}));

describe('COVID-19 Container', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it(`should fetch overview and totals given we have def code data`, () => {
        useQueryParams.mockImplementation(() => ({ publicLaw: 'all' }));
        const spy = jest.spyOn(apis, 'fetchOverview');
        const spy2 = jest.spyOn(apis, 'fetchAwardAmounts');
        render(<Covid19Container />, { initialState: { covid19: { defCodes: mockDefCodes.data.codes } } });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
    });

    it('should not fetch overview and totals given we do not have defcode data', () => {
        useQueryParams.mockImplementation(() => ({ publicLaw: 'all' }));
        const spy = jest.spyOn(apis, 'fetchOverview');
        const spy2 = jest.spyOn(apis, 'fetchAwardAmounts');
        render(<Covid19Container />);
        expect(spy).toHaveBeenCalledTimes(0);
        expect(spy2).toHaveBeenCalledTimes(0);
    });

    describe('when a valid public law query param is provided', () => {
        it('does not redirect all DEFC', () => {
            useQueryParams.mockImplementation(() => ({ publicLaw: 'all' }));
            render(<Covid19Container />);
            expect(mockHistoryReplace).not.toHaveBeenCalled();
        });
        it('does not redirect American Rescue Plan', () => {
            useQueryParams.mockImplementation(() => ({ publicLaw: 'american-rescue-plan' }));
            render(<Covid19Container />);
            expect(mockHistoryReplace).not.toHaveBeenCalled();
        });
        it('is not case sensitive', () => {
            useQueryParams.mockImplementation(() => ({ publicLaw: 'AMERican-reSCue-pLAN' }));
            render(<Covid19Container />);
            expect(mockHistoryReplace).not.toHaveBeenCalled();
        });
        it('sets the correct DEFC params in redux for all', () => {
            const spy = jest.spyOn(actions, 'setDefcParams');
            useQueryParams.mockImplementation(() => ({ publicLaw: 'all' }));
            const covidDEFC = mockDefCodes.data.codes.filter((c) => c.disaster === 'covid_19');
            render(<Covid19Container />, { initialState: { covid19: { defCodes: covidDEFC } } });
            expect(spy).toHaveBeenCalledWith(['L', 'M']);
        });
    });
});
