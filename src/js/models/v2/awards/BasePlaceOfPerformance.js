/**
 * BasePlaceOfPerformance.js
 * Created by Lizzie Salita 3/5/18
 */

const BasePlaceOfPerformance = {
    populate(data) {
        this._city = data.city_name || '';
        this._county = data.county_name || '';
        this._stateCode = data.state_code || '';
        this._state = data.state_name || data.state_code || '';
        this._province = data.foreign_province || '';
        this._zip = data.zip5 || (data.zip4 && data.zip4.slice(0, 5)) || '';
        this._congressionalDistrict = data.congressional_code;
        this._country = data.country_name || '';
        this._countryCode = data.location_country_code || '';
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
    }
};

export default BasePlaceOfPerformance;
