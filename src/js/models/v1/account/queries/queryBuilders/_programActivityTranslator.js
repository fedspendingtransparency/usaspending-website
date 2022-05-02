/**
 * _programActivityTranslator.js
 * Created by Kevin Li 2/27/18
 * This is EXTREMELY TEMPORARY - DO NOT DEPEND ON THIS
 */

import { uniqueId } from 'lodash';

const exchangeTemplate = {
    labelsToFrontend: {},
    frontendToAPI: {}
};

let _frontendAPIExchange = JSON.parse(JSON.stringify(exchangeTemplate));

export const _resetExchange = () => {
    _frontendAPIExchange = JSON.parse(JSON.stringify(exchangeTemplate));
};

const _exchangeForAPIValue = (frontendId) => _frontendAPIExchange.frontendToAPI[frontendId] || [];
export const _convertToFrontendFilter = (filter) => {
    const label = `${filter.code} - ${filter.name}`;
    // get the frontend-generated ID from the exchange
    const frontendId = _frontendAPIExchange.labelsToFrontend[label];
    if (frontendId) {
    // the filter already exists in the exchange, so append the API ID to the existing record
    // don't return anything because the container already has a copy of the adapted filter object
        _frontendAPIExchange.frontendToAPI[frontendId].push(filter.id);
        return null;
    }

    // the filter doesn't exist yet in the exchange, add it and generate a new frontend ID
    const generatedId = `pa-${uniqueId()}`;
    _frontendAPIExchange.labelsToFrontend[label] = generatedId;
    _frontendAPIExchange.frontendToAPI[generatedId] = [filter.id];
    // replace the API ID with the frontend ID and return it to container to continue parsing as
    // normal
    return Object.assign({}, filter, {
        id: generatedId
    });
};

export const _translateFrontendIDToPrimaryKeys = (frontendIds) => (
    frontendIds.reduce((ids, frontendId) => {
        const apiIDs = _exchangeForAPIValue(frontendId);
        if (apiIDs) {
            return ids.concat(apiIDs);
        }
        return ids;
    }, [])
);
