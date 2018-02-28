/**
 * _programActivityTranslator.js
 * Created by Kevin Li 2/27/18
 * This is EXTREMELY TEMPORARY - DO NOT DEPEND ON THIS
 */

import { uniqueId } from 'lodash';

const exchangeTemplate = {
    labelsToAPI: {},
    frontendToAPI: {}
};

let _frontendAPIExchange = Object.assign({}, exchangeTemplate);

export const _resetExchange = () => {
    _frontendAPIExchange = Object.assign({}, exchangeTemplate);
};

const _exchangeForAPIValue = (frontendId) => _frontendAPIExchange.frontendToAPI[frontendId] || [];
export const _convertToFrontendFilter = (filter) => {
    const label = `${filter.code} - ${filter.name}`;
    const frontendId = _frontendAPIExchange.labelsToAPI[label];
    if (frontendId) {
        // it already exists, append the ID
        // don't return anything because the container already has a copy of the adapted filter object
        _frontendAPIExchange.frontendToAPI[frontendId].push(filter.id);
        return null;
    }

    // it doesn't exist yet in the exchange, add it
    const generatedId = `pa-${uniqueId()}`;
    _frontendAPIExchange.labelsToAPI[label] = generatedId;
    _frontendAPIExchange.frontendToAPI[generatedId] = [filter.id];
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
