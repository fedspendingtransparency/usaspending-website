/**
 * ExplorerDetailPage.jsx
 * Created by Kevin Li 8/16/17
 */

import React from 'react';
import PropTypes from 'prop-types';

import DetailContentContainer from 'containers/explorer/detail/DetailContentContainer';

import ExplorerWrapperPage from '../ExplorerWrapperPage';

const propTypes = {
    explorer: PropTypes.object,
    setExplorerYear: PropTypes.func
};

export default class ExplorerDetailPage extends React.Component {
    render() {
        return (
            <ExplorerWrapperPage>
                <DetailContentContainer />
            </ExplorerWrapperPage>
        );
    }
}

ExplorerDetailPage.propTypes = propTypes;
