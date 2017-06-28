/**
 * AgencyFooter.jsx
 * Created by Kevin Li 6/16/17
 */

import React from 'react';

const propTypes = {
    clickedSearch: React.PropTypes.func
};

export default class AgencyFooter extends React.Component {
    render() {
        return (
            <div className="agency-footer">
                <div className="footer-content">
                    <h4>
                        Looking for more insight?
                    </h4>
                    <p>
                        Check out the <strong>Search and Download</strong> page <br />
                        for more in-depth analysis on this agency and more
                    </p>
                    <button
                        className="agency-search-button"
                        onClick={this.props.clickedSearch}>
                        Let&#39;s go!
                    </button>
                </div>
            </div>
        );
    }
}

AgencyFooter.propTypes = propTypes;
