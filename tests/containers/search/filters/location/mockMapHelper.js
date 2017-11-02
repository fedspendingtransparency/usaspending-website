export const _mockCountries = {
    countries: [
        {
            code: 'ABC',
            name: 'A Big Country'
        }
    ]
};

export const _mockStates = {
    states: [
        {
            fips: '00',
            code: 'IN',
            name: 'Indiana'
        }
    ]
};

export const _mockCounties = {
    counties: [
        {
            code: '0000X',
            fips: '00X',
            state: 'IN',
            name: 'St. Joseph county'
        }
    ]
};

export const _mockDistricts = {
    districts: [
        {
            code: '00XX',
            district: 'XX',
            name: 'IN-XX'
        }
    ]
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
