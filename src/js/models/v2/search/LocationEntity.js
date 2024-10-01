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
    else if (item.category === "state") {
        return item.state_name;
    }
    return '--';
};


const LocationEntity = {
    populate(item) {
        this.category = item.category || '--';
        this.title = formatTitle(this.category, item);
        this.data = {
            _countyName: item.county_name || '--',
            _countryName: item.country_name || '--',
            _stateName: item.state_name || '--',
            _cityName: item.city_name || '--'
        };
    }
};

export default LocationEntity;
