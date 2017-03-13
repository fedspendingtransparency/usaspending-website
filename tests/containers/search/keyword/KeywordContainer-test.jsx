/**
 * KeywordContainer-test.jsx
 * Created by Emily Gullo 03/13/2017
 */

import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import { KeywordContainer } from 'containers/search/filters/KeywordContainer';

const initialFilters = {
    keyword: ''
};

describe('KeywordContainer', () => {
    describe('submitText', () => {
        it('should submit given keyword text to redux state', () => {
            const mockReduxActionKeyword = jest.fn((args) => {
                expect(args).toEqual('Education');
            });
            const keywordContainer = shallow(
                <KeywordContainer
                    keyword={initialFilters}
                    updateTextSearchInput={mockReduxActionKeyword} />);

            const submitTextSpy = sinon.spy(keywordContainer.instance(),
                'submitText');

            // Add Agency to redux
            keywordContainer.instance().submitText('Education');

            // everything should be updated now
            expect(submitTextSpy.callCount).toEqual(1);
            expect(mockReduxActionKeyword).toHaveBeenCalled();

            // reset the spies
            submitTextSpy.reset();
        });
        it('should overwrite a previous keyword with a new keyword', () => {
            const existingFilters = {
                keyword: 'Education'
            };
            const mockReduxActionKeyword = jest.fn((args) => {
                expect(args).toEqual('Financial');
            });
            const keywordContainer = shallow(
                <KeywordContainer
                    keyword={existingFilters}
                    updateTextSearchInput={mockReduxActionKeyword} />);

            const submitTextSpy = sinon.spy(keywordContainer.instance(),
                'submitText');

            // Add Agency to redux
            keywordContainer.instance().submitText('Financial');

            // everything should be updated now
            expect(submitTextSpy.callCount).toEqual(1);
            expect(mockReduxActionKeyword).toHaveBeenCalled();

            // reset the spies
            submitTextSpy.reset();
        });
    });
});
