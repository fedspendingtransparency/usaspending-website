/**
 * TrailItem.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

import { rootTypes, sidebarTypes } from 'dataMapping/explorer/sidebarStrings';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import TrailDecorator from './TrailDecorator';

const propTypes = {
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    type: PropTypes.string,
    subtype: PropTypes.string,
    title: PropTypes.string,
    total: PropTypes.number,
    index: PropTypes.number,
    rewindToFilter: PropTypes.func
};

const TrailItem = (props) => {
    const clickedItem = () => {
        props.rewindToFilter(props.index);
    };

    let specialClass = '';
    if (props.isFirst && props.isLast) {
        specialClass = 'single';
    }
    else if (props.isFirst) {
        specialClass = 'first';
    }
    else if (props.isLast) {
        specialClass = 'last';
    }

    const formattedAmount = MoneyFormatter.formatTreemapValues(props.total);

    let type = '';
    let title = props.title;
    let showAmountClass = '';
    let titleIsAmount = '';
    if (props.type === 'root') {
        type = rootTypes[props.subtype];
        title = formattedAmount;
        titleIsAmount = 'bold';
        showAmountClass = 'hide';
    }
    else {
        type = sidebarTypes[props.type];
    }

    let trailingDots = null;
    if (!props.isLast) {
        trailingDots = <TrailDecorator />;
    }

    return (
        <li className="trail-item">
            <button
                className="item"
                title={`Return to ${type}`}
                onClick={clickedItem}>
                <div className={`item-decorator ${specialClass}`}>
                    <div className="main-dot" />
                    <CSSTransitionGroup
                        transitionName="explorer-dots-animation"
                        transitionLeaveTimeout={550}
                        transitionEnterTimeout={350}
                        transitionLeave>
                        {trailingDots}
                    </CSSTransitionGroup>
                </div>
                <div className="item-content">
                    <div className="type">
                        {type}
                    </div>
                    <div className={`title ${titleIsAmount}`}>
                        {title}
                    </div>
                    <div className={`amount ${showAmountClass}`}>
                        {formattedAmount}
                    </div>
                </div>
            </button>
        </li>
    );
};

TrailItem.propTypes = propTypes;

export default TrailItem;
