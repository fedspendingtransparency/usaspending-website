/**
 * CoreLocation.js
 * Created by Lizzie Salita 5/6/18
 */

const CoreLocation = {
    populateCore(data) {
        this._address1 = data.address1 || '';
        this._address2 = data.address2 || '';
        this._address3 = data.address3 || '';
        this._province = data.province || '';
        this._city = data.city || '';
        this._county = data.county || '';
        this._countyCode = data.countyCode || '';
        this._stateCode = data.stateCode || '';
        this._zip = data.zip5 || (data.zip4 && data.zip4.slice(0, 5)) || data.foreignPostalCode || '';
        this._country = data.country || '';
        this._countryCode = data.countryCode || '';
        this._state = data.state || data.stateCode || '';
        this._congressionalDistrict = data.congressionalDistrict || '';
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
            country = this._country && `${this._country} `;
        }

        const postCode = this._zip;
        return `${city}${adminArea}${country}${postCode}`;
    },
    get congressionalDistrict() {
        if (this._stateCode && this._congressionalDistrict) {
            return `${this._stateCode}-${this._congressionalDistrict}`;
        }
        return '';
    },
    get fullCongressionalDistrict() {
        return this.congressionalDistrict && `\nCongressional District: ${this.congressionalDistrict}`;
    },
    get stateProvince() {
        if (this._city && this._stateCode) {
            return this._stateCode;
        }
        else if (!this._city && this._state) {
            return this._state;
        }
        else if (this._province) {
            return this._province;
        }
        return '';
    },
    get fullAddress() {
        const line1 = (this.streetAddress && `${this.streetAddress}`) || '';
        const line2 = (this.regionalAddress && `${this.regionalAddress}`) || '';
        const line3 = this.fullCongressionalDistrict;
        return `${line1}${line2}${line3}` || '--';
    }
};

export default CoreLocation;
