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
        // TODO - Determine what to show when no parent
        let parent = null;
        if (this.props.overview.parentAward && this.props.overview.parentId) {
            parent = (
                <div className="related-awards__parent">
                    <div className="related-awards__label">
                        Parent Award
                    </div>
                    <a
                        className="related-awards__link"
                        href={`#/award_v2/${this.props.overview.parentId}`}>
                        {this.props.overview.parentAward}
                    </a>
                </div>
            );
        }
        return (
            <div className="related-awards">
                <div className="award-overview__title related-awards__title">
                    Related Awards
                </div>
                {parent}
            </div>
        );
    }
}

RelatedAwards.propTypes = propTypes;
