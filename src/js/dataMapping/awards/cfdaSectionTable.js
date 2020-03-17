/**
 * cfdaSectionTable.js
 * Created by Jonathan Hill on 03/17/20.
 */

const tableMapping = {
    cfda_title: {
        displayName: 'CFDA Program / Assistance Listing Title',
        field: 'cfda_title',
        classname: 'cfda-section-table__body-cell',
        onClick: true
    },
    total_funding_amount: {
        displayName: 'Funding Provided',
        field: 'total_funding_amount',
        classname: 'cfda-section-table__body-cell offset-right-money'
    },
    percent_of_total: {
        displayName: 'Percent of Total',
        field: 'percent_of_total',
        classname: 'cfda-section-table__body-cell offset-right-percent'
    }
};

export default tableMapping;
