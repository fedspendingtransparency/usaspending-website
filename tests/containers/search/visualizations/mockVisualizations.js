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
            agency_name: 'First Agency',
            agency_abbreviation: 'FA',
            aggregated_amount: '456'
        },
        {
            agency_name: 'Second Agency',
            agency_abbreviation: 'SA',
            aggregated_amount: '123'
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
            aggregated_amount: '66681011412.00',
            cfda_program_number: '93.778',
            program_title: 'Medical Assistance Program'
        },
        {
            aggregated_amount: '152',
            cfda_program_number: '93.774',
            program_title: 'Medicare_Supplementary Medical Insurance'
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
            agency_name: 'First Agency',
            agency_abbreviation: 'FA',
            aggregated_amount: '456'
        },
        {
            agency_name: 'Second Agency',
            agency_abbreviation: 'SA',
            aggregated_amount: '123'
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
            aggregated_amount: '500.00',
            psc_code: '1234'
        },
        {
            aggregated_amount: '400.01',
            psc_code: '2345'
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
            legal_entity_id: '1',
            recipient_name: 'Multiple Recipients',
            aggregated_amount: '149620471458.92'
        },
        {
            legal_entity_id: '113704139',
            recipient_name: 'Michigan',
            aggregated_amount: '6684225478.00'
        }
    ]
};
