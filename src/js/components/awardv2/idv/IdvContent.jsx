/**
 * IdvContent.jsx
 * Created by Lizzie Salita 12/3/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import ReferencedAwardsContainer from 'containers/awardV2/idv/ReferencedAwardsContainer';
import { Glossary } from 'components/sharedComponents/icons/Icons';
import { glossaryLinks } from 'dataMapping/search/awardType';
import AwardHistory from './AwardHistory';
import AgencyRecipient from '../visualizations/overview/AgencyRecipient';
import RelatedAwards from '../visualizations/overview/RelatedAwards';
import IdvDates from './IdvDates';
import AwardDescription from '../visualizations/description/AwardDescription';
import AwardAmounts from '../visualizations/amounts/AwardAmounts';
import AdditionalInfo from '../contract/AdditionalInfo';
import ComingSoonSection from "./ComingSoonSection";
import AwardMetaDataContainer from '../../../containers/awardV2/idv/AwardMetaDataContainer';
import { AWARD_V2_OVERVIEW_PROPS, AWARD_V2_COUNTS_PROPS } from '../../../propTypes';

const propTypes = {
    awardId: PropTypes.string,
    counts: AWARD_V2_COUNTS_PROPS,
    overview: AWARD_V2_OVERVIEW_PROPS,
    jumpToSection: PropTypes.func
};

export default class IdvContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            awardHistoryActiveTab: 'transaction' // or fedaccount
        };

        this.setActiveTab = this.setActiveTab.bind(this);
        this.jumpToFederalAccountsHistory = this.jumpToFederalAccountsHistory.bind(this);
    }

    setActiveTab(activeTab = 'transaction') {
        this.setState({
            awardHistoryActiveTab: activeTab
        });
    }

    jumpToFederalAccountsHistory() {
        this.setState({
            awardHistoryActiveTab: 'fedaccount'
        });
        this.props.jumpToSection('award-history');
    }

    render() {
        const glossarySlug = glossaryLinks[this.props.overview.type];
        let glossaryLink = null;
        if (glossarySlug) {
            glossaryLink = (
                <a href={`/#/award/${this.props.awardId}?glossary=${glossarySlug}`}>
                    <Glossary />
                </a>
            );
        }
        return (
            <div className="award award-idv">
                <div className="idv__heading">
                    <div className="idv__info">
                        <div className="award__heading-text">
                            {this.props.overview.longTypeDescription}
                        </div>
                        <div className="award__heading-icon">
                            {glossaryLink}
                        </div>
                        <div className="award__heading-id">
                            <div className="award__heading-lable">
                                {this.props.overview.id ? "PIID" : ""}
                            </div>
                            <div>{this.props.overview.id}</div>
                        </div>
                    </div>
                    <div className="idv__last-modified">
                Last Modified On:{" "}
                        <span className="idv__last-modified idv__last-modified_date">
                            {this.props.overview.dates.lastModifiedDateLong}
                        </span>
                    </div>
                </div>
                <hr />
                <div
                    className="award__row award-overview"
                    id="award-overview">
                    <AgencyRecipient
                        jumpToSection={this.props.jumpToSection}
                        awardingAgency={this.props.overview.awardingAgency}
                        category="idv"
                        recipient={this.props.overview.recipient} />
                    <RelatedAwards
                        counts={this.props.counts}
                        jumpToSection={this.props.jumpToSection}
                        overview={this.props.overview} />
                    <IdvDates
                        dates={this.props.overview.dates} />
                </div>
                <div className="award__row">
                    <AwardAmounts
                        jumpToSection={this.props.jumpToSection}
                        awardId={this.props.awardId}
                        overview={this.props.overview} />
                    <AwardDescription
                        awardId={this.props.awardId}
                        description={this.props.overview.description}
                        naics={this.props.overview.additionalDetails.naicsCode}
                        psc={this.props.overview.additionalDetails.pscCode} />
                </div>
                <div className="award__row">
                    <ComingSoonSection includeHeader title="IDV Activity" icon="chart-area" />
                    <AwardMetaDataContainer jumpToFederalAccountsHistory={this.jumpToFederalAccountsHistory} />
                </div>
                <ReferencedAwardsContainer />
                <AwardHistory activeTab={this.state.awardHistoryActiveTab} setActiveTab={this.setActiveTab} overview={this.props.overview} />
                <AdditionalInfo overview={this.props.overview} />
            </div>
        );
    }
}

IdvContent.propTypes = propTypes;
