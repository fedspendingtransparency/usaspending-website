export const geo = {
    results: [
        {
            item: 'AK',
            aggregate: '123.12'
        },
        {
            item: 'AL',
            aggregate: '345.56'
        }
    ],
    total_metadata: {
        count: 2
    },
    page_metadata: {
        page_number: 1,
        count: 2,
        num_pages: 1
    }
};

export const awardingAgency = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        previous: null
    },
    results: [
        {
            item: 'First Agency',
            aggregate: '456'
        },
        {
            item: 'Second Agency',
            aggregate: '123'
        }
    ]
};

export const spendingByCategory = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        previous: null
    },
    results: [
        {
            treasury_account__budget_function_title: 'First Budget Function',
            aggregate: '456'
        },
        {
            treasury_account__budget_function_title: 'Second Budget Function',
            aggregate: '123'
        }
    ]
};

export const cfda = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        previous: null
    },
    results: [
        {
            item: '93.778',
            aggregate: '66681011412.00',
            assistance_data__cfda__program_number: '93.778',
            assistance_data__cfda__program_title: 'Medical Assistance Program'
        },
        {
            item: '93.774',
            aggregate: '152',
            assistance_data__cfda__program_number: '93.774',
            assistance_data__cfda__program_title: 'Medicare_Supplementary Medical Insurance'
        }
    ]
};

export const fundingAgency = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        previous: null
    },
    results: [
        {
            item: 'First Agency',
            aggregate: '456'
        },
        {
            item: 'Second Agency',
            aggregate: '123'
        }
    ]
};

export const industryCode = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        previous: null
    },
    results: [
        {
            item: '1234',
            aggregate: '500.00',
            contract_data__product_or_service_code: '1234'
        },
        {
            item: '2345',
            aggregate: '400.01',
            contract_data__product_or_service_code: '2345'
        }
    ]
};

export const recipient = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        previous: null
    },
    results: [
        {
            recipient__legal_entity_id: '1',
            recipient__recipient_name: 'Multiple Recipients',
            aggregate: '149620471458.92'
        },
        {
            recipient__legal_entity_id: '113704139',
            recipient__recipient_name: 'Michigan',
            aggregate: '6684225478.00'
        }
    ]
};
