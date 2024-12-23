/**
 * LocationEntity.js
 * Created by Andrea Blackwell 09/24/2024
 */

export const formatTitle = (category, item) => {
    if (category === "country") {
        return item.country_name;
    }
    else if (category === "county") {
        return `${item.county_name}, ${item.state_name}`;
    }
    else if (category === "city") {
        return `${item.city_name}, ${item.state_name}`;
    }
    else if (category === "state") {
        return item.state_name;
    }
    else if (category === "zip_code") {
        return item.zip_code;
    }
    else if (category === "current_cd") {
        return item.current_cd;
    }
    else if (category === "original_cd") {
        return item.original_cd;
    }
    return '--';
};


const LocationEntity = {
    populate(item) {
        this.category = item.category || '--';
        this.title = formatTitle(this.category, item);
        this.data = {
            county_name: item.county_name || '--',
            country_name: item.country_name || '--',
            state_name: item.state_name || '--',
            city_name: item.city_name || '--',
            zip_code: item.zip_code || '--',
            original_cd: item.original_cd || '--',
            current_cd: item.current_cd || '--',
            state_fips: item.county_fips?.slice(0, 2) || '--',
            county_fips: item.county_fips?.slice(2) || '--'
        };
    }
};

export default LocationEntity;
