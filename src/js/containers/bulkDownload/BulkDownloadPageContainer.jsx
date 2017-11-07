/**
 * BulkDownloadPageContainer.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { isCancel } from 'axios';

import * as bulkDownloadActions from 'redux/actions/bulkDownload/bulkDownloadActions';
import * as BulkDownloadHelper from 'helpers/bulkDownloadHelper';
import BulkDownloadPage from 'components/bulkDownload/BulkDownloadPage';

require('pages/bulkDownload/bulkDownloadPage.scss');

const propTypes = {
    bulkDownload: PropTypes.object,
    setDataType: PropTypes.func,
    setDownloadPending: PropTypes.func,
    setDownloadCollapsed: PropTypes.func,
    setDownloadExpectedFile: PropTypes.func,
    resetDownload: PropTypes.func
};

export class AwardDataContainer extends React.Component {
    constructor(props) {
        super(props);

        this.request = null;

        this.startDownload = this.startDownload.bind(this);
    }

    startDownload() {
        this.props.setDownloadPending(true);
        const dataType = this.props.bulkDownload.dataType;
        this.requestDownload(this.props.bulkDownload[dataType], dataType);
    }

    requestDownload(params, type) {
        if (this.request) {
            this.request.cancel();
        }

        this.request = BulkDownloadHelper.requestBulkDownload(params, type);

        this.request.promise
            .then((res) => {
                this.props.setDownloadExpectedFile(res.data.file_name);
            })
            .catch((err) => {
                if (!isCancel(err)) {
                    // something went wrong
                    console.log(err);

                    if (err.response) {
                        console.log(err.response.data.message);
                    }
                    else {
                        console.log(err.message);
                    }
                }
            });
    }

    render() {
        return (
            <BulkDownloadPage
                bulkDownload={this.props.bulkDownload}
                setDataType={this.props.setDataType}
                dataType={this.props.bulkDownload.dataType}
                startDownload={this.startDownload} />
        );
    }
}

AwardDataContainer.propTypes = propTypes;

export default connect(
    (state) => ({ bulkDownload: state.bulkDownload }),
    (dispatch) => bindActionCreators(bulkDownloadActions, dispatch)
)(AwardDataContainer);

