/**
 * DataDictionaryTable.jsx
 * Created by Lizzie Salita 9/14/18
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
    sections: PropTypes.array,
    columns: PropTypes.array,
    rows: PropTypes.array
};

export default class DataDictionaryTable extends React.Component {
    generateSectionHeadings() {
        return this.props.sections.map((section, i) => (
            <th
                key={section.name}
                className={`section-${i}`}
                colSpan={section.colspan}>
                {section.name}
            </th>
        ));
    }

    generateColumnHeadings() {
        const columns = [];
        let start = 0;
        this.props.sections.forEach((section, i) => {
            const sectionColumns = this.props.columns.slice(start, start + section.colspan);
            columns.push(sectionColumns.map((col) => (
                <th className={`section-${i}`}>
                    {col}
                </th>
            )));

            start += section.colspan;
        });
        return columns;
    }

    render() {
        return (
            <table className="dictionary-table">
                <thead>
                    <tr>
                        {this.generateSectionHeadings()}
                    </tr>
                    <tr>
                        {this.generateColumnHeadings()}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TODO: rows</td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

DataDictionaryTable.propTypes = propTypes;
