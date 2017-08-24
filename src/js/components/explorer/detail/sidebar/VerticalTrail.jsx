/**
 * VerticalTrail.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import TrailItem from './TrailItem';

const propTypes = {
    trail: PropTypes.array,
    rewindToFilter: PropTypes.func
};

export default class VerticalTrail extends React.Component {
    render() {
        const trail = this.props.trail.map((item, index) => (
            <TrailItem
                {...item}
                isFirst={index === 0}
                isLast={index + 1 === this.props.trail.length}
                rewindToFilter={this.props.rewindToFilter}
                index={index}
                key={item.within} />
        ));

        return (
            <div className="vertical-trail-wrapper">
                <ul className="vertical-trail">
                    <CSSTransitionGroup
                        transitionName="explorer-item-animation"
                        transitionLeaveTimeout={750}
                        transitionEnterTimeout={200}
                        transitionLeave>
                        {trail}
                    </CSSTransitionGroup>
                </ul>
            </div>
        );
    }
}

VerticalTrail.propTypes = propTypes;
