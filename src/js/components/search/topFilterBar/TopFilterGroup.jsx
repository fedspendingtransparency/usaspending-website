/**
  * TopFilterGroup.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';

import * as Icons from 'components/sharedComponents/icons/Icons';
import TopFilterItem from './TopFilterItem';

const propTypes = {
    name: React.PropTypes.string,
    data: React.PropTypes.object,
    removeFilter: React.PropTypes.func,
    clearFilterGroup: React.PropTypes.func,
    tagLogic: React.PropTypes.func
};

const defaultProps = {
    name: 'Name',
    tagLogic: (values) => values
};

export default class TopFilterGroup extends React.Component {
    constructor(props) {
        super(props);

        this.clearFilterGroup = this.clearFilterGroup.bind(this);
    }

    clearFilterGroup() {
        this.props.clearFilterGroup(this.props.data.code);
    }

    render() {
        const items = [];
        this.props.data.values.forEach((value) => {
            const item = (<TopFilterItem
                key={`top-item-${this.props.data.code}-${value}`}
                code={this.props.data.code}
                title={this.props.data.labels[items.length]}
                value={value}
                removeFilter={this.props.removeFilter} />);

            items.push(item);
        });

        return (
            <div className="filter-group-container">
                <div className="filter-group">
                    <div className="filter-group-top">
                        <div className="filter-name">
                            {this.props.name}:
                        </div>
                        <div className="filter-group-close">
                            <button
                                title={`Clear all ${this.props.name} filters`}
                                aria-label={`Clear all ${this.props.name} filters`}
                                onClick={this.clearFilterGroup}>
                                <span className="close-icon">
                                    <Icons.Close alt={`Clear all ${this.props.name} filters`} />
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="filter-group-bottom">
                        <div className="filter-values">
                            {items}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

TopFilterGroup.propTypes = propTypes;
TopFilterGroup.defaultProps = defaultProps;
