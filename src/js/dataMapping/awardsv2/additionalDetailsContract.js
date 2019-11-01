/**
 * additionalDetails.js -> additonalDetailsContracts.js
 * Created by Kwadwo Opoku-Debrah 12/17/18
 */

const additionalDetailsContracts = (awardData) => {
    const {
        awardingAgency,
        fundingAgency,
        parentAwardDetails,
        periodOfPerformance,
        placeOfPerformance,
        recipient
    } = awardData;
    const data = {
        agencyDetails: {
            'Awarding Agency': {
                type: 'link',
                data: {
                    path: awardingAgency.id ? `/#/agency/${awardingAgency.id}` : null,
                    title: awardingAgency.formattedToptier
                }
            },
            'Awarding Sub-Agency': {
                type: 'link',
                data: {
                    path: awardingAgency.subtierId ? `/#/agency/${awardingAgency.subtierId}` : null,
                    title: awardingAgency.subtierName
                }
            },
            'Awarding Office': {
                type: 'link',
                data: {
                    path: awardingAgency.officeId ? `/#/agency/${awardingAgency.officeId}` : null,
                    title: awardingAgency.officeName
                }
            },
            'Funding Agency': {
                type: 'link',
                data: {
                    path: fundingAgency.id ? `/#/agency/${fundingAgency.id}` : null,
                    title: fundingAgency.formattedToptier
                }
            },
            'Funding Sub-Agency': {
                type: 'link',
                data: {
                    path: fundingAgency.subtierId ? `/#/agency/${fundingAgency.subtierId}` : null,
                    title: fundingAgency.subtierName
                }
            },
            'Funding Office': {
                type: 'link',
                data: {
                    path: fundingAgency.officeId ? `/#/agency/${fundingAgency.officeId}` : null,
                    title: fundingAgency.officeName
                }
            }
        },
        parentAwardDetails: {
            'Parent IDV PIID': {
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
                    path: parentAwardDetails.agencyId ?
                        `/#/agency/${parentAwardDetails.agencyId}` : null,
                    title: parentAwardDetails.agencyName
                }
            },
            'Multiple Or Single Parent Award IDV': parentAwardDetails.multipleOrSingle || ''
        },
        placeOfPerformance: {
            Address: {
                type: 'address',
                data: [
                    `${placeOfPerformance.regionalAddress}`,
                    `${placeOfPerformance.fullCongressionalDistrict}`,
                    `${placeOfPerformance._country}`
                ]
            }
        },
        periodOfPerformance: {
            'Start Date': periodOfPerformance.startDate,
            'End Date': periodOfPerformance.endDate,
            'Potential End Date': periodOfPerformance.potentialEndDate
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
                    path: recipient.internalId ? `/#/recipient/${recipient.internalId}` : null,
                    title: recipient._name
                }
            },
            DUNS: recipient.duns || '',
            'Parent Recipient': {
                type: 'link',
                data: {
                    path: recipient.parentInternalId ?
                        `/#/recipient/${recipient.parentInternalId}` : null,
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
            'Product Service Code (PSC)': awardData.additionalDetails.pscCode,
            'North American Industry Classification System (NAICS) Code': awardData.additionalDetails.naicsCode,
            'DoD Claimant Code': awardData.additionalDetails.dodClaimantProgram,
            'DOD Acquisition Program': awardData.additionalDetails.dodAcquisitionProgram,
            'Information Technology Commercial Item Category': awardData.additionalDetails._infoTechCommercialItemDescription,
            'Sea Transportation': awardData.additionalDetails.seaTransport
        },
        competitionDetails: {
            'Solicitation ID': awardData.additionalDetails.solicitationId,
            'Solicitation Procedures': awardData.additionalDetails.solicitationProcedures,
            'Number of Offers Received': awardData.additionalDetails.numberOffers,
            'Extent Completed': awardData.additionalDetails.extentCompeted,
            'Other Than Full and Open Competition': awardData.additionalDetails.notCompeted,
            'Set-Aside Type': awardData.additionalDetails.setAsideType,
            'Commercial Item Aquisition Procedures': awardData.additionalDetails.commercialAcquisitionProcedures,
            'Simplified Procedures for Certain Commercial Items': awardData.additionalDetails.commercialTestProgram,
            'Evaluated Preference': awardData.additionalDetails.evaluatedPreference,
            'Fed Biz Opps': awardData.additionalDetails.fedBizOpps,
            'Small Business Competitiveness Demonstration Program': awardData.additionalDetails.smallBusinessCompetitive
        },
        additionalDetails: {
            'Contract Type': awardData.typeDescription,
            'Cost or Pricing Data': awardData.additionalDetails.costOrPricingData,
            'Domestic or Foreign Entity': awardData.additionalDetails.domesticForeign,
            'Fair Opportunity Limited Sources': awardData.additionalDetails.fairOpportunityLimitedSources,
            'Foreign Funding': awardData.additionalDetails.foreignFunding,
            'Interagency Contracting Authority': awardData.additionalDetails.interagencyContactingAuthority,
            'Major Program': awardData.additionalDetails.majorProgram,
            'Subcontracting Plan': awardData.additionalDetails.subcontractingPlan,
            'Multi Year Contract': awardData.additionalDetails.multiYearContract,
            'Consolidated Contract': awardData.additionalDetails.consolidated
        }
    };

    return data;
};

export default additionalDetailsContracts;
