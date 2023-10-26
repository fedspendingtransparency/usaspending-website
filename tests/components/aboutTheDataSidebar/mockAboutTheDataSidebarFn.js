/**
 * @jest-environment jsdom
 */
import { Entry } from 'redux/reducers/aboutTheDataSidebar/aboutTheDataReducer';

export const standardTerm = new Entry({
    name: 'File A - Full file A description',
    slug: 'file-a'
});

export const mockActions = {
    showAboutTheData: jest.fn(),
    hideAboutTheData: jest.fn(),
    setAboutTheDataSearchValue: jest.fn(),
    setAboutTheDataResults: jest.fn(),
    setAboutTheDataTerm: jest.fn(),
    clearAboutTheDataTerm: jest.fn(),
    setAboutTheDataTermFromUrl: jest.fn()
};

export const mockData = {
    display: true,
    term: new Entry({
        name: 'File A - Full file A description',
        slug: 'file-a'
    }),
    termFromUrl: new Entry({
        name: 'File A - Full file A description',
        slug: 'file-a'
    }),
    search: {
        input: 'file',
        results: [{
            description: {
                fields: [{
                    name: 'File A - Full file A description',
                    slug: 'file-a'
                },
                {
                    name: 'File B - Full description',
                    slug: 'file-b'
                },
                {
                    name: 'File C - Full description',
                    slug: 'file-c'
                }
                ],
                heading: "Sitewide Data Source Descriptions"
            }
        }]
    }
};

export const mockSearch = {
    results: ['File A'],
    counts: {
        term: 1
    },
    matched_objects: {
        term: [
            {
                name: 'File A - Full file A description',
                slug: 'file-a'
            }
        ]
    }
};
