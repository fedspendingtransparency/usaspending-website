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
        this._zip = (data.zip5 && data.zip4 && `${data.zip5}-${data.zip4}`) || data.zip5 || (data.zip4 && data.zip4.slice(0, 5)) || data.foreignPostalCode || '';
        this._zip4 = data.zip4 || '';
        this._country = data.country || '';
        this._countryCode = data.countryCode || '';
        this._state = data.state || data.stateCode || '';
        this._stateName = data.state || '';
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
    get streetAddress1() {
        return this._address1 || '--';
    },
    get stateName() {
        return this._stateName || '--';
    },
    get countryName() {
        if (
            this._countryCode === 'USA'
            || this._countryCode === 'UNITED STATES'
            || this._country === 'UNITED STATES'
        ) return 'UNITED STATES';
        return this._country || '--';
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

        if (this._congressionalDistrict === '90') {
            return 'MULTI-STATE';
        }

        const postCode = this._zip;
        return `${city}${adminArea}${country}${postCode}`;
    },
    get recipientRegionalAddress() {
        const city = this._city || '--';
        if (this._countryCode === 'USA'
            || this._countryCode === 'UNITED STATES'
            || this._country === 'UNITED STATES') {
            const state = this._stateCode || '--';
            const zip = this._zip || '--';
            return `${city}, ${state} ${zip}`;
        }
        const province = this._province || '';
        const fZip = this._zip || '';
        // if province or foreign zip exist show comma
        if (province || fZip) return `${city}, ${province} ${fZip}`;
        // if neither province or foreign zip exist do not show comma;
        return city;
    },
    get recipientRegionalAddressContractsAndIDV() {
        const city = this._city || '--';
        const state = this._stateCode || '--';
        if (this._countryCode === 'USA'
            || this._countryCode === 'UNITED STATES'
            || this._country === 'UNITED STATES') {
            const zip = this._zip || '--';
            return `${city}, ${state} ${zip}`;
        }
        const fState = this._stateName || '--';
        const fZip = this._zip4 || '--';
        // if neither state nor zip exist show nothing
        if (fState === '--' && fZip === '--') return city;
        // if province or foreign zip exist show comma
        return `${city}, ${fState} ${fZip}`;
    },
    get countyAndState() {
        const county = this._county ? `${this._county} County` : '--';
        const stateCode = this._stateCode ? `${this._stateCode} ` : '--';
        if (!this._county && !this._stateCode) return '--';
        return `${county}, ${stateCode}`.trim();
    },
    get congressionalDistrict() {
        if (this._stateCode && this._congressionalDistrict) {
            return `${this._stateCode}-${this._congressionalDistrict}`;
        }
        return '';
    },
    get fullCongressionalDistrict() {
        if (this._congressionalDistrict === '90') {
            return 'CONGRESSIONAL DISTRICT: 90 (Multiple Districts)';
        }
        return this.congressionalDistrict && `\nCONGRESSIONAL DISTRICT: ${this.congressionalDistrict}`;
    },
    get recipientCongressionalDistrict() {
        return this.congressionalDistrict
            ? `\nCongressional District: ${this.congressionalDistrict}`
            : '--';
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
