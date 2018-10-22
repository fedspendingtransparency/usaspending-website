/**
 * AgencyRecipientContent.jsx
 * Created by Kwadwo Opoku-Debrah 10/18/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

import AwardingAgency from './AwardingAgency';
import Recipient from './Recipient';

const propTypes = {
    award: PropTypes.object
};

export default class AgencyRecipientContent extends React.Component {
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
            <div className="agency-recipient-container">
                <div className="award__row">
                    <div className="award__col award-viz award-amounts">
                        <div className="award-viz__heading">
                            <div className="award-viz__icon">
                                <img src="img/state-categories/awarding_agency.png" alt="Recipient" />
                            </div>
                            <h3 className="award-viz__title">
                                Awarding Agency
                            </h3>
                        </div>
                        <hr />
                        <div className="award-amounts__content">
                            <h4>{awardData.awardingAgency.toptierName} ({awardData.awardingAgency.toptierAbbr})</h4>
                        </div>

                    </div>

                    <div className="award__col award-viz award-amounts">
                        <div className="award-viz__heading">
                            <div className="award-viz__icon">
                                <img src="img/state-categories/recipient_duns.png" alt="Awarding Agency" />
                            </div>
                            <h3 className="award-viz__title">
                                Recipient
                            </h3>
                        </div>
                        <hr />
                        <div className="award-amounts__content">
                            <h4>{awardData.recipient.name}</h4>
                        </div>

                    </div>
                </div>

                {
                    this.state.open ?
                        <div className="award__row">
                            <AwardingAgency award={awardData} />
                            <Recipient award={awardData} />
                        </div> : null
                }


                <div className="award__row">
                    <div className="award__col">
                        <hr />
                        <div className="text-button-container">
                            <button
                                className="text-button-container__button"
                                onClick={this.handleClick}>
                                {this.state.open ? 'View Less' : 'View More'}
                            </button>
                        </div>
                    </div>

                    <div className="award__col">
                        <hr />
                        <div className="text-button-container">

                            <button
                                className="text-button-container__button"
                                onClick={this.handleClick}>
                                {this.state.open ? 'View Less' : 'View More'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
AgencyRecipientContent.propTypes = propTypes;
