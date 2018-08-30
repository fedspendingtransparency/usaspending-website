/**
 * additionalDetails.js
 * Created by Kevin Li 3/3/17
 */

export const agencyFields = [
    {
        label: 'Awarding Agency',
        field: '__special',
        parse: (data) => data.awardingAgency.name
    },
    {
        label: 'Awarding Sub-Agency',
        field: '__special',
        parse: (data) => data.awardingAgency.subtierName
    },
    {
        label: 'Awarding Office',
        field: '__special',
        parse: (data) => data.awardingAgency.officeName
    },
    {
        label: 'Funding Agency',
        field: '__special',
        parse: (data) => data.fundingAgency.name
    },
    {
        label: 'Funding Sub-Agency',
        field: '__special',
        parse: (data) => data.fundingAgency.subtierName
    },
    {
        label: 'Funding Office',
        field: '__special',
        parse: (data) => data.fundingAgency.officeName
    }
];

export const parentFields = [
    {
        label: 'Parent Award ID',
        field: 'parentAward'
    },
    {
        label: 'IDV Type',
        field: '__special',
        parse: (data) => data.additionalDetails.idvType
    },
    {
        label: 'IDC Type',
        field: '__special',
        parse: (data) => data.additionalDetails.idcType
    },
    {
        label: 'IDV Agency Identifier',
        field: '__special',
        parse: (data) => data.additionalDetails.idvAgencyId
    },
    {
        label: 'Multiple or Single Award IDV',
        field: '__special',
        parse: (data) => data.additionalDetails.multipleIdv
    }
];


export const competitionFields = [
    {
        label: 'Solicitation ID',
        field: 'solicitationId'
    },
    {
        label: 'Solicitation Procedures',
        field: 'solicitationProcedures'
    },
    {
        label: 'Number of Offers Received',
        field: 'numberOffers'
    },
    {
        label: 'Extent Competed',
        field: 'extentCompeted'
    },
    {
        label: 'Not Competed Reason',
        field: 'notCompeted'
    },
    {
        label: 'Set-Aside Type',
        field: 'setAsideType'
    },
    {
        label: 'Commercial Item Acquisition Procedures',
        field: 'commercialAcquisitionProcedures'
    },
    {
        label: 'Commercial Item Test Program',
        field: 'commercialTestProgram'
    },
    {
        label: 'Evaluated Preference',
        field: 'evaluatedPreference'
    },
    {
        label: 'FedBizOpps',
        field: 'fedBizOpps'
    },
    {
        label: 'Small Business Competitiveness Demonstration Program',
        field: 'smallBusinessCompetitivenessDemo'
    },
    {
        label: 'Fair Opportunity Limited Sources',
        field: 'fairOpportunityLimitedSources'
    }
];

export const pscFields = [
    {
        label: 'Product Service Code (PSC)',
        field: 'pscCode'
    },
    {
        label: 'NAICS Code',
        field: 'naicsCode'
    },
    {
        label: 'DoD Claimant Code',
        field: 'dodClaimantCode'
    },
    {
        label: 'DOD Acquisition Program',
        field: 'programSystemOrEquipmentCode'
    },
    {
        label: 'Information Technology Commercial Item Category',
        field: 'itCommercialCategory'
    },
    {
        label: 'Sea Transportation',
        field: 'seaTransport'
    }
];

export const legislativeFields = [
    {
        label: 'Clinger-Cohen Act Compliant',
        field: 'clingerCohenAct'
    },
    {
        label: 'Subject to Construction Wage Rate Requirements',
        field: 'constructionWageRateReq'
    },
    {
        label: 'Subject to Labor Standards',
        field: 'laborStandards'
    },
    {
        label: 'Subject to Materials, Supplies, Articles & Equip',
        field: 'materialSuppliesArticlesEquip'
    }
];

export const compensationFields = [
    {
        label: 'Officer 1',
        field: 'officer1'
    },
    {
        label: 'Officer 2',
        field: 'officer2'
    },
    {
        label: 'Officer 3',
        field: 'officer3'
    },
    {
        label: 'Officer 4',
        field: 'officer4'
    },
    {
        label: 'Officer 5',
        field: 'officer5'
    }
];

export const additionalFields = [
    {
        label: 'Cost or Pricing Data',
        field: 'costOrPricingData'
    },
    {
        label: 'Domestic or Foreign Entity',
        field: 'domesticForeign'
    },
    {
        label: 'Foreign Funding',
        field: 'foreignFunding'
    },
    {
        label: 'Interagency Contracting Authority',
        field: 'interagencyContactingAuthority'
    },
    {
        label: 'Major Program',
        field: 'majorProgram'
    },
    {
        label: 'Price Evaluation Adjustment Preference Percent Difference',
        field: 'priceEvaluationAdjustmentPreference'
    },
    {
        label: 'Program Acronym',
        field: 'programAcronym'
    },
    {
        label: 'Subcontracting Plan',
        field: 'subcontractingPlan'
    },
    {
        label: 'Multi Year Contract',
        field: 'multiYearContract'
    },
    {
        label: 'Purchase Card as Payment Method',
        field: 'purchaseCardAsPaymentMethod'
    },
    {
        label: 'Consolidated Contract',
        field: 'consolidated'
    }
];
