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
    render() {
        const parentAwardDetails = {
            parent_award_id: this.props.award.parentAward,
            idvType: this.props.award.additionalDetails.idvType,
            idcType: this.props.award.additionalDetails.idcType,
            idvAgencyId: this.props.award.additionalDetails.idvAgencyId,
            multipleIdv: this.props.award.additionalDetails.multipleIdv
        };
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <InfoCircle />
                    </div>
                    <h3 className="award-viz__title">
                        Additional Information
                    </h3>
                </div>
                <hr />
                <div className="award-amounts__content">
                    <span>Collapse All</span>
                    <span className="hide">Show All</span>
                </div>

                <div className="award__row accordion">
                    <Accordion accordionName="Parent Award Details" accordionIcon={<InfoCircle />} accordionData={parentAwardDetails} />
                </div>
            </div>
        );
    }
}
AdditionalInfo.propTypes = propTypes;
