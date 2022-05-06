/**
 * DownloadScopeContainer.jsx
 * Created by Kevin Li 8/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as downloadActions from 'redux/actions/search/downloadActions';

import DownloadScope from 'components/search/modals/fullDownload/screens/DownloadScope';

const propTypes = {
    download: PropTypes.object
};

export class DownloadScopeContainer extends React.Component {
    render() {
        return (
            <DownloadScope {...this.props} />
        );
    }
}

DownloadScopeContainer.propTypes = propTypes;

export default connect(
    (state) => ({ download: state.download }),
    (dispatch) => bindActionCreators(downloadActions, dispatch)
)(DownloadScopeContainer);
