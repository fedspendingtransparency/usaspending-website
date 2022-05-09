/**
 * VerticalTrail.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

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
                    <TransitionGroup>
                        <CSSTransition
                            classNames="explorer-item-animation"
                            timeout={{ exit: 750, enter: 200 }}
                            exit>
                            <>
                                {trail}
                            </>
                        </CSSTransition>
                    </TransitionGroup>
                </ul>
            </div>
        );
    }
}

VerticalTrail.propTypes = propTypes;
