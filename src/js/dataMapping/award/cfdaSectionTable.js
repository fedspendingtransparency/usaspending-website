/**
 * cfdaSectionTable.js
 * Created by Jonathan Hill on 03/17/20.
 */

const tableMapping = {
    cfdaTitleShort: {
        displayName: 'Assistance Listing (CFDA Program)',
        field: 'cfdaTitle',
        classname: 'cfda-section-table__body-cell',
        onClick: true
    },
    federalActionOblicationAmount: {
        displayName: 'Funding Provided',
        field: '_federalActionOblicationAmount',
        classname: 'cfda-section-table__body-cell offset-right-money'
    },
    percentOfTotal: {
        displayName: 'Percent of Total',
        field: '_percentOfTotal',
        classname: 'cfda-section-table__body-cell offset-right-percent'
    }
};

export default tableMapping;
