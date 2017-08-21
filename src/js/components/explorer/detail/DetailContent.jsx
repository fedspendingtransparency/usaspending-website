/**
 * DetailContent.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import { sidebarTypes } from 'dataMapping/explorer/sidebarStrings';

import RootHeader from './header/RootHeader';
import DetailHeader from './header/DetailHeader';

import ExplorerVisualization from './visualization/ExplorerVisualization';

const propTypes = {
    isRoot: PropTypes.bool,
    root: PropTypes.string,
    fy: PropTypes.number,
    total: PropTypes.number,
    active: PropTypes.object
};

export default class DetailContent extends React.Component {
    singularType(type) {
        const firstLetter = type.substring(0, 1).toLowerCase();
        const vowels = ['a', 'e', 'i', 'o', 'u'];

        if (vowels.indexOf(firstLetter) === -1) {
            return `a ${type.toLowerCase()}`;
        }
        return `an ${type.toLowerCase()}`;
    }

    render() {
        let header = (<RootHeader
            root={this.props.root}
            fy={this.props.fy}
            total={this.props.active.total} />);
        if (!this.props.isRoot) {
            header = (<DetailHeader
                type={this.props.active.type}
                fy={this.props.fy}
                total={this.props.active.total}
                title={this.props.active.title} />);
        }

        return (
            <div className="explorer-detail-content">
                {header}
                <ExplorerVisualization
                    {...this.props} />
            </div>
        );
    }
}

DetailContent.propTypes = propTypes;
