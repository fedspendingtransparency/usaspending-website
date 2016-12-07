/**
  * recordBulkActions.js
  * Created by Kevin Li 11/16/16
  **/

export const bulkInsertRecords = (state) => ({
    type: 'BULK_INSERT_RECORDS',
    field: state.type,
    data: state.data
});

export const bulkInsertRecordSet = (state) => ({
    type: 'BULK_INSERT_RECORD_SET',
    field: state.type,
    data: state.data
});

export const clearRecords = () => ({
    type: 'CLEAR_RECORDS'
});
