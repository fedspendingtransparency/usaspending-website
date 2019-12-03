/**
 * awardOverview.js
 * Created by Jonathan Hill 11/26/19
 **/

// data for award overview recipient section
// financial assistance awards are redactedDueToPII, agreggatedByState (Multiple Recipients),
// agreggatedByCounty (Multiple Recipients), aggregatedByCountry (Multiple Recipients).
// These different award types are derived from recordType, county (location object),
// and country (location object) by getAwardTypeByRecordtypeCountyAndState function in the
// awardSummaryHelper
export const AddresskeysByAwardType = {
    nonFinancialAssistance: ['regionalAddress', 'fullCongressionalDistrict', '_country'],
    redactedDueToPII: ['regionalAddress', 'fullCongressionalDistrict', '_country'],
    aggregatedByState: ['_state', 'fullCongressionalDistrict', '_country'],
    aggregatedByCounty: ['countyAndState', 'fullCongressionalDistrict', '_country'],
    aggregatedByCountry: ['_country']
};

// recipient section aggregate text
export const aggregateTextRecipientSection = {
    redactedDueToPII: `For more information on this special recipient type,
        click the glossary link above.`,
    aggregatedByState: `This record has been aggregated by state.
        For more information on this special recipient type, click the glossary link above`,
    aggregatedByCounty: `This record has been aggregated by county.
        For more information on this special recipient type, click on the glossary link above.`,
    aggregatedByCountry: `This record has been aggregated by country.
        For more information on this special recipient type, click the glossary link above.`
};

// recipient section glossary text
export const aggregateGlossaryText = {
    redactedDueToPII: `Redacted Due To PII`,
    aggregatedByState: 'Multiple Recipients',
    aggregatedByCounty: 'Multiple Recipients',
    aggregatedByCountry: 'Multiple Recipients'
};

// recipient section glossary link
export const aggregateGlossaryLinks = {
    redactedDueToPII: `redacted-due-to-pii`,
    aggregatedByState: 'multiple-recipients',
    aggregatedByCounty: 'multiple-recipients',
    aggregatedByCountry: 'multiple-recipients'
};
