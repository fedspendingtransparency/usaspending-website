/**
 * Covid19Container-test.jsx
 * Created by Lizzie Salita 4/27/21
 */

import React from 'react';
import { render } from 'test-utils';
import '@testing-library/jest-dom/extend-expect';
import * as apis from 'apis/disaster';
import Covid19Container from 'containers/covid19/Covid19Container';
import { mockDefCodes } from '../../mockData/helpers/disasterHelper';
import { defaultState } from '../../testResources/defaultReduxFilters';

// Mock the child component so we can isolate functionality of the container
jest.mock('components/covid19/Covid19Page', () =>
    jest.fn(() => null));


describe('COVID-19 Container', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should fetch overview and totals given we have def code data', () => {
        const spy = jest.spyOn(apis, 'fetchOverview');
        const spy2 = jest.spyOn(apis, 'fetchAwardAmounts');
        render(
            (
                <Covid19Container />
            ), { initialState: { ...defaultState, covid19: { defCodes: mockDefCodes.data.codes } } }
        );
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy2).toHaveBeenCalledTimes(1);
    });

    it('should not fetch overview and totals given we do not have defcode data', () => {
        const spy = jest.spyOn(apis, 'fetchOverview');
        const spy2 = jest.spyOn(apis, 'fetchAwardAmounts');
        render((
            <Covid19Container />
        ));
        expect(spy).toHaveBeenCalledTimes(0);
        expect(spy2).toHaveBeenCalledTimes(0);
    });
});
