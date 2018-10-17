/**
 * AwardingAgency.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    award: PropTypes.object
};

export default class AwardingAgency extends React.Component {
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
        const awardData = this.props.award;
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <img src="img/state-categories/recipient_duns.png" alt="Awarding Agency" />
                    </div>
                    <h3 className="award-viz__title">
                        Awarding Agency
                    </h3>
                </div>
                <hr />
                <div className="award-amounts__content">
                    <h4>{awardData.awardingAgency.toptierName} ({awardData.awardingAgency.toptierAbbr})</h4>
                </div>
                <div className={`award__row ${this.state.open ? '' : 'hide'}`}>
                    <div className="award__col data-title">
                        <p>Awarding Sub-Agency</p>
                        <p>Awarding Office</p>
                        <p>Funding Agency</p>
                        <p>Funding Sub-Agency</p>
                        <p>Funding Office</p>
                    </div>
                    <div className="award__col data-values">
                        <p>{awardData.awardingAgency.subtierName} ({awardData.awardingAgency.subtierAbbr})</p>
                        <p>{awardData.awardingAgency.officeName}</p>
                        <p>{awardData.fundingAgency.toptierName} ({awardData.fundingAgency.toptierAbbr})</p>
                        <p>{awardData.fundingAgency.subtierName} ({awardData.fundingAgency.subtierAbbr})</p>
                        <p>{awardData.fundingAgency.officeName}</p>
                    </div>
                </div>
                <div className="text-button-container">
                    <hr />
                    <button className="text-button-container__button" onClick={this.handleClick}>{this.state.open ? 'View Less' : 'View More'}</button>
                </div>
            </div>
        );
    }
}
AwardingAgency.propTypes = propTypes;
