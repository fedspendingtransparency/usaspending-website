/**
 * RelatedAwards.jsx
 * Created by Lizzie Salita 12/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { Glossary } from 'components/sharedComponents/icons/Icons';
import InfoTooltip from '../../idv/InfoTooltip';

const propTypes = {
    overview: PropTypes.object,
    jumpToSection: PropTypes.func,
    counts: PropTypes.object,
    awardId: PropTypes.string
};

export default class RelatedAwards extends React.Component {
    constructor(props) {
        super(props);

        this.jumpToReferencedAwardsTable = this.jumpToReferencedAwardsTable.bind(this);
    }
    jumpToReferencedAwardsTable() {
        this.props.jumpToSection('referenced-awards');
    }

    referencedAwardCounts() {
        const { counts } = this.props;
        if (!counts) return null;
        const childData = [
            {
                count: counts.child_award_count,
                name: 'Child Award',
                glossary: 'contract'
            },
            {
                count: counts.child_idv_count,
                name: 'Child IDV',
                glossary: 'IDV'
            },
            {
                count: counts.grandchild_award_count,
                name: 'Grandchild Award',
                glossary: 'award'
            }
        ];

        return map(childData, (data) => (
            <div key={data.glossary} className="related-awards__label related-awards__label_count">
                <button
                    onClick={this.jumpToReferencedAwardsTable}
                    className="award-viz__button">
                    {data.count}
                </button>
                {data.name} {data.count === 1 ? 'Order' : 'Orders'}
                <div className="related-awards__glossary-icon">
                    <a href={`/#/award/${this.props.awardId}?glossary=${data.glossary}`}>
                        <Glossary />
                    </a>
                </div>
            </div>
        ));
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
                        <div className="info-tooltip__title">
                            Related Awards
                        </div>
                        <div className="info-tooltip__text">
                            <p>
                                Related Awards refers to two possible types of awards related to this IDV:
                            </p>
                            <ul>
                                <li>
                                    <strong>Parent Award</strong> – The parent award is an IDV award that this contract was made under.  Click on the link to view more information on this award&apos;s parent.
                                </li>
                                <li>
                                    <strong>Award Orders Under this IDV</strong> – This is a count of how many awards were made under this IDV.  Click on the link to see more information about all of those orders.
                                </li>
                            </ul>
                        </div>
                    </InfoTooltip>
                </div>
                <div className="related-awards__parent">
                    <div className="related-awards__label">
                        Parent Award
                    </div>
                    {parentLink}
                </div>
                {this.referencedAwardCounts()}
            </div>
        );
    }
}

RelatedAwards.propTypes = propTypes;
