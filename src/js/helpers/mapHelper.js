/**
 * mapHelper.js
 * Created by Kevin Li 2/15/17
 */

import { min, max } from 'lodash';
import { scaleQuantize } from 'd3-scale';
import kGlobalConstants from 'GlobalConstants';
import { apiRequest } from './apiRequest';

import * as MoneyFormatter from './moneyFormatter';

/* eslint-disable quote-props */
const stateCodes = {
    'Alabama': 'AL',
    'Alaska': 'AK',
    'Arizona': 'AZ',
    'Arkansas': 'AR',
    'California': 'CA',
    'Colorado': 'CO',
    'Connecticut': 'CT',
    'Delaware': 'DE',
    'Florida': 'FL',
    'Georgia': 'GA',
    'Hawaii': 'HI',
    'Idaho': 'ID',
    'Illinois': 'IL',
    'Indiana': 'IN',
    'Iowa': 'IA',
    'Kansas': 'KS',
    'Kentucky': 'KY',
    'Louisiana': 'LA',
    'Maine': 'ME',
    'Maryland': 'MD',
    'Massachusetts': 'MA',
    'Michigan': 'MI',
    'Minnesota': 'MN',
    'Mississippi': 'MS',
    'Missouri': 'MO',
    'Montana': 'MT',
    'Nebraska': 'NE',
    'Nevada': 'NV',
    'New Hampshire': 'NH',
    'New Jersey': 'NJ',
    'New Mexico': 'NM',
    'New York': 'NY',
    'North Carolina': 'NC',
    'North Dakota': 'ND',
    'Northern Mariana Islands': 'MP',
    'Ohio': 'OH',
    'Oklahoma': 'OK',
    'Oregon': 'OR',
    'Pennsylvania': 'PA',
    'Rhode Island': 'RI',
    'South Carolina': 'SC',
    'South Dakota': 'SD',
    'Tennessee': 'TN',
    'Texas': 'TX',
    'Utah': 'UT',
    'Vermont': 'VT',
    'Virginia': 'VA',
    'Washington': 'WA',
    'West Virginia': 'WV',
    'Wisconsin': 'WI',
    'Wyoming': 'WY',
    'District of Columbia': 'DC',
    'Puerto Rico': 'PR',
    'U.S. Virgin Islands': 'VI',
    'American Samoa': 'AS',
    'Guam': 'GU',
    'U.S. Minor Outlying Islands': 'UM'
};

const stateNames = {
    'AL': 'Alabama',
    'AK': 'Alaska',
    'AZ': 'Arizona',
    'AR': 'Arkansas',
    'CA': 'California',
    'CO': 'Colorado',
    'CT': 'Connecticut',
    'DE': 'Delaware',
    'FL': 'Florida',
    'GA': 'Georgia',
    'HI': 'Hawaii',
    'ID': 'Idaho',
    'IL': 'Illinois',
    'IN': 'Indiana',
    'IA': 'Iowa',
    'KS': 'Kansas',
    'KY': 'Kentucky',
    'LA': 'Louisiana',
    'ME': 'Maine',
    'MD': 'Maryland',
    'MA': 'Massachusetts',
    'MI': 'Michigan',
    'MN': 'Minnesota',
    'MS': 'Mississippi',
    'MP': 'Northern Mariana Islands',
    'MO': 'Missouri',
    'MT': 'Montana',
    'NE': 'Nebraska',
    'NV': 'Nevada',
    'NH': 'New Hampshire',
    'NJ': 'New Jersey',
    'NM': 'New Mexico',
    'NY': 'New York',
    'NC': 'North Carolina',
    'ND': 'North Dakota',
    'OH': 'Ohio',
    'OK': 'Oklahoma',
    'OR': 'Oregon',
    'PA': 'Pennsylvania',
    'RI': 'Rhode Island',
    'SC': 'South Carolina',
    'SD': 'South Dakota',
    'TN': 'Tennessee',
    'TX': 'Texas',
    'UT': 'Utah',
    'VT': 'Vermont',
    'VA': 'Virginia',
    'WA': 'Washington',
    'WV': 'West Virginia',
    'WI': 'Wisconsin',
    'WY': 'Wyoming',
    'DC': 'District of Columbia',
    'PR': 'Puerto Rico',
    'VI': 'U.S. Virgin Islands',
    'AS': 'American Samoa',
    'GU': 'Guam',
    'UM': 'U.S. Minor Outlying Islands'
};

const stateCenters = {
    "10": [
        -75.483307,
        39.118973
    ],
    "11": [
        -76.990513,
        38.896391
    ],
    "12": [
        -81.550255,
        27.64891
    ],
    "13": [
        -83.25066,
        32.674684
    ],
    "15": [
        -155.424133,
        19.590615
    ],
    "16": [
        -115.464968,
        45.494716
    ],
    "17": [
        -89.451439,
        39.739182
    ],
    "18": [
        -86.173619,
        39.690617
    ],
    "19": [
        -93.151539,
        41.939465
    ],
    "20": [
        -98.327818,
        38.642763
    ],
    "21": [
        -84.728711,
        37.823816
    ],
    "22": [
        -91.671577,
        30.889313
    ],
    "23": [
        -69.218322,
        45.140009
    ],
    "24": [
        -76.349402,
        38.841629
    ],
    "25": [
        -70.596297,
        41.964569
    ],
    "26": [
        -84.515887,
        44.978718
    ],
    "27": [
        -94.503809,
        46.443226
    ],
    "28": [
        -89.710361,
        32.523309
    ],
    "29": [
        -92.492359,
        38.294958
    ],
    "30": [
        -109.341455,
        46.681628
    ],
    "31": [
        -100.031645,
        41.497066
    ],
    "32": [
        -116.70843,
        38.561397
    ],
    "33": [
        -71.553859,
        43.998463
    ],
    "34": [
        -74.414532,
        40.057347
    ],
    "35": [
        -106.044864,
        34.299865
    ],
    "36": [
        -76.301667,
        42.685498
    ],
    "37": [
        -78.223586,
        35.120196
    ],
    "38": [
        -100.452392,
        47.469409
    ],
    "39": [
        -82.706838,
        40.358615
    ],
    "40": [
        -97.21683,
        35.330506
    ],
    "41": [
        -120.610402,
        44.121231
    ],
    "42": [
        -77.737766,
        41.118899
    ],
    "44": [
        -71.457454,
        41.508372
    ],
    "45": [
        -80.430781,
        33.594233
    ],
    "46": [
        -100.25396,
        44.371852
    ],
    "47": [
        -86.317786,
        35.832308
    ],
    "48": [
        -99.683617,
        31.169621
    ],
    "49": [
        -111.549668,
        39.515509
    ],
    "50": [
        -72.772265,
        43.872754
    ],
    "51": [
        -78.224935,
        38.00234
    ],
    "53": [
        -120.760049,
        47.283049
    ],
    "54": [
        -80.294105,
        38.921511
    ],
    "55": [
        -89.72133,
        44.899726
    ],
    "56": [
        -107.548667,
        42.983286
    ],
    "60": [
        -170.721449,
        -14.299185
    ],
    "66": [
        144.756212,
        13.447046
    ],
    "69": [
        145.211236,
        14.154977
    ],
    "72": [
        -66.249745,
        18.198465
    ],
    "78": [
        -64.729564,
        17.731458
    ],
    "01": [
        -86.703052,
        32.525772
    ],
    "02": [
        -153.610133,
        62.075829
    ],
    "04": [
        -111.668128,
        34.168451
    ],
    "05": [
        -92.494942,
        34.752088
    ],
    "06": [
        -120.047533,
        37.229564
    ],
    "08": [
        -105.549558,
        38.999983
    ],
    "09": [
        -72.661742,
        41.519813
    ]
};
/* eslint-enable quote-props */

export const visualizationColors = [
    '#d0e9ef',
    '#a7c2ca',
    '#7f9ba7',
    '#597785',
    '#335565',
    '#083546'
];

export const stateNameFromCode = (code) => {
    if ({}.hasOwnProperty.call(stateNames, code)) {
        return stateNames[code];
    }
    return null;
};

export const stateCodeFromName = (name) => {
    if ({}.hasOwnProperty.call(stateCodes, name)) {
        return stateCodes[name];
    }
    return null;
};

// Used for the state profile pages
export const stateCenterFromFips = (fips) => {
    if ({}.hasOwnProperty.call(stateCenters, fips)) {
        return stateCenters[fips];
    }
    return [];
};

export const calculateRange = (data) => {
    let dataRange = data;
    // handle a condition where an empty array is provided
    if (data.length < 1) {
        dataRange = [0, 10000];
    }

    let minValue = min(dataRange);
    let maxValue = max(dataRange);

    // determine the best units to use
    const units = MoneyFormatter.calculateUnits(dataRange);

    // round the minimum down to the cleanest unit point
    minValue = Math.floor(minValue / units.unit);
    maxValue = Math.ceil(maxValue / units.unit);

    const segments = [];
    const scale = scaleQuantize()
        .domain([minValue * units.unit, maxValue * units.unit])
        .range([0, 1, 2, 3, 4, 5])
        .nice();
    for (let i = 0; i <= 5; i++) {
        segments.push(scale.invertExtent(i)[1]);
    }

    return {
        scale,
        segments,
        units
    };
};

export const fetchLocationList = (fileName) => apiRequest({
    baseURL: null,
    url: `data/${fileName}.json`
});

export const performZIPGeocode = (zip) => apiRequest({
    baseURL: 'https://api.mapbox.com/',
    url: `geocoding/v5/mapbox.places/${zip}.json`,
    params: {
        access_token: kGlobalConstants.MAPBOX_TOKEN,
        country: 'us',
        types: 'postcode',
        autocomplete: 'false'
    }
});

export const getCitySearchRequestObj = (searchText = "", state = "", country = "", scope = "") => {
    const requestObj = {
        search_text: searchText,
        limit: 40,
        filter: { country_code: country, scope }
    };

    if (state) {
        requestObj.filter.state_code = state;
    }

    return requestObj;
};

export const fetchCityResults = (reqObj = getCitySearchRequestObj()) => apiRequest({
    url: `v2/autocomplete/city/`,
    method: 'post',
    data: reqObj
});
