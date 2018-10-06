/**
  * AwardInfo.jsx
  * Created by David Trinh 10/5/2018
  **/

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';
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
                <main className="award-content">
                    <div className="award-content__heading">
                        <span className="award-content__heading_bold">{this.props.selectedAward.typeDescription}</span> <div className="award-content__glossary-icon"><Icons.Glossary /></div> | {this.props.selectedAward.id}
                        <hr className="award-content__divider" />
                    </div>
                </main>
            </div>
        );
    }
}
AwardInfo.propTypes = propTypes;
