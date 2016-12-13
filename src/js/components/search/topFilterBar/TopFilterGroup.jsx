/**
  * TopFilterGroup.jsx
  * Created by Kevin Li 12/13/16
  **/

import React from 'react';

import TopFilterItem from './TopFilterItem';

const propTypes = {
    name: React.PropTypes.string
};

const defaultProps = {
    name: 'Name'
};

export default class TopFilterGroup extends React.Component {
    render() {
        return (
            <div className="filter-group-container">
                <div className="filter-group">
                    <div className="filter-name">
                        {this.props.name}:
                    </div>
                    <div className="filter-values">
                        <TopFilterItem />
                        <TopFilterItem />
                        <TopFilterItem />
                    </div>
                </div>
            </div>
        );
    }
}

TopFilterGroup.propTypes = propTypes;
TopFilterGroup.defaultProps = defaultProps;
