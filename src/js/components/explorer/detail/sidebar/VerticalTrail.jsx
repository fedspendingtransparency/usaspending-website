/**
 * VerticalTrail.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import TrailItem from './TrailItem';

const propTypes = {
    trail: PropTypes.array
};

const defaultProps = {
    trail: [
        {
            type: 'root',
            subtype: 'agency',
            title: 'All Agencies',
            total: 2700000000000
        },
        {
            type: 'agency',
            subtype: '',
            title: 'Department of Energy',
            total: 18800000000
        },
        {
            type: 'federal_account',
            subtype: '',
            title: 'Energy Efficiency & Renewable Energy',
            total: 958500000
        }
    ]
};

export default class VerticalTrail extends React.Component {
    render() {
        const trail = this.props.trail.map((item, index) => (
            <TrailItem
                {...item}
                isFirst={index === 0}
                isLast={index + 1 === this.props.trail.length}
                key={item.type} />
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
VerticalTrail.defaultProps = defaultProps;
