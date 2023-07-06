export const mockCountries = {
    countries: [
        {
            code: 'ABC',
            name: 'A Big Country'
        }
    ]
};

export const mockStates = {
    states: [
        {
            fips: '00',
            code: 'IN',
            name: 'Indiana'
        }
    ]
};

export const mockCounties = {
    counties: [
        {
            code: '0000X',
            fips: '00X',
            state: 'IN',
            name: 'St. Joseph county'
        }
    ]
};

export const mockDistricts = {
    districts: [
        {
            code: '00XX',
            district: 'XX',
            name: 'IN-XX'
        }
    ]
};

export const mockValidZip = {
    attribution: 'Fake response',
    features: [
        {
            bbox: [1, 1, 1, 1],
            center: [1, 1],
            context: [{
                data: 'fake'
            }],
            geometry: {},
            id: 'postcode.1',
            place_name: '46556, Notre Dame, Indiana, United States',
            place_type: ['postcode'],
            properties: {},
            relevance: 1,
            text: '46556',
            type: 'Feature'
        }
    ],
    query: ['46556'],
    type: 'FeatureCollection'
};

export const mockInvalidZip = {
    attribution: 'Fake response',
    features: [],
    query: ['00000'],
    type: 'FeatureCollection'
};

export const fetchLocationList = (file) => {
    let response = mockCountries;
    if (file === 'states') {
        response = mockStates;
    }
    else if (file === 'counties/in_counties') {
        response = mockCounties;
    }
    else {
        response = mockDistricts;
    }

    return {
        promise: new Promise((resolve) => {
            resolve({
                data: response
            });
        }),
        cancel() {
            jest.fn();
        }
    };
};

export const performZIPGeocode = (zip) => {
    let response = mockValidZip;
    if (zip === '00000') {
        response = mockInvalidZip;
    }

    return {
        promise: new Promise((resolve) => {
            resolve({
                data: response
            });
        }),
        cancel() {
            jest.fn();
        }
    };
};

export const mockCityAutocompleteResponse = {
    count: 1,
    results: [
        {
            city_name: "Springfield",
            state_code: "VA"
        }]
};
