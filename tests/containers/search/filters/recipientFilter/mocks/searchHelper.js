import { mockLocationAutocomplete } from './mockRecipient';

// Location search for autocomplete
export const fetchLocations = () => (
    {
        promise: new Promise((resolve) => {
            process.nextTick(() => {
                resolve({
                    data: mockLocationAutocomplete
                });
            });
        }),
        cancel: jest.fn()
    }
);
