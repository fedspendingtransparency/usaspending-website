/**
 * mapHelper.js
 * Created by Kevin Li 2/15/17
 */

import Axios, { CancelToken } from 'axios';
import { min, max } from 'lodash';
import { scaleLinear } from 'd3-scale';
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

    // determine the current step values, round it to something divisible by
    const step = Math.ceil((maxValue - minValue) / 6);
    maxValue = minValue + (6 * step);

    const segments = [];
    const scale = scaleLinear().domain([minValue * units.unit, maxValue * units.unit]).range([0, 6]);
    for (let i = 1; i <= 6; i++) {
        segments.push(scale.invert(i));
    }

    return {
        scale,
        segments,
        units
    };
};

// perform GeoJSON fetch is a cancellable promise
export const fetchFile = (file) => {
    const source = CancelToken.source();
    return {
        promise: Axios.request({
            url: file,
            method: 'get',
            cancelToken: source.token
        }),
        cancel() {
            source.cancel();
        }
    };
};
