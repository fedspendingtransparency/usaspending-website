/**
 * AdditionalGroup.jsx
 * Created by Kevin Li 3/2/17
 */

import React from 'react';

import AdditionalRow from './AdditionalRow';

const propTypes = {
    fields: React.PropTypes.array,
    award: React.PropTypes.object,
    title: React.PropTypes.string
};

export default class AdditionalGroup extends React.Component {
    generateRows() {
        const rows = [];

        this.props.fields.forEach((item) => {
            const data = this.props.award.selectedAward[item.field];
            const row = (<AdditionalRow
                key={item.field}
                title={item.label}
                value={data} />);

            rows.push(row);
        });

        return rows;
    }

    render() {
        const rows = this.generateRows();

        return (
            <div className="additional-group">
                <div className="left-side">
                    <h4 className="additional-title">
                        {this.props.title}
                    </h4>
                </div>
                <div className="right-side">
                    { rows }
                </div>
            </div>
        );
    }
}

AdditionalGroup.propTypes = propTypes;
