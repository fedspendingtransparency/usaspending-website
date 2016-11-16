/**
  * AwardRecord.js
  * Created by Kevin Li 11/16/16
  **/

import hash from 'object-hash';
import _ from 'lodash';
import GenericRecord from '../GenericRecord';
import fieldNames from './fieldNames';

const recordType = 'award';

class AwardRecord extends GenericRecord {
    constructor(data) {
        const excludedFields = ['financialassistanceaward_set'];
        super(recordType, fieldNames, data, new Set(excludedFields));
    }
}

export default AwardRecord;
