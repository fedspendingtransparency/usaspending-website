/**
 * subawardTable.js
 * Created by Kevin Li 4/17/17
 */

const subawardFields = {
    columnWidths: {
        number: 0,
        recipient: 400,
        actionDate: 0,
        amount: 0,
        description: 380
    },
    defaultSortDirection: {
        number: 'desc',
        recipient: 'asc',
        actionDate: 'desc',
        amount: 'desc',
        description: 'asc'
    },
    table: {
        _order: [
            'number',
            'recipient',
            'actionDate',
            'amount',
            'description'
        ],
        _sortFields: {
            number: 'subaward_number',
            recipient: 'recipient__recipient_name',
            actionDate: 'action_date',
            amount: 'amount',
            description: 'description'
        },
        number: 'Sub-Award ID',
        recipient: 'Recipient Name',
        actionDate: 'Action Date',
        amount: 'Amount',
        description: 'Description'
    }
};

export default subawardFields;
