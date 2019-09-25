/**
 * programSourceInfoTooltipContent.js
 * Created by Lizzie Salita 8/07/19
 * Content for the Program Source (TAS) filter tooltips
 */

export const programSourceInfo = {
    ata: {
        heading: 'Allocation Transfer Agency Identifier',
        definition: 'The allocation agency identifies the department or agency that is receiving funds through an allocation (non-expenditure) transfer.',
        example: '020'
    },
    aid: {
        heading: 'Agency Identifier',
        definition: 'The agency code identifies the department or agency that is responsible for the account.',
        example: '097'
    },
    bpoa: {
        heading: 'Beginning Period Of Availability',
        definition: 'In annual and multi-year funds, the beginning period of availability identifies the first year of availability under law that an appropriation account may incur new obligations.',
        example: '2014'
    },
    epoa: {
        heading: 'Ending Period Of Availability',
        definition: 'In annual and multi-year funds, the end period of availability identifies the last year of funds availability under law that an appropriation account may incur new obligations.',
        example: '2015'
    },
    a: {
        heading: 'Availability Type Code',
        definition: 'In appropriations accounts, the availability type code identifies an unlimited period to incur new obligations; this is denoted by the letter "X".',
        example: 'X'
    },
    main: {
        heading: 'Main Account Code',
        definition: 'The main account code identifies the account in statute.',
        example: '5531'
    },
    sub: {
        heading: 'Sub Account Code',
        definition: 'Sub Account Code (SUB) is a component of the TAS that identifies a Treasury-defined subdivision of a Federal Account (AID + MAIN). Most Federal Accounts do not have subdivisions. 000 is the default SUB; if 000 is the only SUB under a given Federal Account, it has not been subdivided.',
        example: '001'
    }
};
