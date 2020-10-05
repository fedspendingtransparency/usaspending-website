/**
 * TrailItem.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { rootTypes, sidebarTypes } from 'dataMapping/explorer/sidebarStrings';
import * as MoneyFormatter from 'helpers/moneyFormatter';

import TrailDecorator from './TrailDecorator';

const propTypes = {
    isFirst: PropTypes.bool,
    isLast: PropTypes.bool,
    within: PropTypes.string,
    subdivision: PropTypes.string,
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

    let filterName = '';
    let title = props.title;
    let showAmountClass = '';
    let titleIsAmount = '';
    if (props.within === 'root') {
        filterName = rootTypes[props.subdivision];
        title = formattedAmount;
        titleIsAmount = 'bold';
        showAmountClass = 'hide';
    }
    else {
        filterName = sidebarTypes[props.within];
    }

    return (
        <li className="trail-item">
            <button
                className="item"
                title={`Return to ${filterName}`}
                onClick={clickedItem}>
                <div className={`item-decorator ${specialClass}`}>
                    <div className="main-dot" />
                    <TransitionGroup>
                        {!props.isLast && (
                            <CSSTransition
                                classNames="explorer-dots-animation"
                                timeout={{ exit: 550, enter: 330 }}
                                exit>
                                <TrailDecorator />
                            </CSSTransition>
                        )}
                    </TransitionGroup>
                </div>
                <div className="item-content">
                    <div className="type">
                        {filterName}
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
