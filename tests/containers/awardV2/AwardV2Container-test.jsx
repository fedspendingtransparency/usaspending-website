/**
 * AwardV2Container-test.js
 * Created by David Trinh 10/6/2018
 * */

import React from 'react';
import { shallow } from 'enzyme';

import { AwardContainer } from 'containers/awardV2/AwardV2Container';
import BaseContract from 'models/v2/awardsV2/BaseContract';
import BaseIdv from 'models/v2/awardsV2/BaseIdv';
import BaseFinancialAssistance from "models/v2/awardsV2/BaseFinancialAssistance";

import { mockParams, mockActions } from './mockAward';
import { mockContract, mockLoan, mockIdv } from '../../models/awardsV2/mockAwardApi';

jest.mock('helpers/searchHelper', () => require('./awardV2Helper'));
jest.mock("helpers/downloadHelper", () => require("./awardV2Helper"));

// mock the child components by replacing them with functions that return null elements
jest.mock('components/awardv2/AwardV2', () => jest.fn(() => null));
jest.mock('containers/award/AwardContainer', () => jest.fn(() => null));

const getAwardContainer = (params = mockParams) => shallow(<AwardContainer
    {...params}
    {...mockActions} />);

describe('AwardV2Container', () => {
    it('should make an API call for the selected award on mount', async () => {
        const container = getAwardContainer();

        const parseAward = jest.fn();
        container.instance().parseAward = parseAward;
        container.instance().componentDidMount();
        await container.instance().awardRequest.promise;

        expect(parseAward).toHaveBeenCalled();
    });

    it('should make an API call when the award ID parameter changes', () => {
        const container = getAwardContainer();

        const getSelectedAward = jest.fn();
        container.instance().getSelectedAward = getSelectedAward;

        container.instance().componentDidMount();
        expect(getSelectedAward).toHaveBeenCalledTimes(1);
        expect(getSelectedAward).toHaveBeenCalledWith('1234');

        const prevProps = Object.assign({}, mockParams, {
            params: {
                awardId: '222'
            }
        });

        container.instance().componentDidUpdate(prevProps);

        expect(getSelectedAward).toHaveBeenCalledTimes(2);
        expect(getSelectedAward).toHaveBeenLastCalledWith('1234');
    });

    describe('parseAward', () => {
        it('should parse returned contract data and send to the Redux store', () => {
            const awardContainer = getAwardContainer();

            const expectedAward = Object.create(BaseContract);
            expectedAward.populate(mockContract);

            awardContainer.instance().parseAward(mockContract);

            expect(mockActions.setAward).toHaveBeenCalledWith(expectedAward);
        });
        it('should parse returned IDV data and send to the Redux store', () => {
            const awardContainer = getAwardContainer();

            const expectedAward = Object.create(BaseIdv);
            expectedAward.populate(mockIdv);

            awardContainer.instance().parseAward(mockIdv);

            expect(mockActions.setAward).toHaveBeenCalledWith(expectedAward);
        });
        it('should parse returned financial assistance data and send to the Redux store', () => {
            const awardContainer = getAwardContainer();

            const expectedAward = Object.create(BaseFinancialAssistance);
            expectedAward.populate(mockLoan);

            awardContainer.instance().parseAward(mockLoan);

            expect(mockActions.setAward).toHaveBeenCalledWith(expectedAward);
        });
    });

    describe('downloadData', () => {
        const awardContainer = getAwardContainer();
        const downloadRequest = {
            promise: jest.fn(() => Promise.resolve({ results: { url: 'test', file_name: 'test.csv' } })),
            cancel: jest.fn()
        };

        it("calls action-creator fns in props", async () => {
            await awardContainer.instance().downloadData();
            expect(mockActions.setDownloadCollapsed).toHaveBeenCalled();
            expect(mockActions.setDownloadExpectedUrl).toHaveBeenCalled();
            expect(mockActions.setDownloadExpectedFile).toHaveBeenCalled();
            expect(mockActions.setDownloadPending).toHaveBeenCalled();
        });

        it("cancels the call if it's already pending", async () => {
            awardContainer.instance().downloadRequest = downloadRequest;
            await awardContainer.instance().downloadData();
            expect(downloadRequest.cancel).toHaveBeenCalled();
        });
    });

    describe('fetchAwardDownloadFile', () => {
        it('returns the contract helper for contract awards', async () => {
            const awardContainer = getAwardContainer();
            let result = await awardContainer.instance().fetchAwardDownloadFile();
            result = await result.promise;
            expect(result.data.file_name).toEqual('contract.zip');
        });

        it('returns the idv helper for idv awards', async () => {
            const awardContainer = getAwardContainer({ ...mockParams, award: { ...mockParams.award, category: "idv" } });
            const result = await awardContainer.instance().fetchAwardDownloadFile().promise;
            expect(result.data.file_name).toEqual('idv.zip');
        });

        it('returns the assistance helper for assistance awards', async () => {
            const awardContainer = getAwardContainer({ ...mockParams, award: { ...mockParams.award, category: "grant" } });
            const result = await awardContainer.instance().fetchAwardDownloadFile().promise;
            expect(result.data.file_name).toEqual('assistance.zip');
        });
    });
});
