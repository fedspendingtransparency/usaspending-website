/**
 * RelatedAwards.jsx
 * Created by Lizzie Salita 12/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

import InfoTooltip from '../../idv/InfoTooltip';

const propTypes = {
    overview: PropTypes.object
};

export default class RelatedAwards extends React.Component {
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
        return (
            <div
                className="related-awards">
                <div className="award-overview__title related-awards__title">
                    Related Awards
                    <InfoTooltip>
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
                                    <strong>Parent Award Orders Under this IDV</strong> – This is a count of how many awards were made under this IDV.  Click on the link to see more information about all of those orders.
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
            </div>
        );
    }
}

RelatedAwards.propTypes = propTypes;
