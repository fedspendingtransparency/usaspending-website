/**
 * BulkDownloadPageContainer-test.jsx
 * Created by Lizzie Salita 11/6/17
 */

import React from 'react';
import { shallow } from 'enzyme';
import { Set } from 'immutable';

import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import { BulkDownloadPageContainer } from 'containers/bulkDownload/BulkDownloadPageContainer';
import { mockActions, mockProps } from './mockData';

// mock the bulkDownload helper
jest.mock('helpers/bulkDownloadHelper', () => require('./mockBulkDownloadHelper'));

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/bulkDownload/BulkDownloadPage', () => jest.fn(() => null));

describe('BulkDownloadPageContainer', () => {
    describe('startAwardDownload', () => {
        it('should make an API request when called', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...mockProps}
                {...mockActions} />);

            const requestDownload = jest.fn();
            container.instance().requestDownload = requestDownload;

            container.instance().startAwardDownload();

            expect(requestDownload).toHaveBeenCalled();
        });
        it('should parse the Redux state into request params', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...mockProps}
                {...mockActions} />);

            const expectedParams = {
                file_format: 'csv',
                filters: {
                    prime_award_types: ["02", "03", "04", "05", "07", "08"],
                    sub_award_types: ['procurement'],
                    agencies: [{
                        name: 'Mock Sub-Agency', type: 'funding', tier: 'subtier', toptier_name: 'Mock Agency'
                    }],
                    recipient_locations: [
                        {
                            country: 'USA',
                            state: 'HI'
                        }
                    ],
                    date_range: {
                        end_date: '11-01-2017',
                        start_date: '11-01-2016'
                    },
                    date_type: 'action_date',
                    sub_agency: 'Mock Sub-Agency',
                    def_codes: ["L", "M", "N", "O", "P"]
                }
            };

            const requestDownload = jest.fn();
            container.instance().requestDownload = requestDownload;

            container.instance().startAwardDownload();

            expect(requestDownload).toHaveBeenCalledWith(expectedParams, 'awards');
        });
        it('should include the recipient scope filter for foreign locations', () => {
            const awards = Object.assign({}, mockProps.bulkDownload.awards, {
                location: {
                    country: {
                        code: 'FOREIGN',
                        name: 'All Foreign Countries'
                    },
                    state: {
                        code: '',
                        name: ''
                    }
                }
            });
            const bulkDownload = Object.assign({}, mockProps.bulkDownload, {
                awards
            });
            const updatedRedux = Object.assign({}, mockProps, {
                bulkDownload
            });

            const container = shallow(<BulkDownloadPageContainer
                {...updatedRedux}
                {...mockActions} />);

            const expectedParams = {
                file_format: 'csv',
                filters: {
                    agencies: [{
                        name: 'Mock Sub-Agency', type: 'funding', tier: 'subtier', toptier_name: 'Mock Agency'
                    }],
                    prime_award_types: ["02", "03", "04", "05", "07", "08"],
                    sub_award_types: ['procurement'],
                    recipient_scope: 'foreign',
                    date_range: {
                        end_date: '11-01-2017',
                        start_date: '11-01-2016'
                    },
                    date_type: 'action_date',
                    sub_agency: 'Mock Sub-Agency',
                    def_codes: ["L", "M", "N", "O", "P"]
                }
            };

            const requestDownload = jest.fn();
            container.instance().requestDownload = requestDownload;

            container.instance().startAwardDownload();

            expect(requestDownload).toHaveBeenCalledWith(expectedParams, 'awards');
        });
        it('should not include the recipient location filter for all countries', () => {
            const awards = Object.assign({}, mockProps.bulkDownload.awards, {
                location: {
                    country: {
                        code: 'all',
                        name: 'All'
                    },
                    state: {
                        code: '',
                        name: ''
                    }
                }
            });
            const bulkDownload = Object.assign({}, mockProps.bulkDownload, {
                awards
            });
            const updatedRedux = Object.assign({}, mockProps, {
                bulkDownload
            });

            const container = shallow(<BulkDownloadPageContainer
                {...updatedRedux}
                {...mockActions} />);

            const expectedParams = {
                file_format: 'csv',
                filters: {
                    agencies: [{
                        name: 'Mock Sub-Agency', type: 'funding', tier: 'subtier', toptier_name: 'Mock Agency'
                    }],
                    prime_award_types: ["02", "03", "04", "05", "07", "08"],
                    sub_award_types: ['procurement'],
                    date_range: {
                        end_date: '11-01-2017',
                        start_date: '11-01-2016'
                    },
                    date_type: 'action_date',
                    sub_agency: 'Mock Sub-Agency',
                    def_codes: ["L", "M", "N", "O", "P"]
                }
            };

            const requestDownload = jest.fn();
            container.instance().requestDownload = requestDownload;

            container.instance().startAwardDownload();

            expect(requestDownload).toHaveBeenCalledWith(expectedParams, 'awards');
        });
        it('should not include the state filter for all states', () => {
            const awards = Object.assign({}, mockProps.bulkDownload.awards, {
                location: {
                    country: {
                        code: 'USA',
                        name: 'United States'
                    },
                    state: {
                        code: 'all',
                        name: 'All'
                    }
                }
            });
            const bulkDownload = Object.assign({}, mockProps.bulkDownload, {
                awards
            });
            const updatedRedux = Object.assign({}, mockProps, {
                bulkDownload
            });

            const container = shallow(<BulkDownloadPageContainer
                {...updatedRedux}
                {...mockActions} />);

            const expectedParams = {
                file_format: 'csv',
                filters: {
                    agencies: [{
                        name: 'Mock Sub-Agency', type: 'funding', tier: 'subtier', toptier_name: 'Mock Agency'
                    }],
                    prime_award_types: ["02", "03", "04", "05", "07", "08"],
                    sub_award_types: ['procurement'],
                    recipient_locations: [
                        {
                            country: 'USA'
                        }
                    ],
                    date_range: {
                        end_date: '11-01-2017',
                        start_date: '11-01-2016'
                    },
                    date_type: 'action_date',
                    sub_agency: 'Mock Sub-Agency',
                    def_codes: ["L", "M", "N", "O", "P"]
                }
            };

            const requestDownload = jest.fn();
            container.instance().requestDownload = requestDownload;

            container.instance().startAwardDownload();

            expect(requestDownload).toHaveBeenCalledWith(expectedParams, 'awards');
        });
        it('should use place of performance as for location filter', () => {
            const awards = Object.assign({}, mockProps.bulkDownload.awards, {
                locationType: 'place_of_performance'
            });
            const bulkDownload = Object.assign({}, mockProps.bulkDownload, {
                awards
            });
            const updatedRedux = Object.assign({}, mockProps, {
                bulkDownload
            });

            const container = shallow(<BulkDownloadPageContainer
                {...updatedRedux}
                {...mockActions} />);

            const expectedParams = {
                file_format: 'csv',
                filters: {
                    agencies: [{
                        name: 'Mock Sub-Agency', type: 'funding', tier: 'subtier', toptier_name: 'Mock Agency'
                    }],
                    prime_award_types: ["02", "03", "04", "05", "07", "08"],
                    sub_award_types: ['procurement'],
                    place_of_performance_locations: [
                        {
                            country: 'USA',
                            state: 'HI'
                        }
                    ],
                    date_range: {
                        end_date: '11-01-2017',
                        start_date: '11-01-2016'
                    },
                    date_type: 'action_date',
                    sub_agency: 'Mock Sub-Agency',
                    def_codes: ["L", "M", "N", "O", "P"]
                }
            };

            const requestDownload = jest.fn();
            container.instance().requestDownload = requestDownload;

            container.instance().startAwardDownload();

            expect(requestDownload).toHaveBeenCalledWith(expectedParams, 'awards');
        });
        it('should include the place of performance scope filter for foreign locations', () => {
            const awards = Object.assign({}, mockProps.bulkDownload.awards, {
                location: {
                    country: {
                        code: 'FOREIGN',
                        name: 'All Foreign Countries'
                    },
                    state: {
                        code: '',
                        name: ''
                    }
                },
                locationType: 'place_of_performance'
            });
            const bulkDownload = Object.assign({}, mockProps.bulkDownload, {
                awards
            });
            const updatedRedux = Object.assign({}, mockProps, {
                bulkDownload
            });

            const container = shallow(<BulkDownloadPageContainer
                {...updatedRedux}
                {...mockActions} />);

            const expectedParams = {
                file_format: 'csv',
                filters: {
                    agencies: [{
                        name: 'Mock Sub-Agency', type: 'funding', tier: 'subtier', toptier_name: 'Mock Agency'
                    }],
                    prime_award_types: ["02", "03", "04", "05", "07", "08"],
                    sub_award_types: ['procurement'],
                    place_of_performance_scope: 'foreign',
                    date_range: {
                        end_date: '11-01-2017',
                        start_date: '11-01-2016'
                    },
                    date_type: 'action_date',
                    sub_agency: 'Mock Sub-Agency',
                    def_codes: ["L", "M", "N", "O", "P"]
                }
            };

            const requestDownload = jest.fn();
            container.instance().requestDownload = requestDownload;

            container.instance().startAwardDownload();

            expect(requestDownload).toHaveBeenCalledWith(expectedParams, 'awards');
        });
        it('should not include empty array in request params', () => {
            const awards = Object.assign({}, mockProps.bulkDownload.awards, {
                awardTypes: {
                    primeAwards: new Set(['loans', 'contracts']),
                    subAwards: new Set([])
                }
            });
            const bulkDownload = Object.assign({}, mockProps.bulkDownload, {
                awards
            });
            const updatedRedux = Object.assign({}, mockProps, {
                bulkDownload
            });

            const container = shallow(<BulkDownloadPageContainer
                {...updatedRedux}
                {...mockActions} />);

            const expectedParams = {
                file_format: 'csv',
                filters: {
                    agencies: [{
                        name: 'Mock Sub-Agency', type: 'funding', tier: 'subtier', toptier_name: 'Mock Agency'
                    }],
                    prime_award_types: ['07', '08', 'A', 'B', 'C', 'D'],
                    recipient_locations: [
                        {
                            country: 'USA',
                            state: 'HI'
                        }
                    ],
                    date_range: {
                        end_date: '11-01-2017',
                        start_date: '11-01-2016'
                    },
                    date_type: 'action_date',
                    sub_agency: 'Mock Sub-Agency',
                    def_codes: ['L', 'M', 'N', 'O', 'P']
                }
            };

            const requestAwardsDownload = jest.fn(() => Object({promise: Promise.reject("Reject to limit test")}));
            const logAwardDownload = jest.fn();
            
            BulkDownloadHelper.requestAwardsDownload = requestAwardsDownload;
            container.instance().logAwardDownload = logAwardDownload;

            container.instance().startAwardDownload();

            expect(requestAwardsDownload).toHaveBeenCalledWith(expectedParams);
        });
    });
    describe('startAccountDownload', () => {
        const accountsRedux = Object.assign({}, mockProps, {
            dataType: 'accounts'
        });
        it('should make an API request when called', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...accountsRedux}
                {...mockActions} />);

            const requestDownload = jest.fn();
            container.instance().requestDownload = requestDownload;

            container.instance().startAccountDownload();

            expect(requestDownload).toHaveBeenCalled();
        });
        it('should parse the Redux state into request params', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...accountsRedux}
                {...mockActions} />);

            const expectedParams = {
                account_level: 'treasury_account',
                filters: {
                    budget_function: '300',
                    budget_subfunction: '123',
                    agency: '123',
                    federal_account: '212',
                    submission_types: ['account_balances'],
                    fy: '1989',
                    quarter: '1',
                    def_codes: ["L", "M", "N", "O", "P"]
                },
                file_format: 'csv'
            };

            const requestDownload = jest.fn();
            container.instance().requestDownload = requestDownload;

            container.instance().startAccountDownload();

            expect(requestDownload).toHaveBeenCalledWith(expectedParams, 'accounts');
        });

        it('should use the quarter property when the period key is null', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...{
                    ...accountsRedux,
                    bulkDownload: {
                        ...accountsRedux.bulkDownload,
                        accounts: {
                            ...accountsRedux.bulkDownload.accounts,
                            quarter: '4',
                            period: null
                        }
                    }
                }}
                {...mockActions} />);

            const expectedParams = {
                account_level: 'treasury_account',
                filters: {
                    budget_function: '300',
                    budget_subfunction: '123',
                    agency: '123',
                    federal_account: '212',
                    submission_types: ['account_balances'],
                    fy: '1989',
                    quarter: '4',
                    def_codes: ["L", "M", "N", "O", "P"]
                },
                file_format: 'csv'
            };

            const requestDownload = jest.fn();
            container.instance().requestDownload = requestDownload;

            container.instance().startAccountDownload();

            expect(requestDownload).toHaveBeenCalledWith(expectedParams, 'accounts');
        });
        it('should use the period property when the quarter key is null', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...{
                    ...accountsRedux,
                    bulkDownload: {
                        ...accountsRedux.bulkDownload,
                        accounts: {
                            ...accountsRedux.bulkDownload.accounts,
                            quarter: null,
                            period: '5'
                        }
                    }
                }}
                {...mockActions} />);

            const expectedParams = {
                account_level: 'treasury_account',
                filters: {
                    budget_function: '300',
                    budget_subfunction: '123',
                    agency: '123',
                    federal_account: '212',
                    submission_types: ['account_balances'],
                    fy: '1989',
                    period: '5',
                    def_codes: ["L", "M", "N", "O", "P"]
                },
                file_format: 'csv'
            };

            const requestDownload = jest.fn();
            container.instance().requestDownload = requestDownload;

            container.instance().startAccountDownload();

            expect(requestDownload).toHaveBeenCalledWith(expectedParams, 'accounts');
        });
        it('should not include empty array in request params', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...{
                    ...accountsRedux,
                    bulkDownload: {
                        ...accountsRedux.bulkDownload,
                        accounts: {
                            ...accountsRedux.bulkDownload.accounts,
                            defCodes: []
                        }
                    }
                }}
                {...mockActions} />);

            const expectedParams = {
                account_level: 'treasury_account',
                filters: {
                    budget_function: '300',
                    budget_subfunction: '123',
                    agency: '123',
                    federal_account: '212',
                    submission_types: ['account_balances'],
                    fy: '1989',
                    quarter: '1'
                },
                file_format: 'csv'
            };

            const requestAccountsDownload = jest.fn(() => Object({promise: Promise.reject("Reject to limit test")}));
            const logAccountDownload = jest.fn();
            
            BulkDownloadHelper.requestAccountsDownload = requestAccountsDownload;
            container.instance().logAccountDownload = logAccountDownload;

            container.instance().startAccountDownload();

            expect(requestAccountsDownload).toHaveBeenCalledWith(expectedParams);
        });
    });
    describe('validateDataType', () => {
        it('should default to custom award data if no type is provided', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...mockProps}
                {...mockActions} />);

            container.instance().validateDataType('');

            expect(mockProps.history.replace).toHaveBeenLastCalledWith('/download_center/custom_award_data');
        });
        it('should update the Redux state for a valid data type', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...mockProps}
                {...mockActions} />);

            container.instance().validateDataType('award_data_archive');

            expect(mockActions.setDataType).toHaveBeenCalledWith('award_data_archive');
        });
        it('should go to the error page for an invalid data type', () => {
            const container = shallow(<BulkDownloadPageContainer
                {...mockProps}
                {...mockActions} />);

            container.instance().validateDataType('test');

            expect(mockProps.history.replace).toHaveBeenLastCalledWith('/error');
        });
    });
});
