/**
 * RelatedAwards.jsx
 * Created by Lizzie Salita 12/11/18
 **/

import React from 'react';
import PropTypes from 'prop-types';

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
            <div className="related-awards">
                <div className="award-overview__title related-awards__title">
                    Related Awards
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
