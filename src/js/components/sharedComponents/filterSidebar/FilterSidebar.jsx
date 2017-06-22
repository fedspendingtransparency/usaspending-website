/**
 * FilterSidebar.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';

import FilterOption from './FilterOption';

const defaultProps = {
    options: [],
    components: [],
    expanded: []
};

const propTypes = {
    options: React.PropTypes.arrayOf(React.PropTypes.string),
    components: React.PropTypes.arrayOf(React.PropTypes.func),
    expanded: React.PropTypes.arrayOf(React.PropTypes.bool)
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
            <div className="search-sidebar">
                <div className="sidebar-header">
                    <span className="filter-icon">
                        <Icons.Filter />
                    </span>
                    <h6>Filter by:</h6>
                </div>
                <div className="search-filters-wrapper">
                    {optionsList}
                </div>
            </div>
        );
    }
}

FilterSidebar.defaultProps = defaultProps;
FilterSidebar.propTypes = propTypes;
