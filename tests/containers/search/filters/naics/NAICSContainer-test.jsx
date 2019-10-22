/**
 * NAICSSearchContainer-test.jsx => NAICSContainer-test.jsx
 * Created by Emily Gullo 07/26/2017
 */

import React from 'react';
import { shallow } from 'enzyme';import { NAICSContainer } from 'containers/search/filters/naics/NAICSContainer';
import { naicsMock2 } from './mockNAICS';
// import sinon from 'sinon';
// import { OrderedMap, Iterable } from 'immutable';

jest.mock('helpers/naicsHelper', () => require('./mockNAICSHelper'));

// const initialFilters = {
//     selectedNAICS: new OrderedMap(),
//     appliedNAICS: new OrderedMap()
// };

// const naics = {
//     naics: "561110",
//     naics_description: "OFFICE ADMINISTRATIVE SERVICES"
// };

describe('NAICS Search Filter Container', () => {
    const fetchNAICS = jest.fn();
    it('should call fetch naics on mount', async () => {
        const container = shallow(<NAICSContainer />);
        container.instance().fetchNAICS = fetchNAICS;
        await container.instance().componentDidMount();
        expect(fetchNAICS).toHaveBeenCalled();
    });
    describe('FecthNaics', () => {
        it('should set property nodes in state to API response', async () => {
            const container = shallow(<NAICSContainer />);
            await container.instance().fetchNAICS();
            const {
                naics,
                isLoading,
                isError,
                errorMessage
            } = container.instance().state;
            expect(naics).toEqual(naicsMock2);
            expect(isLoading).toEqual(false);
            expect(isError).toEqual(false);
            expect(errorMessage).toEqual('');
        });
        it('should set properties isError and errorMessage from API response', async () => {
            const container = shallow(<NAICSContainer />);
            await container.instance().fetchNAICS(true);
            const {
                naics,
                isLoading,
                isError,
                errorMessage
            } = container.instance().state;
            expect(naics).toEqual([]);
            expect(isLoading).toEqual(false);
            expect(isError).toEqual(true);
            expect(errorMessage).toEqual('Bad');
        });
    });
});
