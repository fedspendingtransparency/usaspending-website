/**
 * ExtraModalTabs.jsx
 * Created by Kevin Li 5/2/17
 */

import React from 'react';

export default class ExtraModalTabs extends React.Component {
    render() {
        return (
            <div className="modal-tab-wrapper">
                <ul className="modal-tabs">
                    <li>
                        <button
                            className="active-tab">
                            Download
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}
