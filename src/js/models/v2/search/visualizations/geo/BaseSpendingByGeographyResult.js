/**
 * BaseSpendingByGeographyResult.js
 * Created by Andrea Blackwell 12/14/2023
 */

const BaseSpendingByGeographyResult = {
    populate(data) {
        this.shape_code = data.shape_code;
        this.display_name = data.display_name || '--';
        this.aggregated_amount = data.aggregated_amount || 0;
        this.population = data.population || 0;
        this.per_capita = data.per_capita || 0;
    }
};

export default BaseSpendingByGeographyResult;
