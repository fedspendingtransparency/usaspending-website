/**
 * additionalDetailsIdv.js
 * Created by Lizzie Salita 6/20/19
 */

const additionalDetails = (awardData) => {
    const {
        recipient,
        dates,
        parentAwardDetails
    } = awardData;
    const data = {
        agencyDetails: {
            'Awarding Agency': {
                type: 'link',
                data: {
                    path: awardData.awardingAgency.id ? `/#/agency/${awardData.awardingAgency.id}` : null,
                    title: awardData.awardingAgency.formattedToptier
                }
            },
            'Awarding Sub-Agency': awardData.awardingAgency.subtierName,
            'Awarding Office': awardData.awardingAgency.officeName,
            'Funding Agency': {
                type: 'link',
                data: {
                    path: awardData.fundingAgency.id ? `/#/agency/${awardData.fundingAgency.id}` : null,
                    title: awardData.fundingAgency.formattedToptier
                }
            },
            'Funding Sub-Agency': awardData.fundingAgency.subtierName,
            'Funding Office': awardData.fundingAgency.officeName
        },
        parentAwardDetails: {
            'Parent Award ID': {
                type: 'link',
                data: {
                    path: parentAwardDetails.awardId ? `/#/award/${parentAwardDetails.awardId}` : null,
                    title: parentAwardDetails.piid
                }
            },
            'Parent IDV Type': parentAwardDetails.idvType || '',
            'Parent IDV Agency Name': {
                type: 'link',
                data: {
                    // TODO - when backend updates the API response
                    // uncomment this link
                    // path: parentAwardDetails.agencyId ?
                    //     `/#/agency/${parentAwardDetails.agencyId}` : null,
                    path: null,
                    title: parentAwardDetails.agencyName
                }
            },
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
                    path: recipient.internalId ? `/#/recipient/${recipient.internalId}/latest` : null,
                    title: recipient._name
                }
            },
            DUNS: recipient.duns || '',
            'Parent Recipient': {
                type: 'link',
                data: {
                    path: recipient.parentInternalId ? `/#/recipient/${recipient.parentInternalId}/latest` : null,
                    title: recipient.parentName
                }
            },
            'Parent DUNS': recipient.parentDuns || '',
            'Recipient Address': {
                type: 'address',
                data: [
                    `${recipient.location.streetAddress}`,
                    `${recipient.location.regionalAddress}`,
                    `${recipient.location.fullCongressionalDistrict}`,
                    `${recipient.location._country}`
                ]
            },
            'Business Types': {
                type: 'list',
                data: recipient.businessCategories || []
            }
        },
        aquisitionDetails: {
            'Product or Service Code (PSC)': awardData.additionalDetails.pscCode,
            'NAICS Code': awardData.additionalDetails.naicsCode,
            'DoD Claimant Code': awardData.additionalDetails.dodClaimantProgram,
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
            'Simplified Procedures for Certain Commercial Items': awardData.additionalDetails.commercialTestProgram,
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
            'Program Acronym': awardData.additionalDetails.programAcronym,
            'Subcontracting Plan': awardData.additionalDetails.subcontractingPlan,
            'Multi Year Contract': awardData.additionalDetails.multiYearContract,
            'Consolidated Contract': awardData.additionalDetails.consolidated
        }
    };

    return data;
};

export default additionalDetails;
