/**
 * DownloadLocation.jsx
 * Created by Kevin Li 5/9/17
 */

import React from 'react';
import Clipboard from 'clipboard';

const propTypes = {
    location: React.PropTypes.string
};

export default class DownloadLocation extends React.Component {
    constructor(props) {
        super(props);

        this.clipboard = null;
    }

    componentDidMount() {
        this.clipboard = new Clipboard('.download-location-copy');
    }

    componentWillUnmount() {
        this.clipboard.destroy();
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
                    Copy URL
                </button>
            </div>
        );
    }
}

DownloadLocation.propTypes = propTypes;
