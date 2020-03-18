/**
 * cfdaSectionTable.js
 * Created by Jonathan Hill on 03/17/20.
 */

const tableMapping = {
    cfdaTitle: {
        displayName: 'CFDA Program / Assistance Listing Title',
        field: 'cfdaTitle',
        classname: 'cfda-section-table__body-cell',
        onClick: true
    },
    totalFundingAmount: {
        displayName: 'Funding Provided',
        field: '_totalFundingAmount',
        classname: 'cfda-section-table__body-cell offset-right-money'
    },
    percentOfTotal: {
        displayName: 'Percent of Total',
        field: '_percentOfTotal',
        classname: 'cfda-section-table__body-cell offset-right-percent'
    }
};

export default tableMapping;
