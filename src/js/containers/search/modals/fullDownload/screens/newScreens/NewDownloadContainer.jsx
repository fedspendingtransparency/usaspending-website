/**
 * NewDownloadContainer.jsx
 * Created by Nick Torres 3/3/26
 */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as downloadActions from 'redux/actions/search/downloadActions';

import NewDownloadLevel from
    'components/search/modals/fullDownload/screens/newScreens/NewDownloadLevel';
import NewDownloadSummary from
    'components/search/modals/fullDownload/screens/newScreens/NewDownloadSummary';

const propTypes = {
    download: PropTypes.object,
    step: PropTypes.number,
    goToStep: PropTypes.func,
    toggleDownloadType: PropTypes.func,
    beginDownload: PropTypes.func,
    downloadData: PropTypes.object,
    awardsCount: PropTypes.number,
    transactionsCount: PropTypes.number,
    subawardsCount: PropTypes.number,
    content: PropTypes.element,
    downloadType: PropTypes.array
};

const NewDownloadContainer = (props) => {
    if (props.step === 2) {
        return <NewDownloadSummary {...props} />;
    } else if (props.step === 3) {
        return props.content;
    }

    return <NewDownloadLevel {...props} />;
};

NewDownloadContainer.propTypes = propTypes;

export default connect(
    (state) => ({ download: state.download }),
    (dispatch) => bindActionCreators(downloadActions, dispatch)
)(NewDownloadContainer);
