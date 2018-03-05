/**
 * BaseAwardPlaceOfPerformance.js
 * Created by Lizzie Salita 3/5/18
 */

const BaseAwardPlaceOfPerformance = {
    populate(data) {
        this.city = data.city_name || '';
        this.county = data.county_name || '';
        this.stateCode = data.state_code || '';
        this.state = data.state_name || data.state_code || '';
        this.province = data.foreign_province || '';
        this.zip = data.zip5 || (data.zip4 && data.zip4.slice(0, 5)) || '';
        this.congressionalDistrict = data.congressional_code;
        this.country = data.country_name || '';
        this.countryCode = data.location_country_code || '';
    },
    get stateProvince() {
        if (this.city && this.stateCode) {
            return this.stateCode;
        }
        else if (!this.city && this.state) {
            return this.state;
        }
        else if (this.province) {
            return this.province;
        }
        return '';
    }
};

export default BaseAwardPlaceOfPerformance;
