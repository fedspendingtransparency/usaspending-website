/**
 * KeywordHover.jsx
 * Created by Kevin Li 12/4/17
 */

import React from 'react';
import { InfoCircle } from 'components/sharedComponents/icons/Icons';

export default class KeywordHover extends React.Component {
    render() {
        return (
            <div className="keyword-hover-wrapper">
                <div className="icon">
                    <InfoCircle alt="Information" />
                </div>
                <div className="content">
                    The <strong>Keyword</strong> field currently matches against
                    the following attributes:
                    <ul className="content__list">
                        <li>Recipient Name</li>
                        <li>Recipient DUNS</li>
                        <li>Recipient Parent DUNS</li>
                        <li>NAICS Code</li>
                        <li>PSC Code</li>
                        <li>PIID (prime award only)</li>
                        <li>FAIN (prime award only)</li>
                        <li>Award Description</li>
                    </ul>
                </div>
            </div>
        );
    }
}
