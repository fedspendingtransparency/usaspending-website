/**
  * AwardInfo.jsx
  * Created by Emily Gullo 01/20/2017
  **/

import React from 'react';

import SummaryBar from './SummaryBar';
import AwardInfoBar from './AwardInfoBar';
import AwardContract from './AwardContract';
import DetailsSection from './details/DetailsSection';

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
                    <AwardContract
                        {...this.props}
                        selectedAward={this.props.selectedAward} />
                    <DetailsSection {...this.props} />
                </main>
            </div>
        );
    }
}
AwardInfo.propTypes = propTypes;

