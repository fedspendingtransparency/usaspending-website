/**
 * Recipient.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Building } from 'components/sharedComponents/icons/Icons';

const propTypes = {
    award: PropTypes.object
};

export default class Recipient extends React.Component {
    render() {
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <Building />
                    </div>
                    <h3 className="award-viz__title">
                        Recipient
                    </h3>
                </div>
                <hr />
                <div className="award-amounts__content">
                    <h3>{this.props.award.recipient.name}</h3>
                </div>
                <div className="award__row">
                    <div className="award__col">
                        <p><strong>DUNS</strong></p>
                        <p><strong>Parent Name</strong></p>
                        <p><strong>Parent DUNS</strong></p>
                    </div>
                    <div className="award__col">
                        <p>{this.props.award.recipient.duns}</p>
                        <p>{this.props.award.recipient.parentName}</p>
                        <p>{this.props.award.recipient.parentDuns}</p>
                    </div>
                </div>

                <div className="award__row">
                    <div className="award__col">
                        <strong>Address</strong>
                    </div>
                    <div className="award__col">
                        {this.props.award.recipient.location._address1}
                        <br />
                        {this.props.award.recipient.location._address2}
                        <br />
                        {this.props.award.recipient.location._address3}
                        <br />
                        {this.props.award.recipient.location.regionalAddress}
                        <br />
                        Congressional District: {this.props.award.recipient.location.congressionalDistrict}
                    </div>
                </div>

                <div className="award__row">
                    <div className="award__col">
                        <strong>Recipient Types</strong>
                    </div>
                    <div className="award__col">
                        {
                            this.props.award.recipient.businessCategories.map((item, index) => <span key={item}>{ (index ? ', ' : '') + item }</span>)
                        }
                    </div>
                </div>

                <div className="award__row">
                    <hr />
                    <p>view less</p>
                </div>
            </div>
        );
    }
}
Recipient.propTypes = propTypes;
