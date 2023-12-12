/**
 * @jest-environment jsdom
 *
 * AccountDataContainer-test.jsx
 * Created by Josue Aguilar 10/20/2023
 */

import React from 'react';
import { mockProps } from "../mockData";
import { render, waitFor } from '../../../testResources/test-utils';
import * as BulkDownloadHelper from '../../../../src/js/helpers/bulkDownloadHelper';
import { AccountDataContainer } from "../../../../src/js/containers/bulkDownload/accounts/AccountDataContainer";
import AccountDataContent from "../../../../src/js/components/bulkDownload/accounts/AccountDataContent";
import { mockApiCall } from "../../../testResources/mockApiHelper";

const mockBulkDownload = mockProps.bulkDownload;
mockApiCall(BulkDownloadHelper, 'requestAgenciesList', { response: "42" });

jest.mock('../../../../src/js/components/bulkDownload/accounts/AccountDataContent', () => jest.fn(() => null));
jest.mock('../../../../src/js/helpers/bulkDownloadHelper');

beforeEach(() => {
    jest.clearAllMocks();
});

const mockADCContainerProps = {
    updateDownloadFilter: jest.fn(),
    clearDownloadFilters: jest.fn(),
    bulkDownload: mockBulkDownload,
    clickedDownload: jest.fn(),
    setDefCodes: jest.fn()
};

describe('AccountDataContainer tests', () => {
    it('populates the agency list', () => {
        const mockAgencyResponse = {
            promise: new Promise((resolve) => {
                process.nextTick(() => (
                    resolve({
                        data: {
                            agencies: {
                                cfo_agencies: 'stuff',
                                other_agencies: 'other stuff'
                            }
                        }
                    })
                ));
            })
        };

        const mockBudgetResponse = {
            promise: new Promise((resolve) => {
                process.nextTick(() => {
                    resolve({
                        data: {
                            results: [
                                {
                                    budget_function_code: '300',
                                    budget_function_title: 'Mock Budget Function'
                                }
                            ]
                        }
                    });
                });
            })
        };

        const spyAgency = jest.spyOn(BulkDownloadHelper, 'requestAgenciesList')
            .mockReturnValueOnce(mockAgencyResponse);
        const spyBudget = jest.spyOn(BulkDownloadHelper, 'requestBudgetFunctionList').mockReturnValueOnce(mockBudgetResponse);

        render(<AccountDataContainer {...mockADCContainerProps} />);


        return waitFor(() => {
            expect(spyAgency).toHaveBeenCalledTimes(1);
            expect(spyBudget).toHaveBeenCalledTimes(1);
            expect(AccountDataContent).toBeCalledTimes(2);
            // this api call happens three times, with the successful call only being on the third and final call
            expect(AccountDataContent).toMatchSnapshot();
        });
    });
});
