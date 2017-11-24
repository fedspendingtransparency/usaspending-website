/**
 * RecipientTypeContainer-test.jsx
 * Created by Kevin Li 11/21/17
 */
import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Set } from 'immutable';

import { recipientTypeGroups } from 'dataMapping/search/recipientType';

import { RecipientTypeContainer } from 'containers/search/filters/recipient/RecipientTypeContainer';
import { mockTypeRedux } from './mockRecipients';

jest.mock('helpers/searchHelper', () => require('../searchHelper'));
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/search/filters/recipient/RecipientType', () =>
    jest.fn(() => null));

describe('RecipientTypeContainer', () => {
    describe('ungroupSelectedTypes', () => {
        it('should split filter values associated with parent recipient type items into their child values', () => {
            const container = shallow(<RecipientTypeContainer {...mockTypeRedux} />);
            container.instance().ungroupSelectedTypes(new Set(['business']));

            expect(container.state().selectedTypes).toEqual(new Set(recipientTypeGroups.business));
        });

        it('should pass the filter values into state as-is when the filter value is not a parent recipient type', () => {
            const container = shallow(<RecipientTypeContainer {...mockTypeRedux} />);
            container.instance().ungroupSelectedTypes(new Set(['pizza']));

            expect(container.state().selectedTypes).toEqual(new Set(['pizza']));
        });
    });

    describe('determineParentType', () => {
        it('should return the parent value when the input matches any recipient type group value', () => {
            const container = shallow(<RecipientTypeContainer {...mockTypeRedux} />);
            const parentType = container.instance().determineParentType(recipientTypeGroups.business);

            expect(parentType).toEqual('business');
        });
        it('should return the null when the input is not a member of any recipient type group', () => {
            const container = shallow(<RecipientTypeContainer {...mockTypeRedux} />);
            const parentType = container.instance().determineParentType(['xyz']);

            expect(parentType).toEqual(null);
        });
    });

    describe('toggleRecipientType', () => {
        it('should just pass the argument on Redux', () => {
            const mockRedux = Object.assign({}, mockTypeRedux, {
                toggleRecipientType: jest.fn()
            });
            const container = shallow(<RecipientTypeContainer {...mockRedux} />);

            container.instance().toggleRecipientType('abc');

            expect(mockRedux.toggleRecipientType).toHaveBeenCalledTimes(1);
            expect(mockRedux.toggleRecipientType).toHaveBeenCalledWith('abc');
        });
    });

    describe('bulkRecipientTypeChange', () => {
        it('should return call Redux with a bulk change event equal to just the parent type group', () => {
            const mockRedux = Object.assign({}, mockTypeRedux, {
                bulkRecipientTypeChange: jest.fn()
            });
            const container = shallow(<RecipientTypeContainer {...mockRedux} />);

            container.instance().bulkRecipientTypeChange({
                types: recipientTypeGroups.business,
                direction: 'add'
            });

            expect(mockRedux.bulkRecipientTypeChange).toHaveBeenCalledTimes(1);
            expect(mockRedux.bulkRecipientTypeChange).toHaveBeenCalledWith({
                types: ['business'],
                direction: 'add'
            });
        });
    });
});
