/**
 * AdditionalGroup.jsx
 * Created by Kevin Li 3/2/17
 */

import React from 'react';

import * as MoneyFormatter from 'helpers/moneyFormatter';
import AdditionalRow from './AdditionalRow';

const propTypes = {
    fields: React.PropTypes.array,
    data: React.PropTypes.object,
    title: React.PropTypes.string
};

export default class AdditionalGroup extends React.Component {
    generateRows() {
        const rows = [];

        this.props.fields.forEach((item) => {
            let value = "Not Available";
            if (this.props.data[item.field]) {
                value = this.props.data[item.field];
            }
            if (item.field === "__special") {
                // this is a special data field that needs to be manually parsed
                value = item.parse(this.props.data);
            }

            if (item.type === "currency") {
                // monetize this amount
                value = MoneyFormatter.formatMoney(this.props.data[item.field]);
            }

            const row = (<AdditionalRow
                key={item.label}
                title={item.label}
                value={value} />);

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
