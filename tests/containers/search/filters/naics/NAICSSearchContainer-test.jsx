/**
 * NAICSSearchContainer-test.jsx
 * Created by Emily Gullo 07/26/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { NAICSSearchContainer } from 'containers/search/filters/naics/NAICSSearchContainer';

const initialFilters = {
    selectedNAICS: {}
};

const naics = {
    naics: "561110",
    naics_description: "OFFICE ADMINISTRATIVE SERVICES"
};

describe('naicsSearchContainer', () => {
    describe('Handling adding and removing NAICSs', () => {
        it('should add a NAICS that has been selected to Redux', () => {
            const mockReduxActionNAICS = jest.fn((args) => {
                expect(args).toEqual({
                    naics: {
                        naics: "561110",
                        naics_description: "OFFICE ADMINISTRATIVE SERVICES"
                    }
                });
            });

            // Set up container with mocked naics action
            const naicsContainer = shallow(
                <NAICSSearchContainer
                    reduxFilters={initialFilters}
                    updateSelectedNAICS={mockReduxActionNAICS} />);

            const selectNAICSSpy = sinon.spy(naicsContainer.instance(),
                'selectNAICS');

            // Add NAICS to redux
            naicsContainer.instance().selectNAICS(naics, true);

            // everything should be updated now
            expect(selectNAICSSpy.callCount).toEqual(1);
            expect(mockReduxActionNAICS).toHaveBeenCalled();

            // reset the spies
            selectNAICSSpy.reset();
        });

        it('should remove a NAICS that has been deselected from Redux', () => {
            const mockReduxActionNAICS = jest.fn((args) => {
                expect(args).toEqual({
                    naics: {
                        naics: "561110",
                        naics_description: "OFFICE ADMINISTRATIVE SERVICES"
                    }
                });
            });

            // Set up container with mocked naics action
            const naicsContainer = shallow(
                <NAICSSearchContainer
                    reduxFilters={initialFilters}
                    updateSelectedNAICS={mockReduxActionNAICS} />);

            const selectNAICSSpy = sinon.spy(naicsContainer.instance(),
                'selectNAICS');

            const removeNAICSSpy = sinon.spy(naicsContainer.instance(),
                'removeNAICS');

            // Add NAICS to redux
            naicsContainer.instance().selectNAICS(naics, true);

            // Remove NAICS from Redux
            naicsContainer.instance().removeNAICS(naics);

            // everything should be updated now
            expect(selectNAICSSpy.callCount).toEqual(1);
            expect(removeNAICSSpy.callCount).toEqual(1);
            expect(mockReduxActionNAICS).toHaveBeenCalledTimes(2);

            // reset the spy
            selectNAICSSpy.reset();
            removeNAICSSpy.reset();
        });
    });
});
