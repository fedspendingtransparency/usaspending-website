/**
 * ResultsTableRow.js
 * Created by Nick Torres 8/4/2025
 */
import React from 'react';
import Analytics from 'helpers/analytics/Analytics';
import * as MoneyFormatter from 'helpers/moneyFormatter';
import { pickLocationFormat } from 'helpers/locationFormatter';
import ReadMore from '../../../components/sharedComponents/ReadMore';
import { twoVariableFormat } from '../../../helpers/search/tables/tableUtilsHelper';
import { convertToTitleCase } from "../../../helpers/searchHelper";

const ResultsTableRow = {
    clickHandler(linkName) {
        Analytics.event({
            category: 'Section table',
            action: `Clicked ${linkName}`
        });
    },
    assistanceListingFormat(assistanceListing) {
        // format for spending by award api
        if (assistanceListing?.length === 1) {
            const listing = assistanceListing[0];

            return `${listing.cfda_number} - ${listing.cfda_program_title}`;
        }
        else if (assistanceListing?.length > 1) {
            const listings = [];

            assistanceListing.forEach((listing) => {
                listings.push(`${listing.cfda_number} - ${listing.cfda_program_title}`);
            });

            return listings.join(', ');
        }

        return '--';
    },
    populateLoan(data) {
        this.awardId =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/award/${data.generated_internal_id}`}
            onClick={() => {
                this.clickHandler(data['Award ID']);
            }}>{data['Award ID']}
        </a> || '--';
        this.recipientName =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/recipient/${data.recipient_id}`}
            onClick={() => {
                this.clickHandler(data['Recipient Name']);
            }}>{data['Recipient Name']}
        </a> || '--';
        this.subsidyCost = MoneyFormatter.formatMoneyWithPrecision(data['Subsidy Cost'], 2, "--");
        this.loanValue = MoneyFormatter.formatMoneyWithPrecision(data['Loan Value'], 2, "--");
        this.description = (<ReadMore
            text={data.Description || '--'}
            limit={90} />);
        this.awardType = data['Contract Award Type'] || data['Award Type'] || '--';
        this.uei = data['Recipient UEI'] || 'UEI not provided';
        this.recipientLocation = pickLocationFormat(data['Recipient Location']);
        this.primaryPlaceOfPerformance = pickLocationFormat(data['Primary Place of Performance']);
        this.defc = data.def_codes || '--';
        this.covid19obligations = MoneyFormatter.formatMoneyWithPrecision(data['COVID-19 Obligations'], 2, "--");
        this.covid19outlays = MoneyFormatter.formatMoneyWithPrecision(data['COVID-19 Outlays'], 2, "--");
        this.infObligations = MoneyFormatter.formatMoneyWithPrecision(data['Infrastructure Obligations'], 2, "--");
        this.infOutlays = MoneyFormatter.formatMoneyWithPrecision(data['Infrastructure Outlays'], 2, "--");
        this.awardingAgency =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/agency/${data.agency_slug}`}
            onClick={() => {
                this.clickHandler(data['Awarding Agency']);
            }}>{data['Awarding Agency']}
        </a> || '--';
        this.awardingSubAgency = data['Awarding Sub Agency'] || '--';
        this.issuedDate = data['Issued Date'] || '--';
        this.assistanceListing = (<ReadMore
            text={this.assistanceListingFormat(data['Assistance Listings'])}
            limit={90} />);
    },
    populateDirectPayment(data) {
        this.generated_internal_id =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/award/${data.generated_internal_id}`}
            onClick={() => {
                this.clickHandler(data['Award ID']);
            }}>{data['Award ID']}
        </a> || '--';
        this.recipient_id =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/recipient/${data.recipient_id}`}
            onClick={() => {
                this.clickHandler(data['Recipient Name']);
            }}>{data['Recipient Name']}
        </a> || '--';
        this.awardAmount = MoneyFormatter.formatMoneyWithPrecision(data['Award Amount'], 2, "--");
        this.totalOutlays = MoneyFormatter.formatMoneyWithPrecision(data['Total Outlays'], 2, "--");
        this.description =
        (<ReadMore
            text={data.Description || '--'}
            limit={90} />);
        this.awardType =
        (<ReadMore
            text={data['Contract Award Type'] || data['Award Type'] || '--'}
            limit={65} />);
        this.recipientUEI = data['Recipient UEI'] || 'UEI not provided';
        this.recipientLocation = pickLocationFormat(data['Recipient Location']);
        this.primaryPlaceOfPerformance = pickLocationFormat(data['Primary Place of Performance']);
        this.defc = data.def_codes || '--';
        this.covid19obligations = MoneyFormatter.formatMoneyWithPrecision(data['COVID-19 Obligations'], 2, "--");
        this.covid19outlays = MoneyFormatter.formatMoneyWithPrecision(data['COVID-19 Outlays'], 2, "--");
        this.infObligations = MoneyFormatter.formatMoneyWithPrecision(data['Infrastructure Obligations'], 2, "--");
        this.infOutlays = MoneyFormatter.formatMoneyWithPrecision(data['Infrastructure Outlays'], 2, "--");
        this.awardingAgency =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/agency/${data.agency_slug}`}
            onClick={() => {
                this.clickHandler(data['Awarding Agency']);
            }}>{data['Awarding Agency']}
        </a> || '--';
        this.awardingSubAgency = data['Awarding Sub Agency'] || '--';
        this.startDate = data['Start Date'] || '--';
        this.endDate = data['End Date'] || '--';
        this.assistanceListing =
        (<ReadMore
            text={this.assistanceListingFormat(data['Assistance Listings'])}
            limit={90} />);
    },
    populateGrant(data) {
        this.generated_internal_id =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/award/${data.generated_internal_id}`}
            onClick={() => {
                this.clickHandler(data['Award ID']);
            }}>{data['Award ID']}
        </a> || '--';
        this.recipient_id =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/recipient/${data.recipient_id}`}
            onClick={() => {
                this.clickHandler(data['Recipient Name']);
            }}>{data['Recipient Name']}
        </a> || '--';
        this.awardAmount = MoneyFormatter.formatMoneyWithPrecision(data['Award Amount'], 2, "--");
        this.totalOutlays = MoneyFormatter.formatMoneyWithPrecision(data['Total Outlays'], 2, "--");
        this.description =
        (<ReadMore
            text={data.Description || '--'}
            limit={90} />);
        this.awardType = data['Contract Award Type'] || data['Award Type'] || '--';
        this.recipientUEI = data['Recipient UEI'] || 'UEI not provided';
        this.recipientLocation = pickLocationFormat(data['Recipient Location']);
        this.primaryPlaceOfPerformance = pickLocationFormat(data['Primary Place of Performance']);
        this.defc = data.def_codes || '--';
        this.covid19obligations = MoneyFormatter.formatMoneyWithPrecision(data['COVID-19 Obligations'], 2, "--");
        this.covid19outlays = MoneyFormatter.formatMoneyWithPrecision(data['COVID-19 Outlays'], 2, "--");
        this.infObligations = MoneyFormatter.formatMoneyWithPrecision(data['Infrastructure Obligations'], 2, "--");
        this.infOutlays = MoneyFormatter.formatMoneyWithPrecision(data['Infrastructure Outlays'], 2, "--");
        this.awardingAgency =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/agency/${data.agency_slug}`}
            onClick={() => {
                this.clickHandler(data['Awarding Agency']);
            }}>{data['Awarding Agency']}
        </a> || '--';
        this.awardingSubAgency = data['Awarding Sub Agency'] || '--';
        this.startDate = data['Start Date'] || '--';
        this.endDate = data['End Date'] || data['Last Date to Order'] || '--';
        this.assistanceListing =
        (<ReadMore
            text={this.assistanceListingFormat(data['Assistance Listings'])}
            limit={90} />);
    },
    populateContract(data) {
        this.awardId =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/award/${data.generated_internal_id}`}
            onClick={() => {
                this.clickHandler(data['Award ID']);
            }}>{data['Award ID']}
        </a> || '--';
        this.recipient_id =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/recipient/${data.recipient_id}`}
            onClick={() => {
                this.clickHandler(data['Recipient Name']);
            }}>{data['Recipient Name']}
        </a> || '--';
        this.awardAmount = MoneyFormatter.formatMoneyWithPrecision(data['Award Amount'], 2, "--");
        this.totalOutlays = MoneyFormatter.formatMoneyWithPrecision(data['Total Outlays'], 2, "--");
        this.description =
        (<ReadMore
            text={data.Description || '--'}
            limit={90} />);
        this.awardType = data['Contract Award Type'] || data['Award Type'] || '--';
        this.recipientUEI = data['Recipient UEI'] || 'UEI not provided';
        this.recipientLocation = pickLocationFormat(data['Recipient Location']);
        this.primaryPlaceOfPerformance = pickLocationFormat(data['Primary Place of Performance']);
        this.defc = data.def_codes || '--';
        this.covid19obligations = MoneyFormatter.formatMoneyWithPrecision(data['COVID-19 Obligations'], 2, "--");
        this.covid19outlays = MoneyFormatter.formatMoneyWithPrecision(data['COVID-19 Outlays'], 2, "--");
        this.infObligations = MoneyFormatter.formatMoneyWithPrecision(data['Infrastructure Obligations'], 2, "--");
        this.infOutlays = MoneyFormatter.formatMoneyWithPrecision(data['Infrastructure Outlays'], 2, "--");
        this.awardingAgency =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/agency/${data.agency_slug}`}
            onClick={() => {
                this.clickHandler(data['Awarding Agency']);
            }}>{data['Awarding Agency']}
        </a> || '--';
        this.awardingSubAgency = data['Awarding Sub Agency'] || '--';
        this.startDate = data['Start Date'] || '--';
        this.endDate = data['End Date'] || data['Last Date to Order'] || '--';
        this.naics =
        (<ReadMore
            text={twoVariableFormat(data.NAICS, 'code', 'description')}
            limit={80} />);
        this.psc =
        (<ReadMore
            text={twoVariableFormat(data.PSC, 'code', 'description')}
            limit={80} />);
    },
    populateTransactionContract(data) {
        this.awardId =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/award/${data.generated_internal_id}`}
            onClick={() => {
                this.clickHandler(data['Award ID']);
            }}>{data['Award ID']}
        </a> || '--';
        this.mod = data.Mod || '--';
        this.recipientName = data['Recipient Name'] || '--';
        this.transactionAmount = MoneyFormatter.formatMoneyWithPrecision(data['Transaction Amount'], 2, "--");
        this.actionDate = data['Action Date'] || '--';
        this.transactionDescription =
        (<ReadMore
            text={data['Transaction Description'] || '--'}
            limit={90} />);
        this.actionType = data['Action Type'] || '--';
        this.awardType = data['Award Type'] || '--';
        this.recipientUEI = data['Recipient UEI'] || 'UEI not provided';
        this.recipientLocation = pickLocationFormat(data['Recipient Location']);
        this.primaryPlaceOfPerformance = pickLocationFormat(data['Primary Place of Performance']);
        this.awardingAgency = data['Awarding Agency'] || '--';
        this.awardingSubAgency = data['Awarding Sub Agency'] || '--';
        this.naics =
        (<ReadMore
            text={twoVariableFormat(data.NAICS, 'code', 'description')}
            limit={80} />);
        this.psc =
        (<ReadMore
            text={twoVariableFormat(data.PSC, 'code', 'description')}
            limit={80} />);
    },
    populateTransactionDefault(data) {
        this.generated_internal_id =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/award/${data.generated_internal_id}`}
            onClick={() => {
                this.clickHandler(data['Award ID']);
            }}>{data['Award ID']}
        </a> || '--';
        this.mod = data.Mod || '--';
        this.recipientName = data['Recipient Name'] || '--';
        this.transactionAmount = MoneyFormatter.formatMoneyWithPrecision(data['Transaction Amount'], 2, "--");
        this.actionDate = data['Action Date'] || '--';
        this.transactionDescription =
        (<ReadMore
            text={data['Transaction Description'] || '--'}
            limit={90} />);
        this.actionType = data['Action Type'] || '--';
        this.awardType = data['Award Type'] || '--';
        this.recipientUEI = data['Recipient UEI'] || 'UEI not provided';
        this.recipientLocation = pickLocationFormat(data['Recipient Location']);
        this.primaryPlaceOfPerformance = pickLocationFormat(data['Primary Place of Performance']);
        this.awardingAgency =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/agency/${data.agency_slug}`}
            onClick={() => {
                this.clickHandler(data['Awarding Agency']);
            }}>{data['Awarding Agency']}
        </a> || '--';
        this.awardingSubAgency = data['Awarding Sub Agency'] || '--';
        this.cfda = twoVariableFormat(data['Assistance Listing'], 'cfda_number', 'cfda_title');
    },
    populateSubcontract(data) {
        this.subawardId =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/award/${data.prime_award_generated_internal_id}`}
            onClick={() => {
                this.clickHandler(data['Sub-Award ID']);
            }}>{data['Sub-Award ID']}
        </a> || '--';
        this.subawardeeName = data['Sub-Awardee Name'] || '--';
        this.subawardAmount = MoneyFormatter.formatMoneyWithPrecision(data['Sub-Award Amount'], 2, "--");
        this.subawardDate = data['Sub-Award Date'] || '--';
        this.subawardDesc =
        (<ReadMore
            text={data['Sub-Award Description'] || '--'}
            limit={90} />);
        this.subrecipientUEI = data['Sub-Recipient UEI'] || 'UEI not provided';
        this.subrecipientLocation = pickLocationFormat(data['Sub-Recipient Location']);
        this.subawardPPOP = pickLocationFormat(data['Sub-Award Primary Place of Performance']);
        this.subawardType = convertToTitleCase(data['Sub-Award Type']) || '--';
        this.prime_award_generated_internal_id =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/award/${data.prime_award_generated_internal_id}`}
            onClick={() => {
                this.clickHandler(data['Prime Award ID']);
            }}>{data['Prime Award ID']}
        </a> || '--';
        this.prime_award_recipient_id =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/recipient/${data.prime_award_recipient_id}`}
            onClick={() => {
                this.clickHandler(data['Prime Recipient Name']);
            }}>{data['Prime Recipient Name']}
        </a> || '--';
        this.primeUEI = data['Prime Award Recipient UEI'] || 'UEI not provided';
        this.awardingAgency = data['Awarding Agency'] || '--';
        this.awardingSubAgency = data['Awarding Sub Agency'] || '--';
        this.naics =
        (<ReadMore
            text={twoVariableFormat(data.NAICS, 'code', 'description')}
            limit={80} />);
        this.psc =
        (<ReadMore
            text={twoVariableFormat(data.PSC, 'code', 'description')}
            limit={80} />);
    },
    populateDefault(data) {
        this.subawardId =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/award/${data.prime_award_generated_internal_id}`}
            onClick={() => {
                this.clickHandler(data['Sub-Award ID']);
            }}>{data['Sub-Award ID']}
        </a> || '--';
        this.subawardeeName = data['Sub-Awardee Name'] || '--';
        this.subawardAmount = MoneyFormatter.formatMoneyWithPrecision(data['Sub-Award Amount'], 2, "--");
        this.subawardDate = data['Sub-Award Date'] || '--';
        this.subawardDesc =
        (<ReadMore
            text={data['Sub-Award Description'] || '--'}
            limit={90} />);
        this.subrecipientUEI = data['Sub-Recipient UEI'] || 'UEI not provided';
        this.subrecipientLocation = pickLocationFormat(data['Sub-Recipient Location']);
        this.subawardPPOP = pickLocationFormat(data['Sub-Award Primary Place of Performance']);
        this.subawardType = convertToTitleCase(data['Sub-Award Type']) || '--';
        this.prime_award_generated_internal_id =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/award/${data.prime_award_generated_internal_id}`}
            onClick={() => {
                this.clickHandler(data['Prime Award ID']);
            }}>{data['Prime Award ID']}
        </a> || '--';
        this.prime_award_recipient_id =
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/recipient/${data.prime_award_recipient_id}`}
            onClick={() => {
                this.clickHandler(data['Prime Recipient Name']);
            }}>{data['Prime Recipient Name']}
        </a> || '--';
        this.prime_award_recipient_UEI = data['Prime Award Recipient UEI'] || 'UEI not provided';
        this.awardingAgency = data['Awarding Agency'] || '--';
        this.awardingSubAgency = data['Awarding Sub Agency'] || '--';
        this.assistanceListing = twoVariableFormat(data["Assistance Listing"], 'cfda_number', 'cfda_program_title');
    }
};

export default ResultsTableRow;

