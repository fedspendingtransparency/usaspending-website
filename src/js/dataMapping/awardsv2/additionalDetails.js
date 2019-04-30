/**
 * additionalDetails.js
 * Created by Kwadwo Opoku-Debrah 12/17/18
 */

const additionalDetails = (awardData) => {
    const periodOfPerformanceData = awardData.periodOfPerformance || awardData.dates;
    const parentAwardDetails = awardData.parentAwardDetails;
    const data = {
        agencyDetails: {
            'Awarding Department': awardData.awardingAgency.formattedToptier,
            'Awarding Agency': awardData.awardingAgency.subtierName,
            'Awarding Office': awardData.awardingAgency.officeName,
            'Funding Department': awardData.fundingAgency.formattedToptier,
            'Funding Agency': awardData.fundingAgency.subtierName,
            'Funding Office': awardData.fundingAgency.officeName
        },
        parentAwardDetails: {
            'Parent Award ID': parentAwardDetails ? parentAwardDetails.piid : '',
            'IDV Type': parentAwardDetails ? parentAwardDetails.idvType : '',
            'IDC Type': parentAwardDetails ? parentAwardDetails.idcType : '',
            'IDV Agency Identifier': parentAwardDetails ? parentAwardDetails.agencyId : '',
            'Multiple Or Single Award IDV': parentAwardDetails ? parentAwardDetails.multipleOrSingle : ''
        },
        PlaceOfPerformance: {
            City: awardData.placeOfPerformance._city,
            State: awardData.placeOfPerformance._state,
            County: awardData.placeOfPerformance._county,
            'Zip Code': awardData.placeOfPerformance._zip,
            'Congressional District': awardData.placeOfPerformance._congressionalDistrict
        },
        PeriodOfPerformance: {
            'Start Date': periodOfPerformanceData.startDate,
            'Current End Date': periodOfPerformanceData.endDate,
            'Potential End Date': periodOfPerformanceData.lastModifiedDate
        },
        LegislativeMandates: {
            'Clinger-Cohen Act Compliant': awardData.additionalDetails.clingerCohenAct,
            'Subject to Construction Wage Rate Requirements': awardData.additionalDetails.constructionWageRateReq,
            'Subject to Labor Standards': awardData.additionalDetails.laborStandards,
            'Subject to Materials,Supplies, Articles & Equipment': awardData.additionalDetails.materialSuppliesArticlesEquip
        },
        AquisitionDetails: {
            'Product Service Code (PSC)': awardData.additionalDetails.pscCode,
            'NAICS Code': awardData.additionalDetails.naicsCode,
            'DoD Claimant Code': awardData.additionalDetails.dodClaimantCode,
            'DOD Acquisition Program': awardData.additionalDetails.dodAcquisitionProgram,
            'Information Technology Commercial Item': awardData.additionalDetails.infoTechCommercialItem,
            Category: awardData.itCommercialCategory,
            'Sea Transportation': awardData.additionalDetails.seaTransport
        },
        CompetitionDetails: {
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
            'Small Business Competetiveness Demonstration': awardData.additionalDetails.smallBusinessCompetitive,
            Program: awardData.additionalDetails.programAcronym
        },
        AdditionalDetails: {
            'IDV Type': awardData.additionalDetails.idvType,
            'IDC Type': awardData.additionalDetails.idcType,
            'IDV Agency Identifier': awardData.additionalDetails.idvAgencyId,
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
            'Consolidated Contract': awardData.additionalDetails.consolidated,
            'Total Obligation': awardData.additionalDetails.total_obligation,
            'Base Exercised Options': awardData.additionalDetails.base_exercised_options,
            'Base and All Options Value': awardData.additionalDetails.base_and_all_options
        }
    };

    return data;
};

export default additionalDetails;
