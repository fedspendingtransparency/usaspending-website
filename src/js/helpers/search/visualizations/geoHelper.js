import BaseSpendingByGeographyResult from 'models/v2/search/visualizations/geo/BaseSpendingByGeographyResult';

// FABS prohibits the following US territories or freely associated states from being submitted using their GENC code.  They should be submitted using the country code "USA"
export const prohibitedCountryCodes = ['ASM', 'FSM', 'GUM', 'MHL', 'MNP', 'PLW', 'PRI', 'VIR', 'XBK', 'XHO', 'XJA', 'XJV', 'XKR', 'XMW', 'XNV', 'XPL', 'XWK'];


const addUSTerritories = (results, apiParams) => {
    const filteredArray = apiParams.geo_layer_filters.filter((value) => prohibitedCountryCodes.includes(value));
    const usaData = results.find((value) => value.shape_code === 'USA');

    if (usaData) {
        filteredArray.forEach((value) => {
            results.push({
                shape_code: value,
                display_name: usaData.display_name,
                aggregated_amount: usaData.aggregated_amount,
                per_capita: usaData.per_capita,
                population: usaData.population
            });
        });
    }

    return results;
};

export const parseRows = (data, apiParams) => {
    const parsedData = data.map((item) => {
        const geoElement = Object.create(BaseSpendingByGeographyResult);
        geoElement.populate(item);
        return geoElement;
    });

    if (apiParams.geo_layer === "country") {
        return addUSTerritories(parsedData, apiParams);
    }

    return parsedData;
};
