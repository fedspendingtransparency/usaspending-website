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
    expanded: [],
    accessories: [],
    glossaryEntries: []
};

const propTypes = {
    options: PropTypes.arrayOf(PropTypes.string),
    components: PropTypes.arrayOf(PropTypes.object),
    expanded: PropTypes.arrayOf(PropTypes.bool),
    accessories: PropTypes.arrayOf(PropTypes.func),
    glossaryEntries: PropTypes.arrayOf(PropTypes.string),
    hash: PropTypes.string
};

export default class FilterSidebar extends React.Component {
    render() {
        const optionsList = this.props.options.map((name, i) => {
            const component = this.props.components[i];
            const accessory = this.props.accessories[i];
            const glossarySlug = this.props.glossaryEntries[i];
            let glossaryUrl;
            if (glossarySlug) {
                const hash = this.props.hash ? `/${this.props.hash}` : '';
                glossaryUrl = `#/search${hash}/?glossary=${glossarySlug}`;
            }
            return (<FilterOption
                name={name}
                key={name}
                component={component}
                accessory={accessory}
                defaultExpand={this.props.expanded[i]}
                disabled={component === null}
                glossaryUrl={glossaryUrl} />);
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
