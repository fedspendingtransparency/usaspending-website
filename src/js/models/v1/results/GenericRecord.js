/**
  * GenericRecord.js
  * Created by Kevin Li 11/16/16
  **/

import { isObject, uniqueId } from 'lodash';

class GenericRecord {
    constructor(recordType, fieldNames, data, excludedFields = new Set()) {
    // construct the object with either null values or provided data for each expected key
        const providedData = isObject(data);
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
        const objectIdentifier = uniqueId();

        this._jsid = `${recordType}-${objectIdentifier}`;
    }
}

export default GenericRecord;
