/**
 * KeywordFilterGroup.jsx
 * Created by Emily Gullo 03/09/2017
 */

import React from 'react';
import PropTypes from 'prop-types';

import BaseTopFilterGroup from './BaseTopFilterGroup';

const propTypes = {
    filter: PropTypes.object,
    redux: PropTypes.object,
    compressed: PropTypes.bool
};

export default class KeywordFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.removeFilter = this.removeFilter.bind(this);
    }

    removeFilter() {
    // remove a single filter item
        this.props.redux.clearFilterType('keyword');
    }

    generateTags() {
    // check to see if a keyword is provided
        const tags = this.props.filter.values.map((value) => (
            {
                value: `${value}`,
                title: `${value}`,
                removeFilter: this.removeFilter
            }
        ));

        return tags;
    }

    render() {
        const tags = this.generateTags();

        return (<BaseTopFilterGroup
            tags={tags}
            filter={this.props.filter}
            clearFilterGroup={this.removeFilter}
            compressed={this.props.compressed} />);
    }
}

KeywordFilterGroup.propTypes = propTypes;
