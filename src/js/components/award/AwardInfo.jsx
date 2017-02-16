/**
  * AwardInfoContainer.jsx
  * Created by Emily Gullo 01/20/2017
  **/

import React from 'react';

import SummaryBar from 'components/award/SummaryBar';
import AwardInfoBar from 'components/award/AwardInfoBar';

const propTypes = {
    selectedAward: React.PropTypes.object
};

export default class AwardInfo extends React.Component {

    render() {
        return (
            <div>
                <SummaryBar
                    {...this.props}
                    selectedAward={this.props.selectedAward} />
                <main id="main-content" className="main-content">
                    <AwardInfoBar
                        {...this.props}
                        selectedAward={this.props.selectedAward} />
                </main>
            </div>
        );
    }
}
AwardInfo.propTypes = propTypes;

