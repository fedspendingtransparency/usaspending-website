import { mockApi, mockSummary, mockTabCount } from './mockResults';

export const fetchSummary = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockSummary
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const performKeywordSearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockApi
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const performTabCountSearch = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockTabCount
                });
            });
        }),
        cancel: jest.fn()
    }
);

export const slugFromString = (string) =>
    string.toString().toLowerCase().trim()
        .replace(/\s+/g, "-") // Replace spaces with -
        // .replace(/[^\w-]+/g, "") // Remove non word or hyphen characters
        .replace(/--+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Don't use hyphens at the beginning or end of the slug
        .replace(/-+$/, "");

export const stringFromSlug = (slug) =>
    slug.replace(/[-._~]+|([a-z])([A-Z])/g, ' ');