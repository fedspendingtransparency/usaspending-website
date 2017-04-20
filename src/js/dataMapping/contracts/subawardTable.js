/**
 * subawardTable.js
 * Created by Kevin Li 4/17/17
 */

const subawardFields = {
    columnWidths: {
        id: 230,
        recipient: 400,
        action_date: 200,
        amount: 220,
        description: 380
    },
    defaultSortDirection: {
        id: 'desc',
        recipient: 'asc',
        action_date: 'desc',
        amount: 'desc',
        description: 'asc'
    },
    table: {
        _order: [
            'id',
            'recipient',
            'action_date',
            'amount',
            'description'
        ],
        _sortFields: {
            id: 'subaward_number',
            recipient: 'recipient__recipient_name',
            action_date: 'action_date',
            amount: 'amount',
            description: 'description'
        },
        _mapping: {
            id: 'subaward_number',
            recipient: 'recipient',
            action_date: 'action_date',
            amount: 'amount',
            description: 'description'
        },
        id: 'Sub-Award ID',
        recipient: 'Recipient Name',
        action_date: 'Action Date',
        amount: 'Amount',
        description: 'Description'
    }
};

export default subawardFields;
