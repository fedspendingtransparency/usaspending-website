/**
 * ResponsiveTable.jsx
 * Responsive table component that displays as a table on desktop
 * and as stacked cards on mobile devices
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useIsMobileContext } from 'context/IsMobileContext';

/**
 * ResponsiveTable - Adaptive table component
 * 
 * @param {Object} props
 * @param {Array} props.columns - Column definitions [{ key, label, className }]
 * @param {Array} props.data - Data rows (array of objects)
 * @param {Function} props.renderCell - Custom cell renderer (cellData, column, rowData, rowIndex) => ReactNode
 * @param {Function} props.renderMobileCard - Custom mobile card renderer (rowData, rowIndex) => ReactNode
 * @param {string} props.className - Additional CSS class
 * @param {string} props.keyField - Field to use as React key (default: 'id')
 * @param {boolean} props.striped - Zebra striping (default: false)
 * @param {boolean} props.bordered - Add borders (default: false)
 * @param {Object} props.emptyState - Empty state config { message, icon }
 */
const ResponsiveTable = ({
    columns = [],
    data = [],
    renderCell = null,
    renderMobileCard = null,
    className = '',
    keyField = 'id',
    striped = false,
    bordered = false,
    emptyState = null
}) => {
    const { isMobile } = useIsMobileContext();

    // Empty state
    if (data.length === 0) {
        return (
            <div className="responsive-table__empty">
                {emptyState?.icon && <div className="responsive-table__empty-icon">{emptyState.icon}</div>}
                <p className="responsive-table__empty-message">
                    {emptyState?.message || 'No data available'}
                </p>
            </div>
        );
    }

    // Mobile card view
    if (isMobile) {
        return (
            <div className={`responsive-table responsive-table--mobile ${className}`}>
                <div className="responsive-table__cards">
                    {data.map((row, rowIndex) => {
                        const key = row[keyField] || rowIndex;
                        
                        // Custom mobile card renderer
                        if (renderMobileCard) {
                            return (
                                <div key={key} className="responsive-table__card">
                                    {renderMobileCard(row, rowIndex)}
                                </div>
                            );
                        }

                        // Default mobile card layout
                        return (
                            <div key={key} className="responsive-table__card">
                                {columns.map((column) => (
                                    <div 
                                        key={column.key} 
                                        className="responsive-table__card-row"
                                    >
                                        <div className="responsive-table__card-label">
                                            {column.label}
                                        </div>
                                        <div className="responsive-table__card-value">
                                            {renderCell 
                                                ? renderCell(row[column.key], column, row, rowIndex)
                                                : row[column.key]
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Desktop table view
    const tableClasses = [
        'responsive-table',
        'responsive-table--desktop',
        striped && 'responsive-table--striped',
        bordered && 'responsive-table--bordered',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={tableClasses}>
            <table className="responsive-table__table">
                <thead className="responsive-table__head">
                    <tr className="responsive-table__header-row">
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={`responsive-table__header ${column.className || ''}`}
                            >
                                {column.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="responsive-table__body">
                    {data.map((row, rowIndex) => {
                        const key = row[keyField] || rowIndex;
                        return (
                            <tr key={key} className="responsive-table__row">
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={`responsive-table__cell ${column.className || ''}`}
                                    >
                                        {renderCell 
                                            ? renderCell(row[column.key], column, row, rowIndex)
                                            : row[column.key]
                                        }
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

ResponsiveTable.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        className: PropTypes.string
    })).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    renderCell: PropTypes.func,
    renderMobileCard: PropTypes.func,
    className: PropTypes.string,
    keyField: PropTypes.string,
    striped: PropTypes.bool,
    bordered: PropTypes.bool,
    emptyState: PropTypes.shape({
        message: PropTypes.string,
        icon: PropTypes.node
    })
};

export default ResponsiveTable;
