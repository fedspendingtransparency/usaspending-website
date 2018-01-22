const tableSearchFields = {
    defaultSortDirection: {
        field1: 'asc',
        field2: 'desc',
        loanfield: 'desc'
    },
    contracts: {
        _defaultSortField: 'field1',
        _order: [
            'field1'
        ],
        _mapping: {
            field1: 'f1'
        },
        field1: 'Field 1'
    },
    grants: {
        _defaultSortField: 'field1',
        _order: [
            'field1'
        ],
        _mapping: {
            field1: 'f1'
        },
        field1: 'Field 1'
    },
    direct_payments: {
        _defaultSortField: 'field1',
        _order: [
            'field1'
        ],
        _mapping: {
            field1: 'f1'
        },
        field1: 'Field 1'
    },
    loans: {
        _defaultSortField: 'loanfield',
        _order: [
            'loanfield'
        ],
        _mapping: {
            loanfield: 'lf'
        },
        loanfield: 'Loan Field',
        sortDirection: {
            loanfield: 'desc'
        }
    },
    other: {
        _defaultSortField: 'field1',
        _order: [
            'field1'
        ],
        _mapping: {
            field1: 'f1'
        },
        field1: 'Field 1'
    }
};

export default tableSearchFields;
