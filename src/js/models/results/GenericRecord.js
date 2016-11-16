/**
  * GenericRecord.js
  * Created by Kevin Li 11/16/16
  **/

import hash from 'object-hash';
import _ from 'lodash';

class GenericRecord {
    constructor(recordType, fieldNames, data, excludedFields = new Set()) {
        // construct the object with either null values or provided data for each expected key
        let providedData = _.isObject(data);
        fieldNames.forEach((field) => {
            this[field] = null;
            if (providedData && {}.hasOwnProperty.call(data, field)) {
                // field exists in the data object, use the value
                if (!excludedFields.has(field)) {
                    this[field] = data[field];
                }
            }
        });

        // create a record identifier
        let objectIdentifier;
        if (providedData) {
            objectIdentifier = hash(data);
        }
        else {
            objectIdentifier = _.uniqueId();
        }

        this._jsid = `${recordType}-${objectIdentifier}`;
    }
}

export default GenericRecord;
