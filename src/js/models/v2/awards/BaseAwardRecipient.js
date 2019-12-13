/**
 * BaseAwardRecipient.js
 * Created by Kevin Li 2/22/18
 */

import { getBusinessTypes } from 'helpers/businessTypesHelper';
import CoreLocation from 'models/CoreLocation';

const parseBusinessCategories = (data) => (
    getBusinessTypes().reduce((parsed, type) => {
        if (data[type.fieldName]) {
            parsed.push(type.displayName);
        }
        return parsed;
    }, [])
);

const BaseAwardRecipient = {
    populate(data) {
        this.internalId = data.legal_entity_id || '';
        this.name = data.recipient_name || 'Unknown';
        this.duns = data.recipient_unique_id || '--';
        this.parentDuns = data.parent_recipient_unique_id || '--';
        this._businessTypes = data.business_types_description || '';
        this._businessCategories = parseBusinessCategories(data);

        // Recipient Location
        let locationData = {};
        if (data.location) {
            locationData = {
                address1: data.location.address_line1,
                address2: data.location.address_line2,
                address3: data.location.address_line3,
                province: data.location.foreign_province,
                city: data.location.city_name,
                county: data.location.county_name,
                stateCode: data.location.state_code,
                zip5: data.location.zip5,
                zip4: data.location.zip4,
                foreignPostalCode: data.location.foreign_postal_code,
                country: data.location.country_name || '',
                countryCode: data.location.location_country_code || '',
                congressionalDistrict: data.location.congressional_code
            };
        }
        const location = Object.create(CoreLocation);
        location.populateCore(locationData);
        this.location = location;
    },
    get businessTypes() {
        if (this._businessTypes) {
            return [this._businessTypes];
        }
        else if (this._businessCategories.length > 0) {
            return this._businessCategories;
        }
        return [];
    }
};

export default BaseAwardRecipient;
