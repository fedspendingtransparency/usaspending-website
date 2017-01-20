/**
 * RecipientInfo.jsx
 * Created by Emily Gullo 01/20/2017
 **/

import React from 'react';

export default class RecipientInfo extends React.Component {

    render() {
        return (
            <div className="recipient-info">
                <h4>Recipient</h4>
                <div className="recipient-name">
                    Boeing Company, The
                </div>
                <ul className="recipient-information">
                    <li className="recipient-address">
                        <div className="recipient-address title">
                            Address
                        </div>
                        <div className="recipient-address name">
                            6200 Js McDonnell Blvd<br />
                            St Louis, MO 63134-1939
                        </div>
                    </li>
                    <li className="recipient-duns">
                        <div className="recipient-duns title">
                            DUNS
                        </div>
                        <div className="recipient-duns name">
                            149879157
                        </div>
                    </li>
                    <li className="recipient-parent-duns">
                        <div className="recipient-parent-duns title">
                            Parent DUNS
                        </div>
                        <div className="recipient-parent-duns name">
                            009256819
                        </div>
                    </li>
                    <li className="recipient-business-type">
                        <div className="recipient-business-type title">
                            Business Type
                        </div>
                        <div className="recipient-business-type name">
                            Corporate Not Tax-Exempt, For Profit Organization, Manufacturer of Goods
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}
