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
    financialAssistanceDomestic: [
        'streetAddress1',
        '_address2',
        'recipientRegionalAddress',
        'countryName',
        'recipientCongressionalDistrict'
    ],
    financialAssistanceForeign: [
        'streetAddress1',
        '_address2',
        'recipientRegionalAddress',
        'countryName'
    ],
    nonFinancialAssistanceDomestic: [
        'streetAddress1',
        '_address2',
        'recipientRegionalAddress',
        'countryName',
        'recipientCongressionalDistrict'
    ],
    nonFinancialAssistanceForeign: [
        'streetAddress1',
        '_address2',
        'recipientRegionalAddressContractsAndIDV',
        'countryName'
    ],
    redactedDueToPIIDomestic: ['recipientRegionalAddress', 'countryName', 'recipientCongressionalDistrict'],
    redactedDueToPIIForeign: ['recipientRegionalAddress', 'countryName'],
    aggregatedByState: ['stateName', 'countryName', 'recipientCongressionalDistrict'],
    aggregatedByCounty: ['countyAndState', 'countryName', 'recipientCongressionalDistrict'],
    aggregatedByCountry: ['countryName']
};

// recipient section aggregate text
export const aggregateTextRecipientSection = {
    redactedDueToPIIDomestic: `For more information on this special recipient type,
        click the glossary link above.`,
    redactedDueToPIIForeign: `For more information on this special recipient type,
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
    redactedDueToPIIDomestic: `Redacted Due To PII`,
    redactedDueToPIIForeign: `Redacted Due To PII`,
    aggregatedByState: 'Multiple Recipients',
    aggregatedByCounty: 'Multiple Recipients',
    aggregatedByCountry: 'Multiple Recipients'
};

// recipient section glossary link
export const aggregateGlossaryLinks = {
    redactedDueToPIIDomestic: `redacted-due-to-pii`,
    redactedDueToPIIForeign: `redacted-due-to-pii`,
    aggregatedByState: 'multiple-recipients',
    aggregatedByCounty: 'multiple-recipients',
    aggregatedByCountry: 'multiple-recipients'
};
