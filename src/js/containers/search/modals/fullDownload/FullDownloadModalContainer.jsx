/**
 * FullDownloadModalContainer.jsx
 * Created by Kevin Li 8/4/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FullDownloadModal from 'components/search/modals/fullDownload/FullDownloadModal';

const propTypes = {
    mounted: PropTypes.bool,
    hideModal: PropTypes.func,
    reduxFilters: PropTypes.object
};

export class FullDownloadModalContainer extends React.Component {
    render() {
        return (
            <FullDownloadModal
                mounted={this.props.mounted}
                hideModal={this.props.hideModal} />
        );
    }
}

FullDownloadModalContainer.propTypes = propTypes;

export default connect(
    (state) => ({ reduxFilters: state.filters })
)(FullDownloadModalContainer);
