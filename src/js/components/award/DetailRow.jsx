/**
 * DetailRow.jsx
 * Created by Emily Gullo 02/06/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';
import * as Icons from 'components/sharedComponents/icons/Icons';
import * as SummaryPageHelper from 'helpers/summaryPageHelper';

const propTypes = {
    title: PropTypes.string,
    value: PropTypes.string,
    overflow: PropTypes.bool
};

export default class DetailRow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moreButton: true,
            buttonValue: 'More',
            arrowValue: (<Icons.AngleDown alt="See full description" />)
        };

        this.toggleButton = this.toggleButton.bind(this);
    }

    toggleButton() {
        const button = !this.state.moreButton;
        let arrow = (<Icons.AngleDown alt="See full description" />);
        let value = 'More';
        if (this.state.buttonValue === 'More') {
            value = 'Less';
            arrow = (<Icons.AngleUp alt="Hide full description" />);
        }
        this.setState({
            moreButton: button,
            buttonValue: value,
            arrowValue: arrow
        });
    }

    render() {
        const maxChars = SummaryPageHelper.maxDescriptionCharacters;
        let value = this.props.value;
        if (this.props.overflow && this.state.moreButton) {
            value = `${this.props.value.substring(0, maxChars)}...`;
        }

        let button = null;
        if (this.props.overflow) {
            button = (
                <button
                    onClick={this.toggleButton}
                    className="see-more">{this.state.buttonValue} {this.state.arrowValue}
                </button>
            );
        }

        return (
            <tr>
                <td>{this.props.title}</td>
                <td>{value} {button}</td>
            </tr>
        );
    }
}
DetailRow.propTypes = propTypes;
