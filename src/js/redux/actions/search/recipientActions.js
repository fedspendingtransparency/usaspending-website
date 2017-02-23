/**
 * Created by michaelbray on 2/17/17.
 */

export const setAutocompleteRecipients = (state) => ({
    type: 'SET_AUTOCOMPLETE_RECIPIENTS',
    recipients: state
});

export const setAutocompleteRecipientLocations = (state) => ({
    type: 'SET_AUTOCOMPLETE_RECIPIENT_LOCATIONS',
    locations: state
});
