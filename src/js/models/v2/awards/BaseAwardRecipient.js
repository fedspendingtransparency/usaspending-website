/**
 * BaseAwardRecipient.js
 * Created by Kevin Li 2/22/18
 */


import CoreLocation from 'models/v2/CoreLocation';

const BaseAwardRecipient = {
    populate(data) {
        this.name = data.recipient_name || 'Unknown';
        this.duns = data.recipient_unique_id || '--';
        this.parentDuns = data.parent_recipient_unique_id || '--';
        this.businessCategories = data.business_categories;

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
