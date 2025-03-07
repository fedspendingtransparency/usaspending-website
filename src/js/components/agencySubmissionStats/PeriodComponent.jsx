import React from 'react';
import PropTypes from 'prop-types';

const PeriodComponent = ({
    title,
    classNames,
    isEnabled = true
}) => {
    const isLastPeriod = title.includes('Q');
    const classNamesWithState = isEnabled
        ? classNames.join(' ')
        : classNames.concat(['disabled']).join(' ');
    if (isLastPeriod) {
        const quarterAndTitle = title.split(' ');
        return (
            <div className={classNamesWithState}>
                <span>{quarterAndTitle[0]}</span>
                <span>{quarterAndTitle[1]}</span>
            </div>
        );
    }
    return (
        <div className={classNamesWithState}>
            <span>{title}</span>
        </div>
    );
};

PeriodComponent.propTypes = {
    title: PropTypes.string.isRequired,
    classNames: PropTypes.arrayOf(PropTypes.string),
    isEnabled: PropTypes.bool
};

export default PeriodComponent;
