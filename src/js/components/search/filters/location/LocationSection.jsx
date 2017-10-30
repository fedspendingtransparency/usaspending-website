/**
 * LocationSection.jsx
 * Created by Kevin Li 10/30/17
 */

import React from 'react';

export default class LocationSection extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'pop'
        };

        this.toggleTab = this.toggleTab.bind(this);
    }

    toggleTab(e) {
        const type = e.target.value;

        this.setState({
            activeTab: type
        });
    }

    render() {
        let activePop = '';
        if (this.state.activeTab !== 'pop') {
            activePop = 'inactive';
        }

        let activeRecipient = '';
        if (this.state.activeTab !== 'recipient') {
            activeRecipient = 'inactive';
        }

        return (
            <div className="location-filter search-filter">
                <ul className="toggle-buttons">
                    <li>
                        <button
                            className={`date-toggle ${activePop}`}
                            value="fy"
                            onClick={this.toggleTab}>
                            Place of Performance
                        </button>
                    </li>
                    <li>
                        <button
                            className={`date-toggle ${activeRecipient}`}
                            value="dr"
                            onClick={this.toggleTab}>
                            Recipient Location
                        </button>
                    </li>
                </ul>
                <div className="toggle-border" />
            </div>
        );
    }
}
