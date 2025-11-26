import { fipsIdByStateName, stateFIPSByAbbreviation } from "../../dataMapping/state/stateNames";
import LocationEntity from "../../models/v2/search/LocationEntity";

const getKeyByValue = (object, value) =>
    Object.keys(object).find((key) => object[key] === value);

export const loadCounties = (
    county, state, countryAbbreviation, stateFips, countyFips, createLocationObjectByType
) => {
    const stateAbbreviation = getKeyByValue(
        stateFIPSByAbbreviation,
        stateFips
    )?.toLowerCase();

    const location = {
        identifier: `${countryAbbreviation}_${stateAbbreviation}_${countyFips}`,
        display: {
            title: `${county}, ${state}`,
            entity: "County",
            standalone: county
        },
        filter: {
            country: countryAbbreviation,
            county: countyFips,
            state: stateAbbreviation
        }
    };

    createLocationObjectByType(location);
};

export const addZip = (zipCode) =>
    // make a ZIP location object
    ({
        identifier: `USA_${zipCode}`,
        display: {
            title: zipCode,
            entity: "ZIP Code",
            standalone: zipCode
        },
        filter: {
            country: "USA",
            zip: zipCode
        }
    });

export const addCity = (city, state, countryAbbreviation) => {
    const fipsCode = fipsIdByStateName[state.toLowerCase()];
    const stateAbbreviation = getKeyByValue(stateFIPSByAbbreviation, fipsCode);
    return {
        identifier: `${countryAbbreviation}_${stateAbbreviation}_${city}`,
        display: {
            title: `${city}, ${state}`,
            entity: "City",
            standalone: city
        },
        filter: {
            country: countryAbbreviation,
            city,
            state: stateAbbreviation
        }
    };
};

export const addState = (state, countryAbbreviation) => {
    const fipsCode = fipsIdByStateName[state?.toLowerCase()];
    const stateAbbreviation = getKeyByValue(stateFIPSByAbbreviation, fipsCode);
    return {
        identifier: `${countryAbbreviation}_${stateAbbreviation}`,
        display: {
            title: state,
            entity: "State",
            standalone: state
        },
        filter: {
            country: countryAbbreviation,
            state: stateAbbreviation
        }
    };
};

export const addCountry = (country, countryAbbreviation) => ({
    identifier: countryAbbreviation,
    display: {
        title: country,
        entity: "Country/Entity",
        standalone: country
    },
    filter: {
        country: countryAbbreviation
    }
});

export const addDistrict = (district, type) => {
    const districtArray = district.split('-');
    const stateAbbreviation = districtArray[0];
    const districtNumber = districtArray[1];
    return {
        identifier: `USA_${stateAbbreviation}_${districtNumber}`,
        filter: {
            country: "USA",
            state: stateAbbreviation,
            district_current: districtNumber
        },
        display: {
            entity: type,
            standalone: district,
            title: district
        }
    };
};

export const locationSort = (array, key) => array.sort((a, b) => a[key].localeCompare(b[key]));

export const citySort = (cityArray) => {
    /* eslint-disable camelcase */
    const newCityArray = cityArray.map((city) => {
        if (city.country_name === 'UNITED STATES') {
            return {
                ...city,
                city_name_update: `${city.city_name}, ${city.state_name}`
            };
        }

        return {
            ...city,
            city_name_update: `${city.city_name}, ${city.country_name}`
        };
    });
    /* eslint-enable camelcase */
    return locationSort(newCityArray, 'city_name_update');
};

export const getParsedLocations = (
    countries,
    states,
    counties,
    cities,
    zipCodes,
    districtsCurrent,
    districtsOriginal
) => {
    const locationsList = [];

    if (countries) {
        locationSort(countries, 'country_name');
        countries.map((item) => {
            const locationItem = Object.create(LocationEntity);
            locationItem.populate({
                ...item,
                category: 'country'
            });
            return locationsList.push(locationItem);
        });
    }

    if (states) {
        locationSort(states, 'state_name');
        states.map((item) => {
            const locationItem = Object.create(LocationEntity);
            locationItem.populate({
                ...item,
                category: 'state'
            });
            return locationsList.push(locationItem);
        });
    }

    if (counties) {
        locationSort(counties, 'county_name');
        counties.map((item) => {
            const locationItem = Object.create(LocationEntity);
            locationItem.populate({
                ...item,
                category: 'county'
            });
            return locationsList.push(locationItem);
        });
    }

    if (cities) {
        const sortedCities = citySort(cities);
        sortedCities.map((item) => {
            const locationItem = Object.create(LocationEntity);
            locationItem.populate({
                ...item,
                category: 'city'
            });
            return locationsList.push(locationItem);
        });
    }

    if (zipCodes) {
        locationSort(zipCodes, 'zip_code');
        zipCodes.map((item) => {
            const locationItem = Object.create(LocationEntity);
            locationItem.populate({
                ...item,
                category: 'zip_code'
            });
            return locationsList.push(locationItem);
        });
    }

    if (districtsCurrent) {
        locationSort(districtsCurrent, 'current_cd');
        districtsCurrent.map((item) => {
            const locationItem = Object.create(LocationEntity);
            locationItem.populate({
                ...item,
                category: 'current_cd'
            });
            return locationsList.push(locationItem);
        });
    }

    if (districtsOriginal) {
        locationSort(districtsOriginal, 'original_cd');
        districtsOriginal.map((item) => {
            const locationItem = Object.create(LocationEntity);
            locationItem.populate({
                ...item,
                category: 'original_cd'
            });
            return locationsList.push(locationItem);
        });
    }

    return locationsList;
};

export const getLocationObject = (selectedItem, countriesList, createLocationObjectByType) => {
    const item = selectedItem;
    let location = {};
    const countryAbbreviation =
        item.data.country_name === 'UNITED STATES' ? 'USA' :
            countriesList?.find(
                (country) => country.name === item.data.country_name
            )?.code;

    if (item.category === "zip_code") {
        location = addZip(item.data.zip_code);
    }
    else if (item.category === "city") {
        location = addCity(item.data.city_name, item.data.state_name, countryAbbreviation);
    }
    else if (item.category === "county") {
        loadCounties(
            item.data.county_name,
            item.data.state_name,
            countryAbbreviation,
            item.data.state_fips,
            item.data.county_fips,
            createLocationObjectByType
        );
    }
    else if (item.category === "state") {
        location = addState(item.data.state_name, countryAbbreviation);
    }
    else if (item.category === "country") {
        location = addCountry(item.data.country_name, countryAbbreviation);
    }
    else if (item.category === "current_cd") {
        location = addDistrict(item.data.current_cd, "Current congressional district");
    }
    else if (item.category === "original_cd") {
        location = addDistrict(item.data.original_cd, "Original congressional district");
    }

    if (item.category !== "county") {
        createLocationObjectByType(location);
    }

    return location;
};
