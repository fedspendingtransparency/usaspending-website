/**
  * FinancialAssistanceAwardRecord.js
  * Created by Kevin Li 11/16/16
  **/

import hash from 'object-hash';
import _ from 'lodash';
import GenericRecord from '../GenericRecord';
import fieldNames from './fieldNames';

const recordType = 'financialassistanceaward';

class FinancialAssistanceAwardRecord extends GenericRecord {
    constructor(data) {
        super(recordType, fieldNames, data);
    }
}

export default FinancialAssistanceAwardRecord;
