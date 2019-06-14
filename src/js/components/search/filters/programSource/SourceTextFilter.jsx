/**
 * SourceTextFilter.jsx
 * Created by Lizzie Salita 6/13/19
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
    label: PropTypes.string,
    code: PropTypes.string,
    characterLimit: PropTypes.number,
    updateComponent: PropTypes.func
};

export class SourceTextFilter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchString: ''
        };

        this.onChange = this.onChange.bind(this);
        this.selectSourceComponent = this.selectSourceComponent.bind(this);
    }

    onChange(e) {
        const searchString = e.target.value;
        this.setState({
            searchString
        });
    }

    selectSourceComponent(e) {
        e.preventDefault();
        if (this.state.searchString !== '') {
            this.props.updateComponent(this.props.code, this.state.searchString);
        }
        this.setState({
            searchString: ''
        });
    }

    render() {
        return (
            <div className="program-source-text-filter">
                <label className="program-source-text-filter__label">
                    {`${this.props.label} (${this.props.code.toUpperCase()})`}
                </label>
                <div className="program-source-text-filter__wrapper">
                    <input
                        type="text"
                        className="program-source-text-filter__input"
                        id={`source-${this.props.code}-filter`}
                        value={this.state.searchString}
                        maxLength={this.props.characterLimit}
                        onChange={this.onChange}
                        onSubmit={this.selectSourceComponent}
                        placeholder={`Enter ${this.props.code.toUpperCase()} value (${this.props.characterLimit} characters)`} />
                    <button
                        className="program-source-text-filter__button"
                        type="submit"
                        onClick={this.selectSourceComponent}
                        disabled={!this.state.searchString}>
                        <FontAwesomeIcon icon="search" />
                    </button>
                </div>
            </div>
        );
    }
}

export default SourceTextFilter;
SourceTextFilter.propTypes = propTypes;
