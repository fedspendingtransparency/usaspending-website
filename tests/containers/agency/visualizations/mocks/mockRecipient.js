export const mockRecipient = {
    page_metadata: {
        page: 1,
        has_next_page: true,
        has_previous_page: false,
        previous: null
    },
    req: "abc",
    results: [{
        recipient: {
            recipient_id: 4196,
            recipient_name: "NEW DESIGN AUTO BODY, INC."
        },
        obligated_amount: "2732.43"
    }, {
        recipient: {
            recipient_id: 3532,
            recipient_name: "PUBLIC SAFETY, TEXAS DEPARTMENT OF"
        },
        obligated_amount: "18000.00"
    }]
};

export const parsedSeries = {
    dataSeries: [2732.43, 18000],
    labelSeries: ['NEW DESIGN AUTO BODY, INC.', 'PUBLIC SAFETY, TEXAS DEPARTMENT OF']
};
