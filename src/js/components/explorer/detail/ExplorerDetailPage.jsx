/**
 * ExplorerDetailPage.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import DetailContentContainer from 'containers/explorer/detail/DetailContentContainer';

import ExplorerWrapperPage from '../ExplorerWrapperPage';
import ExplorerTooltip from './visualization/ExplorerTooltip';
import ExplorerAwardTooltip from './visualization/ExplorerAwardTooltip';

const propTypes = {
    explorer: PropTypes.object,
    setExplorerYear: PropTypes.func
};

export default class ExplorerDetailPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showTooltip: false,
            tooltip: {
                x: 0,
                y: 0,
                name: '',
                code: '',
                amount: 0,
                percent: 0,
                total: 0,
                isAward: false
            }
        };

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
    }

    showTooltip(position, data) {
        this.setState({
            showTooltip: true,
            tooltip: Object.assign({}, position, data)
        });
    }

    hideTooltip() {
        this.setState({
            showTooltip: false
        });
    }

    render() {
        let tooltip = null;

        if (this.state.showTooltip) {
            tooltip = (<ExplorerTooltip
                {...this.state.tooltip} />);

            if (this.state.tooltip.isAward) {
                tooltip = (<ExplorerAwardTooltip
                    {...this.state.tooltip} />);
            }
        }

        return (
            <ExplorerWrapperPage>
                <div className="explorer-detail-wrap">
                    <DetailContentContainer
                        showTooltip={this.showTooltip}
                        hideTooltip={this.hideTooltip} />
                    {tooltip}
                </div>
            </ExplorerWrapperPage>
        );
    }
}

ExplorerDetailPage.propTypes = propTypes;
