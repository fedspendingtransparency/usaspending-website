/**
  * FinAssistAwardRecord.js
  * Created by Kevin Li 11/16/16
  **/

import GenericRecord from '../GenericRecord';
import fieldNames from './fieldNames';

const recordType = 'finassist';

class FinAssistAwardRecord extends GenericRecord {
    constructor(data) {
        super(recordType, fieldNames, data);
    }
}

export default FinAssistAwardRecord;
