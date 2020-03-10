/**
 * SelectedNAICS.jsx
 * Created by Emily Gullo 07/14/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import { formatSelectedNaics } from 'helpers/naicsHelper';
import ShownValue from 'components/search/filters/otherFilters/ShownValue';

const propTypes = {
    selectedNAICS: PropTypes.array,
    removeNAICS: PropTypes.func
};

export default class SelectNaic extends React.Component {
    render() {
        if (!this.props.selectedNAICS.length) return null;
        const shownNAICS = this.props.selectedNAICS.map((entry) => {
            const { value, label, count } = entry;
            return (<ShownValue
                label={formatSelectedNaics(value, label, count)}
                key={value}
                removeValue={this.props.removeNAICS && this.props.removeNAICS.bind(null, entry[1])} />);
        });

        return (
            <div
                className="selected-filters"
                role="status">
                {shownNAICS}
            </div>
        );
    }
}
SelectNaic.propTypes = propTypes;
