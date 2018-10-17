/**
 * AwardingAgency.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';
import { Agency } from 'components/sharedComponents/icons/Icons';

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
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award-viz__heading">
                    <div className="award-viz__icon">
                        <Agency />
                    </div>
                    <h3 className="award-viz__title">
                        Awarding Agency
                    </h3>
                </div>
                <hr />
                <div className="award-amounts__content">
                    <h4>{this.props.award.awardingAgency.toptierName} ({this.props.award.awardingAgency.toptierAbbr})</h4>
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
                        <p>{this.props.award.awardingAgency.subtierName} ({this.props.award.awardingAgency.subtierAbbr})</p>
                        <p>{this.props.award.awardingAgency.officeName}</p>
                        <p>{this.props.award.fundingAgency.toptierName} ({this.props.award.fundingAgency.toptierAbbr})</p>
                        <p>{this.props.award.fundingAgency.subtierName} ({this.props.award.fundingAgency.subtierAbbr})</p>
                        <p>{this.props.award.fundingAgency.officeName}</p>
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
AwardingAgency.propTypes = propTypes;
