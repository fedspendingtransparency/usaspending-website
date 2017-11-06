/**
 * ModalContent.jsx
 * Created by Lizzie Salita 11/3/17
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    hideModal: PropTypes.func,
    setDownloadCollapsed: PropTypes.func
};

export default class ModalContent extends React.Component {
    componentDidMount() {
        this.props.setDownloadCollapsed(true);
        window.setTimeout(this.props.hideModal, 3000); // close the modal after 3 seconds
    }
    render() {
        return (
            <div className="download-progress-screen">
                <div className="main-title">
                    <h2>Your download is being generated.</h2>
                    <div className="details">
                        You will be notified when it&#8217;s ready.
                    </div>
                    <div className="link-box">
                        <p>Use this link to download your file anytime once it&#8217;s ready.</p>
                        <div className="link">link here</div>
                    </div>
                    <button onClick={this.props.hideModal}>Finish</button>
                </div>
            </div>
        );
    }
}

ModalContent.propTypes = propTypes;
