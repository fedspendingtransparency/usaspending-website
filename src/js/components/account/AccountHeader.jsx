/**
 * AccountHeader.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';
import InfoSnippet from '../award/InfoSnippet';
import MoreHeaderOptions from '../award/MoreHeaderOptions';

const propTypes = {

};

export default class AccountHeader extends React.Component {
    render() {
        return (
            <div className="page-title-bar">
                <div className="page-title-bar-wrap">
                    <h1 className="page-title">
                        Federal Account Summary
                    </h1>
                    <div className="options">
                        <ul className="account-items">
                            <InfoSnippet
                                label="Federal Account Symbol"
                                value="1234" />
                        </ul>
                        <MoreHeaderOptions />
                    </div>
                </div>
            </div>
        );
    }
}

AccountHeader.propTypes = propTypes;
