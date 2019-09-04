/**
 * ContractContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { glossaryLinks } from 'dataMapping/search/awardType';
import AdditionalInfo from '../shared/additionalInfo/AdditionalInfo';
import AgencyRecipient from '../shared/overview/AgencyRecipient';
import AwardDates from '../shared/overview/AwardDates';
import FederalAccountsSection from '../shared/federalAccounts/FederalAccountsSection';
import AwardPageWrapper from '../shared/AwardPageWrapper';
import AwardSection from '../shared/AwardSection';
import AwardAmountsSection from '../shared/awardAmountsSection/AwardAmountsSection';

const propTypes = {
    awardId: PropTypes.string,
    overview: PropTypes.object,
    jumpToSection: PropTypes.func
};

const defaultTooltipProps = {
    controlledProps: {
        isControlled: true,
        isVisible: false,
        closeCurrentTooltip: () => {},
        showTooltip: () => {}
    }
};

export default class ContractContent extends React.Component {
    render() {
        const glossarySlug = glossaryLinks[this.props.overview.type];
        const glossaryLink = glossarySlug
            ? `/#/award_v2/${this.props.awardId}?glossary=${glossarySlug}`
            : null;

        return (
            <AwardPageWrapper
                glossaryLink={glossaryLink}
                identifier={this.props.overview.id}
                awardTypeDescription={this.props.overview.typeDescription}
                awardType="contract">
                <AwardSection type="row" className="award-overview" id="award-overview">
                    <AwardSection type="column" className="award-amountdates">
                        <AgencyRecipient
                            jumpToSection={this.props.jumpToSection}
                            awardingAgency={this.props.overview.awardingAgency}
                            category="contract"
                            recipient={this.props.overview.recipient} />
                    </AwardSection>
                    <AwardSection type="column" className="award-amountdates">
                        <AwardDates overview={this.props.overview} />
                    </AwardSection>
                </AwardSection>
                <AwardSection type="row">
                    <AwardSection type="column">
                        <AwardAmountsSection
                            awardType={this.props.overview.category}
                            jumpToSection={this.props.jumpToSection}
                            awardOverview={this.props.overview}
                            tooltipProps={defaultTooltipProps} />
                    </AwardSection>
                    <AwardSection type="column">
                        <FederalAccountsSection />
                    </AwardSection>
                </AwardSection>
                <AdditionalInfo overview={this.props.overview} />
            </AwardPageWrapper>
        );
    }
}

ContractContent.propTypes = propTypes;
