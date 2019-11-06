/**
 * RelatedAwards.jsx
 * Created by Lizzie Salita 12/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { formatNumber } from 'helpers/moneyFormatter';
import InfoTooltip from '../../shared/InfoTooltip';
import { summaryRelatedAwardsInfoIdv, summaryRelatedAwardsInfo } from '../../shared/InfoTooltipContent';
import AwardSection from '../AwardSection';

const propTypes = {
    overview: PropTypes.object,
    jumpToSection: PropTypes.func,
    setRelatedAwardsTab: PropTypes.func,
    jumpToSubAwardHistoryTable: PropTypes.func,
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
    jumpToAwardHistoryTableSubAwardsTab = () => {
        this.props.jumpToSubAwardHistoryTable('subaward');
        this.props.jumpToSection('award-history');
    }

    referencedAwardCounts() {
        const { counts, overview } = this.props;
        if (!counts) return null;
        let childData = [];
        if (overview.category === 'idv') {
            childData = [
                {
                    count: formatNumber(counts.child_awards),
                    name: 'Child Award',
                    funcName: 'jumpToReferencedAwardsTableChildAwardsTab',
                    glossary: 'contract',
                    postText: counts.child_awards === 1 ? 'Order' : 'Orders'
                },
                {
                    count: formatNumber(counts.child_idvs),
                    name: 'Child IDV',
                    funcName: 'jumpToReferencedAwardsTableChildIDVsTab',
                    glossary: 'IDV',
                    postText: counts.child_idvs === 1 ? 'Order' : 'Orders'
                },
                {
                    count: formatNumber(counts.grandchild_awards),
                    name: 'Grandchild Award',
                    funcName: 'jumpToReferencedAwardsTableGrandchildAwardsTab',
                    glossary: 'award',
                    postText: counts.grandchild_awards === 1 ? 'Order' : 'Orders'
                }
            ];
        }
        else {
            childData = [
                {
                    count: formatNumber(counts.subawardCount),
                    name: 'Sub-Awards',
                    funcName: 'jumpToAwardHistoryTableSubAwardsTab',
                    glossary: 'contract',
                    postText: ''
                }
            ];
        }
        return (
            <div className="related-awards__label related-awards__label_count">
                <div className="related-awards__counts">
                    {map(childData, (data) => (
                        <button
                            key={`${data.glossary}count`}
                            className="award-viz__button"
                            onClick={this[`${data.funcName}`]}>
                            {data.count}
                        </button>
                    ))}
                </div>
                <div className="related-awards__description">
                    {map(childData, (data) => (
                        <div key={`${data.glossary}text`} className="related-awards__text">
                            {data.name} {data.postText}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    tooltipInfo() {
        const { overview } = this.props;
        const awardType = overview.category;
        if (awardType === 'idv') return summaryRelatedAwardsInfoIdv;
        if (awardType === 'contract') return summaryRelatedAwardsInfo;
        if (awardType === 'definitive contract') return null;
        if (awardType === 'grant') return null;
        if (awardType === 'loan') return null;
        if (awardType === 'direct payment') return null;
        if (awardType === 'other') return null;

        return null;
    }

    render() {
        const { overview } = this.props;
        const tooltipInfo = this.tooltipInfo();
        const awardTitle = overview.category === 'idv' ? 'Parent Award' : 'Parent IDV';
        let parentLink = 'N/A';
        if (overview.parentAwardDetails.piid && overview.parentAwardDetails.awardId) {
            parentLink = (
                <a
                    className="related-awards__link"
                    href={`#/award/${overview.parentAwardDetails.awardId}`}>
                    {overview.parentAwardDetails.piid}
                </a>
            );
        }

        return (
            <AwardSection type="column">
                <div className="award-viz related-awards">
                    <div className="award-overview__title related-awards__title">
                        Related Awards
                        <InfoTooltip left>
                            {tooltipInfo}
                        </InfoTooltip>
                    </div>
                    <div className="related-awards__parent">
                        <div className="related-awards__label">
                            {awardTitle}
                        </div>
                        {parentLink}
                    </div>
                    <div className="related-awards__children">
                        {this.referencedAwardCounts()}
                    </div>
                </div>
            </AwardSection>
        );
    }
}

RelatedAwards.propTypes = propTypes;
