/**
  * BaseTopFilterGroup.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';
import PropTypes from 'prop-types';

import * as Icons from 'components/sharedComponents/icons/Icons';
import TopFilterItem from '../TopFilterItem';

const propTypes = {
    filter: PropTypes.object,
    tags: PropTypes.array,
    clearFilterGroup: PropTypes.func
};

const defaultProps = {
    tags: []
};

export default class BaseTopFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.clearFilterGroup = this.clearFilterGroup.bind(this);
    }

    clearFilterGroup() {
        this.props.clearFilterGroup();
    }

    render() {
        const tags = this.props.tags.map((tag) => (
            <TopFilterItem
                key={`top-tag-${this.props.filter.code}-${tag.value}`}
                title={tag.title}
                value={tag.value}
                isSpecial={tag.isSpecial}
                code={this.props.filter.code}
                removeFilter={tag.removeFilter} />
        ));

        let showClose = '';
        if (tags.length < 2) {
            showClose = ' hide';
        }

        return (
            <div className="filter-group-container">
                <div className="filter-group">
                    <div className="filter-group-top">
                        <div className="filter-name">
                            {this.props.filter.name}:
                        </div>
                        <div className={`filter-group-close${showClose}`}>
                            <button
                                title={`Clear all ${this.props.filter.name} filters`}
                                aria-label={`Clear all ${this.props.filter.name} filters`}
                                onClick={this.clearFilterGroup}>
                                <span className="close-icon">
                                    <Icons.Close
                                        alt={`Clear all ${this.props.filter.name} filters`} />
                                </span>
                            </button>
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
