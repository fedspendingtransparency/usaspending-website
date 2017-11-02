/**
 * DownloadProgress.jsx
 * Created by Kevin Li 8/8/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    hideModal: PropTypes.func,
    setDownloadCollapsed: PropTypes.func
};

export default class DownloadProgress extends React.Component {
    componentDidMount() {
        this.props.setDownloadCollapsed(true);
        window.setTimeout(this.props.hideModal, 3000); // close the modal after 3 seconds
    }
    render() {
        return (
            <div className="download-progress-screen">
                <div className="main-title">
                    <h2>Your download is being prepared.</h2>
                    <div className="details">
                        You can see its progress in the bar below.
                    </div>
                </div>
            </div>
        );
    }
}

DownloadProgress.propTypes = propTypes;
