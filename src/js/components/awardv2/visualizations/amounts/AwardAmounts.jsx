/**
 * AwardAmounts.jsx
 * Created by Lizzie Salita 10/12/18
 **/

import React from 'react';
import PropTypes from 'prop-types';
import AwardAmountsContainer from 'containers/awardV2/visualization/AwardAmountsContainer';

const propTypes = {
    awardId: PropTypes.string
};

export default class AwardAmounts extends React.Component {
    render() {
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <h3 className="award-viz__title">
                        $ Award Amounts
                    </h3>
                </div>
                <hr />
                <AwardAmountsContainer awardId={this.props.awardId} />
            </div>
        );
    }
}
AwardAmounts.propTypes = propTypes;
