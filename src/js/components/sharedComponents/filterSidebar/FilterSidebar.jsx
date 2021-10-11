/**
 * FilterSidebar.jsx
 * Created by Kevin Li 3/20/17
 */

import React from 'react';
import PropTypes, { arrayOf, oneOfType } from 'prop-types';

import FilterOption from './FilterOption';

const defaultProps = {
    options: [],
    components: [],
    expanded: [],
    accessories: [],
    glossaryEntries: []
};

const propTypes = {
    options: arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        tooltip: PropTypes.element
    })),
    components: arrayOf(oneOfType([PropTypes.func, PropTypes.object])),
    expanded: arrayOf(PropTypes.bool),
    accessories: arrayOf(PropTypes.func),
    glossaryEntries: arrayOf(PropTypes.string)
};

export default class FilterSidebar extends React.Component {
    render() {
        const optionsList = this.props.options
            .map((obj) => ({
                title: obj.title,
                tooltip: obj.tooltip || null
            }))
            .map(({ title, tooltip }, i) => {
                const component = this.props.components[i];
                const accessory = this.props.accessories[i];
                const glossarySlug = this.props.glossaryEntries[i];
                return (<FilterOption
                    name={title}
                    tooltip={tooltip}
                    key={title}
                    component={component}
                    accessory={accessory}
                    defaultExpand={this.props.expanded[i]}
                    disabled={component === null}
                    glossarySlug={glossarySlug} />);
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
