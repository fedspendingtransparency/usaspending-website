/**
 * BaseAwardRecipient.js
 * Created by Kevin Li 2/22/18
 */

import { getBusinessTypes } from 'helpers/businessTypesHelper';

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
        this.internalId = data.legal_entity_id;
        this.name = data.recipient_name;
        this.duns = data.recipient_unique_id;
        this.parentDuns = data.parent_recipient_unique_id;
        this._businessTypes = data.business_types_description || '';
        this._businessCategories = parseBusinessCategories(data);

        this._address1 = data.location.address_line1 || '';
        this._address2 = data.location.address_line2 || '';
        this._address3 = data.location.address_line3 || '';
        this._province = data.location.foreign_province || '';
        this._city = data.location.city_name || '';
        this._county = data.location.county_name || '';
        this._stateCode = data.location.state_code || '';
        this._zip = data.location.zip5 || (data.location.zip4 && data.location.zip4.slice(0, 5)) || data.location.foreign_postal_code || '';
        this._country = data.location.country_name || '';
        this._countryCode = data.location.country_code || '';

        this._congressionalDistrict = data.congressional_code;
    },
    get businessTypes() {
        if (this._businessTypes) {
            return [this._businessTypes];
        }
        else if (this._businessCategories.length > 0) {
            return this._businessCategories;
        }
        return [];
    },
    get streetAddress() {
        // format the street address
        let address = '';
        for (let i = 1; i < 4; i++) {
            const addressLine = this[`_address${i}`];
            if (addressLine) {
                address += `${addressLine}\n`;
            }
        }
        return address;
    },
    get regionalAddress() {
        const city = this._city && `${this._city}, `;
        let adminArea = this._stateCode && `${this._stateCode} `;
        if (!adminArea && this._province) {
            adminArea = `${this._province} `;
        }
        let country = '';
        if (this._countryCode !== 'USA') {
            country = this._countryCode && `${this._countryCode} `;
        }

        const postCode = this._zip;
        return `${city}${adminArea}${country}${postCode}`;
    },
    get congressionalDistrict() {
        return `${this._stateCode}-${this._congressionalDistrict}`;
    }
};

export default BaseAwardRecipient;
