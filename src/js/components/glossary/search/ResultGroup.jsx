/**
 * ResultGroup.jsx
 * Created by Kevin Li 5/1/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import ResultItem from './ResultItem';

const propTypes = {
    title: PropTypes.string,
    items: PropTypes.array,
    search: PropTypes.string,
    selectTerm: PropTypes.func
};

const ResultGroup = (props) => {
    const items = props.items.map((item) => (
        <ResultItem
            item={item}
            search={props.search}
            selectTerm={props.selectTerm}
            key={item.term} />
    ));

    return (
        <div className="glossary-result-group">
            <h2 className="group-title">
                {props.title}
            </h2>
            <hr className="group-divider" />
            <ul className="group-items">
                {items}
            </ul>
        </div>
    );
};

ResultGroup.propTypes = propTypes;
export default ResultGroup;
