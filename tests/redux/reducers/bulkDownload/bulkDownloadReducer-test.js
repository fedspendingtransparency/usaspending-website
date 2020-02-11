import bulkDownloadReducer, { initialState } from 'redux/reducers/bulkDownload/bulkDownloadReducer';

describe('bulkDownloadReducer', () => {
    describe('SET_DATA_TYPE', () => {
        it('should update the data type to the given value', () => {
            const action = {
                type: 'SET_DATA_TYPE',
                dataType: 'mockDataType'
            };
            const state = bulkDownloadReducer(undefined, action);
            expect(state.dataType).toEqual('mockDataType');
        });
    });

    describe('UPDATE_DOWNLOAD_FILTER', () => {
        it('should update the specified filter for the given data type', () => {
            const action = {
                type: 'UPDATE_DOWNLOAD_FILTER',
                dataType: 'awards',
                name: 'fileFormat',
                value: 'mockFormat'
            };

            const state = bulkDownloadReducer(undefined, action);
            expect(state.awards.fileFormat).toEqual('mockFormat');
        });
        it('should update the submissionTypes array', () => {
            const action = {
                type: 'UPDATE_DOWNLOAD_FILTER',
                dataType: 'accounts',
                name: 'submissionTypes',
                value: 'accountBreakdown'
            };

            let state = bulkDownloadReducer(initialState, action);
            // inserting new...
            expect(state.accounts.submissionTypes).toEqual(['accountBalances', 'accountBreakdown']);
            // toggle when value is already present in the array
            state = bulkDownloadReducer(initialState, { ...action, value: 'accountBalances'});
            expect(state.accounts.submissionTypes).toEqual([]);
        });
    });

    describe('UPDATE_CHECKBOX', () => {
        it('should update the specified checkbox value', () => {
            const action = {
                type: 'UPDATE_CHECKBOX',
                filter: 'awardLevels',
                name: 'primeAwards',
                value: true,
                dataType: 'awards'
            };

            const state = bulkDownloadReducer(undefined, action);
            expect(state.awards.awardLevels.primeAwards).toEqual(true);
        });
    });

    describe('UPDATE_AWARD_DATE_RANGE', () => {
        it('should update the start date value for awards', () => {
            const action = {
                type: 'UPDATE_AWARD_DATE_RANGE',
                date: '01-01-1987',
                dateType: 'startDate'
            };

            const state = bulkDownloadReducer(undefined, action);
            expect(state.awards.dateRange.startDate).toEqual('01-01-1987');
        });
        it('should update the end date value for awards', () => {
            const action = {
                type: 'UPDATE_AWARD_DATE_RANGE',
                date: '12-31-1987',
                dateType: 'endDate'
            };

            const state = bulkDownloadReducer(undefined, action);
            expect(state.awards.dateRange.endDate).toEqual('12-31-1987');
        });
    });

    describe('CLEAR_DOWNLOAD_FILTERS', () => {
        it('should reset the object for the given data type to its initial state', () => {
            const state = {
                dataType: 'awards',
                awards: {
                    awardLevels: {
                        primeAwards: true,
                        subAwards: true
                    },
                    awardTypes: {
                        contracts: false,
                        grants: true,
                        directPayments: true,
                        loans: false,
                        otherFinancialAssistance: false,
                        idvs: false
                    },
                    agency: {
                        id: '123',
                        name: 'Mock Agency'
                    },
                    subAgency: {
                        id: '456',
                        name: 'Mock Sub-Agency'
                    },
                    dateType: 'mock_date_type',
                    dateRange: {
                        startDate: '01-01-1987',
                        endDate: '12-31-1987'
                    },
                    columns: [],
                    fileFormat: 'mock_format'
                },
                expectedFile: '',
                pendingDownload: false,
                showCollapsedProgress: false
            };

            const action = {
                type: 'CLEAR_DOWNLOAD_FILTERS',
                dataType: 'awards'
            };

            const newState = bulkDownloadReducer(state, action);

            expect(newState.awards).toEqual(initialState.awards);
        });
    });
    describe('SET_DOWNLOAD_EXPECTED_FILE', () => {
        it('should return a new string of the expected filename', () => {
            const action = {
                type: 'SET_BULK_DOWNLOAD_EXPECTED_FILE',
                file: 'mockFileName.zip'
            };

            const state = bulkDownloadReducer(undefined, action);
            expect(state.download.expectedFile).toEqual('mockFileName.zip');
        });
    });
    describe('SET_DOWNLOAD_PENDING', () => {
        it('should return a boolean value for a pending download', () => {
            const action = {
                type: 'SET_BULK_DOWNLOAD_PENDING',
                state: true
            };

            const state = bulkDownloadReducer(undefined, action);
            expect(state.download.pendingDownload).toEqual(true);
        });
    });
    describe('SET_DOWNLOAD_COLLAPSED', () => {
        it('should return a boolean value for collapsed modal state', () => {
            const action = {
                type: 'SET_BULK_DOWNLOAD_COLLAPSED',
                collapsed: true
            };

            const state = bulkDownloadReducer(undefined, action);

            // the value should be equal
            expect(state.download.showCollapsedProgress).toEqual(true);
        });
    });
});
