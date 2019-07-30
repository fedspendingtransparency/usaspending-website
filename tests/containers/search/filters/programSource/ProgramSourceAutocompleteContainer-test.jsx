/**
 * ProgramSourceAutocompleteContainer-test.jsx
 * Created by Lizzie Salita 7/23/19
 */

import React from 'react';
import { shallow } from 'enzyme';

import ProgramSourceAutocompleteContainer from 'containers/search/filters/programSource/ProgramSourceAutocompleteContainer';
import { aidResults, mainResults } from './mockData';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/sharedComponents/autocomplete/Autocomplete', () =>
    jest.fn(() => null));

jest.mock('helpers/programSourceHelper', () => require('./programSourceHelper'));

const setup = (props) => shallow(<ProgramSourceAutocompleteContainer {...props} />);

const initialFilters = {
    component: {
        code: 'aid',
        label: 'Agency Identifier',
        required: true,
        characterLimit: 3
    },
    selectedSources: {},
    updateComponent: jest.fn(),
    dirtyFilters: Symbol('a')
};

describe('ProgramSourceAutocompleteContainer', () => {
    describe('fetchAutocompleteResults', () => {
        it('should call the fetchAIDs helper when component.code is aid', async () => {
            const container = setup(initialFilters);
            const parseResults = jest.fn();
            container.instance().parseResults = parseResults;

            container.instance().fetchAutocompleteResults('2');

            await container.instance().autocompleteRequest.promise;
            expect(parseResults).toHaveBeenCalledWith(aidResults);
        });
        it('should call the fetchMAINs helper when component.code is main', async () => {
            const updatedComponent = Object.assign({}, initialFilters.component, {
                code: 'main'
            });
            const updatedFilters = Object.assign({}, initialFilters, {
                component: updatedComponent
            });

            const container = setup(updatedFilters);
            const parseResults = jest.fn();
            container.instance().parseResults = parseResults;

            container.instance().fetchAutocompleteResults('3');

            await container.instance().autocompleteRequest.promise;
            expect(parseResults).toHaveBeenCalledWith(mainResults);
        });
    });

    describe('parseResults', () => {
        it('should format agency results into objects that can used by the Autocomplete component', () => {
            const container = setup(initialFilters);

            container.instance().parseResults(aidResults);
            const expectedState = [
                {
                    data: { code: '020' },
                    subtitle: 'Department of the Treasury (TREAS)',
                    title: '020'
                },
                {
                    data: { code: '021' },
                    subtitle: 'Department of the Army',
                    title: '021'
                },
                {
                    data: { code: '023' },
                    subtitle: 'U.S. Tax Court (USTAXCOURT)',
                    title: '023'
                }
            ];
            expect(container.state().autocompleteOptions).toEqual(expectedState);
        });
        it('should format string results into objects that can used by the Autocomplete component', () => {
            const updatedComponent = Object.assign({}, initialFilters.component, {
                code: 'main'
            });
            const updatedFilters = Object.assign({}, initialFilters, {
                component: updatedComponent
            });

            const container = setup(updatedFilters);

            container.instance().parseResults(mainResults);
            const expectedState = [
                {
                    data: { code: '3010' },
                    subtitle: '',
                    title: '3010'
                },
                {
                    data: { code: '3011' },
                    subtitle: '',
                    title: '3011'
                },
                {
                    data: { code: '3020' },
                    subtitle: '',
                    title: '3020'
                }
            ];
            expect(container.state().autocompleteOptions).toEqual(expectedState);
        });
        it('should correctly set the noResults state', () => {
            const container = setup(initialFilters);

            container.instance().parseResults([]);
            expect(container.state().noResults).toEqual(true);
        });
    });
});
