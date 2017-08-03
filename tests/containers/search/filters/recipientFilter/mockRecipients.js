export const mockRecipientLocation = [{
    place_type: "CITY",
    matched_ids: [22516, 23056],
    place: "MCLEAN",
    parent: null
}];

export const mockRecipientDUNS = {
    results: {
        parent_recipient: [
            {
                legal_entity_id: 1111,
                recipient_name: "MEGA CONGLOMERATE CORP",
                parent_recipient_unique_id: "001122334"
            }
        ],
        recipient: [
            {
                legal_entity_id: 2222,
                recipient_name: "MEGA CONGLOMERATE CORP PIZZA DIVISION",
                recipient_unique_id: "001122335"
            }
        ]
    }
};

export const mockAutocompleteRedux = [
    {
        legal_entity_id: 1111,
        recipient_name: "MEGA CONGLOMERATE CORP",
        parent_recipient_unique_id: "001122334"
    },
    {
        legal_entity_id: 2222,
        recipient_name: "MEGA CONGLOMERATE CORP PIZZA DIVISION",
        recipient_unique_id: "001122335"
    }
];

export const expectedAutocomplete = [
    {
        title: 'MEGA CONGLOMERATE CORP',
        subtitle: 'Parent DUNS: 001122334',
        data: {
            legal_entity_id: 1111,
            recipient_name: "MEGA CONGLOMERATE CORP",
            parent_recipient_unique_id: "001122334",
            duns: "001122334"
        }
    },
    {
        title: 'MEGA CONGLOMERATE CORP PIZZA DIVISION',
        subtitle: 'DUNS: 001122335',
        data: {
            legal_entity_id: 2222,
            recipient_name: "MEGA CONGLOMERATE CORP PIZZA DIVISION",
            recipient_unique_id: "001122335",
            duns: "001122335"
        }
    }
];
