/**
 * NoAwardsScreen.jsx
 * Created by Lizzie Salita 9/21/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    rewindToFilter: PropTypes.func,
    currentIndex: PropTypes.number
};

export default class NoAwardsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.clickedLink = this.clickedLink.bind(this);
    }

    clickedLink() {
        const previousIndex = this.props.currentIndex - 1;
        this.props.rewindToFilter(previousIndex);
    }

    render() {
        return (
            <div className="explorer-no-awards">
                <div className="no-awards-message">
                    <span className="info-icon-circle">
                        <Icons.InfoCircle />
                    </span>
                    You&#8217;ve reached a point with no associated awards.
                </div>
                <button className="go-back" onClick={this.clickedLink}>
                    Click here to go back.
                </button>
            </div>
        );
    }
}

NoAwardsScreen.propTypes = propTypes;
