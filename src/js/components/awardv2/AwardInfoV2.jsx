/**
  * AwardInfo.jsx
  * Created by David Trinh 10/5/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';


import SummaryBar from './SummaryBarV2';


const propTypes = {
    selectedAward: PropTypes.object
};

export default class AwardInfo extends React.Component {
    render() {
        return (
            <div>
                <SummaryBar
                    selectedAward={this.props.selectedAward} />
            </div>
        );
    }
}
AwardInfo.propTypes = propTypes;
