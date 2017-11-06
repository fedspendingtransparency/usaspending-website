/**
 * BulkDownloadModalContainer.jsx
 * Created by Lizzie Salita 11/3/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';

import BulkDownloadModal from 'components/bulkDownload/modal/BulkDownloadModal';

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    pendingDownload: PropTypes.bool
};

export class BulkDownloadModalContainer extends React.Component {

    render() {
        return (
            <BulkDownloadModal
                setDownloadCollapsed={this.props.setDownloadCollapsed}
                pendingDownload={this.props.pendingDownload}
                mounted={this.props.mounted}
                hideModal={this.props.hideModal} />
        );
    }
}

BulkDownloadModalContainer.propTypes = propTypes;

export default connect(
    (state) => ({ pendingDownload: state.bulkDownload.pendingDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(BulkDownloadModalContainer);
