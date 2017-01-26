/**
 * AwardInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';
import AwardInfoBar from './AwardInfoBar';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardInfo extends React.Component {

    render() {
        return (
            <div className="award-info-content">
                <AwardInfoBar
                    {...this.props}
                    selectedAward={this.props.selectedAward} />
            </div>
        );
    }
}
AwardInfo.propTypes = propTypes;
