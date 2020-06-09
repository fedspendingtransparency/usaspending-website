/**
  * BaseTopFilterGroup.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import TopFilterItem from '../TopFilterItem';

const propTypes = {
    filter: PropTypes.object,
    tags: PropTypes.array,
    clearFilterGroup: PropTypes.func,
    compressed: PropTypes.bool
};

const defaultProps = {
    tags: [],
    compressed: false
};

export default class BaseTopFilterGroup extends React.Component {
    render() {
        const tags = this.props.tags.map((tag) => (
            <TopFilterItem
                key={`top-tag-${this.props.filter.code}-${tag.value}`}
                title={tag.title}
                value={tag.value}
                code={this.props.filter.code}
                removeFilter={tag.removeFilter}
                compressed={this.props.compressed} />
        ));

        return (
            <div className="filter-group-container">
                <div
                    className="filter-group"
                    role="group"
                    aria-label={this.props.filter.name}>
                    <div className="filter-group-top">
                        <div className="filter-name">
                            {this.props.filter.name}
                        </div>
                    </div>
                    <div className="filter-group-bottom">
                        <div className="filter-values">
                            {tags}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

BaseTopFilterGroup.propTypes = propTypes;
BaseTopFilterGroup.defaultProps = defaultProps;
