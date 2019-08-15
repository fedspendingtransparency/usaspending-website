/**
 * ContractContent.jsx
 * Created by David Trinh 10/9/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import { Glossary } from 'components/sharedComponents/icons/Icons';
import { glossaryLinks } from 'dataMapping/search/awardType';
import AdditionalInfo from '../shared/additionalInfo/AdditionalInfo';
import AgencyRecipient from '../shared/overview/AgencyRecipient';
import AwardDates from '../shared/overview/AwardDates';
import { AwardSection, AwardPageWrapper } from '../shared';

const propTypes = {
    awardId: PropTypes.string,
    overview: PropTypes.object,
    jumpToSection: PropTypes.func
};

export default class ContractContent extends React.Component {
    render() {
        const glossarySlug = glossaryLinks[this.props.overview.type];
        let glossaryLink = null;
        if (glossarySlug) {
            glossaryLink = (
                <a href={`/#/award_v2/${this.props.awardId}?glossary=${glossarySlug}`}>
                    <Glossary />
                </a>
            );
        }
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
                <AdditionalInfo overview={this.props.overview} />
            </AwardPageWrapper>
        );
    }
}

ContractContent.propTypes = propTypes;
