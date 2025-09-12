/**
 * locationFormatter.js
 * Created by michaelbray on 2/23/17.
 */

import { startCase, toLower } from 'lodash-es';
import { convertToTitleCase } from './searchHelper';

export const formatLocation = (location) => {
    let displayValue = '';

    if (location.place_type !== null) {
        displayValue = `${startCase(toLower(location.place_type))} | `;
    }

    displayValue += `${location.place}`;

    if (location.parent !== null &&
        (location.place_type !== null && location.place_type !== 'COUNTRY')) {
        displayValue += `, ${location.parent}`;
    }

    return displayValue;
};

export const pickLocationFormat = (location) => {
    if (location?.address_line1 && location?.city_name && location?.state_code && location?.zip5) {
        return `${convertToTitleCase(location.address_line1)}, ${convertToTitleCase(location.city_name)}, ${location.state_code}, ${location.zip5}`;
    }
    else if (location?.city_name && location?.state_code && location?.zip5) {
        return `${convertToTitleCase(location.city_name)}, ${location.state_code}, ${location.zip5}`;
    }
    else if (location?.city_name && location?.state_code) {
        return `${convertToTitleCase(location.city_name)}, ${location.state_code}`;
    }
    else if (location?.state_name) {
        return `${location.state_name}, ${location.location_country_code}`;
    }
    else if (location?.city_name && location?.location_country_code) {
        return `${convertToTitleCase(location.city_name)}, ${location.location_country_code}`;
    }
    else if (location?.country_name) {
        return convertToTitleCase(location.country_name);
    }
    else if (location?.location_country_code) {
        return location.location_country_code;
    }
    return '--';
};

