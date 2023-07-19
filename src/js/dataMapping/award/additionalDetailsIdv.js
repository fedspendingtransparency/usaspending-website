/**
 * additionalDetailsIdv.js
 * Created by Lizzie Salita 6/20/19
 */

import { getSubmittingAgencyId } from "helpers/awardSummaryHelper";
import { idList } from '../shared/recipientIdentifiers';

const additionalDetails = (awardData) => {
    const {
        awardingAgency,
        fundingAgency,
        recipient,
        dates,
        parentAwardDetails
    } = awardData;

    const data = {
        uniqueAwardKey: {
            'Unique Award Key': awardData.generatedId,
            'Award or IDV Flag': 'Contract IDV',
            'Procurement Instrument Identifier (PIID)': awardData.piid,
            'Submitting Agency Identifier Code': getSubmittingAgencyId(awardData.generatedId)
        },
        agencyDetails: {
            'Awarding Agency': {
                type: 'link',
                data: {
                    path: (awardingAgency.agencySlug && awardingAgency.hasAgencyPage) ? `/agency/${awardingAgency.agencySlug}` : null,
                    title: awardingAgency.formattedToptier
                }
            },
            'Awarding Sub-Agency': awardingAgency.subtierName,
            'Awarding Office': awardingAgency.officeName,
            'Funding Agency': {
                type: 'link',
                data: {
                    path: (fundingAgency.agencySlug && fundingAgency.hasAgencyPage) ? `/agency/${fundingAgency.agencySlug}` : null,
                    title: fundingAgency.formattedToptier
                }
            },
            'Funding Sub-Agency': fundingAgency.subtierName,
            'Funding Office': fundingAgency.officeName
        },
        parentAwardDetails: {
            'Parent Award Unique Key': parentAwardDetails.awardId,
            'Parent Award ID (Parent PIID)': {
                type: 'link',
                data: {
                    path: parentAwardDetails.awardId ? `/award/${parentAwardDetails.awardId}` : null,
                    title: parentAwardDetails.piid
                }
            },
            'Parent IDV Type': parentAwardDetails.idvType || '',
            'Parent IDV Agency Name': {
                type: 'link',
                data: {
                    path: parentAwardDetails.agencySlug ?
                        `/agency/${parentAwardDetails.agencySlug}` : null,
                    title: parentAwardDetails.agencyName
                }
            },
            'Parent IDV Sub-Agency Name': parentAwardDetails.subAgencyName,
            'Multiple Or Single Parent Award IDV': parentAwardDetails.multipleOrSingle || ''
        },
        periodOfPerformance: {
            'Start Date': dates.startDate,
            'Ordering Period End Date': dates.endDate
        },
        legislativeMandates: {
            'Clinger-Cohen Act Compliant': awardData.additionalDetails.clingerCohenAct,
            'Subject to Construction Wage Rate Requirements': awardData.additionalDetails.constructionWageRateReq,
            'Subject to Labor Standards': awardData.additionalDetails.laborStandards,
            'Subject to Materials, Supplies, Articles & Equipment': awardData.additionalDetails.materialSuppliesArticlesEquip
        },
        recipientDetails: {
            Recipient: {
                type: 'link',
                data: {
                    path: recipient.internalId ? `/recipient/${recipient.internalId}/latest` : null,
                    title: recipient._name
                }
            },
            'Recipient Identifier': {
                type: 'list',
                data: idList(recipient.duns, recipient.uei)
            },
            'Parent Recipient': {
                type: 'link',
                data: {
                    path: recipient.parentInternalId ? `/recipient/${recipient.parentInternalId}/latest` : null,
                    title: recipient.parentName
                }
            },
            'Parent Recipient Identifier': {
                type: 'list',
                data: idList(recipient.parentDuns, recipient.parentUei)
            },
            'Recipient Address': {
                type: 'address',
                data: [
                    `${recipient.location.streetAddress}`,
                    `${recipient.location.regionalAddress}`,
                    `${recipient.location._country}`
                ]
            },
            'Congressional District': {
                type: 'address',
                data: [`${recipient.location.fullCongressionalDistrict}`]
            },
            'Business Types': {
                type: 'list',
                data: recipient.businessCategories || []
            }
        },
        acquisitionDetails: {
            'Product or Service Code (PSC)': awardData.additionalDetails.pscCode,
            'NAICS Code': awardData.additionalDetails.naicsCode,
            'DoD Claimant Code': awardData.additionalDetails.dodClaimantProgram,
            'Sea Transportation': awardData.additionalDetails.seaTransport
        },
        competitionDetails: {
            'Solicitation ID': awardData.additionalDetails.solicitationId,
            'Solicitation Procedures': awardData.additionalDetails.solicitationProcedures,
            'Number of Offers Received': awardData.additionalDetails.numberOffers,
            'Extent Competed': awardData.additionalDetails.extentCompeted,
            'Not Competed Reason': awardData.additionalDetails.notCompeted,
            'Set-Aside Type': awardData.additionalDetails.setAsideType,
            'Commercial Item Acquisition Procedures': awardData.additionalDetails.commercialAcquisitionProcedures,
            'Simplified Procedures for Certain Commercial Items': awardData.additionalDetails.commercialTestProgram,
            'Evaluated Preference': awardData.additionalDetails.evaluatedPreference,
            'Fed Biz Opps': awardData.additionalDetails.fedBizOpps,
            'Small Business Competitiveness Demonstration Program': awardData.additionalDetails.smallBusinessCompetitive
        },
        additionalDetails: {
            'IDV Type': awardData.additionalDetails.idvType,
            'IDC Type': awardData.additionalDetails.idcType,
            'National Interest Action': awardData.additionalDetails.nationalInterestActionDesc,
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
