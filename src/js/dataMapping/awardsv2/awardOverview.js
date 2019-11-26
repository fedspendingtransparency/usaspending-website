/**
 * awardOverview.js
 * Created by Jonathan Hill 11/26/19
 **/

// data for award overview recipient section
// financial assistance awards are redactedDueToPII, agreggatedByState (Multiple Recipients),
// agreggatedByCounty (Multiple Recipients), aggregatedByCountry (Multiple Recipients)
export const AddresskeysByAwardType = {
    nonFinancialAssistance: ['regionalAddress', 'fullCongressionalDistrict', '_country'],
    redactedDueToPII: ['regionalAddress', 'fullCongressionalDistrict', '_country'],
    agreggatedByState: ['_state', 'fullCongressionalDistrict', '_country'],
    agreggatedByCounty: ['countyAndState', 'fullCongressionalDistrict', '_country'],
    agreggatedByCountry: ['_country']
};

// recipient section aggregate text
export const aggregateTextRecipientSection = {
    redactedDueToPII: `For more information on this special recipient type,
        click the glossary link above.`,
    agreggatedByState: `This record has been aggregated by state.
        For more information on this special recipient type, click the glossary link above`,
    agreggatedByCounty: `This record has been aggregated by county.
        For more information on this special recipient type, click on the glossary link above.`,
    agreggatedByCountry: `This record has been aggregated by country.
        For more information on this special recipient type, click the glossary link above.`
};

// recipient section glossary text
export const aggregateGlossaryText = {
    redactedDueToPII: `Redacted Due To PII`,
    agreggatedByState: 'Multiple Recipients',
    agreggatedByCounty: 'Multiple Recipients',
    agreggatedByCountry: 'Multiple Recipients'
};

// recipient section glossary link
export const aggregateGlossaryLinks = {
    redactedDueToPII: `redacted-due-to-pii`,
    agreggatedByState: 'multiple-recipients',
    agreggatedByCounty: 'multiple-recipients',
    agreggatedByCountry: 'multiple-recipients'
};
