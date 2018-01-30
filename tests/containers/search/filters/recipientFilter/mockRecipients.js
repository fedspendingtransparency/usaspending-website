import { Set } from 'immutable';

export const mockRecipientLocation = [{
    place_type: "CITY",
    matched_ids: [22516, 23056],
    place: "MCLEAN",
    parent: null
}];

export const mockRecipientDUNS = {
    results: {
        search_text: "Booz Allen",
        recipient_id_list: [
            2232,
            2260
        ]
    }
};

export const mockTypeRedux = {
    toggleRecipientType: jest.fn(),
    bulkRecipientTypeChange: jest.fn(),
    recipientType: new Set(),
    appliedType: new Set()
};
