/**
 * covid19Reducer-test.js
 * Created by Jonathan Hill 06/11/20
 */

import covid19Reducer from 'redux/reducers/covid19/covid19Reducer';
import setCodes from 'redux/actions/covid19/covid19Actions';
import mockCodes from './mockData';

describe('Covid 19 Reducer', () => {
    it('should SET_CODES', () => {
        let state = covid19Reducer(undefined, {});
        state = covid19Reducer(state, setCodes(mockCodes));
        expect(state.codes).toEqual(mockCodes);
    });
});
