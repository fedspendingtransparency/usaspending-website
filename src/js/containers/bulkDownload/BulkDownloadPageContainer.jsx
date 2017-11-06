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
    dataType: PropTypes.string
};

export class AwardDataContainer extends React.Component {
    render() {
        return (
            <BulkDownloadPage
                setDataType={this.props.setDataType}
                dataType={this.props.dataType} />
        );
    }
}

AwardDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({ dataType: state.bulkDownload.dataType }),
    (dispatch) => bindActionCreators(downloadActions, dispatch)
)(AwardDataContainer);

