/**
 * AwardContainer-test.js
 * Created by Emily Gullo 03/03/2017
 **/

import React from 'react';
import { mount, shallow } from 'enzyme';

import { AwardContainer } from 'containers/award/AwardContainer';

import { mockParams, mockActions, mockApi, mockFinancialAssistanceApi } from './mockResults';

import BaseContract from 'models/v2/awards/BaseContract';
import BaseFinancialAssistance from "models/v2/awards/BaseFinancialAssistance";

jest.mock('helpers/searchHelper', () => require('./awardHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/award/Award', () => jest.fn(() => null));

describe('AwardContainer', () => {
    it('should make an API call for the selected award on mount', async () => {

        const container = mount(<AwardContainer
            {...mockParams}
            {...mockActions} />);

        const parseAward = jest.fn();
        container.instance().parseAward = parseAward;
        await container.instance().awardRequest.promise;

        expect(parseAward).toHaveBeenCalled();
    });

    it('should make an API call when the award ID parameter changes', () => {
        const container = shallow(<AwardContainer
            {...mockParams}
            {...mockActions} />);

        const getSelectedAward = jest.fn();
        container.instance().getSelectedAward = getSelectedAward;

        container.instance().componentDidMount();
        expect(getSelectedAward).toHaveBeenCalledTimes(1);
        expect(getSelectedAward).toHaveBeenCalledWith(1234);

        const prevProps = Object.assign({}, mockParams, {
            awardId: '222'
        });

        container.instance().componentDidUpdate(prevProps);

        expect(getSelectedAward).toHaveBeenCalledTimes(2);
        expect(getSelectedAward).toHaveBeenLastCalledWith(1234);
    });

    describe('parseAward', () => {
        it('should parse returned contract data and send to the Redux store', () => {
            const awardContainer = shallow(<AwardContainer
                {...mockParams}
                {...mockActions} />);

            const expectedAward = Object.create(BaseContract);
            expectedAward.populate(mockApi);

            awardContainer.instance().parseAward(mockApi);

            expect(mockActions.setSelectedAward).toHaveBeenCalledWith(expectedAward);
        });
        it('should parse returned financial assistance data and send to the Redux store', () => {
            const awardContainer = shallow(<AwardContainer
                {...mockParams}
                {...mockActions} />);

            const expectedAward = Object.create(BaseFinancialAssistance);
            expectedAward.populate(mockFinancialAssistanceApi);

            awardContainer.instance().parseAward(mockFinancialAssistanceApi);

            expect(mockActions.setSelectedAward).toHaveBeenCalledWith(expectedAward);
        });
        it('should parse returned IDV data and send to the Redux store', () => {
            const awardContainer = shallow(<AwardContainer
                {...mockParams}
                {...mockActions} />);

            const mockIDV = Object.assign({}, mockApi, {
                category: 'idv'
            });

            const expectedAward = Object.create(BaseContract);
            expectedAward.populate(mockIDV);

            awardContainer.instance().parseAward(mockIDV);

            expect(mockActions.setSelectedAward).toHaveBeenCalledWith(expectedAward);
        });
    });
});
