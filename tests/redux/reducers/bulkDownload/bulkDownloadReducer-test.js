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
                name: 'award_types',
                value: ['mock_type1', 'mock_type2']
            };

            const state = bulkDownloadReducer(undefined, action);
            expect(state.awards.filters.award_types).toEqual(['mock_type1', 'mock_type2']);
        });
    });

    describe('UPDATE_DOWNLOAD_PARAM', () => {
        it('should update the specified parameter for the given data type', () => {
            const action = {
                type: 'UPDATE_DOWNLOAD_PARAM',
                dataType: 'awards',
                name: 'award_levels',
                value: ['mock_level']
            };

            const state = bulkDownloadReducer(undefined, action);
            expect(state.awards.award_levels).toEqual(['mock_level']);
        });
    });

    describe('UPDATE_AWARD_DATE_RANGE', () => {
        it('should update the start date value for awards', () => {
            const action = {
                type: 'UPDATE_AWARD_DATE_RANGE',
                date: '01-01-1987',
                dateType: 'start_date'
            };

            const state = bulkDownloadReducer(undefined, action);
            expect(state.awards.filters.date_range.start_date).toEqual('01-01-1987');
        });
        it('should update the end date value for awards', () => {
            const action = {
                type: 'UPDATE_AWARD_DATE_RANGE',
                date: '12-31-1987',
                dateType: 'end_date'
            };

            const state = bulkDownloadReducer(undefined, action);
            expect(state.awards.filters.date_range.end_date).toEqual('12-31-1987');
        });
    });

    describe('CLEAR_DOWNLOAD_FILTERS', () => {
        it('should reset the object for the given data type to its initial state', () => {
            const state = {
                dataType: 'awards',
                awards: {
                    award_levels: ['mock_level'],
                    filters: {
                        award_types: ['mock_type1', 'mock_type2'],
                        agency: 'mock_agency',
                        sub_agency: 'mock_subagency',
                        date_type: 'mock_date_type',
                        date_range: {
                            start_date: '01-01-1987',
                            end_date: '12-31-1987'
                        }
                    },
                    columns: [],
                    file_format: 'mock_format'
                },
                agencies: [],
                subAgencies: [],
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
