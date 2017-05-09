import { Definition } from 'redux/reducers/guide/guideReducer';

export const mockActions = {
    setGuideResults: jest.fn(),
    showGuide: jest.fn(),
    setGuideTerm: jest.fn()
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

export const mockApi = {
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
