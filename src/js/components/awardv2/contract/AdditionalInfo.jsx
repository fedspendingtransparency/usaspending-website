/**
 * AdditionalInfo.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { InfoCircle } from 'components/sharedComponents/icons/Icons';

import Accordion from './Accordion';

const propTypes = {
    award: PropTypes.object
};

export default class AdditionalInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            globalOpen: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.setState({ globalOpen: !this.state.globalOpen });
    }
    render() {
        const parentAwardDetails = {
            Parent_Award_ID: this.props.award.parentAward,
            IDV_Type: this.props.award.additionalDetails.idvType,
            IDC_Type: this.props.award.additionalDetails.idcType,
            IDV_Agency_Identifier: this.props.award.additionalDetails.idvAgencyId,
            Multiple_Or_Single_Award_IDV: this.props.award.additionalDetails.multipleIdv
        };
        return (
            <div className="additionalInfo-wrapper">
                <div className="award__row">
                    <div className="award__row__fullheading award-viz">
                        <div className="award-viz__heading">
                            <div className="award-viz__icon">
                                <InfoCircle />
                            </div>
                            <h3 className="award-viz__title">Additional Information</h3>
                        </div>
                        <hr />
                    </div>
                </div>
                <div className="award__row">
                    <div className="award__col globaltoggler">
                        <div className="award-amounts__content" tabIndex={0} role="button" onClick={this.handleClick}>
                            {this.state.globalOpen ? 'Hide All' : 'Show All'}
                        </div>
                    </div>
                </div>
                <div className="award__row award-amounts accordion">
                    <div className="award__col">
                        <Accordion globalOpen={this.state.globalOpen} accordionName="Parent Award Details" accordionIcon={<InfoCircle />} accordionData={parentAwardDetails} />
                    </div>
                    <div className="award__col">
                        <Accordion globalOpen={this.state.globalOpen} accordionName="Parent Award Details2" accordionIcon={<InfoCircle />} accordionData={parentAwardDetails} />
                    </div>
                </div>
            </div>
        );
    }
}
AdditionalInfo.propTypes = propTypes;
