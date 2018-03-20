/**
 * subawardTable.js
 * Created by Kevin Li 4/17/17
 */

const subawardFields = {
    columnWidths: {
        id: 0,
        recipient: 400,
        actionDate: 0,
        amount: 0,
        description: 380
    },
    defaultSortDirection: {
        id: 'desc',
        recipient: 'asc',
        actionDate: 'desc',
        amount: 'desc',
        description: 'asc'
    },
    table: {
        _order: [
            'id',
            'recipient',
            'actionDate',
            'amount',
            'description'
        ],
        _sortFields: {
            id: 'subaward_number',
            recipient: 'recipient__recipient_name',
            actionDate: 'action_date',
            amount: 'amount',
            description: 'description'
        },
        id: 'Sub-Award ID',
        recipient: 'Recipient Name',
        actionDate: 'Action Date',
        amount: 'Amount',
        description: 'Description'
    }
};

export default subawardFields;
