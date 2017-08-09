/**
 * DownloadLocation.jsx
 * Created by Kevin Li 5/9/17
 */

import React from 'react';
import PropTypes from 'prop-types';
import Clipboard from 'clipboard';

const propTypes = {
    location: PropTypes.string
};

export default class DownloadLocation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            button: 'Copy URL'
        };

        this.clipboard = null;
        this.copiedLink = this.copiedLink.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        this.clipboard = new Clipboard('.download-location-copy');
        this.clipboard.on('success', this.copiedLink);
    }

    componentWillUnmount() {
        this.mounted = false;
        this.clipboard.destroy();
    }

    copiedLink() {
        this.setState({
            button: 'Copied!'
        }, () => {
            // restore the button text after 2 seconds
            window.setTimeout(() => {
                if (this.mounted) {
                    // but only change the state if the component is still mounted
                    this.setState({
                        button: 'Copy URL'
                    });
                }
            }, 2000);
        });
    }

    render() {
        return (
            <div className="download-location-wrapper">
                <input
                    className="download-location"
                    id="download-location-url"
                    type="text"
                    value={this.props.location}
                    readOnly />
                <button
                    className="download-location-copy"
                    data-clipboard-action="copy"
                    data-clipboard-target="#download-location-url">
                    {this.state.button}
                </button>
            </div>
        );
    }
}

DownloadLocation.propTypes = propTypes;
