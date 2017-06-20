/**
 * DetailsTablePicker.jsx
 * Created by Lizzie Salita 03/28/17
 **/

import React from 'react';
import * as Icons from 'components/sharedComponents/icons/Icons';
import DetailsTablePickerItem from './DetailsTablePickerItem';

const propTypes = {
    tabs: React.PropTypes.array,
    activeTab: React.PropTypes.string,
    clickTab: React.PropTypes.func
};

const defaultProps = {
    tabs: [
        {
            label: 'Transaction History',
            code: 'transaction',
            disabled: false
        },
        {
            label: 'Sub-Awards',
            code: 'subaward',
            disabled: true
        },
        {
            label: 'Financial System Details',
            code: 'financial',
            disabled: false
        },
        {
            label: 'Additional Details',
            code: 'additional',
            disabled: false
        }
    ]
};

export default class DetailsTablePicker extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // TODO: add awardType
            showPicker: false
        };

        this.togglePicker = this.togglePicker.bind(this);
    }

    togglePicker() {
        this.setState({
            showPicker: !this.state.showPicker
        });
    }

    render() {
        const options = this.props.tabs.map((tab) => (
            <DetailsTablePickerItem
                {...tab}
                active={tab.code === this.props.activeTab}
                clickTab={this.props.clickTab}
                key={tab.code}
                togglePicker={this.togglePicker} />));
        let label = '';
        for (let i = 0; i < this.props.tabs.length; i++) {
            if (this.props.tabs[i].code === this.props.activeTab) {
                label = this.props.tabs[i].label;
            }
        }

        const currentField = this.props.activeTab;
        let showPicker = 'hide';
        let icon = <Icons.AngleDown alt="Pick a field" />;
        if (this.state.showPicker) {
            showPicker = '';
            icon = <Icons.AngleUp alt="Pick a field" />;
        }

        return (
            <div className="field-picker">
                <button
                    className="selected-button"
                    title={currentField}
                    aria-label={currentField}
                    onClick={this.togglePicker}>
                    <span className="label">
                        {label}
                    </span>
                    <span className="arrow-icon">
                        {icon}
                    </span>
                </button>

                <div className={`field-list ${showPicker}`}>
                    <ul>
                        {options}
                    </ul>
                </div>
            </div>
        );
    }
}

DetailsTablePicker.propTypes = propTypes;
DetailsTablePicker.defaultProps = defaultProps;
