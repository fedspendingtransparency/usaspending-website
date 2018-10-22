/**
 * Recipient.jsx
 * Created by Kwadwo Opoku-Debrah 10/11/2018
 **/

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    award: PropTypes.object
};

export default class Recipient extends React.Component {
    render() {
        const awardData = this.props.award;
        return (
            <div className="award__col award-viz award-amounts">
                <div className="award__row">
                    <div className="award__col data-title">
                        <p>DUNS</p>
                        <p>Parent Name</p>
                        <p>Parent DUNS</p>
                    </div>
                    <div className="award__col data-values">
                        <p>{awardData.recipient.duns}</p>
                        <p>{awardData.recipient.parentName}</p>
                        <p>{awardData.recipient.parentDuns}</p>
                    </div>
                </div>

                <div className="award__row">
                    <div className="award__col data-title">
                        Address
                    </div>
                    <div className="award__col data-values">
                        {awardData.recipient.location._address1}
                        <br />
                        {awardData.recipient.location._address2}
                        <br />
                        {awardData.recipient.location._address3}
                        <br />
                        {awardData.recipient.location.regionalAddress}
                        <br />
                        Congressional District: {awardData.recipient.location.congressionalDistrict}
                    </div>
                </div>

                <div className="award__row">
                    <div className="award__col data-title">
                        Recipient Types
                    </div>
                    <div className="award__col data-values">
                        {
                            awardData.recipient.businessCategories ? awardData.recipient.businessCategories.map((item, index) => <span key={item}>{ (index ? ', ' : '') + item }</span>) : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}
Recipient.propTypes = propTypes;
