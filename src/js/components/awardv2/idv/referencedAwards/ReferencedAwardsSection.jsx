/**
  * ReferencedAwardsSection.jsx
  * Created by Lizzie Salita 2/14/19
  **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    results: PropTypes.array
};

export default class ReferencedAwardsSection extends React.Component {
    render() {
        console.log(this.props.results);
        return (
            <div id="idv-referenced-awards" className="referenced-awards">
                <div className="award-viz">
                    <div className="award-viz__heading">
                        <h3 className="award-viz__title">Awards that Reference this IDV</h3>
                    </div>
                    <hr />
                </div>
            </div>
        );
    }
}

ReferencedAwardsSection.propTypes = propTypes;
