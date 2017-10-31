/**
 * AwardDataContainer.jsx
 * Created by Lizzie Salita 10/30/17
 */

import React from 'react';

export default class AwardDataContainer extends React.Component {
    render() {
        return (
            <div className="download-data-content">
                <div className="download-filters">
                    <h2><span>Award Data</span> Download</h2>
                </div>
                <div className="download-info">
                    <h6>About Award Data</h6>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo,
                        tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Donec ullamcorper
                        nulla non metus auctor fringilla. Morbi leo risus, porta ac consectetur ac, vestibulum
                        at eros. Maecenas sed diam eget risus varius blandit sit amet non magna.
                    </p>
                </div>
            </div>
        );
    }
}

