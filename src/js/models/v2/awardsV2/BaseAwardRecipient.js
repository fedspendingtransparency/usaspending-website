/**
 * BaseAwardRecipient.js
 * Created by David Trinh 10/9/18
 */

import { getBusinessTypes } from 'helpers/businessTypesHelper';
import CoreLocation from 'models/v2/CoreLocation';

const parseBusinessCategories = (data) => (
    getBusinessTypes().reduce((parsed, type) => {
        if (data.includes(type.fieldName)) {
            parsed.push(type.displayName);
        }
        return parsed;
    }, [])
);

const BaseAwardRecipient = {
    populate(data) {
        this.internalId = data.recipient_hash || '';
        this.name = data.recipient_name || 'Unknown';
        this.duns = data.recipient_unique_id || '--';
        this.parentName = data.recipient_parent_name || '--';
        this.parentDuns = data.parent_recipient_unique_id || '--';
        this.businessCategories = parseBusinessCategories(data.business_categories);

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
    }
};

export default BaseAwardRecipient;
