/**
 * RelatedAwards.jsx
 * Created by Lizzie Salita 12/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'components/sharedComponents/icons/Icons';

import InfoTooltip from '../../idv/InfoTooltip';

const propTypes = {
    overview: PropTypes.object,
    jumpToSection: PropTypes.func,
    counts: PropTypes.object
};

export default class RelatedAwards extends React.Component {
    constructor(props) {
        super(props);

        this.jumpToReferencedAwardsTable = this.jumpToReferencedAwardsTable.bind(this);
    }
    jumpToReferencedAwardsTable() {
        this.props.jumpToSection('referenced-awards');
    }
    render() {
        let parentLink = 'N/A';
        if (this.props.overview.parentAward && this.props.overview.parentId) {
            parentLink = (
                <a
                    className="related-awards__link"
                    href={`#/award_v2/${this.props.overview.parentId}`}>
                    {this.props.overview.parentAward}
                </a>
            );
        }
        let referencedCount = null;
        if (this.props.counts) {
            referencedCount = (
                <div className="related-awards__label related-awards__label_count">
                    {this.props.counts.total} Awards Reference this IDV
                </div>
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
                {referencedCount}
                <button
                    onClick={this.jumpToReferencedAwardsTable}
                    className="award-viz__button">
                    <div className="award-viz__link-icon">
                        <Table />
                    </div>
                    <div className="award-viz__link-text">
                        View referencing awards table
                    </div>
                </button>
            </div>
        );
    }
}

RelatedAwards.propTypes = propTypes;
