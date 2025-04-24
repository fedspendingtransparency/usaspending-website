/**
 * RelatedAwards.jsx
 * Created by Lizzie Salita 12/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { TooltipWrapper } from 'data-transparency-ui';
import { Link } from 'react-router-dom';

import { formatNumber } from 'helpers/moneyFormatter';

import {
    summaryRelatedAwardsInfoIdv,
    summaryRelatedAwardsInfo
} from '../../shared/InfoTooltipContent';

const propTypes = {
    overview: PropTypes.object,
    jumpToSection: PropTypes.func,
    setRelatedAwardsTab: PropTypes.func,
    jumpToSubAwardHistoryTable: PropTypes.func,
    details: PropTypes.object
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
    };

    referencedAwardCounts() {
        const { details, overview } = this.props;
        if (!details) return null;
        let childData = [];
        if (overview.category === 'idv') {
            childData = [
                {
                    count: formatNumber(details.child_awards),
                    name: 'Child Award',
                    funcName: 'jumpToReferencedAwardsTableChildAwardsTab',
                    glossary: 'contract',
                    postText: details.child_awards === 1 ? 'Order' : 'Orders'
                },
                {
                    count: formatNumber(details.child_idvs),
                    name: 'Child IDV',
                    funcName: 'jumpToReferencedAwardsTableChildIDVsTab',
                    glossary: 'IDV',
                    postText: details.child_idvs === 1 ? 'Order' : 'Orders'
                },
                {
                    count: formatNumber(details.grandchild_awards),
                    name: 'Grandchild Award',
                    funcName: 'jumpToReferencedAwardsTableGrandchildAwardsTab',
                    glossary: 'award',
                    postText: details.grandchild_awards === 1 ? 'Order' : 'Orders'
                }
            ];
        }
        else {
            childData = [
                {
                    count: formatNumber(details.subawardCount),
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
        const awardTitle = 'Parent Award Unique Key';
        let parentLink = 'N/A';
        if (overview.parentAwardDetails.piid && overview.parentAwardDetails.awardId) {
            parentLink = (
                <Link
                    className="related-awards__link"
                    to={`/award/${overview.parentAwardDetails.awardId}`}>
                    {overview.parentAwardDetails.awardId}
                </Link>
            );
        }

        return (
            <div className="award-viz related-awards award-overview-column award-overview-column__spacing first">
                <h6 className="award-overview-title related-awards__title">
                    Related Awards
                    <TooltipWrapper
                        className="award-section-tt"
                        icon="info"
                        tooltipPosition="left"
                        tooltipComponent={tooltipInfo} />
                </h6>
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
        );
    }
}

RelatedAwards.propTypes = propTypes;
