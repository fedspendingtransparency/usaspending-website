/**
 * CylonEye.jsx
 * Created by Kevin Li 5/9/17
 */

import React from 'react';

export default class CylonEye extends React.Component {
    render() {
        return (
            <div className="cylon-eye-wrapper">
                <div className="cylon-eye-line" />
                <div className="eyeball-wrapper">
                    <div className="cylon-eye-ball" />
                </div>
            </div>
        );
    }
}
