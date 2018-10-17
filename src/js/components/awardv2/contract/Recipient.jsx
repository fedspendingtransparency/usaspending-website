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
    constructor(props) {
        super(props);

        this.state = {
            open: false
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({ open: !this.state.open });
    }

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
                    <h4>{this.props.award.recipient.name}</h4>
                </div>
                <div className={`award__row ${this.state.open ? '' : 'hide'}`}>
                    <div className="award__col data-title">
                        <p>DUNS</p>
                        <p>Parent Name</p>
                        <p>Parent DUNS</p>
                    </div>
                    <div className="award__col data-values">
                        <p>{this.props.award.recipient.duns}</p>
                        <p>{this.props.award.recipient.parentName}</p>
                        <p>{this.props.award.recipient.parentDuns}</p>
                    </div>
                </div>

                <div className={`award__row ${this.state.open ? '' : 'hide'}`}>
                    <div className="award__col data-title">
                        Address
                    </div>
                    <div className="award__col data-values">
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

                <div className={`award__row ${this.state.open ? '' : 'hide'}`}>
                    <div className="award__col data-title">
                        Recipient Types
                    </div>
                    <div className="award__col data-values">
                        {
                            this.props.award.recipient.businessCategories.map((item, index) => <span key={item}>{ (index ? ', ' : '') + item }</span>)
                        }
                    </div>
                </div>

                <div className="text-button-container">
                    <hr />
                    <button className="text-button" onClick={this.handleClick}>{this.state.open ? 'View Less' : 'View More'}</button>
                </div>
            </div>
        );
    }
}
Recipient.propTypes = propTypes;
