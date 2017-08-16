/**
 * ExplorerDetailPage.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import RootContentContainer from 'containers/explorer/detail/RootContentContainer';

import ExplorerWrapperPage from '../ExplorerWrapperPage';
import ExplorerSidebar from './sidebar/ExplorerSidebar';

const propTypes = {
    explorer: PropTypes.object,
    setExplorerYear: PropTypes.func
};

export default class ExplorerDetailPage extends React.Component {
    render() {
        return (
            <ExplorerWrapperPage>
                <div className="explorer-detail">
                    <ExplorerSidebar
                        fy={this.props.explorer.fy}
                        trail={this.props.explorer.trail}
                        setExplorerYear={this.props.setExplorerYear} />
                    <RootContentContainer />
                </div>
            </ExplorerWrapperPage>
        );
    }
}

ExplorerDetailPage.propTypes = propTypes;
