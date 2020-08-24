import { Map } from 'immutable';
import { Definition } from 'redux/reducers/glossary/glossaryReducer';

export const standardTerm = new Definition({
    term: 'Test Term',
    slug: 'test-term',
    data_act_term: 'Test Terminology',
    plain: 'A test term',
    official: 'Terminology test'
});

export const mockActions = {
    setGlossaryResults: jest.fn(),
    showGlossary: jest.fn(),
    setGlossaryTerm: jest.fn(),
    setGlossaryCache: jest.fn(),
    setGlossaryTermFromUrl: jest.fn()
};

export const mockData = {
    display: true,
    term: new Definition({
        term: 'Test Term',
        slug: 'test-term',
        data_act_term: 'Test Terminology',
        plain: 'A test term',
        official: 'Terminology test'
    }),
    cache: new Map({
        'test-term': new Definition({
            term: 'Test Term',
            slug: 'test-term',
            data_act_term: 'Test Terminology',
            plain: 'A test term',
            official: 'Terminology test'
        })
    }),
    search: {
        input: '',
        results: [
            new Definition({
                term: 'Test Term',
                slug: 'test-term',
                data_act_term: 'Test Terminology',
                plain: 'A test term',
                official: 'Terminology test'
            })
        ]
    }
};

export const mockCache = {
    page_metadata: {
        page: 1,
        has_next_page: false,
        has_previous_page: false,
        next: null,
        current: "blerg",
        previous: null
    },
    req: "a2862b96e68",
    results: [{
        term: 'Test Term',
        slug: 'test-term',
        data_act_term: 'Test Terminology',
        plain: 'A test term',
        official: 'Terminology test'
    }]
};

export const mockSearch = {
    results: ['Test term'],
    counts: {
        term: 1
    },
    matched_objects: {
        term: [
            {
                term: 'Test Term',
                slug: 'test-term',
                data_act_term: 'Test Terminology',
                plain: 'A test term',
                official: 'Terminology test'
            }
        ]
    }
};
