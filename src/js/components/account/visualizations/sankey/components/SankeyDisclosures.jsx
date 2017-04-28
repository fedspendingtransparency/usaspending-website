/**
 * SankeyDisclosures.jsx
 * Created by Kevin Li 4/18/17
 */

import React from 'react';

const propTypes = {
    items: React.PropTypes.array
};

export default class SankeyDisclosures extends React.Component {
    render() {
        const items = this.props.items.map((item, index) => (
            <li key={index}>
                <b>{item.label}:</b> {item.value}
            </li>
        ));

        return (
            <div className="sankey-disclosures">
                <div className="disclosure-title">
                    Not Shown:
                </div>
                <ul className="disclosure-list">
                    {items}
                </ul>
            </div>
        );
    }
}

SankeyDisclosures.propTypes = propTypes;
