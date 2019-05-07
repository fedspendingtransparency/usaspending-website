/**
 * additionalDetails.js
 * Created by Kwadwo Opoku-Debrah 12/17/18
 */

const additionalDetails = (awardData) => {
    const periodOfPerformanceData = awardData.periodOfPerformance || awardData.dates;
    const parentAwardDetails = awardData.parentAwardDetails;
    const data = {
        agencyDetails: {
            'Awarding Agency': awardData.awardingAgency.formattedToptier,
            'Awarding Sub-Agency': awardData.awardingAgency.subtierName,
            'Awarding Office': awardData.awardingAgency.officeName,
            'Funding Agency': awardData.fundingAgency.formattedToptier,
            'Funding Sub-Agency': awardData.fundingAgency.subtierName,
            'Funding Office': awardData.fundingAgency.officeName
        },
        parentAwardDetails: {
            'Parent Award ID': parentAwardDetails ? parentAwardDetails.piid : '',
            'Parent IDV Type': parentAwardDetails ? parentAwardDetails.idvType : '',
            'Parent IDV Agency Identifier': parentAwardDetails ? parentAwardDetails.agencyId : '',
            'Multiple Or Single Parent Award IDV': parentAwardDetails ? parentAwardDetails.multipleOrSingle : ''
        },
        placeOfPerformance: {
            City: awardData.placeOfPerformance._city,
            State: awardData.placeOfPerformance._state,
            County: awardData.placeOfPerformance._county,
            'Zip Code': awardData.placeOfPerformance._zip,
            'Congressional District': awardData.placeOfPerformance._congressionalDistrict
        },
        periodOfPerformance: {
            'Start Date': periodOfPerformanceData.startDate,
            'Current End Date': periodOfPerformanceData.endDate,
            'Potential End Date': periodOfPerformanceData.lastModifiedDate
        },
        idvPeriodOfPerformance: {
            'Start Date': periodOfPerformanceData.startDate,
            'Last Date to Order': periodOfPerformanceData.endDate
        },
        legislativeMandates: {
            'Clinger-Cohen Act Compliant': awardData.additionalDetails.clingerCohenAct,
            'Subject to Construction Wage Rate Requirements': awardData.additionalDetails.constructionWageRateReq,
            'Subject to Labor Standards': awardData.additionalDetails.laborStandards,
            'Subject to Materials, Supplies, Articles & Equipment': awardData.additionalDetails.materialSuppliesArticlesEquip
        },
        aquisitionDetails: {
            'Product Service Code (PSC)': awardData.additionalDetails.pscCode,
            'NAICS Code': awardData.additionalDetails.naicsCode,
            'DoD Claimant Code': awardData.additionalDetails.dodClaimantProgram,
            'DOD Acquisition Program': awardData.additionalDetails.dodAcquisitionProgram,
            'Information Technology Commercial Item Category': awardData.additionalDetails.infoTechCommercialItem,
            'Sea Transportation': awardData.additionalDetails.seaTransport
        },
        competitionDetails: {
            'Solicitation ID': awardData.additionalDetails.solicitationId,
            'Solicitation Procedures': awardData.additionalDetails.solicitationProcedures,
            'Number of Offers Received': awardData.additionalDetails.numberOffers,
            'Extent Completed': awardData.additionalDetails.extentCompeted,
            'Not Completed Reason': awardData.additionalDetails.notCompeted,
            'Set-Aside Type': awardData.additionalDetails.setAsideType,
            'Commercial Item Aquisition Procedures': awardData.additionalDetails.commercialAcquisitionProcedures,
            'Commercial Item Test Program': awardData.additionalDetails.commercialTestProgram,
            'Evaluated Preference': awardData.additionalDetails.evaluatedPreference,
            'Fed Biz Opps': awardData.additionalDetails.fedBizOpps,
            'Small Business Competitiveness Demonstration Program': awardData.additionalDetails.smallBusinessCompetitive
        },
        additionalDetails: {
            'IDV Type': awardData.additionalDetails.idvType,
            'IDC Type': awardData.additionalDetails.idcType,
            'Multiple Or Single Award IDV': awardData.additionalDetails.multipleIdv,
            'Cost or Pricing Data': awardData.additionalDetails.costOrPricingData,
            'Domestic or Foreign Entity': awardData.additionalDetails.domesticForeign,
            'Fair Opportunity Limited Sources': awardData.additionalDetails.fairOpportunityLimitedSources,
            'Foreign Funding': awardData.additionalDetails.foreignFunding,
            'Interagency Contracting Authority': awardData.additionalDetails.interagencyContactingAuthority,
            'Major Program': awardData.additionalDetails.majorProgram,
            'Price Evaluation Adjustment Preference Percent Difference': awardData.additionalDetails.priceEvaluationAdjustmentPreference,
            'Program Acronym': awardData.additionalDetails.programAcronym,
            'Subcontracting Plan': awardData.additionalDetails.subcontractingPlan,
            'Multi Year Contract': awardData.additionalDetails.multiYearContract,
            'Purchase Card as Payment Method': awardData.additionalDetails.purchaseCardAsPaymentMethod,
            'Consolidated Contract': awardData.additionalDetails.consolidated
        },
        idvAdditionalDetails: {
            'IDV Type': awardData.additionalDetails.idvType,
            'IDC Type': awardData.additionalDetails.idcType,
            'Multiple Or Single Award IDV': awardData.additionalDetails.multipleIdv,
            'Cost or Pricing Data': awardData.additionalDetails.costOrPricingData,
            'Domestic or Foreign Entity': awardData.additionalDetails.domesticForeign,
            'Fair Opportunity Limited Sources': awardData.additionalDetails.fairOpportunityLimitedSources,
            'Foreign Funding': awardData.additionalDetails.foreignFunding,
            'Interagency Contracting Authority': awardData.additionalDetails.interagencyContactingAuthority,
            'Major Program': awardData.additionalDetails.majorProgram,
            'Program Acronym': awardData.additionalDetails.programAcronym,
            'Subcontracting Plan': awardData.additionalDetails.subcontractingPlan,
            'Multi Year Contract': awardData.additionalDetails.multiYearContract,
            'Consolidated Contract': awardData.additionalDetails.consolidated
        }
    };

    return data;
};

export default additionalDetails;
