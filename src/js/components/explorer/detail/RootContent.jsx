/**
 * RootContent.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';
import { formatTreemapValues } from 'helpers/moneyFormatter';

import ExplorerVisualization from './visualization/ExplorerVisualization';

const propTypes = {
    root: PropTypes.string,
    fy: PropTypes.number,
    total: PropTypes.number
};

export default class RootContent extends React.Component {
    singularType(type) {
        const firstLetter = type.substring(0, 1).toLowerCase();
        const vowels = ['a', 'e', 'i', 'o', 'u'];

        if (vowels.indexOf(firstLetter) === -1) {
            return `a ${type.toLowerCase()}`;
        }
        return `an ${type.toLowerCase()}`;
    }

    render() {
        const type = sidebarTypes[this.props.root];
        return (
            <div className="explorer-detail-content">
                <div className="root-header">
                    <div className="left-side">
                        <h2>
                            You are viewing FY {this.props.fy} spending by <span className="capitalize">{type}</span>
                        </h2>
                        <div className="instructions">
                            Choose {this.singularType(type)} below to start your exploration.
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="amount-header">
                            FY {this.props.fy} amount
                        </div>
                        <div className="amount-value">
                            {formatTreemapValues(this.props.total)}
                        </div>
                    </div>
                </div>

                <ExplorerVisualization {...this.props} />
            </div>
        );
    }
}

RootContent.propTypes = propTypes;
