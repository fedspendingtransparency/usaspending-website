/**
 * BarItem.jsx
 * Created by Kevin Li
 */

import React from 'react';

export default class BarItem extends React.Component {
    render() {
        return (
            <g>
                <title>Description</title>
                <desc>Hello</desc>
                <rect className="bar-item" />
            </g>
        );
    }
}