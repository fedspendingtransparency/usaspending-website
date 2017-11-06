/**
 * AwardDataContainer.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as downloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';

import BulkDownloadPage from 'components/bulkDownload/BulkDownloadPage';

require('pages/bulkDownload/bulkDownloadPage.scss');

const propTypes = {
    setDataType: PropTypes.func,
    bulkDownload: PropTypes.object
};

export class AwardDataContainer extends React.Component {
    render() {
        return (
            <BulkDownloadPage
                bulkDownload={this.props.bulkDownload}
                setDataType={this.props.setDataType}
                dataType={this.props.bulkDownload.dataType} />
        );
    }
}

AwardDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(downloadActions, dispatch)
)(AwardDataContainer);

