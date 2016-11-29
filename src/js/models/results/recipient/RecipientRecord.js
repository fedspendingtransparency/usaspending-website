/**
  * RecipientRecord.js
  * Created by Kevin Li 11/16/16
  **/

import GenericRecord from '../GenericRecord';
import fieldNames from './fieldNames';

const recordType = 'recipient';

class RecipientRecord extends GenericRecord {
    constructor(data) {
        const excludedFields = ['location'];
        super(recordType, fieldNames, data, new Set(excludedFields));
    }
}

export default RecipientRecord;
