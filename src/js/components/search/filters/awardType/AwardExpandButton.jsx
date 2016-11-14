/**
  * AwardExpandButton.jsx
  * Created by Kevin Li
  **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

const propTypes = {
    hideArrow: React.PropTypes.bool,
    toggleExpand: React.PropTypes.func
};

export default class AwardExpandButton extends React.Component {
    render() {
        let hiddenClass = '';
        if (this.props.hideArrow) {
            hiddenClass = ' hide';
        }

        return (
            <button
                className={`toggle ${hiddenClass}`}
                onClick={this.props.toggleExpand}
                title={`child filters`}>
                <Icons.AngleDown />
            </button>
        );
    }
}

AwardExpandButton.propTypes = propTypes;
