/**
 * RelatedAwards.jsx
 * Created by Lizzie Salita 12/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { formatNumber } from 'helpers/moneyFormatter';
import InfoTooltip from '../../idv/InfoTooltip';
import { summaryRelatedAwardsInfo } from '../../idv/InfoTooltipContent';

const propTypes = {
    overview: PropTypes.object,
    jumpToSection: PropTypes.func,
    setRelatedAwardsTab: PropTypes.func,
    counts: PropTypes.object
};

export default class RelatedAwards extends React.Component {
    constructor(props) {
        super(props);

        this.jumpToReferencedAwardsTableChildAwardsTab =
        this.jumpToReferencedAwardsTableChildAwardsTab.bind(this);
        this.jumpToReferencedAwardsTableChildIDVsTab =
        this.jumpToReferencedAwardsTableChildIDVsTab.bind(this);
        this.jumpToReferencedAwardsTableGrandchildAwardsTab =
        this.jumpToReferencedAwardsTableGrandchildAwardsTab.bind(this);
    }

    jumpToReferencedAwardsTableChildAwardsTab() {
        this.props.setRelatedAwardsTab('child_awards');
        this.props.jumpToSection('referenced-awards');
    }
    jumpToReferencedAwardsTableChildIDVsTab() {
        this.props.setRelatedAwardsTab('child_idvs');
        this.props.jumpToSection('referenced-awards');
    }
    jumpToReferencedAwardsTableGrandchildAwardsTab() {
        this.props.setRelatedAwardsTab('grandchild_awards');
        this.props.jumpToSection('referenced-awards');
    }

    referencedAwardCounts() {
        const { counts } = this.props;
        if (!counts) return null;
        const childData = [
            {
                count: formatNumber(counts.child_awards),
                name: 'Child Award',
                funcName: 'ChildAwards',
                glossary: 'contract'
            },
            {
                count: formatNumber(counts.child_idvs),
                name: 'Child IDV',
                funcName: 'ChildIDVs',
                glossary: 'IDV'
            },
            {
                count: formatNumber(counts.grandchild_awards),
                name: 'Grandchild Award',
                funcName: 'GrandchildAwards',
                glossary: 'award'
            }
        ];

        return (
            <div className="related-awards__label related-awards__label_count">
                <div className="related-awards__counts">
                    {map(childData, (data) => (
                        <button
                            key={`${data.glossary}count`}
                            className="award-viz__button"
                            onClick={this[`jumpToReferencedAwardsTable${data.funcName}Tab`]}>
                            {data.count}
                        </button>
                    ))}
                </div>
                <div className="related-awards__description">
                    {map(childData, (data) => (
                        <div key={`${data.glossary}text`} className="related-awards__text">
                            {data.name} {data.count === 1 ? 'Order' : 'Orders'}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    render() {
        let parentLink = 'N/A';
        if (this.props.overview.parentAward && this.props.overview.parentId) {
            parentLink = (
                <a
                    className="related-awards__link"
                    href={`#/award/${this.props.overview.parentId}`}>
                    {this.props.overview.parentAward}
                </a>
            );
        }

        return (
            <div className="award-viz related-awards">
                <div className="award-overview__title related-awards__title">
                    Related Awards
                    <InfoTooltip left>
                        {summaryRelatedAwardsInfo}
                    </InfoTooltip>
                </div>
                <div className="related-awards__parent">
                    <div className="related-awards__label">
                        Parent Award
                    </div>
                    {parentLink}
                </div>
                <div className="related-awards__children">
                    {this.referencedAwardCounts()}
                </div>
            </div>
        );
    }
}

RelatedAwards.propTypes = propTypes;
