/**
 * ExplorerDetailPage.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import ExplorerWrapperPage from '../ExplorerWrapperPage';

import ExplorerSidebar from './sidebar/ExplorerSidebar';

export default class ExplorerDetailPage extends React.Component {
    render() {
        return (
            <ExplorerWrapperPage>
                <div className="explorer-detail">
                    <ExplorerSidebar
                        fy={this.props.explorer.fy}
                        trail={this.props.explorer.trail}
                        setExplorerYear={this.props.setExplorerYear} />
                </div>
            </ExplorerWrapperPage>
        );
    }
}
