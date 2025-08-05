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
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/award/${obj.generated_internal_id}`}
            onClick={() => {
                this.clickHandler(obj['Award ID']);
            }}>{obj['Award ID']}
        </a> || '--';
        obj.Mod || '--';
        obj['Recipient Name'] || '--';
        MoneyFormatter.formatMoneyWithPrecision(obj['Transaction Amount'], 2, "--");
        obj['Action Date'] || '--';
        <ReadMore
            text={obj['Transaction Description'] || '--'}
            limit={90} />;
        obj['Action Type'] || '--';
        obj['Award Type'] || '--';
        obj['Recipient UEI'] || 'UEI not provided';
        pickLocationFormat(obj['Recipient Location']);
        pickLocationFormat(obj['Primary Place of Performance']);
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={`/agency/${obj.agency_slug}`}
            onClick={() => {
                this.clickHandler(obj['Awarding Agency']);
            }}>{obj['Awarding Agency']}
        </a> || '--';
        obj['Awarding Sub Agency'] || '--';
        twoVariableFormat(obj['Assistance Listing'], 'cfda_number', 'cfda_title');
    }

};

export default ResultsTableRow;

