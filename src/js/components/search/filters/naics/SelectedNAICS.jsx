/**
 * SelectedNAICS.jsx
 * Created by Emily Gullo 07/14/2017
 **/

import React from 'react';
import PropTypes from 'prop-types';

import * as OtherFiltersFormatter from 'helpers/otherFiltersFormatter';
import ShownValue from 'components/search/filters/otherFilters/ShownValue';

const propTypes = {
    selectedNAICS: PropTypes.array,
    removeNAICS: PropTypes.func
};

export default class SelectedNAICS extends React.Component {
    render() {
        return (
            <div
                className="selected-filters"
                role="status">
                {this.props.selectedNAICS.map((node) => (
                    <ShownValue
                        key={node.value}
                        label={OtherFiltersFormatter.formatValue(node.value, node.label)}
                        removeValue={() => this.props.removeNAICS(node)} />)
                )}
            </div>
        );
    }
}
SelectedNAICS.propTypes = propTypes;
