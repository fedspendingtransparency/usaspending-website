/**
 * FilterSidebar.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import FilterOption from './FilterOption';

const defaultProps = {
    options: [],
    components: [],
    expanded: []
};

const propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    components: PropTypes.arrayOf(PropTypes.func),
    expanded: PropTypes.arrayOf(PropTypes.bool)
};

export default class FilterSidebar extends React.Component {
    render() {
        const optionsList = this.props.options.map((name, i) => {
            const component = this.props.components[i];
            return (<FilterOption
                name={name}
                key={i}
                component={component}
                defaultExpand={this.props.expanded[i]}
                disabled={component === null} />);
        });

        return (
            <div className="search-filters-wrapper">
                {optionsList}
            </div>
        );
    }
}

FilterSidebar.defaultProps = defaultProps;
FilterSidebar.propTypes = propTypes;
